import portalTheme from "../../styles/portalTheme";
import useBreakpoint from "../../hooks/useBreakpoint";
import { useState } from "react";

export default function Header({ onNavigate }) {
  const { colors, shadow } = portalTheme;
  const { isMobileOrTablet } = useBreakpoint();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header
      style={{
        height: "78px",
        background: colors.white,
        borderBottom: `1px solid ${colors.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: isMobileOrTablet ? "0 16px" : "0 40px",
      }}
    >
      {/* Logo */}
      <div style={{ width: "170px" }}>
        <div
          style={{
            fontSize: "25px",
            fontWeight: 900,
            color: colors.stranalyxBlue,
            lineHeight: 1,
          }}
        >
          Stranalyx
        </div>

        <div
          style={{
            width: "160px",
            height: "10px",
            borderTop: `4px solid ${colors.stranalyxBlue}`,
            borderRadius: "50%",
            marginTop: "6px",
          }}
        />

        <div
          style={{
            marginTop: "-6px",
            marginLeft: "28px",
            letterSpacing: "5px",
            fontWeight: 700,
            fontSize: "14px",
            color: colors.stranalyxBlue,
          }}
        >
          SOLUTIONS
        </div>
      </div>

      {/* Menu */}
      <nav
        style={{
          display: isMobileOrTablet ? "none" : "flex",
          flex: 1,
          alignItems: "flex-end",
          gap: "11px",
          fontWeight: 700,
          color: colors.text,
          fontSize: "15px",
        }}
      >
        <span
        style={{ color: colors.actionBlue, cursor: "pointer" }}
        onClick={() => onNavigate?.("portail")}
        >
        Accueil
        </span>
        <span
        style={{ cursor: "pointer" }}
        onClick={() => onNavigate?.("histoire")}
        >
        Notre histoire
        </span>
        <span
        style={{ cursor: "pointer" }}
        onClick={() => onNavigate?.("solutions")}
        >
        Nos solutions
        </span>
        <span
        style={{ cursor: "pointer" }}
        onClick={() => onNavigate?.("prestations")}
        >
        Nos prestations
        </span>

        <span
        style={{ cursor: "pointer" }}
        onClick={() => onNavigate?.("documentation")}
        >
        Documentation
        </span>

        <span
        style={{ cursor: "pointer" }}
        onClick={() => onNavigate?.("contact")}
        >
        Contact
        </span>

      </nav>

      {isMobileOrTablet && (
  <button
    onClick={() => setMenuOpen(!menuOpen)}
    style={{
      fontSize: "28px",
      background: "transparent",
      border: "none",
      color: colors.stranalyxBlue,
      cursor: "pointer",
    }}
  >
    {menuOpen ? "✕" : "☰"}
  </button>
)}

  {isMobileOrTablet && menuOpen && (
  <div
    style={{
      position: "absolute",
      top: "78px",
      left: 0,
      right: 0,
      background: colors.white,
      borderTop: `1px solid ${colors.border}`,
      padding: "20px",
      textAlign: "left",
    }}
  >
    <button
  style={{
    display: "block",
    background: "transparent",
    border: "none",
    padding: 0,
    color: colors.actionBlue,
    fontWeight: 700,
    fontSize: "16px",
    cursor: "pointer",
    textAlign: "left",
  }}
>
  Accueil
</button>

  <button
  style={{
    display: "block",
    marginTop: "16px",
    background: "transparent",
    border: "none",
    padding: 0,
    color: colors.text,
    fontSize: "16px",
    cursor: "pointer",
    textAlign: "left",
  }}
>
  Notre histoire
</button>

  <button
  style={{
    display: "block",
    marginTop: "16px",
    background: "transparent",
    border: "none",
    padding: 0,
    color: colors.text,
    fontSize: "16px",
    cursor: "pointer",
    textAlign: "left",
  }}
>
  Nos solutions
</button>

 <button
  style={{
    display: "block",
    marginTop: "16px",
    background: "transparent",
    border: "none",
    padding: 0,
    color: colors.text,
    fontSize: "16px",
    cursor: "pointer",
    textAlign: "left",
  }}
>
  Nos prestations
</button>

  <button
  style={{
    display: "block",
    marginTop: "16px",
    background: "transparent",
    border: "none",
    padding: 0,
    color: colors.text,
    fontSize: "16px",
    cursor: "pointer",
    textAlign: "left",
  }}
>
  Ressources
</button>

  <button
  style={{
    display: "block",
    marginTop: "16px",
    background: "transparent",
    border: "none",
    padding: 0,
    color: colors.text,
    fontSize: "16px",
    cursor: "pointer",
    textAlign: "left",
  }}
>
  Contact
</button>

  </div>
  )}

      {/* Actions */}
      <div
        style={{
          display: isMobileOrTablet ? "none" : "flex",
          gap: "8px",
          alignItems: "center",
        }}
      >
        <button
          style={{
            padding: "6px 8px",
            borderRadius: "12px",
            border: `1px solid ${colors.border}`,
            background: colors.white,
            cursor: "pointer",
          }}
        >
          🌐  FR ▼
        </button>

        <button
          style={{
            padding: "6px 10px",
            borderRadius: "12px",
            border: `1px solid ${colors.actionBlue}`,
            background: colors.white,
            color: colors.actionBlue,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Se connecter
        </button>

        <button
          style={{
            padding: "11px 18px",
            borderRadius: "12px",
            border: "none",
            background: colors.actionBlue,
            color: "white",
            fontWeight: 700,
            boxShadow: shadow.button,
            cursor: "pointer",
          }}
        >
          Essayer Stranalyx →
        </button>
      </div>
    </header>
  );
}