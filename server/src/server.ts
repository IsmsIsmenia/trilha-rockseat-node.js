import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi} from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import { 
    type ZodTypeProvider,
    jsonSchemaTransform,
    validatorCompiler,
    serializerCompiler,
} from 'fastify-type-provider-zod'
import { env } from './env'
import { subscribeToEventRoute } from './routes/subscribe-to-event-route'
import { accessInviteLinkRoute } from './routes/access-invite-links-route'
import { getSubscriberInviteClicksRoute } from './routes/get-subscriber-invite-clicks-route'
import { getSubscriberInviteCountRoute } from './routes/get-subscriber-invites-count-route'
import { getSubscriberRankingPositionRoute } from './routes/get-subscriber-ranking-position-route'
import { getRankingRoute } from './routes/get-ranking-route'


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
app.register(accessInviteLinkRoute)
app.register(getSubscriberInviteClicksRoute)
app.register(getSubscriberInviteCountRoute)
app.register(getSubscriberRankingPositionRoute)
app.register(getRankingRoute)

app.listen({ port: env.PORT}).then(()=>{
    console.log('HTTP server running!')
})