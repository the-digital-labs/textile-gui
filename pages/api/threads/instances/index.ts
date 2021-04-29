import { TextileClient, getInstancesByQuery, createInstances, listDBs, deleteInstances } from "../index";
import { ThreadID, Query } from "@textile/hub";

export default async function instancesHandler(req, res) {
    if (req.method === "GET") {
        const client = await new TextileClient().init();
        const query = new Query().orderByIDDesc();
        const instances = await getInstancesByQuery(client, ThreadID.fromString(req.query.threadID), req.query.collectionName, query)
        res.status(200).json(instances);
    } else if (req.method === "POST") {
        const client = await new TextileClient().init();
        const json = JSON.parse(req.body);
        console.log("json", json);
        const { collectionName, threadName } = json.params;
        const dbs = await listDBs(client);
        const selectedDB = dbs.find(db => db.name === threadName);
        const newInstance = await createInstances(client, ThreadID.fromString(selectedDB.id), collectionName, [json.instance]);
        res.status(200).json(newInstance);
    } else if (req.method === "DELETE") {
        const client = await new TextileClient().init();
        const json = JSON.parse(req.body);
        const { collectionName, threadID, IDs } = json;
        try {
            await deleteInstances(client, ThreadID.fromString(threadID), collectionName, IDs);
            res.status(200).json({ "message": `Successfully deleted IDs: ${IDs}` });
        } catch (e) {
            console.log(e);
            res.status(500).json({ "message": `Error deleting IDs: ${IDs}` });
        }
    }
};