"use strict";
exports.__esModule = true;
var CouchdbRepository_1 = require("./src/CouchdbRepository");
exports.CouchdbRepository = CouchdbRepository_1.CouchdbRepository;
var RepositoryError_1 = require("./src/error/RepositoryError");
exports.RepositoryError = RepositoryError_1.RepositoryError;
var DocumentAlreadyExistsError_1 = require("./src/error/DocumentAlreadyExistsError");
exports.DocumentAlreadyExistsError = DocumentAlreadyExistsError_1.DocumentAlreadyExistsError;
var DocumentNotFoundError_1 = require("./src/error/DocumentNotFoundError");
exports.DocumentNotFoundError = DocumentNotFoundError_1.DocumentNotFoundError;
var DocumentConcurrentModificationError_1 = require("./src/error/DocumentConcurrentModificationError");
exports.DocumentConcurrentModificationError = DocumentConcurrentModificationError_1.DocumentConcurrentModificationError;
var util_1 = require("./src/util");
exports.isDocument = util_1.isDocument;
exports.isIdentifiedDocument = util_1.isIdentifiedDocument;
exports.isRevisionedDocument = util_1.isRevisionedDocument;
//# sourceMappingURL=index.js.map