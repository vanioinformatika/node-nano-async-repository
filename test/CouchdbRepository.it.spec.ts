// tslint:disable:no-console
import * as chai from "chai";
const { expect } = chai;

import chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

import { default as nanoAsync, Document, ServerScopeAsync } from "nano-async";
import { CouchdbRepository } from "../src/CouchdbRepository";
import { DocumentAlreadyExistsError } from "../src/error/DocumentAlreadyExistsError";
import { DocumentNotFoundError } from "../src/error/DocumentNotFoundError";

import "mocha";

class MyDocument implements Document {
    // tslint:disable-next-line:variable-name
    public _id: string;
    // tslint:disable-next-line:variable-name
    public _rev: string;
    public myProp: string;
}

const dbName = "mydb";

const serverAsync = nanoAsync({ url: "http://localhost:5984" }) as ServerScopeAsync;
const couchdbRepository = new CouchdbRepository<MyDocument>(serverAsync.use<MyDocument>(dbName), "MyDocument");

describe("CouchdbRepository", () => {

    const id1 = "myId1";
    const id2 = "myId2";
    let rev1: string;
    let rev2: string;

    before("Create database", () => {
        return serverAsync.db.createAsync(dbName);
    });

    describe("insert", () => {
        it("insert(document) should create a new document instance", async () => {
            const myDoc = new MyDocument();
            myDoc._id = id1;
            myDoc.myProp = "test";
            const doc = await couchdbRepository.insert(myDoc);
            expect(doc).to.have.property("_rev");
            expect(doc._id).to.equal(myDoc._id);
            expect(doc.myProp).to.equal(myDoc.myProp);
            rev1 = doc._rev;
        });
        it("insert(id, document) should create a new document instance", async () => {
            const myDoc = new MyDocument();
            myDoc.myProp = "test";
            const doc = await couchdbRepository.insert(id2, myDoc);
            expect(doc).to.have.property("_id");
            expect(doc).to.have.property("_rev");
            expect(doc._id).to.equal(id2);
            expect(doc.myProp).to.equal(myDoc.myProp);
            rev2 = doc._rev;
        });
        it("insert(document) with existing id should be rejected with DocumentAlreadyExistsError", async () => {
            const myDoc = new MyDocument();
            myDoc._id = id1;
            myDoc.myProp = "test";
            expect(couchdbRepository.insert(myDoc)).to.be.rejectedWith(DocumentAlreadyExistsError);
        });
        it("insert(id, document) with existing id should be rejected with DocumentAlreadyExistsError", async () => {
            const myDoc = new MyDocument();
            myDoc.myProp = "test";
            expect(couchdbRepository.insert(id1, myDoc)).to.be.rejectedWith(DocumentAlreadyExistsError);
        });
    });

    describe("find", () => {
        it("should find the specified document instance", async () => {
            const doc = await couchdbRepository.find(id1);
            expect(doc).to.have.property("_rev");
            expect(doc._id).to.equal(id1);
        });
        it("should be rejected with DocumentNotFoundError if called with a non existing id", (done) => {
            expect(couchdbRepository.find("fake_id")).to.be.rejectedWith(DocumentNotFoundError).notify(done);
        });
    });

    describe("all", () => {
        it("should find all document instances", async () => {
            const docs = await couchdbRepository.all();
            expect(docs.length).to.equal(2);
            const doc1 = docs.find((d) => d._id === id1);
            const doc2 = docs.find((d) => d._id === id2);
            // tslint:disable-next-line:no-unused-expression
            expect(doc1).to.exist;
            // tslint:disable-next-line:no-unused-expression
            expect(doc2).to.exist;
        });
    });

    describe("update", () => {
        it("update(document) should update the specified document instance", async () => {
            const myDoc = new MyDocument();
            myDoc._id = id1;
            myDoc._rev = rev1;
            myDoc.myProp = "modified_prop";
            const doc = await couchdbRepository.update(myDoc);
            expect(doc).to.have.property("_rev");
            expect(doc._rev).to.not.equal(myDoc._rev);
            expect(doc._id).to.equal(myDoc._id);
            expect(doc.myProp).to.equal(myDoc.myProp);
        });
    });
});
