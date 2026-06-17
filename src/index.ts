import { sl_is_opened } from "./bindings";

function main() {
    const result = sl_is_opened(0);
    console.log(result);
}

main();
