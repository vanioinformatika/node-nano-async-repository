"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var RepositoryError_1 = require("./RepositoryError");
var DocumentConcurrentModificationError = /** @class */ (function (_super) {
    __extends(DocumentConcurrentModificationError, _super);
    function DocumentConcurrentModificationError(id) {
        return _super.call(this, "Document already modified (id: " + id + ")") || this;
    }
    return DocumentConcurrentModificationError;
}(RepositoryError_1.RepositoryError));
exports.DocumentConcurrentModificationError = DocumentConcurrentModificationError;
//# sourceMappingURL=DocumentConcurrentModificationError.js.map