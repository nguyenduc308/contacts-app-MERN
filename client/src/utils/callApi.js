import axios from 'axios';
const callApi = (token) => { 
    return axios.create({
        baseURL:"http://localhost:5000/api",
        headers: {
            token: token,
            'Content-Type': 'application/json'
        }
    })
}

export default callApi