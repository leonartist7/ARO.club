import { ImageResponse } from "next/og";

export const alt = "ARO — Life opens up. Learn, earn and connect.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ display: "flex", position: "relative", width: "100%", height: "100%", overflow: "hidden", backgroundColor: "#F05A28", color: "#FFF8EE", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", position: "absolute", width: 460, height: 460, right: -115, top: 115, border: "34px solid #FFD447", borderRadius: 999 }} />
      <div style={{ display: "flex", position: "absolute", width: 280, height: 280, right: 17, top: 240, border: "2px solid rgba(255,248,238,0.35)", borderRadius: 999 }} />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between", padding: "56px 64px", width: "100%", height: "100%" }}>
        <svg width="220" height="76" viewBox="0 0 211 72" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <g fill="none" stroke="#FFF8EE" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 61 30 12 Q33 5 36 12 L59 61 M18 43 H49" />
            <path d="M76 61 V12 H99 C113 12 121 18 121 29 C121 40 113 46 99 46 H76 M100 46 124 61" />
            <path d="M183 15 A25 25 0 1 0 195 37" />
          </g>
          <circle cx="195" cy="17" r="5.5" fill="#FFF8EE" />
        </svg>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 850 }}>
          <div style={{ fontSize: 88, fontWeight: 700, letterSpacing: -5, lineHeight: 1.04 }}>Life opens up.</div>
          <div style={{ display: "flex", alignSelf: "flex-start", marginTop: 29, padding: "14px 22px", borderRadius: 14, backgroundColor: "#FFD447", color: "#252420", fontSize: 27, fontWeight: 700, letterSpacing: 1 }}>Learn · Earn · Connect</div>
        </div>
      </div>
    </div>,
    size,
  );
}
