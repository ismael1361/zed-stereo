import koffi from "koffi";
import { Parameters } from "./Parameters";

export const SL_ResolutionStruct = koffi.struct("SL_Resolution", {
    width: "int",
    height: "int",
});

export class SL_Resolution extends Parameters {
    width: number = 0;
    height: number = 0;

    constructor(width: number = 0, height: number = 0) {
        super();
        this.width = width;
        this.height = height;
    }
}
