export const deduplicateByKey = <T extends object>(
  key: keyof T,
  ...args: T[]
) => {
  return Array.from(new Map(args.map((v) => [v[key], v])).values());
};
