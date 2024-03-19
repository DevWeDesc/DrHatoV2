import axios from 'axios'
import { env } from '../env'

export const api = axios.create({
    baseURL: env.FRONT_ENV === 'development' ? "https://drhato-back.online" : "https://drhato-back.online",
})

