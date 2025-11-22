import axios from "axios"

const backendRoot = "http://localhost:5000"

export const fetchApi = async (api: string, search: string)  => {
  const { data } = await axios.get<any[]>(`${backendRoot}/search/${api}?q=${search}`, {timeout: 999999})
  if (api === "tiktok" && data.length > 10) {
    return data.filter(e => !e.error)
  }
  return data
}