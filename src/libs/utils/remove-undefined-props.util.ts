/**
 * Remove undefined properties from an object
 */
export function removeUndefinedProps(item: Record<string, unknown>): any {
  // TODO: make recursive for nested objects
  const filtered: Record<string, unknown> = {};
  for (const key of Object.keys(item)) {
    if (item[key]) filtered[key] = item[key];
  }
  return filtered;
}
