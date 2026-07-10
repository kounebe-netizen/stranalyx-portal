import theme from "../styles/stranalyxTheme";

function PreviewTable({ lignes }) {
  return (
    <div style={containerStyle}>
      <h3 style={titleStyle}>Unités physiques enregistrées</h3>

      <div style={countStyle}>{lignes.length} unités physiques</div>

      <div style={tableWrapperStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={stickyHeaderStyle}>Nom</th>
              <th style={headerCellStyle}>Type</th>
              <th style={headerCellStyle}>Parent</th>
              <th style={headerCellStyle}>Rang</th>
              <th style={headerCellStyle}>Nb blocs</th>
              <th style={headerCellStyle}>Nb sous-blocs</th>
              <th style={headerCellStyle}>Rang unité</th>
              <th style={headerCellStyle}>Rang bloc global</th>
              <th style={headerCellStyle}>Rang bloc local</th>
            </tr>
          </thead>

          <tbody>
            {lignes.map((ligne, index) => (
              <tr key={index}>
                <td style={stickyBodyStyle}>{ligne.nom}</td>
                <td style={bodyCellStyle}>{ligne.type}</td>
                <td style={bodyCellStyle}>{ligne.parent}</td>
                <td style={bodyCellStyle}>{ligne.rang}</td>
                <td style={bodyCellStyle}>{ligne.nb_blocs}</td>
                <td style={bodyCellStyle}>{ligne.nb_sous_blocs}</td>
                <td style={bodyCellStyle}>{ligne.rang_unite}</td>
                <td style={bodyCellStyle}>{ligne.rang_bloc_global}</td>
                <td style={bodyCellStyle}>{ligne.rang_bloc_local}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const borderColor = "#B7C8BC";

const containerStyle = {
  background: theme.colors.card,
  border: `1px solid ${theme.colors.border}`,
  borderRadius: "14px",
  padding: "14px",
  boxShadow: theme.shadow.card,
};

const titleStyle = {
  textAlign: "center",
  color: theme.colors.primary,
  marginTop: 0,
  marginBottom: "4px",
  fontSize: "20px",
};

const countStyle = {
  textAlign: "center",
  color: theme.colors.textLight,
  marginBottom: "14px",
  fontSize: "14px",
};

const tableWrapperStyle = {
  overflow: "auto",
  maxHeight: "430px",
  borderRadius: "10px",
  border: `1px solid ${borderColor}`,
};

const tableStyle = {
  width: "100%",
  minWidth: "1250px",
  borderCollapse: "collapse",
  fontSize: "13px",
  background: "#FFFFFF",
};

const headerCellStyle = {
  background: "#EAF5ED",
  color: theme.colors.primary,
  padding: "10px 12px",
  textAlign: "left",
  fontWeight: "700",
  borderBottom: `1px solid ${borderColor}`,
  borderRight: `1px solid ${borderColor}`,
  position: "sticky",
  top: 0,
  zIndex: 2,
  whiteSpace: "nowrap",
};

const stickyHeaderStyle = {
  ...headerCellStyle,
  left: 0,
  zIndex: 4,
  minWidth: "210px",
  width: "210px",
  maxWidth: "210px",
  boxShadow: `2px 0 0 ${borderColor}`,
};

const bodyCellStyle = {
  padding: "10px 12px",
  borderBottom: `1px solid ${borderColor}`,
  borderRight: `1px solid ${borderColor}`,
  color: theme.colors.text,
  whiteSpace: "nowrap",
  background: "#FFFFFF",
};

const stickyBodyStyle = {
  ...bodyCellStyle,
  position: "sticky",
  left: 0,
  zIndex: 3,
  background: "#FFFFFF",
  minWidth: "210px",
  width: "210px",
  maxWidth: "210px",
  fontWeight: "600",
  boxShadow: `2px 0 0 ${borderColor}`,
};

export default PreviewTable;