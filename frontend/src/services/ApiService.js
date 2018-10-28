import axios from 'axios';

class ApiService {
    constructor() {
        if (process.env.NODE_ENV === 'development') {
            this.BASE_URL = 'http://localhost:3000'
        } else {
            this.BASE_URL = '';
        }
    }

    getJSON(url) {
        return axios.get(this.BASE_URL + url).then(resp => resp.data);
    }

    putJSON(url, payload) {
        return axios.put(this.BASE_URL + url, payload).then(resp => resp.data);
    }

    postJSON(url, payload) {
        return axios.post(this.BASE_URL + url, payload).then(resp => resp.data);
    }

    deleteJSON(url) {
        return axios.delete(this.BASE_URL + url).then(resp => resp.data);
    }
}

export default new ApiService();