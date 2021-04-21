import { TextileClient, getInstancesByQuery } from "../index";
import { ThreadID, Query } from "@textile/hub";

export default async function instancesHandler(req, res) {
    if (req.method === "GET") {
        const client = await new TextileClient().init();
        const query = new Query().orderByIDDesc();
        const instances = await getInstancesByQuery(client, ThreadID.fromString(req.query.threadID), req.query.collectionName, query)
        res.status(200).json(instances);
    }
};