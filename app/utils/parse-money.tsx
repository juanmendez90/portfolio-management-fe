export function parseMoney(value?: number | string) {
    const parsedValue = parseFloat(value as string);
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(isNaN(parsedValue) ? 0 : parsedValue);
}
