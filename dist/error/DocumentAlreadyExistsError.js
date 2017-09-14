"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RepositoryError_1 = require("./RepositoryError");
class DocumentAlreadyExistsError extends RepositoryError_1.RepositoryError {
    constructor(id) {
        super(`Document already exists (id: ${id})`);
        this.id = id;
    }
}
exports.DocumentAlreadyExistsError = DocumentAlreadyExistsError;
//# sourceMappingURL=DocumentAlreadyExistsError.js.map