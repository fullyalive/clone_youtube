import express from "express";
import routes from "../routes";
import {
  getVideoUpload,
  postVideoUpload,
  getVideoEdit,
  postVideoEdit,
  videoDetail,
  videoDelete
} from "../controllers/videoController";
import { uploadVideo } from "../middlewares";

const videoRouter = express.Router();

// 동영상 업로드
videoRouter.get(routes.videoUpload, getVideoUpload); // method="get" 요청을 처리하는 컨트롤러
videoRouter.post(routes.videoUpload, uploadVideo, postVideoUpload); // uploadVideo는 middlewares에서 설정, postVideoUpload function이 해당 file에 접근

// 동영상 정보
videoRouter.get(routes.videoDetail(), videoDetail);

// 동영상 수정
videoRouter.get(routes.videoEdit(), getVideoEdit);
videoRouter.post(routes.videoEdit(), postVideoEdit);

// 동영상 삭제
videoRouter.get(routes.videoDelete, videoDelete);

export default videoRouter;
