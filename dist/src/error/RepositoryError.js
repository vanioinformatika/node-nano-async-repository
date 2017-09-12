"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Repository error base class */
class RepositoryError extends Error {
    constructor(msg) {
        super(msg);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.RepositoryError = RepositoryError;
//# sourceMappingURL=RepositoryError.js.map