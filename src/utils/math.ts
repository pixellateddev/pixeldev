export const getRelativePercentage = (a: number, b: number) => {
    if (b) {
        return Math.round((((a - b) * 100) / b) * 100) / 100
    }
    return Infinity
}
