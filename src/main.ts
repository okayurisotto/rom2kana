import { Converter } from "./Converter";
import { table } from "./table";

const input = "korehatesutodesu.";

const converter = new Converter(table);

for (const char of input) {
  converter.input(char);
}

const output = converter.confirm();

console.log(JSON.stringify({ input, output }, undefined, 2));
