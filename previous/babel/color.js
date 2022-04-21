//to install babel: npm init -y && npm install @babel/code @babel/cli @babel/preset-env
// command to apply babel to a script with cli (@babel/cli must be installed):
//      babel path_to_origin_script -o path_to_output_script -w
//      (-w creates an auto update on the transpiling, when the origin script changes, is not necessary)
// we can add this code to the "scripts" list of package.json with a certain script_name and call it with npm run script_name
// babel also has an online transpiler

const getColorNumber = () => Math.floor(Math.random()*256);

class Color {
    get() {
        let color = `RGB(${getColorNumber()}, ${getColorNumber()}, ${getColorNumber()})`;
        return color;
    }
}

const color = new Color();
console.log(color.get())