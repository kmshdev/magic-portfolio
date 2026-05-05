import { ImageResponse } from "next/og";

const size = {
  width: 1200,
  height: 630,
};

function clip(value: string, maxLength: number) {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength - 1).trimEnd()}…`;
}

function readParam(url: URL, key: string, fallback: string, maxLength: number) {
  return clip(url.searchParams.get(key)?.trim() || fallback, maxLength);
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const title = readParam(url, "title", "Keshav Mishra", 92);
  const description = readParam(
    url,
    "description",
    "Agent platforms, codegen tools, and production LLM systems.",
    148,
  );
  const label = readParam(url, "label", "Agent Platform Engineer", 48);

  return new ImageResponse(
    <div
      style={{
        alignItems: "stretch",
        background:
          "radial-gradient(circle at 18% 12%, rgba(28, 214, 255, 0.34), transparent 32%), radial-gradient(circle at 78% 20%, rgba(32, 229, 139, 0.22), transparent 30%), linear-gradient(135deg, #02070a 0%, #071317 54%, #020506 100%)",
        color: "#f7fbff",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Arial",
        height: "100%",
        justifyContent: "space-between",
        padding: 64,
        position: "relative",
        width: "100%",
      }}
    >
      <div
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          display: "flex",
          inset: 0,
          opacity: 0.42,
          position: "absolute",
        }}
      />
      <div
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            alignItems: "center",
            background: "rgba(255, 255, 255, 0.06)",
            border: "1px solid rgba(97, 232, 255, 0.35)",
            borderRadius: 999,
            display: "flex",
            gap: 14,
            padding: "14px 22px",
          }}
        >
          <div
            style={{
              background: "#32e7ff",
              borderRadius: 999,
              display: "flex",
              height: 10,
              width: 10,
            }}
          />
          <span
            style={{
              color: "#b9f5ff",
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: 0,
            }}
          >
            kmsh.dev
          </span>
        </div>
        <div
          style={{
            color: "#98ffcb",
            display: "flex",
            fontSize: 24,
            fontWeight: 700,
          }}
        >
          {label}
        </div>
      </div>

      <div
        style={{
          alignItems: "stretch",
          display: "flex",
          gap: 42,
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            background: "rgba(255, 255, 255, 0.075)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            borderRadius: 36,
            display: "flex",
            flex: 1,
            flexDirection: "column",
            gap: 28,
            justifyContent: "center",
            padding: 44,
          }}
        >
          <div
            style={{
              color: "#ffffff",
              display: "flex",
              fontSize: 68,
              fontWeight: 800,
              letterSpacing: -1.6,
              lineHeight: 1.02,
              maxWidth: 730,
            }}
          >
            {title}
          </div>
          <div
            style={{
              color: "#aeb8c4",
              display: "flex",
              fontSize: 30,
              lineHeight: 1.32,
              maxWidth: 720,
            }}
          >
            {description}
          </div>
        </div>

        <div
          style={{
            background: "#03070a",
            border: "1px solid rgba(97, 232, 255, 0.26)",
            borderRadius: 36,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 32,
            width: 286,
          }}
        >
          <div
            style={{
              alignItems: "center",
              display: "flex",
              height: 170,
              justifyContent: "center",
              position: "relative",
              width: "100%",
            }}
          >
            <div
              style={{
                border: "12px solid rgba(50, 231, 255, 0.25)",
                borderLeftColor: "#32e7ff",
                borderRadius: 999,
                display: "flex",
                height: 154,
                position: "absolute",
                width: 154,
              }}
            />
            <div
              style={{
                alignItems: "center",
                background: "linear-gradient(145deg, #071317, #0b2025)",
                border: "1px solid rgba(152, 255, 203, 0.35)",
                borderRadius: 30,
                color: "#ffffff",
                display: "flex",
                fontSize: 58,
                fontWeight: 900,
                height: 110,
                justifyContent: "center",
                letterSpacing: -3,
                width: 110,
              }}
            >
              K
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {["agent platforms", "LLM codegen", "production RAG"].map((item) => (
              <div
                key={item}
                style={{
                  alignItems: "center",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: 18,
                  color: "#d9e7ee",
                  display: "flex",
                  fontSize: 22,
                  fontWeight: 700,
                  gap: 12,
                  padding: "14px 16px",
                }}
              >
                <span
                  style={{
                    background: "#98ffcb",
                    borderRadius: 999,
                    display: "flex",
                    height: 8,
                    width: 8,
                  }}
                />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          alignItems: "center",
          color: "#71808a",
          display: "flex",
          fontSize: 22,
          justifyContent: "space-between",
          position: "relative",
          width: "100%",
        }}
      >
        <span>Keshav Mishra</span>
        <span>Agent systems with proof behind the claims</span>
      </div>
    </div>,
    size,
  );
}
