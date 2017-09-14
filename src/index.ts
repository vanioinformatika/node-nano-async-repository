export { CouchdbRepository } from "./src/CouchdbRepository";

export { RepositoryError } from "./src/error/RepositoryError";
export { DocumentAlreadyExistsError } from "./src/error/DocumentAlreadyExistsError";
export { DocumentNotFoundError } from "./src/error/DocumentNotFoundError";
export { DocumentConcurrentModificationError } from "./src/error/DocumentConcurrentModificationError";

export { isDocument, isIdentifiedDocument, isRevisionedDocument } from "./src/util";
