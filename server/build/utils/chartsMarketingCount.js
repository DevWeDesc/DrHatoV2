"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chartsCount = void 0;
function chartsCount(data) {
    let total = {};
    data.forEach((element) => {
        //@ts-ignore
        const key = element.howKnowUs;
        total[key] = (total[key] || 0) + 1;
    });
    return total;
}
exports.chartsCount = chartsCount;
