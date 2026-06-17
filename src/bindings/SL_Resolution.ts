import koffi from "koffi";

export const SL_ResolutionStruct = koffi.struct("SL_Resolution", {
    width: "int",
    height: "int",
});

export class SL_Resolution {
    width: number = 0;
    height: number = 0;

    constructor(width: number = 0, height: number = 0) {
        this.width = width;
        this.height = height;
    }

    toStruct(): object {
        return {
            width: this.width,
            height: this.height,
        };
    }
}
