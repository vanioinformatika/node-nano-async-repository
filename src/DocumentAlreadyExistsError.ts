import { RepositoryError } from "./RepositoryError"

export class DocumentAlreadyExistsError extends RepositoryError {
    constructor(id: string) {
        super(`Document already exists (id: ${id})`)
    }
}
