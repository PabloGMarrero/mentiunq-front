import axios from 'axios';
import { REST_API_URL } from './constants'
import React, { useState, useContext, createContext, useMemo } from "react";

const API_URL = `${REST_API_URL}/oauth`;

export const authenticate = (request) => {
    return axios.post(API_URL + "/authenticate", request);
}