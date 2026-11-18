// Serves the generated markdown version of a page when the client asks for it with
// `Accept: text/markdown`. Everything else is passed through to the static files.
// Runs only for the paths in public/_routes.json, so assets never invoke it.

interface Context {
  request: Request;
  env: { ASSETS: { fetch: (request: Request | URL) => Promise<Response> } };
  next: () => Promise<Response>;
}

// Must stay in sync with the paths in public/_routes.json.
const markdownFiles: Record<string, string> = {
  "/": "/home.md",
  "/services/": "/services.md",
  "/pricing/": "/pricing.md",
  "/contact/": "/contact.md",
};

/** True when text/markdown is accepted and ranked at least as high as text/html. */
const prefersMarkdown = (accept: string | null): boolean => {
  if (!accept) return false;
  const quality = (type: string): number => {
    let best = 0;
    for (const part of accept.split(",")) {
      const [mime, ...params] = part.trim().split(";");
      if (mime.trim().toLowerCase() !== type) continue;
      const q = params.map((p) => p.trim()).find((p) => p.startsWith("q="));
      best = Math.max(best, q ? Number(q.slice(2)) || 0 : 1);
    }
    return best;
  };
  const markdown = quality("text/markdown");
  return markdown > 0 && markdown >= quality("text/html");
};

/** Rough estimate: about 3 characters per token, a bit pessimistic because the text is Hungarian. */
const estimateTokens = (text: string): number => Math.ceil(text.length / 3);

export const onRequest = async ({ request, env, next }: Context): Promise<Response> => {
  const markdownPath = markdownFiles[new URL(request.url).pathname];
  const readOnly = request.method === "GET" || request.method === "HEAD";

  if (markdownPath && readOnly && prefersMarkdown(request.headers.get("Accept"))) {
    const asset = await env.ASSETS.fetch(new URL(markdownPath, request.url));
    if (asset.ok) {
      const markdown = await asset.text();
      const headers = new Headers(asset.headers);
      // The body is re-created from text, so the original length and encoding no longer apply.
      headers.delete("Content-Length");
      headers.delete("Content-Encoding");
      headers.append("Vary", "Accept");
      headers.set("X-Markdown-Tokens", String(estimateTokens(markdown)));
      return new Response(markdown, { status: asset.status, headers });
    }
  }

  // Both representations live under one URL, so caches have to key on Accept.
  const original = await next();
  const response = new Response(original.body, original);
  response.headers.append("Vary", "Accept");
  return response;
};
