export function handler(): Response {
  const baseUrl = Deno.env.get('BASE_DOMAIN');
  return Response.redirect(`${baseUrl}/blog/page/1`);
}
