import { RepositoryError } from "./RepositoryError";
export declare class DocumentAlreadyExistsError extends RepositoryError {
    readonly id: string;
    constructor(id: string);
}
