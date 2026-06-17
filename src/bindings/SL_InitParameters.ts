import koffi from "koffi";
import { SL_INPUT_TYPE, SL_RESOLUTION, SL_FLIP_MODE, SL_DEPTH_MODE, SL_UNIT, SL_COORDINATE_SYSTEM } from "./global";
import { SL_Resolution, SL_ResolutionStruct } from "./SL_Resolution";

type SL_InitParametersStructValue = {
    input_type: SL_INPUT_TYPE;
    resolution: SL_RESOLUTION;
    camera_fps: number;
    camera_device_id: number;
    camera_image_flip: SL_FLIP_MODE;
    camera_disable_self_calib: boolean;
    enable_right_side_measure: boolean;
    svo_real_time_mode: boolean;
    depth_mode: SL_DEPTH_MODE;
    depth_stabilization: number;
    depth_minimum_distance: number;
    depth_maximum_distance: number;
    coordinate_unit: SL_UNIT;
    coordinate_system: SL_COORDINATE_SYSTEM;
    sdk_gpu_id: number;
    sdk_verbose: number;
    sensors_required: boolean;
    enable_image_enhancement: boolean;
    open_timeout_sec: number;
    async_grab_camera_recovery: boolean;
    grab_compute_capping_fps: number;
    enable_image_validity_check: boolean;
    maximum_working_resolution: {
        width: number;
        height: number;
    };
};

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

export class SL_InitParameters {
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

    static fromStruct(value: SL_InitParametersStructValue): SL_InitParameters {
        const initParameters = new SL_InitParameters();

        initParameters.input_type = value.input_type;
        initParameters.resolution = value.resolution;
        initParameters.camera_fps = value.camera_fps;
        initParameters.camera_device_id = value.camera_device_id;
        initParameters.camera_image_flip = value.camera_image_flip;
        initParameters.camera_disable_self_calib = value.camera_disable_self_calib;
        initParameters.enable_right_side_measure = value.enable_right_side_measure;
        initParameters.svo_real_time_mode = value.svo_real_time_mode;
        initParameters.depth_mode = value.depth_mode;
        initParameters.depth_stabilization = value.depth_stabilization;
        initParameters.depth_minimum_distance = value.depth_minimum_distance;
        initParameters.depth_maximum_distance = value.depth_maximum_distance;
        initParameters.coordinate_unit = value.coordinate_unit;
        initParameters.coordinate_system = value.coordinate_system;
        initParameters.sdk_gpu_id = value.sdk_gpu_id;
        initParameters.sdk_verbose = value.sdk_verbose;
        initParameters.sensors_required = value.sensors_required;
        initParameters.enable_image_enhancement = value.enable_image_enhancement;
        initParameters.open_timeout_sec = value.open_timeout_sec;
        initParameters.async_grab_camera_recovery = value.async_grab_camera_recovery;
        initParameters.grab_compute_capping_fps = value.grab_compute_capping_fps;
        initParameters.enable_image_validity_check = value.enable_image_validity_check;
        initParameters.maximum_working_resolution = SL_Resolution.fromStruct(value.maximum_working_resolution);

        return initParameters;
    }

    toStruct(): object {
        return {
            input_type: this.input_type,
            resolution: this.resolution,
            camera_fps: this.camera_fps,
            camera_device_id: this.camera_device_id,
            camera_image_flip: this.camera_image_flip,
            camera_disable_self_calib: this.camera_disable_self_calib,
            enable_right_side_measure: this.enable_right_side_measure,
            svo_real_time_mode: this.svo_real_time_mode,
            depth_mode: this.depth_mode,
            depth_stabilization: this.depth_stabilization,
            depth_minimum_distance: this.depth_minimum_distance,
            depth_maximum_distance: this.depth_maximum_distance,
            coordinate_unit: this.coordinate_unit,
            coordinate_system: this.coordinate_system,
            sdk_gpu_id: this.sdk_gpu_id,
            sdk_verbose: this.sdk_verbose,
            sensors_required: this.sensors_required,
            enable_image_enhancement: this.enable_image_enhancement,
            open_timeout_sec: this.open_timeout_sec,
            async_grab_camera_recovery: this.async_grab_camera_recovery,
            grab_compute_capping_fps: this.grab_compute_capping_fps,
            enable_image_validity_check: this.enable_image_validity_check,
            maximum_working_resolution: this.maximum_working_resolution.toStruct(),
        };
    }
}
