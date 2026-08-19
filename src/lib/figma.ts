export interface FigmaEmbedOptions {
  embedHost?: string;
  hideUi?: boolean;
  scaling?: string;
  contentScaling?: string;
}

const DEFAULTS: Required<FigmaEmbedOptions> = {
  embedHost: "victoria-portfolio",
  hideUi: true,
  scaling: "scale-down-width",
  contentScaling: "fixed",
};

export function toFigmaEmbedUrl(
  protoUrl: string,
  options: FigmaEmbedOptions = {},
): string {
  const opts = { ...DEFAULTS, ...options };

  let url: URL;
  try {
    url = new URL(protoUrl);
  } catch {
    return protoUrl;
  }

  if (!/figma\.com$/.test(url.hostname) && !/\.figma\.com$/.test(url.hostname)) {
    return protoUrl;
  }

  url.hostname = "embed.figma.com";

  const params = url.searchParams;
  params.set("embed-host", opts.embedHost);
  if (opts.hideUi) params.set("hide-ui", "1");
  if (opts.scaling) params.set("scaling", opts.scaling);
  if (opts.contentScaling) params.set("content-scaling", opts.contentScaling);

  params.delete("t");
  params.delete("p");

  return url.toString();
}

export function isEmbeddableProto(protoUrl?: string): boolean {
  if (!protoUrl) return false;
  try {
    const params = new URL(protoUrl).searchParams;
    const node = params.get("node-id");
    const start = params.get("starting-point-node-id");
    if (!node || !start) return false;
    const norm = (s: string) => s.replace(/-/g, ":");
    return norm(node) === norm(start);
  } catch {
    return false;
  }
}
