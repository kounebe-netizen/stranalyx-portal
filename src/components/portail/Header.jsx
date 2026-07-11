import portalTheme from "../../styles/portalTheme";
import useBreakpoint from "../../hooks/useBreakpoint";
import { useState } from "react";

export default function Header({ onNavigate }) {
  const { colors, shadow } = portalTheme;
  const { isMobileOrTablet } = useBreakpoint();
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = (page) => {
    setMenuOpen(false);
    onNavigate?.(page);
  };

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
        position: "relative",
        zIndex: 1000,
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

      {/* Menu desktop */}
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
          onClick={() => navigate("portail")}
        >
          Accueil
        </span>

        <span
          style={{ cursor: "pointer" }}
          onClick={() => navigate("histoire")}
        >
          Notre histoire
        </span>

        <span
          style={{ cursor: "pointer" }}
          onClick={() => navigate("solutions")}
        >
          Nos solutions
        </span>

        <span
          style={{ cursor: "pointer" }}
          onClick={() => navigate("prestations")}
        >
          Nos prestations
        </span>

        <span
          style={{ cursor: "pointer" }}
          onClick={() => navigate("documentation")}
        >
          Documentation
        </span>

        <span
          style={{ cursor: "pointer" }}
          onClick={() => navigate("contact")}
        >
          Contact
        </span>
      </nav>

      {/* Bouton menu mobile */}
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

      {/* Menu mobile */}
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
            boxShadow: "0 12px 24px rgba(8, 47, 99, 0.12)",
            zIndex: 9999,
          }}
        >
          <MobileMenuButton
            label="Accueil"
            onClick={() => navigate("portail")}
            color={colors.actionBlue}
          />

          <MobileMenuButton
            label="Notre histoire"
            onClick={() => navigate("histoire")}
            color={colors.text}
          />

          <MobileMenuButton
            label="Nos solutions"
            onClick={() => navigate("solutions")}
            color={colors.text}
          />

          <MobileMenuButton
            label="Nos prestations"
            onClick={() => navigate("prestations")}
            color={colors.text}
          />

          <MobileMenuButton
            label="Documentation"
            onClick={() => navigate("documentation")}
            color={colors.text}
          />

          <MobileMenuButton
            label="Contact"
            onClick={() => navigate("contact")}
            color={colors.text}
            />
            <button
          onClick={() => navigate("essayer")}
          style={{
          width: "100%",
          marginTop: "24px",
          padding: "14px 18px",
          borderRadius: "14px",
          border: "none",
          background: colors.actionBlue,
          color: "#FFFFFF",
          fontWeight: 900,
          fontSize: "16px",
          cursor: "pointer",
          boxShadow: shadow.button,
          }}
          >
          Essayer Stranalyx →
        </button>
          
        </div>
      )}

      {/* Actions desktop */}
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
          🌐 FR ▼
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
        type="button"
        onClick={(event) => {
  event.preventDefault();
  event.stopPropagation();

  alert("CLIC ESSAYER MOBILE");

  setMenuOpen(false);
  onNavigate?.("essayer");
}}
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

function MobileMenuButton({ label, onClick, color }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "block",
        width: "100%",
        marginTop: label === "Accueil" ? 0 : "16px",
        background: "transparent",
        border: "none",
        padding: 0,
        color,
        fontWeight: 700,
        fontSize: "16px",
        cursor: "pointer",
        textAlign: "left",
      }}
    >
      {label}
    </button>
  );
}