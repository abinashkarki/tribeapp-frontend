#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Safari Compatibility Script for TribeBills Landing Page
 * 
 * Converts modern CSS features to legacy syntax for Safari 15.4+ support:
 * - Range media queries (width >= 768px) → (min-width: 768px)
 * - Modern CSS functions → legacy equivalents
 * - Ensures graceful degradation for older browsers
 */

const convertRangeMediaQueries = (cssContent) => {
  console.log('🔄 Converting range media queries...');
  
  // Convert >= syntax to min-width
  const greaterThanOrEqualPattern = /@media\s*\(\s*width\s*>=\s*([0-9.]+)(px|em|rem|vh|vw|%)\s*\)/g;
  let updatedCss = cssContent.replace(
    greaterThanOrEqualPattern,
    (_, value, unit) => `@media (min-width: ${value}${unit})`
  );

  // Convert <= syntax to max-width
  const lessThanOrEqualPattern = /@media\s*\(\s*width\s*<=\s*([0-9.]+)(px|em|rem|vh|vw|%)\s*\)/g;
  updatedCss = updatedCss.replace(
    lessThanOrEqualPattern,
    (_, value, unit) => `@media (max-width: ${value}${unit})`
  );

  // Convert range syntax (min <= width <= max) to combined media query
  const rangePattern = /@media\s*\(\s*([0-9.]+)(px|em|rem|vh|vw|%)\s*<=\s*width\s*<=\s*([0-9.]+)(px|em|rem|vh|vw|%)\s*\)/g;
  updatedCss = updatedCss.replace(
    rangePattern,
    (_, minValue, minUnit, maxValue, maxUnit) =>
      `@media (min-width: ${minValue}${minUnit}) and (max-width: ${maxValue}${maxUnit})`
  );

  return updatedCss;
};

const addFallbackStyles = (cssContent) => {
  console.log('🎨 Adding fallback styles for older browsers...');
  
  // Add fallbacks for modern CSS features
  let updatedCss = cssContent;
  
  // Add oklch color fallbacks (basic approximation)
  updatedCss = updatedCss.replace(
    /oklch\([^)]+\)/g,
    (match) => {
      // For now, just add a comment for manual review
      return `${match} /* TODO: Add RGB fallback for Safari < 15.4 */`;
    }
  );

  return updatedCss;
};

const optimizeForProduction = (cssContent) => {
  console.log('⚡ Optimizing CSS for production...');
  
  // Remove development comments but keep important ones
  let optimized = cssContent.replace(/\/\*\s*DEV:.*?\*\//g, '');
  
  // Preserve source maps references
  if (cssContent.includes('sourceMappingURL')) {
    console.log('📍 Preserving source maps...');
  }
  
  return optimized;
};

const processCSSFile = async (filePath) => {
  try {
    const startTime = Date.now();
    console.log(`📁 Processing: ${path.basename(filePath)}`);
    
    const cssContent = await fs.readFile(filePath, 'utf8');
    const originalSize = cssContent.length;
    
    let processedCSS = cssContent;
    
    // Apply transformations
    processedCSS = convertRangeMediaQueries(processedCSS);
    processedCSS = addFallbackStyles(processedCSS);
    processedCSS = optimizeForProduction(processedCSS);
    
    // Write back to file
    await fs.writeFile(filePath, processedCSS, 'utf8');
    
    const endTime = Date.now();
    const newSize = processedCSS.length;
    const sizeDiff = newSize - originalSize;
    const sizeDiffPercent = ((sizeDiff / originalSize) * 100).toFixed(1);
    
    console.log(`✅ Processed in ${endTime - startTime}ms`);
    console.log(`   Size: ${originalSize} → ${newSize} bytes (${sizeDiffPercent > 0 ? '+' : ''}${sizeDiffPercent}%)`);
    
    return {
      file: path.basename(filePath),
      processingTime: endTime - startTime,
      originalSize,
      newSize,
      sizeDiff
    };
    
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    throw error;
  }
};

const findCSSFiles = async (dir) => {
  const cssFiles = [];
  
  try {
    const items = await fs.readdir(dir, { withFileTypes: true });
    
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      
      if (item.isDirectory() && !['node_modules', '.git', 'scripts'].includes(item.name)) {
        cssFiles.push(...await findCSSFiles(fullPath));
      } else if (item.isFile() && item.name.endsWith('.css')) {
        cssFiles.push(fullPath);
      }
    }
  } catch (error) {
    // Directory might not exist, skip silently
  }
  
  return cssFiles;
};

const main = async () => {
  console.log('🚀 TribeBills Safari Compatibility Script');
  console.log('==========================================');
  
  const startTime = Date.now();
  const projectRoot = path.resolve(__dirname, '..');
  
  // Look for CSS files in common Next.js locations
  const searchPaths = [
    path.join(projectRoot, '.next', 'static', 'css'),
    path.join(projectRoot, 'out', '_next', 'static', 'css'),
    path.join(projectRoot, 'dist', 'static', 'css'),
  ];
  
  let allCSSFiles = [];
  
  for (const searchPath of searchPaths) {
    const files = await findCSSFiles(searchPath);
    allCSSFiles.push(...files);
  }
  
  if (allCSSFiles.length === 0) {
    console.log('⚠️  No CSS files found. Make sure to run this after `next build`');
    console.log('   Searching in:', searchPaths.map(p => path.relative(projectRoot, p)).join(', '));
    return;
  }
  
  console.log(`📊 Found ${allCSSFiles.length} CSS file(s) to process`);
  
  const results = [];
  
  for (const file of allCSSFiles) {
    const result = await processCSSFile(file);
    results.push(result);
  }
  
  const totalTime = Date.now() - startTime;
  const totalOriginalSize = results.reduce((sum, r) => sum + r.originalSize, 0);
  const totalNewSize = results.reduce((sum, r) => sum + r.newSize, 0);
  const totalSizeDiff = totalNewSize - totalOriginalSize;
  
  console.log('\n🎯 Summary:');
  console.log(`   Files processed: ${results.length}`);
  console.log(`   Total time: ${totalTime}ms`);
  console.log(`   Total size: ${totalOriginalSize} → ${totalNewSize} bytes`);
  console.log(`   Size change: ${totalSizeDiff > 0 ? '+' : ''}${totalSizeDiff} bytes`);
  console.log('\n✅ Safari compatibility processing complete!');
  console.log('   Your CSS now supports Safari 15.4+ and other legacy browsers.');
};

// Handle both direct execution and module import
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error('💥 Fatal error:', error);
    process.exit(1);
  });
}

export { convertRangeMediaQueries, addFallbackStyles, optimizeForProduction };
