import { TextileClient, getInstancesByQuery, createInstances, deleteInstances } from "../index";
import { ThreadID, Query } from "@textile/hub";

export default async function instancesHandler(req, res) {
    if (req.method === "GET") {
        try {
            const client = await new TextileClient().init();
            const query = new Query().orderByIDDesc();
            const instances = await getInstancesByQuery(client, ThreadID.fromString(req.query.threadID), req.query.collectionName, query);
            res.status(200).json(instances);
        } catch (e) {
            console.log(e);
            res.status(500).json({ "message": `Error fetching instances.` });
        }
    } else if (req.method === "POST") {
        try {
            const client = await new TextileClient().init();
            const json = JSON.parse(req.body);
            const { collectionName, threadID, instance } = json;
            const newInstance = await createInstances(client, ThreadID.fromString(threadID), collectionName, [instance]);
            res.status(200).json(newInstance);
        } catch (e) {
            console.log(e);
            res.status(500).json({ "message": `Error creating instance.` });
        }
    } else if (req.method === "DELETE") {
        try {
            const client = await new TextileClient().init();
            const json = JSON.parse(req.body);
            const { collectionName, threadID, IDs } = json;
            await deleteInstances(client, ThreadID.fromString(threadID), collectionName, IDs);
            res.status(200).json({ "message": `Successfully deleted IDs: ${IDs}` });
        } catch (e) {
            console.log(e);
            res.status(500).json({ "message": `Error deleting instances.` });
        }
    } else {
        res.status(500).json({ "message": `Wrong API protocol.` });
    }
};