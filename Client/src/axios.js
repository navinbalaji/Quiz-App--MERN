import axios from 'axios'

const instance=axios.create({
    baseURL:'https://localquiz.herokuapp.com',
})

export default instance;
