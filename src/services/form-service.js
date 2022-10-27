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

const createQuestion = (formId, token, slideId, question) => {
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

const getQuestionsByFormId = (formId, token) => {
    const config = {
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

const getFormByCode = (code, token) => {
    const config = {
        headers:{
            "Authorization": "Bearer "+ token
        }
    };

    return axios.get(API_URL+"/code/"+code, config)
}

const createOption = (formId, token, questionId, option) => {
    const config = (token) ={
        headers:{
                "Authorization": "Bearer "+ token
        }
    }

    return axios.patch(API_URL+"/"+formId+"/question/"+questionId, option, config);
}

const updateNewCurrentQuestion = (questionId, formId, token) => {
    const config = {
        headers:{
            "Authorization": "Bearer "+ token
        }
    };

    return axios.patch(API_URL+"/"+formId+"/current/question/"+questionId, {}, config);
}

export { createForm, createQuestion, getQuestionsByFormId as getQuestionsById, deleteQuestionById, getFormByCode, createOption, updateNewCurrentQuestion }