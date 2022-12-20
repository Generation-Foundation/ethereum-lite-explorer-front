# Explorer-Frontend-test
explain explorer <br>
what is explorer

## Description
frontend server code

## Getting Started
### Setting up Server
- Go to the link below to set up the crawling server and backend server step by step.
  - <https://github.com/Generation-Foundation/Explorer-Crawling-test>
  - <https://github.com/Generation-Foundation/Explorer-Backend-test>


### Installing
**After the above server installation is complete, install the following tasks**
- Git clone this repo
```bash
git clone https://github.com/Generation-Foundation/Explorer-Frontend-test.git
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
**If you are only running on the local host**
<br>Front - http://localhost:3000
<br>Back - http://localhost:3001
<br>Crawling - http://localhost:3006
<bt>![Opensource Generation Explorer drawio](https://user-images.githubusercontent.com/93761302/208396226-e82f53c2-db3f-4e81-b665-a451efa90949.png)


## Contributors
by Danny, Woody

## Our Services and Community
- [Official Website](https://gen.foundation/)
- [Generation Explorer](https://dev-explorer.gen.foundation/)
