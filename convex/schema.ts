import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({

    users: defineTable({
        name: v.string(),
        email: v.string(),
        image: v.optional(v.string()),
        clerkId: v.string(),
    }).index('by_clerk_id', ['clerkId']), //by_clerk_id is index name, querying by clerkId

    plans: defineTable({
        userId: v.string(), //referenca na automatski generisani _id u users tabeli, ne na clerkId
        name: v.string(),
        workoutPlan: v.object({
            schedule: v.array(v.string()), //days of the week
            exercises: v.array(v.object({
                day: v.string(),
                routines: v.array(v.object({
                    name: v.string(),
                    sets: v.optional(v.number()),
                    reps: v.optional(v.number()),
                    duration: v.optional(v.string()),
                    description: v.optional(v.string()),
                    exercises: v.optional(v.array(v.string()))
                }))
            })),
        }),
        dietPlan: v.object({
            dailyCalories: v.number(),
            meals: v.array(v.object({
                name: v.string(), //breakfast, lunch ...
                foods: v.array(v.string())
            }))
        }),
        isActive: v.boolean()
    }).index('by_user_id', ['userId'])
        .index('by_active', ['isActive'])
})