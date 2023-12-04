export function simplifyString(s: string)
{
    return s
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '');
}