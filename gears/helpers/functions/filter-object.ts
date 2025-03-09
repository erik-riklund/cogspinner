/**
 * Determines whether a property should be included in the filtered object.
 *
 * @param object The object to filter.
 * @param predicate A function that takes a key-value pair and returns a boolean indicating
 *                  whether the property should be included in the filtered object.
 * @returns A new object with only the properties that passed the predicate function.
 */
type Predicate<T> = <K extends keyof T>(key: K, value: T[K]) => boolean;

/**
 * Filters the properties of an object based on a predicate function.
 */
export function filterObject<
  T extends Record<string, any>> (object: T, predicate: Predicate<T>): T
{
  const result = Object.fromEntries(
    Object.entries(object).filter(([key, value]) => predicate(key, value))
  );

  return result as T;
}
