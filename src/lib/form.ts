export function getFormValues(formData: FormData) {
    const obj: Record<string, any> = {};
    for (const [key, value] of formData.entries()) {
        if (obj[key]) {
            // kalau sudah ada, pastikan array
            if (Array.isArray(obj[key])) {
                obj[key].push(value);
            } else {
                obj[key] = [obj[key], value];
            }
        } else {
            obj[key] = value;
        }
    }
    return obj;
}
