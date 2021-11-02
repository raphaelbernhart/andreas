export const stopInterval = (interval: any) => {
    clearInterval(interval);
    setTimeout(() => {}, 100);
};

export const numberIs50 = (req: number): boolean => {
    const quotient = req / 50;

    if (Number.isInteger(quotient)) {
        return true;
    }
    return false;
};