/**
 * Парсит параметр size из URL и возвращает число или null, если значение невалидно.
 * @param sizeParam - Параметр size из URL (строка или null).
 * @returns Число или null, если значение невалидно.
 */
export function parseSizeParam(sizeParam: string | null): number | null {
  if (sizeParam === null) {
    return null
  }

  const parsedSize = parseInt(sizeParam)
  return !isNaN(parsedSize) ? parsedSize : null
}
