import theme from "../styles/stranalyxTheme";

function ActionBar({
  onPreview,
  onExport,
  onImport
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: "16px",
        flexWrap: "wrap",
        marginBottom: "24px",
        justifyContent: "center"
      }}
    >
      <button
        style={buttonStyle}
        onClick={onPreview}
      >
        Générer aperçu
      </button>

      <button
        style={buttonStyle}
        onClick={onExport}
      >
        Export CSV
      </button>

      <button
        style={buttonStyle}
        onClick={onImport}
      >
        Import Airtable
      </button>
    </div>
  );
}

const buttonStyle = {
  background: "#2E7D32",
  color: "#FFFFFF",
  border: "none",
  padding: "14px 24px",
  borderRadius: "12px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "16px",
  minWidth: "210px",
  transition: "0.2s"
};

export default ActionBar;