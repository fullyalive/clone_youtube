// server코드와는 연관되지 않는 100% 클라이언트 코드 : babel-node 사용불가, 구식 JS 사용
const path = require("path");
const autoprefixer = require("autoprefixer");
const ExtractCSS = require("extract-text-webpack-plugin"); // webpack에게 CSS를 가지고 뭘 어떻게 할지 알려준다

const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "static");

const config = {
  entry: ENTRY_FILE,
  mode: MODE,
  module: {
    rules: [
      {
        // SCSS 파일을 찾아서 CSS로 바꾸고, 그 CSS에 해당하는 텍스트 전체를 추출해서 CSS파일로 저장
        test: /\.(scss)$/, // SCSS로 끝나는 어떤 modul(이 경우에는 styles.scss)을 만나게 되면 --
        use: ExtractCSS.extract([
          // -- 이 plugin을 사용 : 이 애는 또 내부에서 SCSS 파일을 일반적인 CSS로 통역하는 plugin을 사용
          {
            loader: "css-loader" // webpack이 CSS를 이해할 수 있도록
          },
          {
            loader: "postcss-loader", // CSS를 받아서 우리가 주는 plugin을 가지고 CSS를 변환한다(호환))
            options: {
              plugin() {
                return [autoprefixer({ browsers: "cover 99.5%" })]; // 시중 브라우저의 99.5%와 호환되는 옵션
              }
            }
          },
          {
            loader: "sass-loader" // Sass, Scss를 받아서 일반 CSS로 바꿔준다.
          }
        ])
      }
    ]
  },
  output: {
    path: OUTPUT_DIR, // output의 경로는 OUTPUT_DIR
    filename: "[name].js" // export할 파일들의 이름
  },
  plugins: [new ExtractCSS("styles.css")]
};

module.exports = config;
