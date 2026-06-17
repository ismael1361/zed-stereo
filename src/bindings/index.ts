import koffi from "koffi";
import path from "path";
import fs from "fs";
import { SL_InitParameters } from "./SL_InitParameters";

export { SL_InitParameters };

if (process.platform === "win32") {
    const zedBinPath = "C:\\Program Files (x86)\\ZED SDK\\bin";

    if (fs.existsSync(zedBinPath)) {
        process.env.PATH = `${zedBinPath};${process.env.PATH}`;
    }
}

const libPath = path.join(process.cwd(), "./bin", "sl_zed_c.dll");

if (!fs.existsSync(libPath)) {
    throw new Error(`Arquivo DLL não encontrado no caminho: ${libPath}. Certifique-se de que copiou a sl_zed_c.dll para a pasta 'bin'.`);
}

const lib = koffi.load(libPath);

/**
 * Frees the memory allocated by the ZED SDK.
 */
export function sl_free(ptr: Buffer): void {
    lib.func("void sl_free(void *ptr)").apply(null, [ptr]);
}

/**
 * Forces unload of all instances.
 */
export function sl_unload_all_instances(): void {
    lib.func("void sl_unload_all_instances()").apply(null, []);
}

/**
 * Forces unload of one instance.
 * @param cameraId Id of the instance to unload.
 */
export function sl_unload_instance(cameraId: number): void {
    lib.func("void sl_unload_instance(int cameraId)").apply(null, [cameraId]);
}

/**
 * Creates a camera with the specified ID.
 * @param cameraId Id of the camera to be added.
 * @returns `true` if the camera has been created successfully, otherwise `false`.
 */
export function sl_create_camera(cameraId: number): boolean {
    return lib.func("bool sl_create_camera(int cameraId)").apply(null, [cameraId]);
}

/**
 * Reports if the camera has been successfully opened.
 * @param cameraId Id of the camera.
 * @returns `true` if the ZED camera is already setup, otherwise `false`.
 */
export function sl_is_opened(cameraId: number): boolean {
    return lib.func("bool sl_is_opened(int cameraId)").apply(null, [cameraId]);
}

/**
 * Opens the ZED camera from the provided SL_InitParameters.
 * @param cameraId Id of the camera to open.
 * @param initParameters A structure containing all the initial parameters. Default: a preset of SL_InitParameters.
 * @param serialNumber Serial number of the camera to open.
 * @param pathSVO Filename of the svo to read (for SVO input).
 * @param ip IP of the camera to open (for Stream input).
 * @param streamPort Port of the camera to open (for Stream input).
 * @param gmslPort GMSL port number for camera selection (only used when input_type is GMSL). Default: -1 (do nothing).
 * @param outputFile ZED SDK verbose log file. Redirect the SDK verbose message to the file.
 * @param optSettingsPath Settings path.
 * @param opencvCalibPath openCV calibration file.
 * @returns An error code giving information about the internal process. If SL_ERROR_CODE_SUCCESS (0) is returned, the camera is ready to use. Every other code indicates an error and the program should be stopped.
 */
export function sl_open_camera(
    cameraId: number,
    initParameters: SL_InitParameters,
    serialNumber: number,
    pathSVO: string,
    ip: string,
    streamPort: number,
    gmslPort: number,
    outputFile: string,
    optSettingsPath: string | null = null,
    opencvCalibPath: string | null = null,
): number {
    return lib
        .func(
            "int sl_open_camera(int camera_id, struct SL_InitParameters* init_parameters, const unsigned int serial_number,  const char* path_svo, const char* ip, int stream_port, int gmsl_port, const char* output_file, const char* opt_settings_path, const char* opencv_calib_path)",
        )
        .apply(null, [cameraId, initParameters.toStruct(), serialNumber, pathSVO, ip, streamPort, gmslPort, outputFile, optSettingsPath, opencvCalibPath]);
}

/**
 * Opens the ZED camera from the provided SL_InitParameters using its camera ID.
 * @param cameraId Id of the camera to open.
 * @param initParameters A structure containing all the initial parameters. Default: a preset of SL_InitParameters.
 * @param outputFile ZED SDK verbose log file. Redirect the SDK verbose message to the file.
 * @param optSettingsPath Settings path.
 * @param opencvCalibPath openCV calibration file.
 * @returns An error code giving information about the internal process. If SL_ERROR_CODE_SUCCESS (0) is returned, the camera is ready to use. Every other code indicates an error and the program should be stopped.
 */
export function sl_open_camera_from_camera_id(
    cameraId: number,
    initParameters: SL_InitParameters,
    outputFile: string,
    optSettingsPath: string | null = null,
    opencvCalibPath: string | null = null,
): number {
    return lib
        .func("int sl_open_camera_from_camera_id(int camera_id, struct SL_InitParameters* init_parameters, const char* output_file, const char* opt_settings_path, const char* opencv_calib_path)")
        .apply(null, [cameraId, initParameters.toStruct(), outputFile, optSettingsPath, opencvCalibPath]);
}

/**
 * Opens the ZED camera from the provided SL_InitParameters using its serial number.
 * @param cameraId Id of the camera to open.
 * @param initParameters A structure containing all the initial parameters. Default: a preset of SL_InitParameters.
 * @param serialNumber Serial number of the camera to open.
 * @param outputFile ZED SDK verbose log file. Redirect the SDK verbose message to the file.
 * @param optSettingsPath Settings path.
 * @param opencvCalibPath openCV calibration file.
 * @returns An error code giving information about the internal process. If SL_ERROR_CODE_SUCCESS (0) is returned, the camera is ready to use. Every other code indicates an error and the program should be stopped.
 */
export function sl_open_camera_from_serial_number(
    cameraId: number,
    initParameters: SL_InitParameters,
    serialNumber: number,
    outputFile: string,
    optSettingsPath: string | null = null,
    opencvCalibPath: string | null = null,
): number {
    return lib
        .func(
            "int sl_open_camera_from_serial_number(int camera_id, struct SL_InitParameters* init_parameters, const unsigned int serial_number, const char* output_file, const char* opt_settings_path, const char* opencv_calib_path)",
        )
        .apply(null, [cameraId, initParameters.toStruct(), serialNumber, outputFile, optSettingsPath, opencvCalibPath]);
}

/**
 * Opens the ZED camera from the provided SL_InitParameters using an SVO file.
 * @param cameraId Id of the camera to open.
 * @param initParameters A structure containing all the initial parameters. Default: a preset of SL_InitParameters.
 * @param pathSVO Filename of the svo to read (for SVO input).
 * @param outputFile ZED SDK verbose log file. Redirect the SDK verbose message to the file.
 * @param optSettingsPath Settings path.
 * @param opencvCalibPath openCV calibration file.
 * @returns An error code giving information about the internal process. If SL_ERROR_CODE_SUCCESS (0) is returned, the camera is ready to use. Every other code indicates an error and the program should be stopped.
 */
export function sl_open_camera_from_svo_file(
    cameraId: number,
    initParameters: SL_InitParameters,
    pathSVO: string,
    outputFile: string,
    optSettingsPath: string | null = null,
    opencvCalibPath: string | null = null,
): number {
    return lib
        .func(
            "int sl_open_camera_from_svo_file(int camera_id, struct SL_InitParameters* init_parameters, const char* path_svo, const char* output_file, const char* opt_settings_path, const char* opencv_calib_path)",
        )
        .apply(null, [cameraId, initParameters.toStruct(), pathSVO, outputFile, optSettingsPath, opencvCalibPath]);
}

/**
 * Opens the ZED camera from the provided SL_InitParameters using its IP and stream port.
 * @param cameraId Id of the camera to open.
 * @param initParameters A structure containing all the initial parameters. Default: a preset of SL_InitParameters.
 * @param ip IP of the camera to open (for Stream input).
 * @param streamPort Port of the camera to open (for Stream input).
 * @param outputFile ZED SDK verbose log file. Redirect the SDK verbose message to the file.
 * @param optSettingsPath Settings path.
 * @param opencvCalibPath openCV calibration file.
 * @returns An error code giving information about the internal process. If SL_ERROR_CODE_SUCCESS (0) is returned, the camera is ready to use. Every other code indicates an error and the program should be stopped.
 */
export function sl_open_camera_from_stream(
    cameraId: number,
    initParameters: SL_InitParameters,
    ip: string,
    streamPort: number,
    outputFile: string,
    optSettingsPath: string | null = null,
    opencvCalibPath: string | null = null,
): number {
    return lib
        .func(
            "int sl_open_camera_from_stream(int camera_id, struct SL_InitParameters* init_parameters, const char* ip, int stream_port, const char* output_file, const char* opt_settings_path, const char* opencv_calib_path)",
        )
        .apply(null, [cameraId, initParameters.toStruct(), ip, streamPort, outputFile, optSettingsPath, opencvCalibPath]);
}
