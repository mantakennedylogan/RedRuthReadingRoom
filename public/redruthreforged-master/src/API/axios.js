import axios from "axios";

// TODO: Update with prod value

export default axios.create({
    // local machine
    // baseURL: 'http://localhost:8000'
    
    // prod
    baseURL: 'https://redruthreforged-server-master.onrender.com'
});