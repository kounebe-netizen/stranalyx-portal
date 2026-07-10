import theme from "../styles/stranalyxTheme";
import logoStranalyx from "./logo-stranalyx-solutions.png";

function Header() {
  return (
    <header style={headerStyle}>
      <div style={logoContainerStyle}>
        <img
          src={logoStranalyx}
          alt="Stranalyx Solutions"
          style={logoStyle}
        />
      </div>

      <div style={centerStyle}>
        <h1 style={activityStyle}>Agro-Industrie</h1>
        <p style={subtitleStyle}>Générateur de fichier parcelles</p>
      </div>

      <div style={rightStyle}>
        <strong>Base 2</strong>
        <br />
        Référentiel technique
      </div>
    </header>
  );
}

const headerStyle = {
  background: theme.colors.card,
  border: `1px solid ${theme.colors.border}`,
  borderRadius: "10px",
  boxShadow: theme.shadow.card,
  padding: "14px 22px",
  marginBottom: "18px",
  display: "grid",
  gridTemplateColumns: "180px 1fr 180px",
  alignItems: "center"
};

const logoContainerStyle = {
  width: "150px",
  height: "95px",
  borderRadius: "8px",
  border: `1px solid ${theme.colors.border}`,
  background: "#FFFFFF",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  flexShrink: 0
};

const logoStyle = {
  width: "160px",
  height: "90px",
  objectFit: "contain"
};

const centerStyle = {
  textAlign: "center"
};

const activityStyle = {
  margin: 0,
  color: theme.colors.primary,
  fontSize: "20px",
  fontWeight: "700",
  lineHeight: 1.1,
  fontFamily: '"Segoe UI", "Arial", sans-serif',
  letterSpacing: "-0.2px"
};

const subtitleStyle = {
  margin: "8px 0 0 0",
  color: theme.colors.textLight,
  fontSize: "12px"
};

const rightStyle = {
  textAlign: "right",
  fontSize: "12px",
  lineHeight: 1.35,
  color: theme.colors.text
};

export default Header;