"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var invariant = require("invariant");
var DocumentAlreadyExistsError_1 = require("./error/DocumentAlreadyExistsError");
var DocumentConcurrentModificationError_1 = require("./error/DocumentConcurrentModificationError");
var DocumentNotFoundError_1 = require("./error/DocumentNotFoundError");
var util_1 = require("./util");
/**
 * Generic CouchDB repository class that uses the nano-async npm package
 *
 * @template D The document class it handles
 */
var CouchdbRepository = /** @class */ (function () {
    function CouchdbRepository(database, resourceType) {
        this.database = database;
        this.resourceType = resourceType;
    }
    /**
     * Creates a new attachment to the specified document id and revision and returns a WritableStream of it
     *
     * @param {string} id The id of the document that the new attachment belongs to
     * @param {string} rev The revision of the document that the new attachment belongs to
     * @param {string} attName Attachment name
     * @param {string} contentType Attachment content type
     * @returns {NodeJS.WritableStream} Attachment stream
     */
    CouchdbRepository.prototype.writeAttachment = function (id, rev, attName, contentType) {
        return this.database.attachment.insert(id, attName, null, contentType, { rev: rev });
    };
    /**
     * Adds a new attachment with the specified content
     *
     * @param {string} id The id of the document that the new attachment belongs to
     * @param {string} rev The revision of the document that the new attachment belongs to
     * @param {string} attName Attachment name
     * @param {(Buffer | string)} attachment Attachment contents
     * @param {string} contentType Attachment content type
     * @returns {Promise<[AttachmentInsertResponse, any]>}
     */
    CouchdbRepository.prototype.addAttachment = function (id, rev, attName, attachment, contentType) {
        return this.database.attachment.insertAsync(id, attName, attachment, contentType, { rev: rev });
    };
    /**
     * Get an attachment as a ReadableStream
     */
    CouchdbRepository.prototype.getAttachment = function (id, attName) {
        return this.database.attachment.get(id, attName);
    };
    /**
     * List every document stored in database
     */
    CouchdbRepository.prototype.all = function () {
        return __awaiter(this, void 0, void 0, function () {
            var listResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.database.listAsync()];
                    case 1:
                        listResponse = (_a.sent())[0];
                        return [2 /*return*/, listResponse.rows.map(function (row) { return row.doc; })];
                }
            });
        });
    };
    /**
     * Finds a single document in the database
     */
    CouchdbRepository.prototype.find = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var doc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        invariant(id, "\"id\" attribute is required");
                        return [4 /*yield*/, this.database.getAsync(id)["catch"](function (error) {
                                throw (error.statusCode === 404 ? new DocumentNotFoundError_1.DocumentNotFoundError(id) : error);
                            })];
                    case 1:
                        doc = (_a.sent())[0];
                        return [2 /*return*/, doc];
                }
            });
        });
    };
    CouchdbRepository.prototype.insert = function (arg1, arg2) {
        return __awaiter(this, void 0, void 0, function () {
            var document, id, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        document = arg2 || arg1;
                        id = arg2 ? arg1 : document._id;
                        invariant(document, "\"document\" attribute is required");
                        return [4 /*yield*/, this.database.insertAsync(document, id)["catch"](function (error) {
                                throw (error.statusCode === 409 ? new DocumentAlreadyExistsError_1.DocumentAlreadyExistsError(id) : error);
                            })];
                    case 1:
                        response = (_a.sent())[0];
                        return [2 /*return*/, __assign({}, document, { _id: response.id, _rev: response.rev })];
                }
            });
        });
    };
    CouchdbRepository.prototype.update = function (arg1, arg2) {
        return __awaiter(this, void 0, void 0, function () {
            var document, id, dbDocument, revisionedDocument, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        document = !arg2 && util_1.isDocument(arg1) ? arg1 : arg2;
                        id = arg2 ? arg1 : document._id;
                        invariant(document, "\"document\" attribute is required");
                        return [4 /*yield*/, this.find(id)];
                    case 1:
                        dbDocument = _a.sent();
                        revisionedDocument = Object.assign({ _id: dbDocument._id, _rev: dbDocument._rev }, document);
                        return [4 /*yield*/, this.database.insertAsync(revisionedDocument, id)["catch"](function (error) {
                                throw (error.statusCode === 409 ? new DocumentConcurrentModificationError_1.DocumentConcurrentModificationError(id) : error);
                            })];
                    case 2:
                        response = (_a.sent())[0];
                        // TODO rewrite to object spread when https://github.com/Microsoft/TypeScript/pull/13288 is merged
                        /* tslint:disable-next-line:prefer-object-spread */
                        return [2 /*return*/, Object.assign(revisionedDocument, { _rev: response.rev })];
                }
            });
        });
    };
    CouchdbRepository.prototype.patch = function (arg1, arg2) {
        return __awaiter(this, void 0, void 0, function () {
            var document, id, dbDocument, revisionedDocument, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        document = !arg2 && util_1.isDocument(arg1) ? arg1 : arg2;
                        id = arg2 ? arg1 : document._id;
                        invariant(document, "\"document\" attribute is required");
                        return [4 /*yield*/, this.find(id)];
                    case 1:
                        dbDocument = _a.sent();
                        revisionedDocument = Object.assign(dbDocument, document);
                        return [4 /*yield*/, this.database.insertAsync(revisionedDocument, id)["catch"](function (error) {
                                switch (error.statusCode) {
                                    case 409:
                                        throw new DocumentConcurrentModificationError_1.DocumentConcurrentModificationError(id);
                                    case 404:
                                        throw new DocumentNotFoundError_1.DocumentNotFoundError(id);
                                    default:
                                        throw error;
                                }
                            })];
                    case 2:
                        response = (_a.sent())[0];
                        // TODO rewrite to object spread when https://github.com/Microsoft/TypeScript/pull/13288 is merged
                        /* tslint:disable-next-line:prefer-object-spread */
                        return [2 /*return*/, Object.assign(revisionedDocument, { _rev: response.rev })];
                }
            });
        });
    };
    /**
     * Delete single document from database
     */
    CouchdbRepository.prototype.destroy = function (id, rev) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        invariant(id, "\"id\" attribute is required");
                        invariant(rev, "\"rev\" attribute is required");
                        return [4 /*yield*/, this.database.destroyAsync(id, rev)];
                    case 1:
                        response = (_a.sent())[0];
                        return [2 /*return*/, response.ok];
                }
            });
        });
    };
    return CouchdbRepository;
}());
exports.CouchdbRepository = CouchdbRepository;
//# sourceMappingURL=CouchdbRepository.js.map