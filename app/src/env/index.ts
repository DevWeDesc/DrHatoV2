import z from 'zod'
import { envFrontSystem } from './env'

// schema de validações para as variavéis de ambiente com Zod
const envSchema = z.object({
  FRONT_ENV: z.enum(['development', 'testing', 'production']).default('development'),
})

// parse do schema para o process.env
const _env = envSchema.safeParse(envFrontSystem)


if(_env.success === false) {
  // formatação de erros atráves do metódo formart
  console.error("Invalid enviroment variable", _env.error.format())
  //derrubar aplicação caso falhe alguma váriavel de ambiente
  throw new Error("Invalid enviroment variable")
}

//export da _env para uso na aplicação
export const env = (_env.data)