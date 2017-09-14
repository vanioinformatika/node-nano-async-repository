import { RepositoryError } from "./RepositoryError";
export declare class DocumentNotFoundError extends RepositoryError {
    readonly id: string;
    constructor(id: string);
}
