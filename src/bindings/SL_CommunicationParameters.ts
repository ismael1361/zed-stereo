import koffi from "koffi";
import { SL_COMM_TYPE } from "./global/enums";
import { Parameters } from "./Parameters";

export const SL_CommunicationParametersStruct = koffi.struct("SL_CommunicationParameters", {
    communication_type: "int",
    ip_port: "uint",
    ip_add: "char[256]",
});

export class SL_CommunicationParameters extends Parameters {
    communication_type: SL_COMM_TYPE = SL_COMM_TYPE.SL_COMM_TYPE_LOCAL_NETWORK;
    ip_port: number = 0;
    ip_add: string = "";

    constructor(communication_type: SL_COMM_TYPE = SL_COMM_TYPE.SL_COMM_TYPE_LOCAL_NETWORK, ip_port: number = 0, ip_add: string = "") {
        super();
        this.communication_type = communication_type;
        this.ip_port = ip_port;
        this.ip_add = ip_add;
    }
}
