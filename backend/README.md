[![Website](https://img.shields.io/website-up-down-green-red/http/shields.io.svg?label=elky-essay)](https://elky84.github.io)
<img src="https://img.shields.io/badge/made%20with-JavaScript-brightgreen.svg" alt="made with JavaScript">

![GitHub forks](https://img.shields.io/github/forks/elky84/community_notifier.svg?style=social&label=Fork)
![GitHub stars](https://img.shields.io/github/stars/elky84/community_notifier.svg?style=social&label=Stars)
![GitHub watchers](https://img.shields.io/github/watchers/elky84/community_notifier.svg?style=social&label=Watch)
![GitHub followers](https://img.shields.io/github/followers/elky84.svg?style=social&label=Follow)

![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)
![GitHub repo size in bytes](https://img.shields.io/github/repo-size/elky84/community_notifier.svg)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/elky84/community_notifier.svg)

# Community Notifier
MongoDB를 읽고, 크롤링된 정보를 notification 해주는 서비스입니다.

```
$ npm install
$ node app.js
```

10초에 하나씩 꺼내서 커맨드로 실행해줍니다.

![snore_toast](./snore_toast.png)

이 프로젝트는 <https://github.com/elky84/community_notifier> 프로젝트에서 크롤링한 정보를 바탕으로 동작합니다.

local에 설치된 mongodb를 바탕으로 동작하므로, 해당 설정 정보를 수정하셔야 합니다.