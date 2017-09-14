export { CouchdbRepository } from "./CouchdbRepository";
export { RepositoryError } from "./error/RepositoryError";
export { DocumentAlreadyExistsError } from "./error/DocumentAlreadyExistsError";
export { DocumentNotFoundError } from "./error/DocumentNotFoundError";
export { DocumentConcurrentModificationError } from "./error/DocumentConcurrentModificationError";
export { isDocument, isIdentifiedDocument, isRevisionedDocument } from "./util";
