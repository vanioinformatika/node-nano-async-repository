"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isIdentifiedDocument(document) {
    return document.hasOwnProperty("_id") && typeof document._id === "string";
}
exports.isIdentifiedDocument = isIdentifiedDocument;
function isRevisionedDocument(document) {
    return document.hasOwnProperty("_rev") && typeof document._rev === "string";
}
exports.isRevisionedDocument = isRevisionedDocument;
function isDocument(document) {
    return this.isIdentifiedDocument(document) &&
        this.isRevisionedDocument(document);
}
exports.isDocument = isDocument;
//# sourceMappingURL=util.js.map