export function options<T>(...params: [label: string, value: T][]): [label: string, value: T][]
{
    return params;
}