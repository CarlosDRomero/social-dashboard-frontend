import axios from "axios"

const backendRoot = "http://localhost:5000"

export const fetchApi = async (api: string, search: string)  => {
  const { data } = await axios.get(`${backendRoot}/search/${api}?q=${search}`)
  return data
}