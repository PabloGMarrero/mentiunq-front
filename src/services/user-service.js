import axios from 'axios'
import { REST_API_URL } from './constants'
import { createGenericConfig } from './generic-service'

const API_URL = `${REST_API_URL}/api/user`

const getById = (userId, token) => {
  return axios.get(API_URL + '/forms/' + userId, createGenericConfig(token))
}

export { getById }
