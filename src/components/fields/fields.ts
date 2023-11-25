export interface OptionStripOption<T> 
{
    label: string;
    value: T;
}

export function opt<T>(label: string, value: T): OptionStripOption<T>
{
    return { label, value };
}