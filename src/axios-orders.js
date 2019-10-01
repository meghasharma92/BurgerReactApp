import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://burgerapp-78b0d.firebaseio.com/'
});

export default instance;