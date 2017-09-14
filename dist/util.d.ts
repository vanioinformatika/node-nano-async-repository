/// <reference types="nano" />
import { Document, IdentifiedDocument, MaybeDocument, MaybeIdentifiedDocument, MaybeRevisionedDocument, RevisionedDocument } from "nano";
export declare function isIdentifiedDocument<D>(document: MaybeIdentifiedDocument): document is D & IdentifiedDocument;
export declare function isRevisionedDocument<D>(document: MaybeRevisionedDocument): document is D & RevisionedDocument;
export declare function isDocument<D>(document: MaybeDocument): document is D & Document;
