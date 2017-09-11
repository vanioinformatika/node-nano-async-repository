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
/** Repository error base class */
var RepositoryError = /** @class */ (function (_super) {
    __extends(RepositoryError, _super);
    function RepositoryError(msg) {
        var _this = _super.call(this, msg) || this;
        _this.name = _this.constructor.name;
        Error.captureStackTrace(_this, _this.constructor);
        return _this;
    }
    return RepositoryError;
}(Error));
exports.RepositoryError = RepositoryError;
//# sourceMappingURL=RepositoryError.js.map