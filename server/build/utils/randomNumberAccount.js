"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomNumberAccount = void 0;
function randomNumberAccount(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
exports.randomNumberAccount = randomNumberAccount;
