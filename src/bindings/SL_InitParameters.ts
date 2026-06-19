import koffi from "koffi";
import { SL_INPUT_TYPE, SL_RESOLUTION, SL_FLIP_MODE, SL_DEPTH_MODE, SL_UNIT, SL_COORDINATE_SYSTEM } from "./global";
import { SL_Resolution, SL_ResolutionStruct } from "./SL_Resolution";
import { Parameters } from "./Parameters";

export const SL_InitParametersStruct = koffi.struct("SL_InitParameters", {
    input_type: "int",
    resolution: "int",
    camera_fps: "int",
    camera_device_id: "int",
    camera_image_flip: "int",
    camera_disable_self_calib: "bool",
    enable_right_side_measure: "bool",
    svo_real_time_mode: "bool",
    depth_mode: "int",
    depth_stabilization: "int",
    depth_minimum_distance: "float",
    depth_maximum_distance: "float",
    coordinate_unit: "int",
    coordinate_system: "int",
    sdk_gpu_id: "int",
    sdk_verbose: "int",
    sensors_required: "bool",
    enable_image_enhancement: "bool",
    open_timeout_sec: "float",
    async_grab_camera_recovery: "bool",
    grab_compute_capping_fps: "float",
    enable_image_validity_check: "bool",
    maximum_working_resolution: SL_ResolutionStruct,
});

export class SL_InitParameters extends Parameters {
    input_type: SL_INPUT_TYPE = SL_INPUT_TYPE.SL_INPUT_TYPE_USB;
    resolution: SL_RESOLUTION = SL_RESOLUTION.SL_RESOLUTION_HD720;
    camera_fps: number = 0;
    camera_device_id: number = 0;
    camera_image_flip: SL_FLIP_MODE = SL_FLIP_MODE.SL_FLIP_MODE_OFF;
    camera_disable_self_calib: boolean = false;
    enable_right_side_measure: boolean = false;
    svo_real_time_mode: boolean = false;
    depth_mode: SL_DEPTH_MODE = SL_DEPTH_MODE.SL_DEPTH_MODE_NEURAL;
    depth_stabilization: number = 30;
    depth_minimum_distance: number = -1;
    depth_maximum_distance: number = -1;
    coordinate_unit: SL_UNIT = SL_UNIT.SL_UNIT_MILLIMETER;
    coordinate_system: SL_COORDINATE_SYSTEM = SL_COORDINATE_SYSTEM.SL_COORDINATE_SYSTEM_IMAGE;
    sdk_gpu_id: number = -1;
    sdk_verbose: number = 1;
    sensors_required: boolean = false;
    enable_image_enhancement: boolean = true;
    open_timeout_sec: number = 5.0;
    async_grab_camera_recovery: boolean = false;
    grab_compute_capping_fps: number = 0;
    enable_image_validity_check: boolean = false;
    maximum_working_resolution: SL_Resolution = new SL_Resolution(0, 0);
}
