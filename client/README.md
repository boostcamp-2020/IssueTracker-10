# 왕 🔟 리 Client 🎨

## Demo

로그인 | 깃허브 연결
--- | ---
![image](https://user-images.githubusercontent.com/43198553/99028927-7ad43280-25b4-11eb-86e5-8f961ae7f39c.png) | ![깃허브 연결](https://user-images.githubusercontent.com/60081031/98319436-19481d00-2024-11eb-8f4b-4e6b6068d57d.png)
메인 페이지 | 레이블
![image](https://user-images.githubusercontent.com/43198553/99028809-29c43e80-25b4-11eb-8eb8-58eee2c7c88b.png) | ![image](https://user-images.githubusercontent.com/43198553/99028974-9a6b5b00-25b4-11eb-9c9f-9ff1fd3551be.png)
마일스톤 | 이슈 디테일
![image](https://user-images.githubusercontent.com/43198553/99029003-ad7e2b00-25b4-11eb-919a-f424a1cbd5cb.png) | ![image](https://user-images.githubusercontent.com/43198553/99029049-cb4b9000-25b4-11eb-90a5-d44e734a4adb.png)



## Description

### 0. Stack

React.js | Styled-components | nginx
--- | --- | ---
![image](https://user-images.githubusercontent.com/43198553/99028486-398f5300-25b3-11eb-97da-482db6544164.png) | ![image](https://user-images.githubusercontent.com/43198553/99028506-4449e800-25b3-11eb-97f2-16460c3122d2.png) | ![image](https://user-images.githubusercontent.com/43198553/99028554-63487a00-25b3-11eb-8ef4-ab7213903266.png)

### 1. package.json

```json
"dependencies": {
    "axios": "^0.21.0",
    "babel-polyfill": "^6.26.0",
    "dotenv": "^8.2.0",
    "path": "^0.12.7",
    "process": "^0.11.10",
    "react": "^17.0.1",
    "react-dom": "^17.0.1",
    "react-markdown": "^5.0.2",
    "react-router-dom": "^5.2.0",
    "react-toastify": "^6.1.0",
    "react-syntax-highlighter": "^15.3.0",
    "remark-gfm": "^1.0.0",
    "styled-components": "^5.2.1",
    "styled-reset": "^4.3.0",
    "uuid": "^8.3.1"
},
"devDependencies": {
    "@babel/core": "^7.12.3",
    "@babel/preset-env": "^7.12.1",
    "@babel/preset-react": "^7.12.1",
    "babel-loader": "^8.1.0",
    "babel-plugin-module-resolver": "^4.0.0",
    "clean-webpack-plugin": "^3.0.0",
    "css-loader": "^5.0.0",
    "dotenv-webpack": "^5.0.1",
    "file-loader": "^6.2.0",
    "html-webpack-plugin": "^4.5.0",
    "mini-css-extract-plugin": "^1.2.1",
    "style-loader": "^2.0.0",
    "path-browserify": "^1.0.1",
    "webpack": "^5.3.2",
    "webpack-cli": "^3.3.12",
    "webpack-dev-server": "^3.11.0"
}
```

- axios : data fetch
- react에 필요한 모듈 : `react` `react-dom`
- 마크다운 렌더링 : `react-markdown` `react-syntax-highlighter` `remark-gfm`
- css in js : `styled-components` `styled-reset`

### 2. directory 구조

```
.
├── public
└── src
    ├── Api
    ├── Components
    │   ├── Provider
    │   └── static
    ├── Context
    ├── Routes
    └── utils
```

### 3. deploy

```
배포 링크 : http://49.50.163.58
```

- `nginx` 기반으로 nCloud 서버에 배포