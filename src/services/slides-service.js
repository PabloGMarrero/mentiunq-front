//import axios from 'axios';
import { REST_API_URL } from './constants'

const API_URL = `${REST_API_URL}/slides`;

const popular = [
    {
        label: "Multiple choice",
        value: "multiple-choice",
    },
    {
        label: "Word cloud",
        value: "word-cloud",
    },
    {
        label: "Open ended",
        value: "open-ended",
    },
    {
        label: "Scales",
        value: "scales",
    },
    {
        label: "Ranking",
        value: "Ranking",
    },
    {
        label: "Q&A",
        value: "q-a",
    }

]

const quiz = [
    {
        label: "Select Answer",
        value: "select-answer",
    },
    {
        label: "Type Answer",
        value: "type-answer",
    }
]

const content = [
    {
        label: "Heading",
        value: "heading",
    },
    {
        label: "Paragraph",
        value: "paragraph",
    },
    {
        label: "Bullets",
        value: "bullets",
    },
    {
        label: "Image",
        value: "Image",
    },
    {
        label: "Video",
        value: "Video",
    }

]

const mock = [
    {label:"Popular Questions", options: popular},
    {label:"Quiz Competition", options: quiz},
    {label:"Content slides", options: content},    
]

export let findAll = () => new Promise(resolve => resolve(mock));