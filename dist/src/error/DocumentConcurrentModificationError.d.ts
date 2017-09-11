import { RepositoryError } from "./RepositoryError";
export declare class DocumentConcurrentModificationError extends RepositoryError {
    constructor(id: string);
}
