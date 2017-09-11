import {
    Document, IdentifiedDocument, MaybeDocument, MaybeIdentifiedDocument, MaybeRevisionedDocument, RevisionedDocument,
} from "nano";

export function isIdentifiedDocument<D>(document: MaybeIdentifiedDocument): document is D & IdentifiedDocument {
    return document.hasOwnProperty("_id") && typeof document._id === "string";
}

export function isRevisionedDocument<D>(document: MaybeRevisionedDocument): document is D & RevisionedDocument {
    return document.hasOwnProperty("_rev") && typeof document._rev === "string";
}

export function isDocument<D>(document: MaybeDocument): document is D & Document {
    return this.isIdentifiedDocument(document) &&
        this.isRevisionedDocument(document);
}
