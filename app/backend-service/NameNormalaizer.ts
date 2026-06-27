export function NameNormalizer(name: string) {
    return name
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase();
}