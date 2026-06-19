import koffi from "koffi";
import { SL_REFERENCE_FRAME } from "./global";
import { Parameters } from "./Parameters";

export const SL_RuntimeParametersStruct = koffi.struct("SL_RuntimeParameters", {
    reference_frame: "int",
    enable_depth: "bool",
    enable_fill_mode: "bool",
    confidence_threshold: "int",
    texture_confidence_threshold: "int",
    remove_saturated_areas: "bool",
});

export class SL_RuntimeParameters extends Parameters {
    reference_frame: SL_REFERENCE_FRAME = SL_REFERENCE_FRAME.SL_REFERENCE_FRAME_CAMERA;
    enable_depth: boolean = true;
    enable_fill_mode: boolean = false;
    confidence_threshold: number = 95;
    texture_confidence_threshold: number = 100;
    remove_saturated_areas: boolean = true;
}
