import { RepositoryError } from "./RepositoryError";
export declare class DocumentAlreadyExistsError extends RepositoryError {
    constructor(id: string);
}
