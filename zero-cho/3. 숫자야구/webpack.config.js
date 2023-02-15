// webpack을 쓰는 이유: script들이 너무 많아서 하나로 합쳐 관리하기 위함
module.exports = {
  entry: {
    app: "./main.js"  // 하나로 합쳐질 파일의 경로
  },
  module: {   // webpack의 핵심인 module!
    rules: [{}],  // 파일을 하나로 합칠 때 어떤 식으로 합칠 지 || 처리할 지 정하는 부분
  },
  plugins: {},
  output: {
    filename: "[name].js", // entry의 app 설정에서 만들어질 파일의 이름을 여기서 설정
    // filename: "app.js",
    // entry에서 이름을 설정했으니 [name]이라고 하면 entry에서 설정한 이름 값인 app이 들어감
    path: "./dist", // 하나로 합쳐진 결과물을 저장할 폴더 지정 (dist = distribution의 약어)

  },
//  가장 중요한 4가지 설정 entry, module, plugins, output
};