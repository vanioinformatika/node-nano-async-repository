import { RepositoryError } from "./RepositoryError";

export class DocumentNotFoundError extends RepositoryError {

    constructor(public readonly id: string) {
        super(`Document not found (id: ${id})`);
    }
}
