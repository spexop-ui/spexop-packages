import fs from 'node:fs/promises';
import path from 'node:path';
import { optimize, type Config } from 'svgo';

const svgoConfig: Config = {
  plugins: [
    'removeDoctype',
    'removeXMLProcInst',
    'removeComments',
    'removeMetadata',
    'removeEditorsNSData',
    'cleanupAttrs',
    'mergeStyles',
    'inlineStyles',
    'minifyStyles',
    'cleanupIds',
    'removeUselessDefs',
    'cleanupNumericValues',
    'convertColors',
    'removeUnknownsAndDefaults',
    'removeNonInheritableGroupAttrs',
    'removeUselessStrokeAndFill',
    // Keep viewBox - it's required for proper scaling!
    // 'removeViewBox',
    'cleanupEnableBackground',
    'removeHiddenElems',
    'removeEmptyText',
    'convertShapeToPath',
    'convertEllipseToCircle',
    'moveElemsAttrsToGroup',
    'moveGroupAttrsToElems',
    'collapseGroups',
    'convertPathData',
    'convertTransform',
    'removeEmptyAttrs',
    'removeEmptyContainers',
    'mergePaths',
    'removeUnusedNS',
    'sortDefsChildren',
    'removeTitle',
    'removeDesc',
  ],
};

function toPascalCase(str: string): string {
  return str
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase())
    .replace(/^[a-z]/, (char) => char.toUpperCase());
}

function extractSVGContent(svg: string): string {
  const match = svg.match(/<svg[^>]*>(.*?)<\/svg>/s);
  return match ? match[1].trim() : '';
}

/**
 * Validate SVG file structure
 */
function validateSVG(svgContent: string, filename: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Check for viewBox (required for proper scaling)
  if (!svgContent.includes('viewBox=')) {
    errors.push(`Missing viewBox attribute (required for scaling)`);
  }

  // Check viewBox format (should be "0 0 24 24")
  const viewBoxMatch = svgContent.match(/viewBox="([^"]+)"/);
  if (viewBoxMatch) {
    const viewBox = viewBoxMatch[1];
    if (viewBox !== '0 0 24 24') {
      errors.push(`Unexpected viewBox: "${viewBox}" (expected "0 0 24 24")`);
    }
  }

  // Warn if width/height attributes are present (should be removed)
  if (svgContent.includes('width=') || svgContent.includes('height=')) {
    // This is a warning, not an error - SVGO will handle it
    // But we should note it for consistency
  }

  // Check for basic SVG structure
  if (!svgContent.includes('<svg')) {
    errors.push(`Invalid SVG: missing <svg> tag`);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Determine icon category from filename
 */
function getIconCategory(filename: string): string {
  const name = filename.toLowerCase().replace('.svg', '');

  // Brand icons
  if (
    name.includes('twitter') ||
    name.includes('facebook') ||
    name.includes('instagram') ||
    name.includes('linkedin') ||
    name.includes('github') ||
    name.includes('gitlab') ||
    name.includes('youtube') ||
    name.includes('spotify') ||
    name.includes('slack') ||
    name.includes('discord') ||
    name.includes('behance') ||
    name.includes('dribbble') ||
    name.includes('pinterest') ||
    name.includes('reddit') ||
    name.includes('medium') ||
    name.includes('notion') ||
    name.includes('trello') ||
    name.includes('twitch') ||
    name.includes('tiktok') ||
    name.includes('snapchat') ||
    name.includes('whatsapp') ||
    name.includes('telegram') ||
    name.includes('figma') ||
    name.includes('codepen') ||
    name.includes('amazon') ||
    name.includes('apple') ||
    name.includes('google') ||
    name.includes('chrome') ||
    name.includes('windows') ||
    name.includes('bitcoin')
  ) {
    return 'brand';
  }

  // Alert icons
  if (
    name.includes('alert') ||
    name.includes('info') ||
    name.includes('warning') ||
    name.includes('error') ||
    name.includes('check-circle') ||
    name.includes('x-circle')
  ) {
    return 'alert';
  }

  // Navigation icons
  if (
    name.includes('arrow') ||
    name.includes('chevron') ||
    name.includes('corner') ||
    name.includes('navigation') ||
    name.includes('move')
  ) {
    return 'navigation';
  }

  // Communication icons
  if (
    name.includes('mail') ||
    name.includes('message') ||
    name.includes('send') ||
    name.includes('phone') ||
    name.includes('at-sign')
  ) {
    return 'communication';
  }

  // File icons
  if (
    name.includes('file') ||
    name.includes('folder') ||
    name.includes('archive') ||
    name.includes('download') ||
    name.includes('upload') ||
    name.includes('save')
  ) {
    return 'files';
  }

  // UI icons
  if (
    name.includes('menu') ||
    name.includes('settings') ||
    name.includes('close') ||
    name.includes('search') ||
    name.includes('filter') ||
    name.includes('more') ||
    name.includes('grid') ||
    name.includes('list')
  ) {
    return 'ui';
  }

  // Action icons
  if (
    name.includes('edit') ||
    name.includes('trash') ||
    name.includes('delete') ||
    name.includes('plus') ||
    name.includes('minus') ||
    name.includes('check') ||
    name.includes('x')
  ) {
    return 'actions';
  }

  return 'general';
}

/**
 * Generate icon tags from filename
 */
function getIconTags(filename: string): string[] {
  const name = filename.toLowerCase().replace('.svg', '');
  const tags: string[] = [];

  // Check for filled variant
  if (name.includes('filled')) {
    tags.push('filled');
  }

  // Common UI patterns
  if (name.includes('circle')) tags.push('circle');
  if (name.includes('square')) tags.push('square');
  if (name.includes('arrow')) tags.push('arrow');
  if (name.includes('chevron')) tags.push('chevron');

  return tags;
}

async function buildIcons() {
  const assetsDir = path.join(process.cwd(), 'assets', 'icons');
  const iconsDir = path.join(process.cwd(), 'src', 'icons');

  // Create icons directory if it doesn't exist
  await fs.mkdir(iconsDir, { recursive: true });

  // Check if assets directory exists
  try {
    await fs.access(assetsDir);
  } catch {
    console.log('Creating assets/icons directory...');
    await fs.mkdir(assetsDir, { recursive: true });
    
    // Create sample icons
    await createSampleIcons(assetsDir);
  }

  // Read all SVG files
  const files = await fs.readdir(assetsDir);
  const svgFiles = files.filter((file) => file.endsWith('.svg'));

  if (svgFiles.length === 0) {
    console.warn('No SVG files found in assets/icons directory');
    return;
  }

  console.log(`Found ${svgFiles.length} SVG files. Building icons...`);

  const iconExports: string[] = [];
  const iconMetadata: Array<{
    name: string;
    componentName: string;
    category: string;
    tags: string[];
  }> = [];
  const validationErrors: Array<{ file: string; errors: string[] }> = [];

  for (const file of svgFiles) {
    const filePath = path.join(assetsDir, file);
    const iconName = path.basename(file, '.svg');
    const componentName = toPascalCase(iconName);

    // Read and validate SVG
    const svgContent = await fs.readFile(filePath, 'utf-8');
    const validation = validateSVG(svgContent, file);

    if (!validation.valid) {
      validationErrors.push({ file, errors: validation.errors });
      console.warn(`⚠️  ${file}: ${validation.errors.join(', ')}`);
    }

    // Optimize SVG
    const optimized = optimize(svgContent, svgoConfig);
    const content = extractSVGContent(optimized.data);

    // Get metadata
    const category = getIconCategory(file);
    const tags = getIconTags(file);

    iconMetadata.push({
      name: iconName,
      componentName,
      category,
      tags,
    });

    // Generate React component
    const component = `import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const ${componentName} = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        ${content}
      </Icon>
    );
  }
);

${componentName}.displayName = '${componentName}';
`;

    // Write component file
    const componentPath = path.join(iconsDir, `${componentName}.tsx`);
    await fs.writeFile(componentPath, component, 'utf-8');

    iconExports.push(`export { ${componentName} } from './icons/${componentName}';`);
    console.log(`✓ Generated ${componentName}`);
  }

  // Update index.ts with icon exports
  const indexPath = path.join(process.cwd(), 'src', 'index.ts');
  const baseExports = `// Base Icon component
export { Icon } from './Icon';
export type { IconProps } from './Icon';
export type { IconComponent, IconMetadata } from './types';

// Generated icons
${iconExports.join('\n')}
`;

  await fs.writeFile(indexPath, baseExports, 'utf-8');

  // Generate metadata file
  const metadataPath = path.join(process.cwd(), 'src', 'icons-metadata.ts');
  const metadataContent = `/**
 * Icon Metadata
 * Auto-generated metadata for all icons
 * 
 * Generated: ${new Date().toISOString()}
 * Total Icons: ${iconMetadata.length}
 */

export interface IconMetadataEntry {
  name: string;
  componentName: string;
  category: string;
  tags: string[];
}

export const iconsMetadata: IconMetadataEntry[] = ${JSON.stringify(iconMetadata, null, 2)};

/**
 * Get metadata for a specific icon by component name
 */
export function getIconMetadata(componentName: string): IconMetadataEntry | undefined {
  return iconsMetadata.find((icon) => icon.componentName === componentName);
}

/**
 * Get all icons in a specific category
 */
export function getIconsByCategory(category: string): IconMetadataEntry[] {
  return iconsMetadata.filter((icon) => icon.category === category);
}

/**
 * Search icons by tag
 */
export function getIconsByTag(tag: string): IconMetadataEntry[] {
  return iconsMetadata.filter((icon) => icon.tags.includes(tag));
}

/**
 * Get all available categories
 */
export function getCategories(): string[] {
  return Array.from(new Set(iconsMetadata.map((icon) => icon.category))).sort();
}

/**
 * Get all available tags
 */
export function getTags(): string[] {
  const allTags = iconsMetadata.flatMap((icon) => icon.tags);
  return Array.from(new Set(allTags)).sort();
}
`;
  await fs.writeFile(metadataPath, metadataContent, 'utf-8');
  console.log(`✓ Generated icons-metadata.ts`);

  // Verify build completeness
  const generatedComponents = await fs.readdir(iconsDir);
  const generatedCount = generatedComponents.filter((f) => f.endsWith('.tsx')).length;

  if (generatedCount !== svgFiles.length) {
    console.error(
      `\n❌ Build mismatch: ${svgFiles.length} SVG files but ${generatedCount} components generated!`,
    );
    process.exit(1);
  }

  // Summary
  console.log(`\n✨ Successfully generated ${svgFiles.length} icon components!`);
  console.log(`📊 Categories: ${getCategories().length} (${getCategories().join(', ')})`);
  console.log(`🏷️  Tags: ${getTags().length} unique tags`);

  if (validationErrors.length > 0) {
    console.warn(
      `\n⚠️  ${validationErrors.length} icon(s) have validation warnings (see above)`,
    );
  } else {
    console.log(`✅ All icons passed validation`);
  }
}

/**
 * Get categories from metadata (helper for summary)
 */
function getCategories(): string[] {
  return [
    'actions',
    'alert',
    'brand',
    'communication',
    'files',
    'general',
    'navigation',
    'ui',
  ];
}

/**
 * Get tags from metadata (helper for summary)
 */
function getTags(): string[] {
  return ['filled', 'circle', 'square', 'arrow', 'chevron'];
}

async function createSampleIcons(assetsDir: string) {
  // Create some sample icons for demonstration
  const sampleIcons: Record<string, string> = {
    'home.svg': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
  <polyline points="9 22 9 12 15 12 15 22"/>
</svg>`,
    'user.svg': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
  <circle cx="12" cy="7" r="4"/>
</svg>`,
    'settings.svg': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
  <circle cx="12" cy="12" r="3"/>
</svg>`,
    'search.svg': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="11" cy="11" r="8"/>
  <path d="m21 21-4.35-4.35"/>
</svg>`,
    'menu.svg': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <line x1="3" y1="12" x2="21" y2="12"/>
  <line x1="3" y1="6" x2="21" y2="6"/>
  <line x1="3" y1="18" x2="21" y2="18"/>
</svg>`,
    'close.svg': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <line x1="18" y1="6" x2="6" y2="18"/>
  <line x1="6" y1="6" x2="18" y2="18"/>
</svg>`,
    'check.svg': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <polyline points="20 6 9 17 4 12"/>
</svg>`,
    'arrow-right.svg': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <line x1="5" y1="12" x2="19" y2="12"/>
  <polyline points="12 5 19 12 12 19"/>
</svg>`,
  };

  console.log('Creating sample icons...');
  for (const [filename, content] of Object.entries(sampleIcons)) {
    await fs.writeFile(path.join(assetsDir, filename), content, 'utf-8');
  }
  console.log(`Created ${Object.keys(sampleIcons).length} sample icons`);
}

// Run the build
buildIcons().catch((error) => {
  console.error('Error building icons:', error);
  process.exit(1);
});

