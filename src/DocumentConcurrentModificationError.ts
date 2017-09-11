import { RepositoryError } from "./RepositoryError";

export class DocumentConcurrentModificationError extends RepositoryError {
    constructor(id: string) {
        super(`Document already modified (id: ${id})`);
    }
}
