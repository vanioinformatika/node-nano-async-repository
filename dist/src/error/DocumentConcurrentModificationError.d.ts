import { RepositoryError } from "./RepositoryError";
export declare class DocumentConcurrentModificationError extends RepositoryError {
    readonly id: string;
    constructor(id: string);
}
