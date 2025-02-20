import { z } from "zod"
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { env } from "../env"
import { accessInviteLink } from "../functions/access-invite-link"
import { redis } from "../redis/client"


export const accessInviteLinkRoute: FastifyPluginAsyncZod = async (app) =>{
    app.get('/invites/:subscriberId', {
        schema: {
            summary: 'Access invite link and redirects user',
            tags: ['referral'],
            params: z.object({
                subscriberId: z.string(),
            }),
            response: {
            302: z.null(),
            },
        },
    }, async (request, reply) => {
        const {subscriberId} = request.params

        await accessInviteLink({ subscriberId })

        // console.log(await redis.hgetall('referral:access-count')) consegue ver se funciona quando acessa o link e a quantidade

        const redirectUrl = new URL(env.WEB_URL)

        redirectUrl.searchParams.set('referrer', subscriberId)

        return reply.redirect(redirectUrl.toString(),302)
        }
    )
}