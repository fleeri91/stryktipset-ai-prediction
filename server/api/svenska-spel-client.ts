import axios from 'axios'
import { EventType } from '@/server/types/SvenskaSpel/EventType'
import { EventRoot } from '@/server/types/SvenskaSpel/Event'

export const svenskaSpelApiClient = axios.create({
  baseURL: process.env.SVENSKA_SPEL_API_URL,
  timeout: 10000,
})

svenskaSpelApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      'Svenska Spel API Error:',
      error.response?.data || error.message
    )
    throw error
  }
)

export const SvenskaSpelApi = {
  fetchEventByGameType: async (eventType: EventType): Promise<EventRoot> => {
    const res = await svenskaSpelApiClient.get<EventRoot>(
      `/${eventType}/draws?accesskey=${process.env.SVENSKA_SPEL_SECRET}`
    )
    return res.data
  },
}
