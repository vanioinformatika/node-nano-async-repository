import { RepositoryError } from "./RepositoryError";

export class DocumentConcurrentModificationError extends RepositoryError {

    constructor(public readonly id: string) {
        super(`Document already modified (id: ${id})`);
    }
}
