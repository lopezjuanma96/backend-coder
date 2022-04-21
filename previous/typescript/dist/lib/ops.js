"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getColorValue = exports.sumNum = void 0;
const sumNum = (num1, num2) => num1 + num2;
exports.sumNum = sumNum;
const getColorValue = () => Math.floor(Math.random() * 256);
exports.getColorValue = getColorValue;
