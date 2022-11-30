import axios from "axios"
import { REST_API_URL } from "./constants"
import { createGenericConfig } from "./generic-service"

const API_URL = `${REST_API_URL}/api/form`

const createForm = (userId, token) => {
  return axios.post(API_URL + "/user/" + userId, {}, createGenericConfig(token))
}

const createQuestion = (formId, token, slideId, question) => {
  const questionObject = {
    slideId,
    question,
  }

  return axios.patch(
    API_URL + "/" + formId,
    questionObject,
    createGenericConfig(token),
  )
}

const getQuestionsByFormId = (formId, token) => {
  return axios.get(API_URL + "/" + formId, createGenericConfig(token))
}

const renameFormById = (formId, token, formName) => {
  const formRequest = {
    name: formName,
  }

  return axios.patch(
    API_URL + "/" + formId + "/rename",
    formRequest,
    createGenericConfig(token),
  )
}
const deleteFormById = (formId, token) => {
  return axios.delete(API_URL + "/" + formId, createGenericConfig(token))
}

const deleteQuestionById = (formId, questionId, token) => {
  return axios.delete(
    API_URL + "/" + formId + "/question/" + questionId,
    createGenericConfig(token),
  )
}

const getFormByCode = (code, token) => {
  return axios.get(API_URL + "/code/" + code, createGenericConfig(token))
}

const getResultsByFormCode = (code, token) => {
  return axios.get(
    API_URL + "/code/" + code + "/results",
    createGenericConfig(token),
  )
}

const createOption = (formId, token, questionId, option) => {
  return axios.patch(
    API_URL + "/" + formId + "/question/" + questionId,
    option,
    createGenericConfig(token),
  )
}

const updateNewCurrentQuestion = (questionId, formId, token) => {
  return axios.patch(
    API_URL + "/" + formId + "/current/question/" + questionId,
    {},
    createGenericConfig(token),
  )
}

const updateQuestionName = (formId, token, questionId, request) => {
  return axios.patch(
    API_URL + "/" + formId + "/update/question/" + questionId,
    request,
    createGenericConfig(token),
  )
}

const deleteOptionById = (formId, optionId, token) => {
  return axios.delete(
    API_URL + "/" + formId + "/option/" + optionId,
    createGenericConfig(token),
  )
}

const updateOptionName = (formId, token, optionId, request) => {
  return axios.patch(
    API_URL + "/" + formId + "/update/option/" + optionId,
    request,
    createGenericConfig(token),
  )
}

const updateContent = (codeShare, token, questionId, name) => {
  const request = {
    question: name,
  }

  return axios.patch(
    API_URL + "/updateContent/" + codeShare + "/question/" + questionId,
    request,
    createGenericConfig(token),
  )
}

const duplicateForm = (formId, token) => {
  return axios.post(
    API_URL + "/duplicate/" + formId,
    {},
    createGenericConfig(token),
  )
}

export {
  createForm,
  createQuestion,
  getQuestionsByFormId as getQuestionsById,
  deleteFormById,
  deleteQuestionById,
  getFormByCode,
  createOption,
  updateNewCurrentQuestion,
  renameFormById,
  getResultsByFormCode,
  updateQuestionName,
  deleteOptionById,
  updateOptionName,
  updateContent,
  duplicateForm,
}
