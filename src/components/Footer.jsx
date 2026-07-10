import theme from "../styles/stranalyxTheme";
import useBreakpoint from "../hooks/useBreakpoint";

function Footer() {
  const { isMobileOrTablet } = useBreakpoint();

  return (
    <footer
      style={{
        ...footerStyle,
        paddingTop: isMobileOrTablet ? "16px" : footerStyle.paddingTop,
        marginTop: isMobileOrTablet ? "20px" : footerStyle.marginTop,
        paddingLeft: isMobileOrTablet ? "16px" : "0",
        paddingRight: isMobileOrTablet ? "16px" : "0",
      }}
    >
      <div
        style={{
          ...line1Style,
          fontSize: isMobileOrTablet ? "11px" : line1Style.fontSize,
        }}
      >
        © 2026 Stranalyx Solutions • Tous droits réservés
      </div>

      <div
        style={{
          ...line2Style,
          fontSize: isMobileOrTablet ? "10px" : line2Style.fontSize,
        }}
      >
        Base 2 — Référentiel technique • Version Sandbox
      </div>
    </footer>
  );
}

const footerStyle = {
  marginTop: "28px",
  paddingTop: "18px",
  borderTop: `1px solid ${theme.colors.border}`,
  textAlign: "center",
};

const line1Style = {
  fontSize: "12px",
  color: theme.colors.text,
  marginBottom: "6px",
  fontWeight: "500",
};

const line2Style = {
  fontSize: "11px",
  color: theme.colors.textLight,
};

export default Footer;