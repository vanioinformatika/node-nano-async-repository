import { RepositoryError } from "./RepositoryError"

export class DocumentNotFoundError extends RepositoryError {
    constructor(id: string) {
        super(`Document not found (id: ${id})`)
    }
}
