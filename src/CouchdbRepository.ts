import invariant = require("invariant")

import { DocumentScopeAsync, Document, MaybeDocument, MaybeIdentifiedDocument } from "nano-async"

import { DocumentAlreadyExistsError } from "./DocumentAlreadyExistsError"
import { DocumentConcurrentModificationError } from "./DocumentConcurrentModificationError"
import { DocumentNotFoundError } from "./DocumentNotFoundError"

import { isDocument } from "./util"

interface ErrorWithStatusCode {
    statusCode: number
}

/**
 * Generic CouchDB repository class that uses the nano-async npm package
 *
 * @template D The document class it handles
 */
export class CouchdbRepository<D> {
    protected database: DocumentScopeAsync<D>
    protected resourceType: string

    constructor(database: DocumentScopeAsync<D>, resourceType: string) {
        this.database = database
        this.resourceType = resourceType
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
    public writeAttachment(
        id: string, rev: string, attName: string, contentType: string): NodeJS.WritableStream {
        return this.database.attachment.insert(id, attName, null, contentType, { rev })
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
    public addAttachment(
        id: string, rev: string, attName: string,
        attachment: Buffer | string, contentType: string): Promise<[any, any]> {
        return this.database.attachment.insertAsync(id, attName, attachment, contentType, { rev })
    }

    /**
     * Get an attachment as a ReadableStream
     */
    public getAttachment(id: string, attName: string): NodeJS.ReadableStream {
        return this.database.attachment.get(id, attName)
    }

    /**
     * List every document stored in database
     */
    public async all(): Promise<Array<D & Document>> {
        const [listResponse] = await this.database.listAsync()
        return listResponse.rows.map((row) => row.doc)
    }

    /**
     * Finds a single document in the database
     */
    public async find(id: string): Promise<D & Document> {
        invariant(id, "\"id\" attribute is required")
        const [doc] = await this.database.getAsync(id).catch((error: ErrorWithStatusCode) => {
            throw (error.statusCode === 404 ? new DocumentNotFoundError(id) : error)
        })
        return doc
    }

    /**
     * Stores a single document in the database
     */
    public async insert(document: D & MaybeIdentifiedDocument): Promise<D & Document>
    public async insert(id: string, document: D): Promise<D & Document>
    public async insert(arg1: any, arg2?: D & MaybeDocument): Promise<D & Document> {
        const document = arg2 || arg1
        const id = arg2 ? arg1 : document._id
        invariant(document, `"document" attribute is required`)

        const [response] = await this.database.insertAsync(document, id).catch((error: ErrorWithStatusCode) => {
            throw (error.statusCode === 409 ? new DocumentAlreadyExistsError(id) : error)
        })

        return {...document, _id: response.id, _rev: response.rev}
    }

    /**
     * Updates a single document.
     *
     * This may overwrite previously set data in db if document has no _rev property
     */
    public async update(document: D & Document): Promise<D & Document>
    public async update(id: string, document: D): Promise<D & Document>
    public async update(arg1: any, arg2?: D & MaybeDocument): Promise<D & Document> {
        const document = !arg2 && isDocument(arg1) ? arg1 : arg2
        const id = arg2 ? arg1 : document._id
        invariant(document, "\"document\" attribute is required")

        const dbDocument = await this.find(id)

        // TODO rewrite to object spread when https://github.com/Microsoft/TypeScript/pull/13288 is merged
        /* tslint:disable-next-line:prefer-object-spread */
        const revisionedDocument = Object.assign({ _id: dbDocument._id, _rev: dbDocument._rev}, document)

        const [response] = await this.database.insertAsync(revisionedDocument, id)
            .catch((error: ErrorWithStatusCode) => {
                throw (error.statusCode === 409 ? new DocumentConcurrentModificationError(id) : error)
            })

        // TODO rewrite to object spread when https://github.com/Microsoft/TypeScript/pull/13288 is merged
        /* tslint:disable-next-line:prefer-object-spread */
        return Object.assign(revisionedDocument, {_rev: response.rev})
    }

    /**
     * Patches a single document.
     */
    public async patch(document: Partial<D> & Document): Promise<D & Document>
    public async patch(id: string, document: Partial<D>): Promise<D & Document>
    public async patch(arg1: any, arg2?: D & MaybeDocument): Promise<D & Document> {
        const document = !arg2 && isDocument(arg1) ? arg1 : arg2
        const id = arg2 ? arg1 : document._id
        invariant(document, "\"document\" attribute is required")

        const dbDocument = await this.find(id)

        // TODO rewrite to object spread when https://github.com/Microsoft/TypeScript/pull/13288 is merged
        /* tslint:disable-next-line:prefer-object-spread */
        const revisionedDocument = Object.assign(dbDocument, document)

        const [response] = await this.database.insertAsync(revisionedDocument, id)
            .catch((error: ErrorWithStatusCode) => {
                switch (error.statusCode) {
                    case 409:
                        throw new DocumentConcurrentModificationError(id)
                    case 404:
                        throw new DocumentNotFoundError(id)
                    default:
                        throw error
                }
            })

        // TODO rewrite to object spread when https://github.com/Microsoft/TypeScript/pull/13288 is merged
        /* tslint:disable-next-line:prefer-object-spread */
        return Object.assign(revisionedDocument, { _rev: response.rev })
    }

    /**
     * Delete single document from database
     */
    public async destroy(id: string, rev: string): Promise<boolean> {
        invariant(id, "\"id\" attribute is required")
        invariant(rev, "\"rev\" attribute is required")
        const [response] = await this.database.destroyAsync(id, rev)
        return response.ok
    }

}
