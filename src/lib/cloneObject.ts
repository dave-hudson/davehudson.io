export function cloneObject<T>(obj: T, seen = new Map()): T {
    // Check for null or non-object values
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    // Handle Date objects
    if (obj instanceof Date) {
        return new Date(obj.getTime()) as any;
    }

    // Handle already seen objects to avoid circular references
    if (seen.has(obj)) {
        return seen.get(obj);
    }

    // Create a new object with the same prototype as the original
    const objCopy = Array.isArray(obj)
        ? []
        : Object.create(Object.getPrototypeOf(obj));

    // Add the new object to the seen map
    seen.set(obj, objCopy);

    // Copy properties recursively
    const keys = Object.keys(obj);
    for (const key of keys) {
        (objCopy as any)[key] = cloneObject((obj as any)[key], seen);
    }

    return objCopy as T;
}
