import { redis } from "../redis/client"


interface GetSubscriberInvitesCountParams{
    subscriberId: string
}

export async function getSubscriberInvitesCount({
    subscriberId,
}: GetSubscriberInvitesCountParams){
    //await redis.hincrby('referral:access-count', subscriberId, 1)
    const count = await redis.zscore('referral:ranking', subscriberId)

    return { count: count ? Number.parseInt(count) : 0}
}