import axios from 'axios';
import { REST_API_URL } from './constants'

const API_URL = `${REST_API_URL}/api/form`;

const createForm = (userId, token) => {
    const config = {
        headers:{
            "Authorization": "Bearer "+ token
        }
      };

    return axios.post(API_URL+"/user/"+userId, {}, config);
}

const createSlide = (formId, token, slideId, question) => {
    const config = (token) ={
        headers:{
                "Authorization": "Bearer "+ token
        }
    }

    const questionObject = {
        slideId,
        question
    }

    return axios.patch(API_URL+"/"+formId, questionObject, config);
}

const getQuestionsById = (formId, token) => {
    const config = (token) ={
        headers:{
                "Authorization": "Bearer "+ token
        }
    }
    return axios.get(API_URL+"/"+formId, config)
}

const deleteQuestionById = (formId, questionId, token) => {
    const config = (token) ={
        headers:{
                "Authorization": "Bearer "+ token
        }
    }
    return axios.delete(API_URL+"/"+formId+"?questionId="+questionId, config)
}

export { createForm, createSlide, getQuestionsById, deleteQuestionById }