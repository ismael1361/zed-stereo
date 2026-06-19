type NonJsonTypes = Function | undefined;

// Remove recursivamente propriedades não-JSON de qualquer objeto comum
type DeepJsonClean<T> = {
    [K in keyof T as T[K] extends NonJsonTypes ? never : K]: T[K] extends object ? DeepJsonClean<T[K]> : T[K];
};

type ParametersToObject<T> = {
    // 1. Remove as chaves restritas da API original
    [K in keyof T as K extends keyof Parameters ? never : K]: T[K] extends Parameters
        ? // 2. Se for a classe/tipo Parameter, continua a recursão principal
          ParametersToObject<T[K]>
        : // 3. Se for um objeto comum, limpa os tipos não-JSON dele profundamente
          T[K] extends object
          ? DeepJsonClean<T[K]>
          : T[K];
};

export class Parameters {
    fromStruct(value: ParametersToObject<this>): this {
        Object.assign(this, value);
        return this;
    }

    toStruct(): ParametersToObject<this> {
        return JSON.parse(
            JSON.stringify(this, (key: string, value: any) => {
                if (value instanceof Parameters) {
                    return value.toStruct();
                }
                return value;
            }),
        );
    }
}
