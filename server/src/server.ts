import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'
import { 
    type ZodTypeProvider,
    jsonSchemaTransform,
    validatorCompiler,
    serializerCompiler,
} from 'fastify-type-provider-zod'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi} from '@fastify/swagger-ui'
import { subscribeToEventRoute } from './routes/subscribe-to-event-route'
import { env } from './env'


const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register (fastifyCors,{
    origin: 'http://localhost:3001'
})

app.register (fastifySwagger,{
    openapi:{
        info:{
            title: 'NLW Connect',
            version: '0.0.1',
        },
    },
    transform: jsonSchemaTransform,
})

app.register (fastifySwaggerUi,{
    routePrefix: '/docs'
})

app.register(subscribeToEventRoute)

app.listen({ port: env.PORT}).then(()=>{
    console.log('HTTP server running!')
})