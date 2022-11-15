export const createGenericConfig = (token) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  }

  return config
}
