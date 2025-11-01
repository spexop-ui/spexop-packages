/**
 * Card Components
 *
 * Flexible card system with composition patterns.
 * The Card component and its sub-components (CardHeader, CardBody, CardFooter)
 * provide maximum flexibility for creating any card pattern.
 *
 * @example
 * ```tsx
 * <Card variant="outlined">
 *   <CardHeader title="Title" subtitle="Subtitle" />
 *   <CardBody>Content here</CardBody>
 *   <CardFooter primaryAction="Action" onPrimaryAction={() => {}} />
 * </Card>
 * ```
 */

export * from "./Card/index.js";
