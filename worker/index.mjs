const worker = {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === "www.warmandcozy.club") {
      url.hostname = "warmandcozy.club";
      return Response.redirect(url.toString(), 301);
    }
    return env.ASSETS.fetch(request);
  },
};

export default worker;
