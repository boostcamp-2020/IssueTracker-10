# IssueTracker Project

> 부스트캠프 그룹프로젝트 팀 10

<p align="center"><img src="https://octodex.github.com/images/steroidtocat.png" width="70%"></p>


## Member
> 팀원을 소개합니다!

👨‍👩‍👦‍👦왕10리

> 🐳 **공태경** [J012]  [@Taeg92](https://github.com/Taeg92) <br/>
 🐈 **박수연** [J079]  [@Park-SooYeon](https://github.com/Park-SooYeon) <br/>
🐘 **안샛별** [J109] [@sbyeol3 ](https://github.com/sbyeol3) <br/>
🐧 **강민석** [S001]  [@kati-kms](https://github.com/kati-kms) <br/>
🐥 **채훈기** [S058] [@hoonv](https://github.com/hoonv) <br/>


## WIKI 🗒
>[WIKI에 놀러오세요~](https://github.com/boostcamp-2020/IssueTracker-10/wiki)
>

## Team Rule ⚙️
- [Ground Rules](https://github.com/boostcamp-2020/IssueTracker-10/wiki/01.-Ground-Rules)
- [Issue Template](https://github.com/boostcamp-2020/IssueTracker-10/wiki/05.-Issue-Template)
- [PR Template](https://github.com/boostcamp-2020/IssueTracker-10/wiki/02.-PR-Template)
- [Commit Template](https://github.com/boostcamp-2020/IssueTracker-10/wiki/03.-Commit-Template)
- [Git Flows & Branch Naming Convention](https://github.com/boostcamp-2020/IssueTracker-10/wiki/04.-Git-Flows-&-Branch-Naming-Convention)
  
## Project
- [project backlogs](https://docs.google.com/spreadsheets/d/1EuBIlPTZk7xBFAkUquUIizwFApHUo1B9y8EUyKeIBO4/edit?usp=sharing)
- ERD
![issueTracker_ERD](https://user-images.githubusercontent.com/60081031/97946876-f7099180-1dce-11eb-8e95-198a975ba1a9.PNG)
​
​
### Git flow
```
* master
|\_docs
|__dev
   |\_iOS
   |   \_feat/{기능}#이슈번호
    \_web
       \_feat/{기능}#이슈번호
```

---

## 1️⃣ Server
> Server에 관한 설명입니다.

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
​
### 2. server/package.json

```json
"dependencies": {
    "axios": "^0.21.0",
    "jsonwebtoken": "^8.5.1",
    "helmet": "^4.1.1",
    "sequelize": "^6.3.5",
    "passport": "^0.4.1",
    "passport-jwt": "^4.0.0",
    "uuid": "^8.3.1"
},
"devDependencies": {
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
​
### 3. deploy

```
배포 링크 : http://49.50.163.58:3000
```

- `pm2` 기반으로 nCloud 서버에 배포

## 2️⃣ iOS

### filter 

<img width="600" alt="스크린샷 2020-10-29 오후 8 04 01" src="https://user-images.githubusercontent.com/46335714/97560360-e5686880-1a21-11eb-89a0-da7447b0e9dd.png">

### Demo

#####  1주차
|                             edit                             |                            search                            |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
| <img width="200" src="https://user-images.githubusercontent.com/46335714/97559219-7cccbc00-1a20-11eb-8d4b-406ad6e92f0d.gif"> | <img width="200" src="https://user-images.githubusercontent.com/46335714/97560497-12b51680-1a22-11eb-8b60-544c8a10750b.gif"> |


##### 2주차
|                            search                            |                         delete Issue                         |                        apply filters                         |                         create issue                         |
| :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| <img width="200" src="https://user-images.githubusercontent.com/19145853/98321886-7b575100-2029-11eb-875a-39ff93a6d73d.gif"> | <img width="200" src="https://user-images.githubusercontent.com/19145853/98321897-84482280-2029-11eb-8cb9-523d86147ecf.gif"> | <img width="200" src="https://user-images.githubusercontent.com/19145853/98321900-8611e600-2029-11eb-99e8-dd8217dbf957.gif"> | <img width="200" src="https://user-images.githubusercontent.com/19145853/98322193-341d9000-202a-11eb-936c-82ed1e443623.gif"> |

## 3️⃣ Client

### 로그인 페이지

![로그인](https://user-images.githubusercontent.com/60081031/98319388-fc134e80-2023-11eb-8f95-9d3390d3caa1.png)
![깃허브 연결](https://user-images.githubusercontent.com/60081031/98319436-19481d00-2024-11eb-8f4b-4e6b6068d57d.png)
![메인페이지](https://user-images.githubusercontent.com/43198553/98320780-f8cd9200-2026-11eb-87b5-fc64d04c7a52.png)
