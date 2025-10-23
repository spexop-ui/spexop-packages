/**
 * Combines class names, filtering out falsy values
 * @internal
 */
export function cn(
  ...classes: (string | boolean | undefined | null | Record<string, boolean>)[]
): string {
  return classes
    .map((cls) => {
      if (typeof cls === "string") return cls;
      if (typeof cls === "object" && cls !== null) {
        return Object.keys(cls)
          .filter((key) => cls[key])
          .join(" ");
      }
      return "";
    })
    .filter(Boolean)
    .join(" ");
}
