import koffi from "koffi";
import { Parameters } from "./Parameters";

export const SL_PositionalTrackingParametersStruct = koffi.struct("SL_PositionalTrackingParameters", {
    enable_area_memory: "bool",
    enable_pose_smoothing: "bool",
    set_floor_as_origin: "bool",
    set_as_static: "bool",
    enable_imu_fusion: "bool",
    initial_world_rotation: "float[4]",
    initial_world_position: "float[3]",
    area_file_path: "string",
});

export class SL_PositionalTrackingParameters extends Parameters {
    enable_area_memory: boolean = true;
    enable_pose_smoothing: boolean = false;
    set_floor_as_origin: boolean = false;
    set_as_static: boolean = false;
    enable_imu_fusion: boolean = true;
    initial_world_rotation: [number, number, number, number] = [0, 0, 0, 1];
    initial_world_position: [number, number, number] = [0, 0, 0];
    area_file_path: string = "";
}
