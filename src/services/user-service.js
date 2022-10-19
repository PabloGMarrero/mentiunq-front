import axios from 'axios';
import { REST_API_URL } from './constants'

const API_URL = `${REST_API_URL}/api/user`;

const getById = (userId, token) => {
    const config = {
        headers:{
            "Authorization": "Bearer "+ token
        }
      };

    return axios.get(API_URL+"/forms/"+userId, config);
}

export {getById}