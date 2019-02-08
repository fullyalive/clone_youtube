// Global URLs

const HOME = "/";
const SEARCH = "/search";
const SIGNUP = "/signup";
const LOGIN = "/login";
const LOGOUT = "/logout";

// Users

const USERS = "/users";
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";
const USER_DETAIL = "/:id";

// Videos

const VIDEOS = "/videos";
const VIDEO_UPLOAD = "/upload";
const VIDEO_DETAIL = "/:id";
const VIDEO_EDIT = "/:id/edit";
const VIDEO_DELETE = "/:id/delete";

const routes = {
  // Global
  home: HOME,
  search: SEARCH,
  signup: SIGNUP,
  login: LOGIN,
  logout: LOGOUT,
  // Users
  users: USERS,
  userDetail: USER_DETAIL,
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  // Videos
  videos: VIDEOS,
  videoDetail: VIDEO_DETAIL,
  videoUpload: VIDEO_UPLOAD,
  videoEdit: VIDEO_EDIT,
  videoDelete: VIDEO_DELETE
};

export default routes;
