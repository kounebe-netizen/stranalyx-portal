import portalTheme from "../../styles/portalTheme";
import useBreakpoint from "../../hooks/useBreakpoint";
import {
  ShieldCheck,
  ChartNoAxesCombined,
  Target,
  Headphones,
} from "lucide-react";

export default function TrustBar() {
  const { shadow } = portalTheme;
  const { isMobileOrTablet } = useBreakpoint();

  return (
    <section
      style={{
        padding: isMobileOrTablet ? "20px 16px" : "26px 40px 18px",
        background: "#F8FAFD",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          background: "#FFFFFF",
          borderRadius: "18px",
          boxShadow: shadow.soft,
          display: "grid",
          gridTemplateColumns: isMobileOrTablet
            ? "1fr"
            : "repeat(4, 1fr)",
          overflow: "hidden",
        }}
      >
        <Feature
          isMobileOrTablet={isMobileOrTablet}
          icon={
  <ShieldCheck
    size={36}
    strokeWidth={2.4}
    color={portalTheme.colors.stranalyxBlue}
  />
}
          title="Fiable & Sécurisé"
          text="Vos données sont protégées et confidentielles."
        />

        <Feature
          isMobileOrTablet={isMobileOrTablet}
          icon={<ChartNoAxesCombined size={36} strokeWidth={2.4} />}
          title="Simple & Intuitif"
          text="Une prise en main rapide et un usage quotidien facilité."
        />

        <Feature
          isMobileOrTablet={isMobileOrTablet}
          icon={<Target size={36} strokeWidth={2.4} />}
          title="Orienté Résultats"
          text="Des outils puissants pour des décisions éclairées."
        />

        <Feature
          isMobileOrTablet={isMobileOrTablet}
          icon={<Headphones size={36} strokeWidth={2.4} />}
          title="Accompagnement"
          text="Nous sommes à vos côtés à chaque étape."
          last
        />
      </div>
    </section>
  );
}

function Feature({
  icon,
  title,
  text,
  last,
  isMobileOrTablet,
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: isMobileOrTablet ? "14px" : "18px",
        padding: isMobileOrTablet ? "20px 18px" : "24px 22px",
        minHeight: isMobileOrTablet ? "auto" : "96px",
        borderRight: isMobileOrTablet
          ? "none"
          : last
          ? "none"
          : `1px solid ${portalTheme.colors.border}`,
        borderBottom:
          isMobileOrTablet && !last
            ? `1px solid ${portalTheme.colors.border}`
            : "none",
      }}
    >
      <div
        style={{
          fontSize: isMobileOrTablet ? "34px" : "42px",
          width: isMobileOrTablet ? "34px" : "42px",
          textAlign: "center",
        }}
      >
        {icon}
      </div>

      <div>
        <div
          style={{
            fontWeight: 800,
            fontSize: isMobileOrTablet ? "16px" : "18px",
            color: portalTheme.colors.stranalyxBlue,
            marginBottom: "4px",
          }}
        >
          {title}
        </div>

        <div
          style={{
            fontSize: isMobileOrTablet ? "14px" : "15px",
            lineHeight: 1.45,
            color: portalTheme.colors.text,
          }}
        >
          {text}
        </div>
      </div>
    </div>
  );
}