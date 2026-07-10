import portalTheme from "../../styles/portalTheme";
import useBreakpoint from "../../hooks/useBreakpoint";
import { BadgeCheck, Users } from "lucide-react";

export default function Footer() {
  const { isMobileOrTablet } = useBreakpoint();

  return (
    <footer
      style={{
        marginTop: "40px",
        background:
          "linear-gradient(90deg, #0A2E67 0%, #0B3574 55%, #11428B 100%)",
        color: "#FFFFFF",
        padding: isMobileOrTablet ? "24px 20px" : "28px 60px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: isMobileOrTablet
            ? "1fr"
            : "2.2fr 1.2fr 0.9fr",
          alignItems: "center",
          gap: isMobileOrTablet ? "0" : "28px",
          textAlign: isMobileOrTablet ? "center" : "left",
        }}
      >
        <FooterBlock
          isMobileOrTablet={isMobileOrTablet}
          icon={<BadgeCheck size={isMobileOrTablet ? 34 : 42} />}
          title={
            <>
              Stranalyx, votre{" "}
              <span style={{ color: "#38BDF8" }}>
                partenaire de confiance
              </span>
            </>
          }
          text="Des solutions conçues pour s'adapter à vos réalités et accélérer votre réussite."
        />

        <FooterBlock
          isMobileOrTablet={isMobileOrTablet}
          icon={<Users size={isMobileOrTablet ? 34 : 40} />}
          title="Ils nous font confiance"
          text="Entrepreneurs, agriculteurs, ONG, PME et administrations."
          separator
        />

        <FooterBlock
          isMobileOrTablet={isMobileOrTablet}
          icon={
            <div
              style={{
                fontSize: isMobileOrTablet ? "42px" : "52px",
                fontWeight: 900,
                lineHeight: 1,
              }}
            >
              1
            </div>
          }
          title="Objectif commun"
          text="Votre performance durable."
          separator
        />
      </div>
    </footer>
  );
}

function FooterBlock({
  icon,
  title,
  text,
  separator,
  isMobileOrTablet,
}) {
  return (
    <div
      style={{
        borderLeft:
          !isMobileOrTablet && separator
            ? "1px solid rgba(255,255,255,0.25)"
            : "none",
        borderTop:
          isMobileOrTablet && separator
            ? "1px solid rgba(255,255,255,0.25)"
            : "none",
        paddingLeft: !isMobileOrTablet && separator ? "28px" : 0,
        paddingTop: isMobileOrTablet && separator ? "12px" : 0,
        paddingBottom: isMobileOrTablet ? "12px" : 0,
        display: "flex",
        flexDirection: isMobileOrTablet ? "column" : "row",
        alignItems: "center",
        justifyContent: isMobileOrTablet ? "center" : "flex-start",
        gap: isMobileOrTablet ? "8px" : "18px",
        minHeight: isMobileOrTablet ? "84px" : "90px",
      }}
    >
      <div
  style={{
    color: "#38BDF8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginTop: isMobileOrTablet && separator ? "10px" : 0,
  }}
>
  {icon}
</div>

      <div>
        <div
          style={{
            fontSize: isMobileOrTablet ? "17px" : "21px",
            fontWeight: 900,
            lineHeight: 1.2,
          }}
        >
          {title}
        </div>

        <div
          style={{
            marginTop: "6px",
            fontSize: isMobileOrTablet ? "14px" : "15px",
            lineHeight: 1.45,
            opacity: 0.92,
          }}
        >
          {text}
        </div>
      </div>
    </div>
  );
}