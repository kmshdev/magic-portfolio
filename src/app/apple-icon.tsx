import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background:
          "radial-gradient(circle at 24% 18%, rgba(50, 231, 255, 0.62), transparent 34%), radial-gradient(circle at 82% 78%, rgba(152, 255, 203, 0.28), transparent 28%), linear-gradient(145deg, #02070a, #071317)",
        display: "flex",
        height: "100%",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <div
        style={{
          alignItems: "center",
          background: "rgba(255, 255, 255, 0.06)",
          border: "4px solid rgba(152, 255, 203, 0.62)",
          borderRadius: 42,
          color: "#ffffff",
          display: "flex",
          fontFamily: "Arial",
          fontSize: 104,
          fontWeight: 900,
          height: 126,
          justifyContent: "center",
          letterSpacing: -9,
          width: 126,
        }}
      >
        K
      </div>
    </div>,
    size,
  );
}
