import axios from 'axios'

export default class services {

    constructor() {

        this.service = axios.create({
            baseURL: 'http://localhost:3000/api/',
            withCredentials: true
        })
    }

    signup = (username, password, role) => {
        return this.service.post('/signup', { username, password, role })
            .then(response => response.data)
    }

    login = (username, password) => {
        return this.service.post('/login', { username, password })
            .then(response => response.data)
    }

    logout = () => {
        return this.service.get('/logout')
            .then(response => response.data)
    }

    loggedin = () => {
        return this.service.get('/loggedin')
            .then(response => response.data)
    }
}