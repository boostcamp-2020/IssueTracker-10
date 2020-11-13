# 왕 🔟 리 Server 🖥

> [API 명세서 Click!](https://github.com/boostcamp-2020/IssueTracker-10/wiki/API-%EB%AA%85%EC%84%B8%EC%84%9C---0.-Common)

### 0. Stack

Node express | MySQL | sequalize | pm2
--- | --- | --- | ---
 ![image](https://user-images.githubusercontent.com/43198553/99028218-90485d00-25b2-11eb-9cf3-5fe1d450c53e.png) | ![image](https://user-images.githubusercontent.com/43198553/99028276-ba018400-25b2-11eb-947e-f58a25bf5e5e.png) | ![image](https://user-images.githubusercontent.com/43198553/99028312-cc7bbd80-25b2-11eb-970c-0df863f22381.png) | ![image](https://user-images.githubusercontent.com/43198553/99028327-d7365280-25b2-11eb-952e-e25f4c473110.png)

### 1. server/package.json

```json
"dependencies": {
    "cookie-parser": "~1.4.4",
    "debug": "~2.6.9",
    "dotenv": "^8.2.0",
    "express": "~4.16.1",
    "helmet": "^4.1.1",
    "http-errors": "~1.6.3",
    "jsonwebtoken": "^8.5.1",
    "morgan": "~1.9.1",
    "multer": "^1.4.2",
    "mysql2": "^2.2.5",
    "passport": "^0.4.1",
    "passport-jwt": "^4.0.0",
    "sequelize": "^6.3.5",
    "uuid": "^8.3.1"
},
"devDependencies": {
    "axios": "^0.21.0",
    "cors": "^2.8.5",
    "mocha": "^8.2.0",
    "should": "^13.2.3",
    "supertest": "^6.0.0"
}
```
- mysql을 쉽게 다루기 위해 **객체와 관계형 데이터베이스의 관계를 매핑 해주는 도구** `sequelize`를 사용하였습니다.
- server의 앱의 취약성을 보완하기 위해 `helmet` 모듈을 사용.
- cors issue 해결을 위해 `cors` 모듈 사용
- TDD 개발에 필요한 모듈 : `mocha`, `supertest`, `should`
- OAuth 때 필요한 http request 요청 -> `uuid`, `axios` 설치
- multer : 파일 업로드할 때 사용하는 모듈

### 2. directory 구조
```
.
├── .env-template
├── README.md
├── bin
├── node_modules
├── controllers
├── middlewares
├── models
│   ├── config
│   └── database
├── public
│   └── upload
├── services
└── utils
```
- `controllers` : routing
- `services` : business logic
- `middlewares`
- `models`/`database` : DB structure (sequlize)
- `models` : db model functions (operation)
- `utils` : utilize
​
### 3. deploy

```
배포 링크 : http://49.50.163.58:3000
```

- `pm2` 기반으로 nCloud 서버에 배포