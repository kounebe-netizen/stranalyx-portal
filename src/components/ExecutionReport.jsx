import theme from "../styles/stranalyxTheme";

function ExecutionReport({ report }) {
  if (!report) return null;

  return (
    <div
      style={{
        background: theme.colors.card,
        borderRadius: theme.radius.card,
        padding: "28px",
        marginBottom: "24px",
        border: `1px solid ${theme.colors.border}`,
        boxShadow: theme.shadow.card
      }}
    >
      <h3
        style={{
          marginTop: 0,
          color: theme.colors.primary,
          fontSize: "18px",
          fontWeight: "800",
          textAlign: "center",
        }}
      >
        Rapport d’exécution
      </h3>

      <div
        style={{
          marginTop: "18px",
          lineHeight: 1.8,
          color: theme.colors.text,
          fontSize: "17px",
          whiteSpace: "pre-line"
        }}
      >
        {report}
      </div>
    </div>
  );
}

export default ExecutionReport;