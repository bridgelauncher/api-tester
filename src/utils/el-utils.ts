export function px(size: number | null | undefined)
{
    return typeof size === 'number' ? `${size}px` : undefined;
}