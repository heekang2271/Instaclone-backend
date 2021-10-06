# Instaclone

Instaclone Backend.

## To-do List

### User:

-   [x] Create Account
-   [x] See Profile
-   [x] Login
-   [x] Edit Profile
-   [x] Change Avatar (Image Upload)
-   [x] Follow User
-   [x] Unfollow User
-   [x] See Followers w/ Pagination
-   [x] See Following w/ Pagination
-   [x] Computed Fields
-   [x] Search Users

### Photos

-   [x] Upload Photo (Parse #)
-   [x] See Photo
-   [x] See Hashtags
-   [x] Search Photos
-   [x] Edit Photo
-   [x] Like / Unlike Photo
-   [ ] See Photo Likes
-   [ ] See Feed

## Set up

#### GraphQL

> npm i graphql

> npm install graphql-tools@7.0.2

#### Apollo-Server

> npm i apollo-server@2.25.2
> npm i apollo-server-express@2.19
> npm i express
> npm i morgan

#### Nodemon

> npm i nodemon --save-dev

Nodemon 사용시 script 앞에 nodemon --exec을 붙임

#### BaBel

node.js로 실행하는 경우, 문법 발전속도가 javascript보다 떨어짐.
따라서 Babel을 통해 문법을 맞춰주어야함.

> npm install --save-dev @babel/core

> npm install @babel/preset-env --save-dev

> npm install @babel/node --save-dev

babel.config.json 파일 생성 후 아래 코드 입력

```
{
    "presets": ["@babel/preset-env"]
}
```

babel 사용을 위해선 node server.js 식이 아닌 babel-node server 로 사용

#### Prisma

> npm install prisma -D

> npm install @prisma/client

> npx prisma init

migrate

> npx prisma migrate dev

studio

> npx prisma studio

#### dotenv

> npm install dotenv

#### file upload

아폴로에 파일 업로드시 stack maximum 관련 에러가 나면
package.json에 추가

```
"resolutions": {
    "fs-capacitor": "^6.2.0",
    "graphql-upload": "^11.0.0"
}
```

package.json의 scripts에 아래 내용 추가

```
"preinstall": "npx npm-force-resolutions@0.0.3",
```

이 후 node_modules 폴더 삭제하고 npm install
