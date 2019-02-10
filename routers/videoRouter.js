import express from "express";
import routes from "../routes";
import {
  getVideoUpload,
  postVideoUpload,
  videoDetail,
  videoEdit,
  videoDelete
} from "../controllers/videoController";
import { uploadVideo } from "../middlewares";

const videoRouter = express.Router();

// method="get" 요청을 처리하는 컨트롤러
videoRouter.get(routes.videoUpload, getVideoUpload);
videoRouter.post(routes.videoUpload, uploadVideo, postVideoUpload); // uploadVideo는 middlewares에서 설정, postVideoUpload function이 해당 file에 접근
videoRouter.get(routes.videoDetail(), videoDetail);
videoRouter.get(routes.videoEdit, videoEdit);
videoRouter.get(routes.videoDelete, videoDelete);

export default videoRouter;
