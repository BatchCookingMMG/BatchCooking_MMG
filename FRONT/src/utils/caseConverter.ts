// Convertit une clé en camelCase
export function snakeToCamel(str: string): string {
    return str.replace(/_([a-z])/g, (_, char) => char.toUpperCase());
  }
  
  // Convertit récursivement un objet ou un tableau en camelCase
  export function convertKeysToCamel<T>(input: any): T {
    if (Array.isArray(input)) {
      return input.map(item => convertKeysToCamel(item)) as T;
    } else if (input !== null && typeof input === "object") {
      return Object.entries(input).reduce((acc, [key, value]) => {
        const camelKey = snakeToCamel(key);
        acc[camelKey] = convertKeysToCamel(value);
        return acc;
      }, {} as any);
    } else {
      return input;
    }
  }