# IssueTracker Project

> 부스트캠프 그룹프로젝트 팀 10 (👨‍👩‍👦‍👦  왕10리)

![image](https://user-images.githubusercontent.com/43198553/99027417-84f43200-25b0-11eb-9ed6-e732acf4fb48.png)

## Member
> 왕십리 팀원을 소개합니다!

> 🐳 **공태경** [J012]  [@Taeg92](https://github.com/Taeg92) <br/>
 🐈 **박수연** [J079]  [@Park-SooYeon](https://github.com/Park-SooYeon) <br/>
🐘 **안샛별** [J109] [@sbyeol3 ](https://github.com/sbyeol3) <br/>
🐧 **강민석** [S001]  [@kati-kms](https://github.com/kati-kms) <br/>
🐥 **채훈기** [S058] [@hoonv](https://github.com/hoonv) <br/>

*요란한 음료, 대용량 아메리카노와 함께 하는 우리 팀~*

<p align="center"><img src="https://octodex.github.com/images/steroidtocat.png" width="30%"></p>

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

- [Back-end ⚙️](https://github.com/boostcamp-2020/IssueTracker-10/-tree/master/server)
- [iOS 🍎](https://github.com/boostcamp-2020/IssueTracker-10/tree/master/iOS)
- [Front-end 🎨](https://github.com/boostcamp-2020/IssueTracker-10/tree/master/client)

### deploy

```
서버 배포 링크 : http://49.50.163.58:3000 
웹 배포 링크 : http://49.50.163.58
```

- `pm2` 기반으로 nCloud 서버에 백엔드 배포
- `nginx`로 React 배포

### root/pacakage.json

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
