export function groupBy<T extends Record<string, any>,  GK extends keyof T = keyof T,>(
  items: T[],
  groupKey: GK,
  exclude: (keyof T)[] = [],
  transform?: (value: T[GK]) => string 
): Record<string, Partial<T>> {

  const result: Record<string, Partial<T>> = {};

  items.forEach(item => {
    const rawValue = item[groupKey];

    // 👇 aplicar transform si existe, si no cast a string
    const keyValue = transform ? transform(rawValue) : String(rawValue);

    if (!result[keyValue]) {
      result[keyValue] = {};
    }

    Object.keys(item).forEach((k) => {
      const typedKey = k as keyof T;

      // NO agrupar por la key usada como groupKey
      if (typedKey === groupKey) return;

      // NO sumar keys excluidas por el usuario
      if (exclude.includes(typedKey)) return;

      // Solo agrupar números
      if (typeof item[typedKey] === "number") {
        const current = result[keyValue][typedKey] as number | undefined;
        const incoming = item[typedKey] as number;
        result[keyValue][typedKey] = ((current ?? 0) + incoming) as T[keyof T];
      }
    });
  });

  return result;
}

export const extractTalkingAbout = (text: string | string[]) => {
  const safeText = Array.isArray(text) ? text.join(" ") : (text || "");

  const match = safeText.match(/([\d,.]+)\s+talking about this/i);

  return match
    ? parseInt(match[1].replace(/,/g, ""))
    : 0;
};