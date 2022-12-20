# ethereum-lite-explorer-frontend

## Description
This project is an open-source block explorer on EVM chain. If you follow this repository, you can run explorer in localhost. This repository provides [crawling code](https://github.com/Generation-Foundation/ethereum-lite-explorer-crawling) and [backend code](https://github.com/Generation-Foundation/ethereum-lite-explorer-back) for Explorer, and you can find frontend code in this repository.

## Preview
<img width="800" alt="image" src="https://user-images.githubusercontent.com/93761302/208592091-dd02cd8d-2962-4362-b070-f4397db626d5.png">
<img width="800" alt="image" src="https://user-images.githubusercontent.com/93761302/208592404-dc90629a-72e0-4629-8ab0-b624b2c1ed68.png">
<img width="800" alt="image" src="https://user-images.githubusercontent.com/93761302/208592500-f9ff0923-e5ca-47bc-93f9-dc3aa13f402e.png">

## Getting Started
### Setting up Server
- **Go to the link below to set up server step by step.**
- First, set up Crawling server and Database
  - <https://github.com/Generation-Foundation/ethereum-lite-explorer-crawling>
- Second, set up Backend server
  - <https://github.com/Generation-Foundation/ethereum-lite-explorer-back>


### Installing
**After the above server installation is complete, install the following tasks**
- Git clone this repo
```bash
git clone https://github.com/Generation-Foundation/ethereum-lite-explorer-front.git
```
- **On macOS and Ubuntu**, create ``.env`` to set GENERATE_SOURCEMAP
```env
GENERATE_SOURCEMAP=false
```
- **On Window**, modify ``package.json`` to set GENERATE_SOURCEMAP
```javascript
  "scripts": {
    "start": ""set \"GENERATE_SOURCEMAP=false\" && node scripts/start.js",
    "build": ""set \"GENERATE_SOURCEMAP=false\" && node scripts/build.js",
    "test": "node scripts/test.js"
  },
```
- Modify 'baseURL' in ``/src/redux/reducer/etherApi.js`` to your blockchain RPC URL
```javascript
import axios from "axios";

const etherApi = axios.create({
    //change your blockchain rpc url
    baseURL : "https://eth.public-rpc.com",
    //baseURL : "https://testnet-rpc-seoul.gen.foundation",
    headers : {'content-type' : "application/json"}
})

export default etherApi
```
- Modify 'baseURL' in ``/src/redux/reducer/dbApi.js`` to your backend server
```javascript
import axios from "axios";

const dbApi = axios.create({
    //change your backend server
    baseURL : "http://localhost:3001",
    headers : {'content-type' : "application/json"}
})

export default dbApi
```
- Run it local with the following command
```bash
npm install --save
npm start
```
### Deploy
Deployed using AWS amplify.
```bash
npm run build
```

### Architecture
**If running only on localhost, it will proceed on the following ports.**
- Front - http://localhost:3000
- Back - http://localhost:3001
- Crawling - http://localhost:3006
<bt>![Opensource Generation Explorer drawio (1)](https://user-images.githubusercontent.com/93761302/208598512-272dea9f-fd65-41f1-9da1-c425f30ff7b9.png)


## Contributors
Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<table>
  <tr>
    <td align="center"><a href="https://github.com/Booyoun-Kim"><img src="https://avatars.githubusercontent.com/u/34641838?v=4" width="100px;" alt=""/><br /><sub><b>Ben</b></sub></a><br /><a>🧑‍🏫</a> <a>🤔</a> <a>📆</a> <a>💬</a></td>
    <td align="center"><a href="https://github.com/Jaewoneeee"><img src="https://avatars.githubusercontent.com/u/93761302?v=4" width="100px;" alt=""/><br /><sub><b>Danny</b></sub></a><br /><a>💻</a> <a>🤔</a> <a>🔣</a> <a>📖</a> <a>🚧</a></td> 
    <td align="center"><a href="https://github.com/hyeok96"><img src="https://avatars.githubusercontent.com/u/86933513?v=4" width="100px;" alt=""/><br /><sub><b>Woody</b></sub></a><br /><a>💻</a> <a>⚠️</a></td>
  </tr>
</table>
  
## Developed
Developing by [Generation Foundation](https://github.com/Generation-Foundation)
<br>
  
<img width="270" alt="" src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/e385adbc-8b74-45c6-ab5e-92b1b0510748/Generation_01.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221220%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221220T052307Z&X-Amz-Expires=86400&X-Amz-Signature=5b6d663784a1f7362e75ba4bf831fc01e2ce290660ac88a86e04c744ae9dd9a8&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Generation_01.png%22&x-id=GetObject" />
  
## Our Services and Community
- [Official Website](https://gen.foundation/)
- [Generation Explorer](https://dev-explorer.gen.foundation/)
