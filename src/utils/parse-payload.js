const parsePayload = (resp)=>{
    return JSON.parse(resp.data.payload)
}

export { parsePayload }