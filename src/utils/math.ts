export const getRelativePercentage = (a: number, b: number) => {
    return {
        percentage: (Math.abs(a - b) * 100) / (b || 1),
        direction: a > b ? 'increase' : 'decrese',
    }
}
