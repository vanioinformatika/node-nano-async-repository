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
var DocumentAlreadyExistsError = /** @class */ (function (_super) {
    __extends(DocumentAlreadyExistsError, _super);
    function DocumentAlreadyExistsError(id) {
        return _super.call(this, "Document already exists (id: " + id + ")") || this;
    }
    return DocumentAlreadyExistsError;
}(RepositoryError_1.RepositoryError));
exports.DocumentAlreadyExistsError = DocumentAlreadyExistsError;
//# sourceMappingURL=DocumentAlreadyExistsError.js.map