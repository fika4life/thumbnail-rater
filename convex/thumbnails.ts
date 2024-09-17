import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const createThumbnail = mutation({
  args: { title: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (user === null) throw new Error('Not authenticated');

    const newThumbnail = await ctx.db.insert('thumbnails', {
      title: args.title,
      userId: user?.subject
    });
    return newThumbnail;
  }
});

export const getThumbnailsForUser = query({
  handler: async (ctx) => {
    const user = await ctx.auth.getUserIdentity();
    console.log(user);

    if (!user) throw new Error('Not authenticated');
    const thumbnails = await ctx.db
      .query('thumbnails')
      .filter((q) => q.eq(q.field('userId'), user.subject))
      .collect();

    return thumbnails;
  }
});
