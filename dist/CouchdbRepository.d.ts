/// <reference types="node" />
/// <reference types="nano" />
import { Document, DocumentScopeAsync, MaybeIdentifiedDocument } from "nano-async";
/**
 * Generic CouchDB repository class that uses the nano-async npm package
 *
 * @template D The document class it handles
 */
export declare class CouchdbRepository<D> {
    protected database: DocumentScopeAsync<D>;
    protected resourceType: string;
    constructor(database: DocumentScopeAsync<D>, resourceType: string);
    /**
     * Creates a new attachment to the specified document id and revision and returns a WritableStream of it
     *
     * @param {string} id The id of the document that the new attachment belongs to
     * @param {string} rev The revision of the document that the new attachment belongs to
     * @param {string} attName Attachment name
     * @param {string} contentType Attachment content type
     * @returns {NodeJS.WritableStream} Attachment stream
     */
    writeAttachment(id: string, rev: string, attName: string, contentType: string): NodeJS.WritableStream;
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
    addAttachment(id: string, rev: string, attName: string, attachment: Buffer | string, contentType: string): Promise<[any, any]>;
    /**
     * Get an attachment as a ReadableStream
     */
    getAttachment(id: string, attName: string): NodeJS.ReadableStream;
    /**
     * List every document stored in database
     */
    all(): Promise<Array<D & Document>>;
    /**
     * Finds a single document in the database
     */
    find(id: string): Promise<D & Document>;
    /**
     * Stores a single document in the database
     */
    insert(document: D & MaybeIdentifiedDocument): Promise<D & Document>;
    insert(id: string, document: D): Promise<D & Document>;
    /**
     * Updates a single document.
     *
     * This may overwrite previously set data in db if document has no _rev property
     */
    update(document: D & Document): Promise<D & Document>;
    update(id: string, document: D): Promise<D & Document>;
    /**
     * Patches a single document.
     */
    patch(document: Partial<D> & Document): Promise<D & Document>;
    patch(id: string, document: Partial<D>): Promise<D & Document>;
    /**
     * Delete single document from database
     */
    destroy(id: string, rev: string): Promise<boolean>;
}
