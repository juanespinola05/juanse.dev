import { Handlers } from '$fresh/server.ts';

export const handler: Handlers = {
  GET(req, ctx) {
    return ctx.renderNotFound();
  },
};
