const {VueLoaderPlugin} = require("vue-loader");  // 이 부분은 https://vue-loader.vuejs.org/guide/#vue-cli 참고함(강의와 다름)
const path = require("path");
// 웹팩 5버전 설명 참고: https://www.zerocho.com/category/Webpack/post/58aa916d745ca90018e5301d

// webpack을 쓰는 이유: script들이 너무 많아서 하나로 합쳐 관리하기 위함
module.exports = {
  mode: 'development',
  devtool: "eval",
  resolve: {  //
    extensions: [".js", ".vue"], // 확장자 처리  >> main.js등에서 파일 import 시 파일 확장자를 일일이 붙여줘야하는데, 이를 제거할 수 있게끔 도와줌
  },
  entry: {
    app: path.join(__dirname, "main.js"),  // 하나로 합쳐질 파일의 경로
  },
  module: {   // webpack의 핵심인 module!
    rules: [{ // js가 아닌 것들이 추가될 때마다 rules에 loader를 등록해주면 그 파일들을 js로 변환해주게 됨 
      test: /\.vue$/,
      loader: "vue-loader",
    }],  // 파일을 하나로 합칠 때 어떤 식으로 합칠 지 || 처리할 지 정하는 부분
  },
  plugins: [
    new VueLoaderPlugin()
  ],  // module에서 처리된 결과를 plugins를 통해 추가 후처리하는 느낌
  // entry에 설정된 파일 기준으로 파일 읽음 -> module에 명시한 방법으로 파일 병합 -> plugins에 명시한 plugin 적용/가공 -> output에 설정한 경로+파일명으로 결과물 도출
  output: {
    filename: "[name].js", // entry의 app 설정에서 만들어질 파일의 이름을 여기서 설정
    // filename: "app.js",
    // entry에서 이름을 설정했으니 [name]이라고 하면 entry에서 설정한 이름 값인 app이 들어감
    path: path.join(__dirname, "dist"), // 하나로 합쳐진 결과물을 저장할 폴더 지정 (dist = distribution의 약어)

  },
//  가장 중요한 4가지 설정 entry, module, plugins, output
};