"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RepositoryError_1 = require("./RepositoryError");
class DocumentNotFoundError extends RepositoryError_1.RepositoryError {
    constructor(id) {
        super(`Document not found (id: ${id})`);
        this.id = id;
    }
}
exports.DocumentNotFoundError = DocumentNotFoundError;
//# sourceMappingURL=DocumentNotFoundError.js.map