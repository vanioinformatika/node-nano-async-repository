import { RepositoryError } from "./RepositoryError";

export class DocumentAlreadyExistsError extends RepositoryError {

    constructor(public readonly id: string) {
        super(`Document already exists (id: ${id})`);
    }
}
