import axios from "axios";

const dbApi = axios.create({
    baseURL : "http://localhost:3001",
    //baseURL : "https://dev-explorer-server.gen.foundation",
    headers : {'content-type' : "application/json"}
})

export default dbApi