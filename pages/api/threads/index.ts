import { HUB_KEY, HUB_SECRET } from "../../../config.js";

export default function threadsHandler(req, res) {
    res.status(200).json({ message: 'Hello World!' })
}
