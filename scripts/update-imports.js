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

const updateImports = async () => {
  console.log('🔄 Updating import statements...');
  
  // Find all TypeScript/TSX files
  const files = await findFiles(path.resolve(__dirname, '..'));
  
  let updatedFiles = 0;
  let totalReplacements = 0;
  
  for (const file of files) {
    try {
      let content = await fs.readFile(file, 'utf8');
      const originalContent = content;
      
      // Update imports from @/components/ui/ to @/components/marketing-ui/
      content = content.replace(
        /from ["']@\/components\/ui\//g, 
        'from "@/components/marketing-ui/'
      );
      
      // Update relative imports from ./ui/ to ./marketing-ui/
      content = content.replace(
        /from ["']\.\/ui\//g, 
        'from "./marketing-ui/'
      );
      
      // Update relative imports from ../ui/ to ../marketing-ui/
      content = content.replace(
        /from ["']\.\.\/ui\//g, 
        'from "../marketing-ui/'
      );
      
      // Count replacements in this file
      const replacements = (originalContent.match(/\/ui\//g) || []).length - (content.match(/\/ui\//g) || []).length;
      
      if (content !== originalContent) {
        await fs.writeFile(file, content, 'utf8');
        updatedFiles++;
        totalReplacements += replacements;
        console.log(`✅ Updated ${file} (${replacements} imports)`);
      }
    } catch (error) {
      console.error(`❌ Error updating ${file}:`, error.message);
    }
  }
  
  console.log(`\n🎯 Summary:`);
  console.log(`   Files updated: ${updatedFiles}`);
  console.log(`   Total import statements updated: ${totalReplacements}`);
  console.log(`   ✅ Import update complete!`);
};

updateImports().catch(console.error);
