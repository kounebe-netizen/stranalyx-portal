import portalTheme from "../../styles/portalTheme";

export default function ThreeSteps() {
  const { colors } = portalTheme;

  return (
    <section style={sectionStyle}>
      <h2 style={titleStyle}>Projection → Action → Évaluation</h2>
      <p style={subtitleStyle}>Le triptyque Stranalyx</p>

      <div style={stepsRowStyle}>
        <Step title="Projection" text="Anticiper, analyser et planifier." color={colors.actionBlue} />
        <Arrow />
        <Step title="Action" text="Mettre en œuvre, suivre et piloter." color={colors.actionBlue} />
        <Arrow />
        <Step title="Évaluation" text="Mesurer, comparer et améliorer." color={colors.actionBlue} />
      </div>
    </section>
  );
}

function Step({ title, text, color }) {
  return (
    <div style={stepStyle}>
      <div style={{ ...circleStyle, borderColor: color }}>◎</div>
      <h3 style={{ ...stepTitleStyle, color }}>{title}</h3>
      <p style={stepTextStyle}>{text}</p>
    </div>
  );
}

function Arrow() {
  return <div style={arrowStyle}>→</div>;
}

const sectionStyle = {
  textAlign: "center",
  padding: "18px 40px 0",
};

const titleStyle = {
  margin: 0,
  color: portalTheme.colors.stranalyxBlue,
  fontSize: "28px",
  fontWeight: 900,
};

const subtitleStyle = {
  marginTop: "6px",
  marginBottom: "22px",
  color: portalTheme.colors.mutedText,
  fontWeight: 700,
};

const stepsRowStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  gap: "30px",
};

const stepStyle = {
  width: "180px",
};

const circleStyle = {
  width: "76px",
  height: "76px",
  margin: "0 auto 12px",
  borderRadius: "50%",
  border: "2px solid",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: portalTheme.colors.actionBlue,
  fontSize: "38px",
  fontWeight: 900,
  boxShadow: portalTheme.shadow.soft,
  background: "#FFFFFF",
};

const stepTitleStyle = {
  margin: 0,
  fontSize: "18px",
  fontWeight: 900,
};

const stepTextStyle = {
  marginTop: "8px",
  color: portalTheme.colors.text,
  fontSize: "14px",
  lineHeight: 1.45,
  fontWeight: 700,
};

const arrowStyle = {
  fontSize: "46px",
  color: "#B5BDCA",
  marginTop: "16px",
};