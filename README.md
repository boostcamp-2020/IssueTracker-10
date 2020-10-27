# IssueTracker-10

> 부스트캠프 그룹프로젝트 J10

​

​

## I. Server

> Server에 관한 설명입니다.

​

### ERD

![issueTracker_ERD](https://user-images.githubusercontent.com/60081031/97281184-8b7c6d00-1880-11eb-920a-329290c62935.PNG)

### 1. root/pacakage.json

```json
"devDependencies": {
    "babel-eslint": "^10.1.0",
    "eslint": "^5.16.0",
    "eslint-config-airbnb": "^18.2.0",
    "eslint-config-prettier": "^6.14.0",
    "eslint-loader": "^4.0.2",
    "eslint-plugin-import": "^2.22.1",
    "eslint-plugin-jsx-a11y": "^6.4.1",
    "eslint-plugin-prettier": "^3.1.4",
    "eslint-plugin-react": "^7.21.5",
    "eslint-plugin-react-hooks": "^4.0.0",
    "prettier": "2.1.2",
    "pretty-quick": "^3.1.0"
 }
```

- airbnb style로 eslint & prettier 설정

### 2. server/package.json

```json
"dependencies": {
    "helmet": "^4.1.1",
    "sequelize": "^6.3.5"
},
"devDependencies": {
    "cors": "^2.8.5"
}
```

​

- mysql을 쉽게 다루기 위해 **객체와 관계형 데이터베이스의 관계를 매핑 해주는 도구** `sequelize`를 사용하였습니다.
- server의 앱의 취약성을 보완하기 위해 helmet 모듈을 사용.
- cors issue 해결을 위해 cors 모듈 사용
