import axios from 'axios';
import { REST_API_URL } from './constants'

const API_URL = `${REST_API_URL}/api/form`;

const createForm = (userId, token) => {
    const config = {
        headers:{
            "Authorization": "Bearer "+ token
        }
      };

    return axios.post(API_URL+"/"+userId, {}, config);
}

export {createForm}