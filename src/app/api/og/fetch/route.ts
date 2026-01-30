import { NextResponse } from "next/server";

export const runtime = "edge";

function decodeHTMLEntities(text: string): string {
  return text.replace(/&(#?[a-zA-Z0-9]+);/g, (match, entity) => {
    const entities: { [key: string]: string } = {
      amp: "&",
      lt: "<",
      gt: ">",
      quot: '"',
      apos: "'",
      "#x27": "'",
      "#39": "'",
      "#x26": "&",
      "#38": "&",
    };

    if (entity.startsWith("#")) {
      const code = entity.startsWith("#x")
        ? parseInt(entity.slice(2), 16)
        : parseInt(entity.slice(1), 10);
      return String.fromCharCode(code);
    }

    return entities[entity] || match;
  });
}

async function fetchWithTimeout(url: string, timeout = 5000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "bot",
      },
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

async function extractMetadata(html: string) {
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  const descMatch =
    html.match(/<meta[^>]*name="description"[^>]*content="([^"]+)"[^>]*>/i) ||
    html.match(/<meta[^>]*content="([^"]+)"[^>]*name="description"[^>]*>/i) ||
    html.match(/<meta[^>]*property="og:description"[^>]*content="([^"]+)"[^>]*>/i);
  const imageMatch =
    html.match(/<meta[^>]*property="og:image"[^>]*content="([^"]+)"[^>]*>/i) ||
    html.match(/<meta[^>]*content="([^"]+)"[^>]*property="og:image"[^>]*>/i);

  const title = titleMatch?.[1]?.trim() || "";
  const description = descMatch?.[1]?.trim() || "";
  const image = imageMatch?.[1]?.trim() || "";

  return {
    title: decodeHTMLEntities(title),
    description: decodeHTMLEntities(description),
    image: image,
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  // Validate URL to prevent SSRF attacks
  try {
    const parsedUrl = new URL(url);
    
    // Only allow HTTP/HTTPS protocols
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      return NextResponse.json({ error: "Invalid URL protocol" }, { status: 400 });
    }
    
    // Block private IP ranges, localhost, and internal hostnames
    const hostname = parsedUrl.hostname.toLowerCase();
    if (
      hostname === 'localhost' ||
      hostname.startsWith('127.') ||
      hostname.startsWith('10.') ||
      hostname.startsWith('192.168.') ||
      hostname.match(/^172\.(1[6-9]|2[0-9]|3[0-1])\./) ||
      hostname === '::1' ||
      hostname === '0.0.0.0' ||
      hostname === '169.254.169.254' ||
      hostname.endsWith('.internal') ||
      hostname.endsWith('.local')
    ) {
      return NextResponse.json({ error: "Disallowed URL" }, { status: 400 });
    }
  } catch (e) {
    return NextResponse.json({ error: "Invalid URL format" }, { status: 400 });
  }

  try {
    const response = await fetchWithTimeout(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.status}`);
    }

    const html = await response.text();
    const metadata = await extractMetadata(html);

    return NextResponse.json({
      ...metadata,
      url,
    });
  } catch (error) {
    console.error(
      "Error fetching metadata:",
      error instanceof Error ? error.message : String(error),
    );

    return NextResponse.json(
      {
        error: "Failed to fetch metadata",
        message: error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 },
    );
  }
}
