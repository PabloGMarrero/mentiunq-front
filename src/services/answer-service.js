import axios from 'axios';
import { REST_API_URL } from './constants'

const API_URL = `${REST_API_URL}/answer`;

const getQuestionByCodeShare = (codeShare, token) => {
    const config ={
        headers:{
                "Authorization": "Bearer "+ token
        }
    }
    return axios.get(API_URL+"/form/"+codeShare+"/question/current", config)
}


const getVotingQuestion = (formCodeShare) => {
    return axios.get(API_URL+`/form/`+formCodeShare+`/question/current`)
}

const vote = (formCodeShare, questionId, optionId) => {
    return axios.post(API_URL+"/form/"+formCodeShare+"/question/"+questionId+"/option/"+optionId, {});
}


export { getQuestionByCodeShare, getVotingQuestion, vote }
