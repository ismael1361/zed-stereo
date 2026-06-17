/**
 * Represents a CUDA context handle.
 * This is an opaque pointer type used for sharing GPU memory with other CUDA-capable libraries.
 */
export class CUctx_st {
    private _ptr: Buffer;

    constructor(ptr: Buffer) {
        this._ptr = ptr;
    }

    /**
     * Gets the underlying pointer to the CUDA context.
     * @returns The raw pointer buffer.
     */
    getPointer(): Buffer {
        return this._ptr;
    }

    /**
     * Checks if the context pointer is valid (not null).
     * @returns True if the pointer is not null.
     */
    isValid(): boolean {
        return this._ptr !== null && this._ptr.length > 0;
    }
}
