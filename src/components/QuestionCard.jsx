import theme from "../styles/stranalyxTheme";

function QuestionCard({ numero, question, exemple, children }) {
  return (
    <div style={cardStyle}>
      <div style={badgeStyle}>Question {numero}</div>

      <h2 style={questionStyle}>{question}</h2>

      <p style={exampleStyle}>{exemple}</p>

      {children}
    </div>
  );
}

const cardStyle = {
  background: theme.colors.card,
  border: `1px solid ${theme.colors.border}`,
  borderRadius: "12px",
  padding: "16px",
  marginBottom: "14px",
  boxShadow: theme.shadow.card
};

const badgeStyle = {
  display: "inline-block",
  background: "#EAF5ED",
  color: theme.colors.primary,
  padding: "5px 12px",
  borderRadius: "999px",
  fontWeight: "700",
  marginBottom: "10px",
  fontSize: "11px"
};

const questionStyle = {
  margin: "0 0 10px 0",
  color: theme.colors.primary,
  fontSize: "18px",
  lineHeight: 1.25
};

const exampleStyle = {
  color: theme.colors.textLight,
  fontSize: "13px",
  margin: "0 0 14px 0"
};

export default QuestionCard;