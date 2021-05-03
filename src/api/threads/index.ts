import { HUB_KEY, HUB_SECRET } from "../../../config.js";
import { Client, GetThreadResponse, ThreadID, QueryJSON, Query } from "@textile/hub";
import * as pb from "@textile/threads-client-grpc/threads_pb";

const keyInfo = {
    key: HUB_KEY,
    secret: HUB_SECRET
};

export async function connectClient(): Promise<Client> {
    const client: Client = await Client.withKeyInfo(keyInfo);
    return client;
};

export async function listThreads(client: Client): Promise<GetThreadResponse[]> {
    const threads: GetThreadResponse[] = await client.listThreads();
    return threads;
};

export async function listDBs(client: Client): Promise<Array<{ id: string; name?: string; }>> {
    const list: Array<{ id: string; name?: string; }> = await client.listDBs();
    return list;
};

export async function createDB(client: Client, name: string): Promise<ThreadID> {
    const thread: ThreadID = await client.newDB(null, name);
    return thread;
};

export async function deleteDB(client: Client, threadID: ThreadID) {
    await client.deleteDB(threadID);
    return;
};

export async function collectionFromSchema(client: Client, threadID: ThreadID, schema: object, name: string): Promise<void> {
    await client.newCollection(threadID, { name: name, schema: schema });
};

export async function listCollections(client: Client, threadID: ThreadID): Promise<Array<pb.GetCollectionInfoReply.AsObject>> {
    const collections: Array<pb.GetCollectionInfoReply.AsObject> = await client.listCollections(threadID);
    return collections;
};

export async function createInstances(client: Client, threadID: ThreadID, collectionName: string, values: any[]): Promise<string[]> {
    const request: string[] = await client.create(threadID, collectionName, values);
    return request;
};

export async function getInstance<T>(client: Client, threadID: ThreadID, collectionName: string, id: string): Promise<T> {
    const instance: T = await client.findByID(threadID, collectionName, id);
    return instance;
};

export async function deleteInstances(client: Client, threadID: ThreadID, collectionName: string, IDs: string[]): Promise<void> {
    return await client.delete(threadID, collectionName, IDs)
};

export async function getInstancesByQuery<T>(client: Client, threadID: ThreadID, collectionName: string, query: QueryJSON): Promise<T[]> {
    const instances: T[] = await client.find(threadID, collectionName, query);
    return instances;
};

export async function updateInstanceByID(client: Client, dbName: string, collectionName: string, id: string, newValues: object): Promise<void> {
    const dbs = await listDBs(client);
    const selectedDB = dbs.find(db => db.name === dbName);
    const query = new Query().seekID(id);
    const result: object[] = await client.find(ThreadID.fromString(selectedDB.id), collectionName, query);
    if (result.length < 1) {
        console.log("updateInstanceByID() Instance not found.");
        return;
    } else {
        const instance = { ...result[0], ...newValues };
        return await client.save(ThreadID.fromString(selectedDB.id), collectionName, [instance]);
    }
};

export async function updateCollection(client: Client, dbName: string, collectionName: string, schema: object): Promise<void> {
    const dbs = await listDBs(client);
    const selectedDB = dbs.find(db => db.name === dbName);
    return await client.updateCollection(ThreadID.fromString(selectedDB.id), { name: collectionName, schema: schema });
};

export class TextileClient {
    client: Client = null;

    constructor() {
    }

    async init() {
        if (!this.client) {
            this.client = await connectClient();
        }
        return this.client;
    }
};
