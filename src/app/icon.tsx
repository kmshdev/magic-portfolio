import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background:
          "radial-gradient(circle at 28% 20%, rgba(50, 231, 255, 0.6), transparent 34%), linear-gradient(145deg, #02070a, #071317)",
        color: "#ffffff",
        display: "flex",
        height: "100%",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <div
        style={{
          alignItems: "center",
          border: "2px solid rgba(152, 255, 203, 0.62)",
          borderRadius: 18,
          display: "flex",
          fontFamily: "Arial",
          fontSize: 36,
          fontWeight: 900,
          height: 48,
          justifyContent: "center",
          letterSpacing: -3,
          width: 48,
        }}
      >
        K
      </div>
    </div>,
    size,
  );
}
