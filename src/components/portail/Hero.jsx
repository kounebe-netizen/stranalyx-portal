import portalTheme from "../../styles/portalTheme";
import useBreakpoint from "../../hooks/useBreakpoint";

export default function Hero({ onNavigate }) {
  const { colors, shadow } = portalTheme;
  const { isMobileOrTablet } = useBreakpoint();

  return (
    <section
  style={{
    ...heroStyle,
    gridTemplateColumns: isMobileOrTablet ? "1fr" : "35% 65%",
    padding: isMobileOrTablet ? "24px 16px 0" : heroStyle.padding,
  }}
>
      <div style={leftStyle}>
        <h1
  style={{
    ...titleStyle,
    fontSize: isMobileOrTablet ? "34px" : titleStyle.fontSize,
  }}
>
          Pilotez. Décidez.
          <br />
          <span style={{ color: colors.actionBlue }}>Performez.</span>
        </h1>

        <p
  style={{
    ...subtitleStyle,
    fontSize: isMobileOrTablet ? "18px" : subtitleStyle.fontSize,
  }}
>
          La plateforme intelligente pour la <strong>planification</strong>,
          <br />
          le <strong>suivi</strong> et l’<strong>évaluation</strong> de vos activités.
        </p>

        <div style={noteStyle}>
          Stranalyx transforme vos données en informations fiables et vos plans
          en <strong> résultats concrets.</strong>
        </div>

        <button
        onClick={() => onNavigate?.("solutions")}
        style={{
    ...ctaStyle,
    width: isMobileOrTablet ? "320px" : "auto",
    display: "block",
    margin: isMobileOrTablet ? "22px auto 0" : ctaStyle.marginTop,
  }}
>Découvrir nos solutions ›</button>
      </div>

      <div
  style={{
    ...rightStyle,
    marginTop: isMobileOrTablet ? "34px" : 0,
  }}
>
        <h2
  style={{
    ...methodTitleStyle,
    fontSize: isMobileOrTablet ? "18px" : methodTitleStyle.fontSize,
  }}
>
          Notre approche en trois étapes clés
        </h2>

        <div
  style={{
    ...stepsRowStyle,
    flexDirection: isMobileOrTablet ? "column" : "row",
    alignItems: "center",
    gap: isMobileOrTablet ? "12px" : stepsRowStyle.gap,
  }}
>
          <Step title="PROJECTION" text="Anticiper et planifier avec précision" />
          <Arrow />
          <Step title="ACTION" text="Mettre en œuvre et piloter efficacement" />
          <Arrow />
          <Step title="ÉVALUATION" text="Mesurer, analyser et progresser" />
        </div>
      </div>
    </section>
  );
}

function Step({ title, text }) {
  return (
    <div style={stepStyle}>
      <div style={stepIconStyle}>◎</div>
      <h3 style={stepTitleStyle}>{title}</h3>
      <p style={stepTextStyle}>{text}</p>
    </div>
  );
}

function Arrow() {
  if (window.innerWidth <= 768) return null;

  return <div style={arrowStyle}>→</div>;
}

const heroStyle = {
  maxWidth: portalTheme.layout.maxWidth,
  margin: "0 auto",
  padding: "38px 48px 0",
  display: "grid",
  gridTemplateColumns: "35% 65%",
  alignItems: "start",
  gap: "22px",
};

const leftStyle = {
  textAlign: "left",
};

const titleStyle = {
  margin: 0,
  fontSize: "48px",
  lineHeight: 0.95,
  letterSpacing: "-1px",
  color: portalTheme.colors.stranalyxBlue,
  fontWeight: 900,
};

const subtitleStyle = {
  marginTop: "14px",
  fontSize: "21px",
  lineHeight: 1.45,
  color: portalTheme.colors.text,
};

const noteStyle = {
  marginTop: "28px",
  paddingLeft: "18px",
  borderLeft: `3px solid ${portalTheme.colors.actionBlue}`,
  maxWidth: "370px",
  fontSize: "16px",
  lineHeight: 1.55,
  color: portalTheme.colors.text,
};

const ctaStyle = {
  marginTop: "22px",
  background: portalTheme.colors.actionBlue,
  color: "#FFFFFF",
  border: "none",
  borderRadius: "18px",
  padding: "13px 24px",
  fontWeight: 900,
  fontSize: "16px",
  boxShadow: portalTheme.shadow.button,
  cursor: "pointer",
};

const rightStyle = {
  textAlign: "center",
  paddingTop: "8px",
};

const methodTitleStyle = {
  marginTop: 0,
  marginBottom: "28px",
  fontSize: "22px",
  color: portalTheme.colors.stranalyxBlue,
  fontWeight: 900,
};

const stepsRowStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  gap: "28px",
};

const stepStyle = {
  width: "175px",
  textAlign: "center",
  marginBottom: "12px",
};

const stepIconStyle = {
  width: "84px",
  height: "84px",
  margin: "0 auto 10px",
  borderRadius: "50%",
  background: "#FFFFFF",
  border: `1px solid ${portalTheme.colors.border}`,
  boxShadow: portalTheme.shadow.soft,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: portalTheme.colors.actionBlue,
  fontSize: "38px",
  fontWeight: 900,
};

const stepTitleStyle = {
  margin: 0,
  color: portalTheme.colors.actionBlue,
  fontSize: "15px",
  fontWeight: 900,
};

const stepTextStyle = {
  marginTop: "8px",
  color: portalTheme.colors.text,
  fontSize: "14px",
  lineHeight: 1.45,
  fontWeight: 500,
};

const arrowStyle = {
  fontSize: "48px",
  color: "#B5BDCA",
  marginTop: "16px",
};