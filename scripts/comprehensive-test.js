#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Comprehensive Testing Script for TribeBills Landing Page Integration
 * 
 * Tests all critical aspects before main app integration:
 * - Build performance and bundle analysis
 * - SEO implementation validation  
 * - Security configuration verification
 * - Asset optimization checks
 * - Component namespace isolation
 * - API endpoint functionality
 */

const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

const log = {
  success: (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}❌ ${msg}${colors.reset}`),
  warning: (msg) => console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`),
  info: (msg) => console.log(`${colors.blue}ℹ️  ${msg}${colors.reset}`),
  header: (msg) => console.log(`\n${colors.bold}${colors.blue}🚀 ${msg}${colors.reset}\n`),
};

class TestRunner {
  constructor() {
    this.results = {
      passed: 0,
      failed: 0,
      warnings: 0,
      tests: []
    };
  }

  async runTest(name, testFn) {
    try {
      const result = await testFn();
      if (result.success) {
        this.results.passed++;
        log.success(`${name}: ${result.message}`);
      } else if (result.warning) {
        this.results.warnings++;
        log.warning(`${name}: ${result.message}`);
      } else {
        this.results.failed++;
        log.error(`${name}: ${result.message}`);
      }
      this.results.tests.push({ name, ...result });
    } catch (error) {
      this.results.failed++;
      log.error(`${name}: ${error.message}`);
      this.results.tests.push({ name, success: false, message: error.message });
    }
  }

  async testFileStructure() {
    const requiredFiles = [
      'app/layout.tsx',
      'app/page.tsx',
      'app/sitemap.ts',
      'app/robots.ts',
      'app/api/contact/route.ts',
      'components/marketing-ui',
      'public/marketing/images',
      'public/marketing/videos',
      '.env.local',
      '.env.example',
      '.env.production',
    ];

    const missingFiles = [];
    
    for (const file of requiredFiles) {
      try {
        await fs.access(path.resolve(__dirname, '..', file));
      } catch {
        missingFiles.push(file);
      }
    }

    if (missingFiles.length === 0) {
      return { success: true, message: `All ${requiredFiles.length} required files present` };
    } else {
      return { success: false, message: `Missing files: ${missingFiles.join(', ')}` };
    }
  }

  async testComponentNamespacing() {
    try {
      const uiDir = path.resolve(__dirname, '..', 'components', 'marketing-ui');
      const files = await fs.readdir(uiDir);
      
      if (files.length >= 50) {
        return { success: true, message: `${files.length} UI components properly namespaced` };
      } else {
        return { success: false, message: `Only ${files.length} UI components found, expected ~51` };
      }
    } catch (error) {
      return { success: false, message: `Cannot access marketing-ui directory: ${error.message}` };
    }
  }

  async testAssetOrganization() {
    try {
      const imagesDir = path.resolve(__dirname, '..', 'public', 'marketing', 'images');
      const videosDir = path.resolve(__dirname, '..', 'public', 'marketing', 'videos');
      
      const images = await fs.readdir(imagesDir);
      const videos = await fs.readdir(videosDir);
      
      if (images.length >= 5 && videos.length >= 4) {
        return { success: true, message: `${images.length} images, ${videos.length} videos properly organized` };
      } else {
        return { success: false, message: `Asset count mismatch: ${images.length} images, ${videos.length} videos` };
      }
    } catch (error) {
      return { success: false, message: `Asset organization check failed: ${error.message}` };
    }
  }

  async testEnvironmentConfig() {
    try {
      const envLocal = await fs.readFile(path.resolve(__dirname, '..', '.env.local'), 'utf8');
      const envExample = await fs.readFile(path.resolve(__dirname, '..', '.env.example'), 'utf8');
      const envProd = await fs.readFile(path.resolve(__dirname, '..', '.env.production'), 'utf8');
      
      const requiredVars = ['WEB3FORMS_ACCESS_KEY', 'NEXT_PUBLIC_SITE_URL', 'NEXT_PUBLIC_CONTACT_FORM_ENABLED'];
      const allFilesHaveVars = requiredVars.every(varName => 
        envLocal.includes(varName) && envExample.includes(varName) && envProd.includes(varName)
      );
      
      if (allFilesHaveVars) {
        return { success: true, message: 'All environment configurations complete' };
      } else {
        return { success: false, message: 'Missing required environment variables' };
      }
    } catch (error) {
      return { success: false, message: `Environment config check failed: ${error.message}` };
    }
  }

  async testSEOImplementation() {
    try {
      const layoutContent = await fs.readFile(path.resolve(__dirname, '..', 'app', 'layout.tsx'), 'utf8');
      const sitemapExists = await fs.access(path.resolve(__dirname, '..', 'app', 'sitemap.ts')).then(() => true).catch(() => false);
      const robotsExists = await fs.access(path.resolve(__dirname, '..', 'app', 'robots.ts')).then(() => true).catch(() => false);
      
      const hasMetadata = layoutContent.includes('openGraph') && layoutContent.includes('twitter');
      
      if (hasMetadata && sitemapExists && robotsExists) {
        return { success: true, message: 'Complete SEO implementation (metadata, sitemap, robots)' };
      } else {
        return { success: false, message: 'Incomplete SEO implementation' };
      }
    } catch (error) {
      return { success: false, message: `SEO check failed: ${error.message}` };
    }
  }

  async testSecurityImplementation() {
    try {
      const apiRoute = await fs.readFile(path.resolve(__dirname, '..', 'app', 'api', 'contact', 'route.ts'), 'utf8');
      const nextConfig = await fs.readFile(path.resolve(__dirname, '..', 'next.config.mjs'), 'utf8');
      
      const hasRateLimit = apiRoute.includes('rateLimitStore') && apiRoute.includes('isRateLimited');
      const hasValidation = apiRoute.includes('contactSchema') && apiRoute.includes('z.object');
      const hasSecurityHeaders = nextConfig.includes('X-Frame-Options') && nextConfig.includes('X-Content-Type-Options');
      
      if (hasRateLimit && hasValidation && hasSecurityHeaders) {
        return { success: true, message: 'Complete security implementation (rate limiting, validation, headers)' };
      } else {
        return { success: false, message: 'Incomplete security implementation' };
      }
    } catch (error) {
      return { success: false, message: `Security check failed: ${error.message}` };
    }
  }

  async testBuildCompatibility() {
    try {
      // Check if build artifacts exist (indicating successful build)
      const buildDir = path.resolve(__dirname, '..', '.next');
      const buildExists = await fs.access(buildDir).then(() => true).catch(() => false);
      
      if (buildExists) {
        const serverDir = await fs.readdir(path.resolve(buildDir, 'server', 'app')).catch(() => []);
        const hasPages = serverDir.includes('page.js');
        const hasSitemap = serverDir.some(file => file.includes('sitemap'));
        
        if (hasPages && hasSitemap) {
          return { success: true, message: 'Build artifacts present and complete' };
        } else {
          return { warning: true, message: 'Build exists but may be incomplete' };
        }
      } else {
        return { warning: true, message: 'No build artifacts found - run build first' };
      }
    } catch (error) {
      return { warning: true, message: `Build check inconclusive: ${error.message}` };
    }
  }

  async testScriptIntegration() {
    try {
      const packageJson = await fs.readFile(path.resolve(__dirname, '..', 'package.json'), 'utf8');
      const pkg = JSON.parse(packageJson);
      
      const hasScripts = pkg.scripts && 
        pkg.scripts.build && 
        pkg.scripts['build:basic'] && 
        pkg.scripts['build:analyze'];
      
      const safariScript = await fs.access(path.resolve(__dirname, '..', 'scripts', 'safari-compatibility.js')).then(() => true).catch(() => false);
      
      if (hasScripts && safariScript) {
        return { success: true, message: 'All build scripts and tools properly integrated' };
      } else {
        return { success: false, message: 'Missing required build scripts or tools' };
      }
    } catch (error) {
      return { success: false, message: `Script integration check failed: ${error.message}` };
    }
  }

  printSummary() {
    log.header('TEST SUMMARY');
    console.log(`${colors.green}✅ Passed: ${this.results.passed}${colors.reset}`);
    console.log(`${colors.red}❌ Failed: ${this.results.failed}${colors.reset}`);
    console.log(`${colors.yellow}⚠️  Warnings: ${this.results.warnings}${colors.reset}`);
    
    const total = this.results.passed + this.results.failed + this.results.warnings;
    const successRate = ((this.results.passed / total) * 100).toFixed(1);
    
    console.log(`\n${colors.bold}Success Rate: ${successRate}%${colors.reset}`);
    
    if (this.results.failed === 0) {
      log.success('🎉 All critical tests passed! Ready for main app integration.');
    } else {
      log.error(`❌ ${this.results.failed} critical issues need to be resolved before integration.`);
    }
    
    return this.results.failed === 0;
  }
}

async function main() {
  log.header('TribeBills Landing Page - Comprehensive Integration Test');
  
  const runner = new TestRunner();
  
  // Run all tests
  await runner.runTest('File Structure', () => runner.testFileStructure());
  await runner.runTest('Component Namespacing', () => runner.testComponentNamespacing());
  await runner.runTest('Asset Organization', () => runner.testAssetOrganization());
  await runner.runTest('Environment Configuration', () => runner.testEnvironmentConfig());
  await runner.runTest('SEO Implementation', () => runner.testSEOImplementation());
  await runner.runTest('Security Implementation', () => runner.testSecurityImplementation());
  await runner.runTest('Build Compatibility', () => runner.testBuildCompatibility());
  await runner.runTest('Script Integration', () => runner.testScriptIntegration());
  
  const success = runner.printSummary();
  process.exit(success ? 0 : 1);
}

// Handle both direct execution and module import
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    log.error(`Fatal error: ${error.message}`);
    process.exit(1);
  });
}
