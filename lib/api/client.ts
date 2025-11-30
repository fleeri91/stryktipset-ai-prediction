import axios from 'axios'

const getBaseURL = () => {
  if (process.env.NODE_ENV === 'production') {
    return '/api/'
  } else {
    return 'http://localhost:3000/api/'
  }
}

export const api = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
})

export const fetcher = async (url: string) => {
  const res = await api.get(url)
  return res.data
}

export const clientApi = {}
