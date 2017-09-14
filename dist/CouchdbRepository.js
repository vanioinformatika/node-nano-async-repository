"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const invariant = require("invariant");
const DocumentAlreadyExistsError_1 = require("./error/DocumentAlreadyExistsError");
const DocumentConcurrentModificationError_1 = require("./error/DocumentConcurrentModificationError");
const DocumentNotFoundError_1 = require("./error/DocumentNotFoundError");
const util_1 = require("./util");
/**
 * Generic CouchDB repository class that uses the nano-async npm package
 *
 * @template D The document class it handles
 */
class CouchdbRepository {
    constructor(database, resourceType) {
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
    writeAttachment(id, rev, attName, contentType) {
        return this.database.attachment.insert(id, attName, null, contentType, { rev });
    }
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
    addAttachment(id, rev, attName, attachment, contentType) {
        return this.database.attachment.insertAsync(id, attName, attachment, contentType, { rev });
    }
    /**
     * Get an attachment as a ReadableStream
     */
    getAttachment(id, attName) {
        return this.database.attachment.get(id, attName);
    }
    /**
     * List every document stored in database
     */
    all() {
        return __awaiter(this, void 0, void 0, function* () {
            const [listResponse] = yield this.database.listAsync({ include_docs: true });
            return listResponse.rows.map((row) => row.doc);
        });
    }
    /**
     * Finds a single document in the database
     */
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            invariant(id, "\"id\" attribute is required");
            const [doc] = yield this.database.getAsync(id).catch((error) => {
                throw (error.statusCode === 404 ? new DocumentNotFoundError_1.DocumentNotFoundError(id) : error);
            });
            return doc;
        });
    }
    insert(arg1, arg2) {
        return __awaiter(this, void 0, void 0, function* () {
            const document = arg2 || arg1;
            const id = arg2 ? arg1 : document._id;
            invariant(document, `"document" attribute is required`);
            const [response] = yield this.database.insertAsync(document, id).catch((error) => {
                throw (error.statusCode === 409 ? new DocumentAlreadyExistsError_1.DocumentAlreadyExistsError(id) : error);
            });
            return Object.assign({}, document, { _id: response.id, _rev: response.rev });
        });
    }
    update(arg1, arg2) {
        return __awaiter(this, void 0, void 0, function* () {
            const document = !arg2 && util_1.isDocument(arg1) ? arg1 : arg2;
            const id = arg2 ? arg1 : document._id;
            invariant(document, "\"document\" attribute is required");
            const dbDocument = yield this.find(id);
            // TODO rewrite to object spread when https://github.com/Microsoft/TypeScript/pull/13288 is merged
            /* tslint:disable-next-line:prefer-object-spread */
            const revisionedDocument = Object.assign({ _id: dbDocument._id, _rev: dbDocument._rev }, document);
            const [response] = yield this.database.insertAsync(revisionedDocument, id)
                .catch((error) => {
                throw (error.statusCode === 409 ? new DocumentConcurrentModificationError_1.DocumentConcurrentModificationError(id) : error);
            });
            // TODO rewrite to object spread when https://github.com/Microsoft/TypeScript/pull/13288 is merged
            /* tslint:disable-next-line:prefer-object-spread */
            return Object.assign(revisionedDocument, { _rev: response.rev });
        });
    }
    patch(arg1, arg2) {
        return __awaiter(this, void 0, void 0, function* () {
            const document = !arg2 && util_1.isDocument(arg1) ? arg1 : arg2;
            const id = arg2 ? arg1 : document._id;
            invariant(document, "\"document\" attribute is required");
            const dbDocument = yield this.find(id);
            // TODO rewrite to object spread when https://github.com/Microsoft/TypeScript/pull/13288 is merged
            /* tslint:disable-next-line:prefer-object-spread */
            const revisionedDocument = Object.assign(dbDocument, document);
            const [response] = yield this.database.insertAsync(revisionedDocument, id)
                .catch((error) => {
                switch (error.statusCode) {
                    case 409:
                        throw new DocumentConcurrentModificationError_1.DocumentConcurrentModificationError(id);
                    case 404:
                        throw new DocumentNotFoundError_1.DocumentNotFoundError(id);
                    default:
                        throw error;
                }
            });
            // TODO rewrite to object spread when https://github.com/Microsoft/TypeScript/pull/13288 is merged
            /* tslint:disable-next-line:prefer-object-spread */
            return Object.assign(revisionedDocument, { _rev: response.rev });
        });
    }
    /**
     * Delete single document from database
     */
    destroy(id, rev) {
        return __awaiter(this, void 0, void 0, function* () {
            invariant(id, "\"id\" attribute is required");
            invariant(rev, "\"rev\" attribute is required");
            const [response] = yield this.database.destroyAsync(id, rev);
            return response.ok;
        });
    }
}
exports.CouchdbRepository = CouchdbRepository;
//# sourceMappingURL=CouchdbRepository.js.map