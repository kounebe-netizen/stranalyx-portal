import theme from "./stranalyxTheme";

export const panelStyle = {
  background: "#FFFFFF",
  border: `1px solid ${theme.colors.border}`,
  borderRadius: "16px",
  boxShadow: theme.shadow.card,
  padding: "18px",
  minHeight: "600px",
};

export const titleStyle = {
  marginTop: 0,
  marginBottom: "14px",
  color: "#0B6B2E",
  fontSize: "18px",
  fontWeight: "700",
  textAlign: "center",
};

export const introStyle = {
  background: "#F5FAF6",
  border: `1px solid ${theme.colors.border}`,
  borderRadius: "12px",
  padding: "14px",
  fontSize: "14px",
  color: theme.colors.text,
  marginBottom: "16px",
  lineHeight: 1.5,
};

export const sectionTitleStyle = {
  marginTop: "18px",
  marginBottom: "10px",
  padding: "8px 10px",
  background: "#EAF5EE",
  borderLeft: "5px solid #0B6B2E",
  borderRadius: "8px",
  color: "#0B6B2E",
  fontWeight: "800",
  fontSize: "15px",
};

export const formStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "12px",
  marginBottom: "16px",
};

export const formTwoColumnsStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "12px",
  marginBottom: "16px",
};

export const formOneColumnStyle = {
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "12px",
  marginBottom: "16px",
};

export const fieldBlockStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
};

export const labelStyle = {
  fontSize: "13px",
  fontWeight: "700",
  color: "#0B6B2E",
};

export const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "10px",
  border: `1px solid ${theme.colors.border}`,
  fontSize: "14px",
  boxSizing: "border-box",
};

export const textareaStyle = {
  ...inputStyle,
  resize: "vertical",
  fontFamily: "inherit",
};

export const validationBoxStyle = {
  marginTop: "18px",
  display: "flex",
  justifyContent: "center",
  gap: "12px",
};

export const validationButtonStyle = {
  background: "#0B6B2E",
  color: "#FFFFFF",
  border: "none",
  padding: "14px 26px",
  borderRadius: "12px",
  fontWeight: "800",
  fontSize: "15px",
  cursor: "pointer",
};

export const secondaryButtonStyle = {
  background: "#EAF5EE",
  color: "#0B6B2E",
  border: `1px solid ${theme.colors.border}`,
  padding: "12px 20px",
  borderRadius: "12px",
  fontWeight: "800",
  fontSize: "14px",
  cursor: "pointer",
};