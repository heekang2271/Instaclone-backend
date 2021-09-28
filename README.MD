# Instaclone

Instaclone Backend.

## Set up

#### GraphQL

> npm i graphql
> npm install graphql-tools@7.0.2

#### Apollo-Server

> npm i apollo-server@2.25.2

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
