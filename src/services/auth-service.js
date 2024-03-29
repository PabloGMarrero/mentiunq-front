import axios from "axios"
import { REST_API_URL } from "./constants"

const API_URL = `${REST_API_URL}/oauth`

export const authenticate = (request) => {
  return axios.post(API_URL + "/authenticate", request)
}
