import koffi from "koffi";
import { SL_REFERENCE_FRAME } from "./global";

export const SL_RuntimeParametersStruct = koffi.struct("SL_RuntimeParameters", {
    reference_frame: "int",
    enable_depth: "bool",
    enable_fill_mode: "bool",
    confidence_threshold: "int",
    texture_confidence_threshold: "int",
    remove_saturated_areas: "bool",
});

export class SL_RuntimeParameters {
    reference_frame: SL_REFERENCE_FRAME = SL_REFERENCE_FRAME.SL_REFERENCE_FRAME_CAMERA;
    enable_depth: boolean = true;
    enable_fill_mode: boolean = false;
    confidence_threshold: number = 95;
    texture_confidence_threshold: number = 100;
    remove_saturated_areas: boolean = true;

    static fromStruct(value: {
        reference_frame: SL_REFERENCE_FRAME;
        enable_depth: boolean;
        enable_fill_mode: boolean;
        confidence_threshold: number;
        texture_confidence_threshold: number;
        remove_saturated_areas: boolean;
    }): SL_RuntimeParameters {
        const params = new SL_RuntimeParameters();
        params.reference_frame = value.reference_frame;
        params.enable_depth = value.enable_depth;
        params.enable_fill_mode = value.enable_fill_mode;
        params.confidence_threshold = value.confidence_threshold;
        params.texture_confidence_threshold = value.texture_confidence_threshold;
        params.remove_saturated_areas = value.remove_saturated_areas;
        return params;
    }

    toStruct(): object {
        return {
            reference_frame: this.reference_frame,
            enable_depth: this.enable_depth,
            enable_fill_mode: this.enable_fill_mode,
            confidence_threshold: this.confidence_threshold,
            texture_confidence_threshold: this.texture_confidence_threshold,
            remove_saturated_areas: this.remove_saturated_areas,
        };
    }
}
