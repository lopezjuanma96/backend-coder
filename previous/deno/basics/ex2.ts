import { parse } from "https://deno.land/std@0.126.0/datetime/mod.ts"; 
//this can raise import error for having the .ts extension, but that is wrong only for node's Typescript, 
//it's necessary for deno's Typescript, can be solved by using extensions or settings files

const myDate = parse("04-02-2022", "dd-mm-yyyy");

console.log(myDate)

/* Fisrt deno run ex2.ts:
Download https://deno.land/std@0.126.0/datetime/mod.ts
Download https://deno.land/std@0.126.0/datetime/formatter.ts
Download https://deno.land/std@0.126.0/datetime/tokenizer.ts
2022-09-04T03:02:00.000Z

Second time:
C:\Users\lopez\ForDdrive\backend-coder\previous\deno>deno run ex2.ts
2022-09-04T03:02:00.000Z

*/