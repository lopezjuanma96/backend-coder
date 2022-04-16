"use strict";
//installing: npm instal typecript
//command for cli transpiling: 
//      node_modules/.bin/tsc ./index.ts -w
//      (-w creates an auto update on the transpiling, when the origin script changes, is not necessary)
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
//for some reason, if you want to add that command to package json as a script, it automatically detects it has to go to 
//node_modules/.bin, so only add the tsc part, fo example: "scripts": {.., "build":"tsc",..}
//I dont know if this happens on every windows computer or if its VSC :/
//How does typing work? 
//in de definitions of functions params param_name: param_type and after them the return_type. Ex:
/*      function suma(a:number, b:number, msg:String):String{
            return msg + (a + b);
        }
*/
//in definition of variables as jsType varName: tsType = definition. Ex:
//      var message:String = "Hola mundo"
//Setup compiler with node_modules/bin/tsc --init => this creates a tsconfig.json file
//many configs there, some of the most important are:
//  module: commonJS/module/.. this is the type of module managing
//  target: "es2016/2015" version of JS for transpiling
//  rootDir: "path" where the baseScripts are gonna be saved into (commonly ./ or ./src)
//  outDir: "path" where the JS transpiled scripts are gonna be saved (commonly ./dist)
// with the output and root dir defined, it's not necessary to declare them in the transpiling command
// so it can be turned to:
//      node_modules/.bin/tsc
//Imports (with the modules config)
//import {sumNum} from "./lib/ops.ts"
//import {sumNum: sumImport} form ".lib/ops.ts"
const ops = __importStar(require("./lib/ops")); //this imports all functions inside an object named ops
class ColorGen {
    get(msg, amt) {
        let colors = [];
        for (var i = 0; i < amt; i++) {
            colors.push(`${msg} RGB(${ops.getColorValue()}, ${ops.getColorValue()}, ${ops.getColorValue()})`);
        }
        return colors;
    }
}
const ColorEx = new ColorGen();
console.log(ColorEx.get('El color es:', 4));
//try this, raises error: console.log(ColorEx.get(7, 4));
