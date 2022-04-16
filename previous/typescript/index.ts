//installing: npm instal typecript
//command for cli transpiling: 
//      node_modules/bin/tsc ./index.ts -w
//      (-w creates an auto update on the transpiling, when the origin script changes, is not necessary)

//How does typing work? in de definitions of functions params param_name: param_type. Ex:
/*      function suma(a:number, b:number, msg:String){
            return msg + (a + b);
        }
*/

const getColorValue = () => Math.floor(Math.random()*256);

class ColorGen{
    get(msg: String, amt: number){
        let colors = [];
        for(var i = 0; i<amt; i++){
            colors.push(`${msg} RGB(${getColorValue()}, ${getColorValue()}, ${getColorValue()})`);
        }
        return colors;
    }
}

const ColorEx = new ColorGen();
console.log(ColorEx.get('El color es:', 4));
//try this, raises error: console.log(ColorEx.get(7, 4));