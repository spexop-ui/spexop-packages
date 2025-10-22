# Component Structure Reorganization Plan

## Overview

Restructure `packages/react/src/basic/` to fix 8 critical organizational issues identified in the audit, reducing component count from 88+ to ~75 while improving discoverability and aligning with "Primitives before patterns" principle.

## Critical Issues to Address

1. Confusing "advanced" category with semantically unrelated components
2. 11 specialized card components that should be composition examples
3. Animation hooks mixed with components (should be in hooks/)
4. IconButton misplaced in display/ instead of buttons/
5. Navigation component in advanced/ instead of navigation/
6. ContextNav in layout/ despite being a "Navigation Primitive"
7. Settings category with only 3 components
8. Inconsistent categorization principles across folders

## Sync Considerations

### Automatic Sync Behavior

- ✅ **File moves and renames** - Git will track these as renames
- ✅ **Content changes** - All README updates, code changes, etc.
- ✅ **New files** - The patterns/ directory and examples
- ✅ **Deleted files** - When you remove specialized cards in Phase 3

### Potential Sync Issues

- ⚠️ **Import path changes** - May break spexop-design-system if it has hardcoded paths
- ⚠️ **Build configuration** - May reference specific component paths
- ⚠️ **Documentation references** - May reference old structure

### Sync-Safe Strategy

- Implement backwards-compatible re-exports first
- Add deprecation warnings before breaking changes
- Coordinate releases between repositories
- Test sync mechanism with small changes first

## Implementation Phases

### Phase 0: Pre-Sync Analysis and Preparation

**Sync Impact Assessment**:

- ✅ **Automatic Sync**: File moves, renames, and content changes will sync automatically
- ⚠️ **Potential Issues**: Import path changes may break spexop-design-system
- 🔍 **Required Checks**: Scan for hardcoded import paths in spexop-design-system

**Pre-Sync Actions**:

1. **Scan spexop-design-system for problematic imports**:

   ```bash
   # Check for imports that will break
   grep -r "from '@spexop/react/advanced'" spexop-design-system/
   grep -r "from '@spexop/react/display'" spexop-design-system/
   grep -r "BlogCard\|ProductCard\|PricingCard" spexop-design-system/
   ```

2. **Create sync-safe migration strategy**:
   - Implement backwards-compatible re-exports first
   - Add deprecation warnings before breaking changes
   - Coordinate releases between repositories

3. **Verify sync mechanism**:
   - Make small change to verify sync works
   - Ensure both repositories stay in sync

4. **Document sync dependencies**:
   - List all files that will change in spexop-design-system
   - Create rollback plan if sync causes issues

### Phase 1: Create Documentation and Examples (Non-Breaking)

**Files to Create**:

- `src/patterns/README.md` - Explain patterns vs components
- `src/patterns/cards/README.md` - Card composition examples
- `src/patterns/cards/*.example.tsx` - 11 specialized card examples
- `docs-dev/component-structure-audit.md` ✓ Already created
- `docs/migrations/from-v0.3-to-v0.4.md` - Migration guide

**Actions**:

1. Create patterns/ directory structure
2. Convert specialized cards to documented examples
3. Add deprecation warnings to specialized card components
4. Update USAGE-GUIDE.md files to point to new patterns
5. **Sync Check**: Verify changes sync to spexop-design-system correctly

**Sync Impact**: Low - Only adds new files, no breaking changes

### Phase 2: File Reorganization (Backwards Compatible)

**Component Moves**:

From `advanced/`:

- Carousel → display/Carousel
- CodeBlock → display/CodeBlock
- ErrorBoundary → utils/ErrorBoundary (new category)
- Navigation → navigation/Navigation
- ScrollHeader → layout/ScrollHeader
- SegmentedControl → buttons/SegmentedControl
- SubmenuPanel → navigation/SubmenuPanel
- ThemeToggle → display/ThemeToggle

Other moves:

- display/IconButton → buttons/IconButton
- layout/ContextNav → navigation/ContextNav
- settings/SettingItem → forms/SettingItem
- settings/SettingsPanel → layout/SettingsPanel
- display/Accordion → layout/Accordion
- display/EmptyState → feedback/EmptyState
- display/Skeleton → feedback/Skeleton

Hook consolidation:

- animations/useIntersectionObserver.ts → hooks/useIntersectionObserver.ts
- animations/useMotionValue.ts → hooks/useMotionValue.ts
- animations/useSpring.ts → hooks/useSpring.ts

**Actions**:

1. Move component folders to new locations
2. Update internal imports within moved components
3. **Keep old locations with re-exports (backwards compatible)**:

   ```typescript
   // In old locations, add re-exports
   export { Navigation } from '../navigation/Navigation';
   export { IconButton } from '../buttons/IconButton';
   ```

4. Update category index.ts files
5. Update src/basic/index.ts
6. **Sync Verification**: Test that spexop-design-system still works

**Sync Impact**: Medium - File moves will sync, but old re-exports maintain compatibility

### Phase 3: Cleanup and Final Structure

**Removals**:

- Delete `advanced/` folder (all components moved)
- Delete `settings/` folder (components redistributed)
- Remove specialized card components (BlogCard, ProductCard, etc.)
- Remove old re-export shims

**Renames**:

- `display/` → `indicators/` (clearer purpose)

**Final Category Structure**:

```bash
basic/
├── primitives/      (5 components)
├── buttons/         (7 components)
├── forms/           (15 components)
├── cards/           (1 base component)
├── navigation/      (12 components)
├── layout/          (7 components)
├── overlays/        (8 components)
├── indicators/      (6 components)
├── feedback/        (7 components)
├── data/            (2 components)
├── typography/      (2 components)
├── animations/      (8 components)
└── utils/           (1 component)
```

**Actions**:

1. Delete empty folders
2. Remove deprecated components
3. Update all documentation
4. Update package.json exports if needed
5. Verify TypeScript compilation and build
6. **Sync Coordination**: Ensure spexop-design-system is updated before breaking changes

**Sync Impact**: High - Breaking changes, requires coordinated release

## Sync-Specific Actions

### Before Each Phase

1. **Backup Current State**:

   ```bash
   # Create backup branch
   git checkout -b backup-before-reorganization
   git push origin backup-before-reorganization
   ```

2. **Test Sync Mechanism**:

   ```bash
   # Make small test change
   echo "<!-- Test sync -->" >> packages/react/README.md
   git add . && git commit -m "test: verify sync mechanism"
   git push
   # Verify change appears in spexop-design-system
   ```

3. **Check spexop-design-system Status**:
   - Ensure spexop-design-system is up to date
   - Verify no uncommitted changes
   - Check if any manual intervention needed

### During Each Phase

1. **Monitor Sync Status**:
   - Watch for sync completion
   - Check for any sync errors
   - Verify file changes appear correctly

2. **Verify spexop-design-system**:
   - Check build in spexop-design-system
   - Check for broken imports
   - Verify documentation updates

3. **Handle Sync Issues**:
   - If sync fails, investigate and fix
   - If spexop-design-system breaks, use rollback plan
   - Document any manual fixes needed

### After Each Phase

1. **Verify Sync Completeness**:
   - Compare file structure between repositories
   - Check that all changes synced correctly
   - Verify no missing files

2. **Update spexop-design-system if Needed**:
   - Fix any broken imports
   - Update any hardcoded references
   - Test all functionality

3. **Document Sync Results**:
   - Note any issues encountered
   - Document manual fixes applied
   - Update sync procedures if needed

## Key Files to Update

### Index/Export Files

- `src/basic/index.ts` - Update all category exports
- `src/basic/buttons/index.ts` - Add IconButton, SegmentedControl
- `src/basic/navigation/index.ts` - Add Navigation, ContextNav, SubmenuPanel
- `src/basic/layout/index.ts` - Add ScrollHeader, SettingsPanel, Accordion
- `src/basic/feedback/index.ts` - Add EmptyState, Skeleton
- `src/basic/indicators/index.ts` - New file (renamed from display)
- `src/basic/utils/index.ts` - New file for ErrorBoundary
- `src/basic/cards/index.ts` - Remove specialized cards
- `src/hooks/index.ts` - Add animation hooks
- `src/index.ts` - Main package export (verify all exports work)

### Documentation Files

- All moved component README.md files (update paths)
- Category USAGE-GUIDE.md files
- Main package README.md
- Migration guide

### Sync-Specific Files

- `.github/workflows/sync.yml` - Update if needed
- `package.json` - Verify sync configuration
- Any sync-related documentation

## Migration Strategy for Users

### Deprecation Warnings (Phase 1)

```typescript
// In specialized card components
console.warn(
  '@spexop/react: BlogCard is deprecated and will be removed in v0.4.0. ' +
  'Use Card composition instead. See: https://spexop.dev/patterns/cards'
);
```

### Import Path Compatibility (Phase 2)

```typescript
// Old path still works via re-export
export { Navigation } from '../navigation/Navigation';
```

### Codemods (Phase 3)

Provide transformation scripts for:

- Specialized card → Card composition
- Import path updates
- Hook import updates

## Build Verification Requirements

1. TypeScript compilation - Ensure no type errors
2. Build verification - Ensure bundle builds successfully
3. Import verification - Manual check that imports work
4. Bundle size analysis - Compare before/after
5. **Sync verification** - Verify spexop-design-system builds and works
6. **Cross-repository verification** - Manual check of imports between repositories

## Success Criteria

- [ ] All components have single, semantic category
- [ ] No "advanced" folder
- [ ] All hooks in hooks/ directory
- [ ] Card is only exported card component
- [ ] Navigation components all in navigation/
- [ ] Clear category documentation
- [ ] TypeScript compilation successful
- [ ] Bundle size reduced by 10-15%
- [ ] Migration guide complete
- [ ] **Sync working correctly** - spexop-design-system stays in sync
- [ ] **No breaking changes in spexop-design-system** - All imports work

## Risks and Mitigations

**Risk**: Breaking existing user code

**Mitigation**: 3-phase rollout, deprecation period, codemods, comprehensive docs

**Risk**: Pattern examples insufficient

**Mitigation**: Rich examples with explanations, keep in templates/ for builder

**Risk**: Disagreement on categorization

**Mitigation**: Document clear rules, get design team approval

**Risk**: Sync failures or spexop-design-system breaking

**Mitigation**:

- Test sync mechanism first
- Implement backwards-compatible changes
- Have rollback plan ready
- Monitor sync status closely
- Coordinate releases between repositories

**Risk**: Import path changes breaking spexop-design-system

**Mitigation**:

- Scan for hardcoded paths before changes
- Use re-exports to maintain compatibility
- Update spexop-design-system before removing re-exports
- Provide migration scripts

## Timeline

- Phase 0: 2-3 days (pre-sync analysis and preparation)
- Phase 1: 1-2 weeks (documentation and examples)
- Phase 2: 1 week (file reorganization)  
- Phase 3: 1 week (cleanup and breaking changes)

**Total**: 3-4 weeks

## Sync-Specific Timeline

### Week 1: Preparation

- [ ] Complete pre-sync analysis
- [ ] Test sync mechanism
- [ ] Create patterns/ directory
- [ ] Add deprecation warnings

### Week 2: Reorganization

- [ ] Move components with re-exports
- [ ] Update spexop-design-system if needed
- [ ] Verify sync working correctly
- [ ] Test both repositories

### Week 3: Cleanup

- [ ] Remove deprecated components
- [ ] Update spexop-design-system before breaking changes
- [ ] Final sync verification
- [ ] Release coordination

### To-dos

- [ ] Complete component structure audit and document findings
- [ ] **Scan spexop-design-system for problematic imports**
- [ ] **Test sync mechanism with small changes**
- [ ] Create patterns/ directory with README and card composition examples
- [ ] Add deprecation warnings to specialized card components and misplaced components
- [ ] Create migration guide from v0.3 to v0.4 with import path changes
- [ ] Move components from advanced/, settings/, and misplaced locations to proper categories
- [ ] **Add backwards-compatible re-exports for moved components**
- [ ] Move animation hooks from animations/ to hooks/ directory
- [ ] Update all index.ts files to export components from new locations
- [ ] **Verify sync working correctly after each phase**
- [ ] Update README files, import examples, and category descriptions
- [ ] **Verify spexop-design-system builds and works correctly**
- [ ] Verify TypeScript compilation and build works correctly
- [ ] **Coordinate with spexop-design-system team for breaking changes**
- [ ] Remove empty folders and deprecated exports (breaking changes for v0.4.0)
- [ ] **Final sync verification and documentation update**
