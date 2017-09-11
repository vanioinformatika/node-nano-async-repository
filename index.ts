export { CouchdbRepository } from "./src/CouchdbRepository"

export { RepositoryError } from "./src/RepositoryError"
export { DocumentAlreadyExistsError } from "./src/DocumentAlreadyExistsError"
export { DocumentNotFoundError } from "./src/DocumentNotFoundError"
export { DocumentConcurrentModificationError } from "./src/DocumentConcurrentModificationError"

export { isDocument, isIdentifiedDocument, isRevisionedDocument } from "./src/util"
