import axios from 'axios';

const setAuthToken = token => {
    console.log(token);
    if(token) {
        return axios.create({
            headers: {
                'token': token
            }
        })
    } else {
        delete axios.defaults.headers.common['token']
    }
}

export default setAuthToken;