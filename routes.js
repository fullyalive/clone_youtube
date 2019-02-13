// Global URLs

const HOME = "/";
const SEARCH = "/search";
const SIGNUP = "/signup";
const LOGIN = "/login";
const LOGOUT = "/logout";

// Social Login

const GITHUB = "/auth/github";
const GITHUB_CALLBACK = "/auth/github/callback";

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
  // Social Login
  github: GITHUB,
  githubCallback: GITHUB_CALLBACK,
  // Users
  users: USERS,
  userDetail: id => {
    if (id) {
      return `/users/${id}`;
    }
    return USER_DETAIL;
  },
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  // Videos
  videos: VIDEOS,
  videoUpload: VIDEO_UPLOAD,
  videoDetail: id => {
    if (id) {
      return `/videos/${id}`;
    }
    return VIDEO_DETAIL;
  },
  videoEdit: id => {
    if (id) {
      return `/videos/${id}/edit`;
    }
    return VIDEO_EDIT;
  },
  videoDelete: id => {
    if (id) {
      return `/videos/${id}/delete`;
    }
    return VIDEO_DELETE;
  }
};

export default routes;
