import axios from 'axios'
import { env } from '../env'

export const api = axios.create({
    baseURL: env.FRONT_ENV === 'development' ? "http://localhost:3333" : "https://drhato-back.online",
})