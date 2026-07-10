import portalTheme from "../../styles/portalTheme";
import useBreakpoint from "../../hooks/useBreakpoint";

export default function Solutions({ onOpenAgro }) {
  const { colors } = portalTheme;
  const { isMobileOrTablet } = useBreakpoint();

  return (
    <section
      style={{
        ...sectionStyle,
        flexDirection: isMobileOrTablet ? "column" : "row",
        alignItems: "center",
      }}
    >
      <SolutionCircle
        isMobileOrTablet={isMobileOrTablet}
        color={colors.agroGreen}
        title="AGRO-INDUSTRIE"
        text="De la parcelle à la performance, pilotez toute votre chaîne agro-industrielle."
        button="En savoir plus"
        onClick={onOpenAgro}
      />

      <SolutionCircle
        isMobileOrTablet={isMobileOrTablet}
        color={colors.publicOrange}
        title="INSTITUTIONS & ONG"
        text="Planifiez, suivez et évaluez vos programmes et projets pour un impact durable."
        button="En savoir plus"
      />

      <SolutionCircle
        isMobileOrTablet={isMobileOrTablet}
        color={colors.actionBlue}
        title="BTP & ARTISANAT"
        text="Une solution dédiée aux acteurs du bâtiment et des travaux publics."
        button="⌛ En préparation"
      />
    </section>
  );
}

function SolutionCircle({
  color,
  title,
  text,
  button,
  onClick,
  isMobileOrTablet,
}) {
  return (
    <div
      style={{
        ...circleStyle,
        width: isMobileOrTablet ? "205px" : "285px",
        height: isMobileOrTablet ? "205px" : "285px",
        padding: isMobileOrTablet ? "18px" : "28px",
        borderColor: color,
      }}
    >
      <h3
        style={{
          ...titleStyle,
          fontSize: isMobileOrTablet ? "14px" : "18px",
          color,
        }}
      >
        {title}
      </h3>

      <p
        style={{
          ...textStyle,
          fontSize: isMobileOrTablet ? "13px" : "14px",
        }}
      >
        {text}
      </p>

      <button
        style={{ ...buttonStyle, color, borderColor: color }}
        onClick={onClick}
      >
        {button}
      </button>
    </div>
  );
}

const sectionStyle = {
  display: "flex",
  justifyContent: "center",
  gap: "26px",
  marginTop: "34px",
};

const circleStyle = {
  borderRadius: "50%",
  border: "2px solid",
  background: "#FFFFFF",
  boxShadow: portalTheme.shadow.soft,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
};

const titleStyle = {
  fontWeight: "900",
};

const textStyle = {
  lineHeight: 1.5,
  color: portalTheme.colors.text,
};

const buttonStyle = {
  background: "#FFFFFF",
  border: "2px solid",
  borderRadius: "18px",
  padding: "10px 18px",
  fontWeight: "900",
  cursor: "pointer",
};