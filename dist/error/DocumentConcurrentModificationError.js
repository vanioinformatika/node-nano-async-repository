"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RepositoryError_1 = require("./RepositoryError");
class DocumentConcurrentModificationError extends RepositoryError_1.RepositoryError {
    constructor(id) {
        super(`Document already modified (id: ${id})`);
        this.id = id;
    }
}
exports.DocumentConcurrentModificationError = DocumentConcurrentModificationError;
//# sourceMappingURL=DocumentConcurrentModificationError.js.map