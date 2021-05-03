import { TextileClient, listCollections } from "../index";
import { ThreadID } from "@textile/hub";

export default async function collectionsHandler(req, res) {
    if (req.method === "GET") {
        const client = await new TextileClient().init();
        const collections = await listCollections(client, ThreadID.fromString(req.query.threadID))
        res.status(200).json(collections);
    }
};
