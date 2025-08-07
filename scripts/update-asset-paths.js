#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const findFiles = async (dir, extensions = ['.ts', '.tsx']) => {
  const files = [];
  const items = await fs.readdir(dir, { withFileTypes: true });
  
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    
    if (item.isDirectory() && !['node_modules', '.next', '.git', 'scripts'].includes(item.name)) {
      files.push(...await findFiles(fullPath, extensions));
    } else if (item.isFile() && extensions.some(ext => item.name.endsWith(ext))) {
      files.push(fullPath);
    }
  }
  
  return files;
};

const updateAssetPaths = async () => {
  console.log('🖼️  Updating asset paths...');
  
  const files = await findFiles(path.resolve(__dirname, '..'));
  
  let updatedFiles = 0;
  let totalReplacements = 0;
  
  for (const file of files) {
    try {
      let content = await fs.readFile(file, 'utf8');
      const originalContent = content;
      
      // Update image paths
      content = content.replace(
        /["']\/images\//g, 
        '"/marketing/images/'
      );
      
      // Update video paths  
      content = content.replace(
        /["']\/videos\//g, 
        '"/marketing/videos/'
      );
      
      // Count replacements in this file
      const imageReplacements = (originalContent.match(/\/images\//g) || []).length - (content.match(/\/images\//g) || []).length;
      const videoReplacements = (originalContent.match(/\/videos\//g) || []).length - (content.match(/\/videos\//g) || []).length;
      const totalFileReplacements = imageReplacements + videoReplacements;
      
      if (content !== originalContent) {
        await fs.writeFile(file, content, 'utf8');
        updatedFiles++;
        totalReplacements += totalFileReplacements;
        console.log(`✅ Updated ${file} (${imageReplacements} images, ${videoReplacements} videos)`);
      }
    } catch (error) {
      console.error(`❌ Error updating ${file}:`, error.message);
    }
  }
  
  console.log(`\n🎯 Summary:`);
  console.log(`   Files updated: ${updatedFiles}`);
  console.log(`   Total asset paths updated: ${totalReplacements}`);
  console.log(`   ✅ Asset path update complete!`);
};

updateAssetPaths().catch(console.error);
