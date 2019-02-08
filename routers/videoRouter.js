import express from "express";
import routes from "../routes";

const videoRouter = express.Router();

videoRouter.get(routes.videos, (req, res) => res.send("Videos"));
videoRouter.get(routes.videoDetail, (req, res) => res.send("Video Detail"));
videoRouter.get(routes.videoUpload, (req, res) => res.send("Upload Video"));
videoRouter.get(routes.videoEdit, (req, res) => res.send("Edit Video"));
videoRouter.get(routes.videoDelete, (req, res) => res.send("Delete Video"));

export default videoRouter;
