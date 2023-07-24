import axios from "axios"
import { REST_API_URL } from "./constants"
import { createGenericConfig } from "./generic-service"

const API_URL = `${REST_API_URL}/answer`

const getQuestionByCodeShare = (codeShare, token) => {
  return axios.get(
    API_URL + "/form/" + codeShare + "/question/current",
    createGenericConfig(token),
  )
}

const getVotingQuestion = (formCodeShare) => {
  return axios.get(API_URL + "/form/" + formCodeShare + "/question/current")
}

const vote = (formCodeShare, questionId, optionId) => {
  return axios.post(
    API_URL +
      "/form/" +
      formCodeShare +
      "/question/" +
      questionId +
      "/option/" +
      optionId,
    {},
  )
}

const addResponse = (codeShare, questionId, response) => {
  const request = {
    option: response,
  }

  return axios.post(
    API_URL + "/form/" + codeShare + "/question/" + questionId + "/response",
    request,
  )
}

const getFormByCodeShare = (formCodeShare) => {
  return axios.get(API_URL + "/formCode/" + formCodeShare)
}

export {
  getQuestionByCodeShare,
  getVotingQuestion,
  vote,
  addResponse,
  getFormByCodeShare,
}
