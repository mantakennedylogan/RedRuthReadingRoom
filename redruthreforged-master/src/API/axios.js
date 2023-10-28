import axios from "axios";

// TODO: Update with prod value

export default axios.create({
    baseURL: 'http://localhost:8000'
});