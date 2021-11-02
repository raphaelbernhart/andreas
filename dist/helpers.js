"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numberIs50 = exports.stopInterval = void 0;
const stopInterval = (interval) => {
    clearInterval(interval);
    setTimeout(() => { }, 100);
};
exports.stopInterval = stopInterval;
const numberIs50 = (req) => {
    const quotient = req / 50;
    if (Number.isInteger(quotient)) {
        return true;
    }
    return false;
};
exports.numberIs50 = numberIs50;
