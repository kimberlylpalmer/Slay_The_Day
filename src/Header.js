import AddEventForm from "./AddEventForm";

export default function Header() {
  return (
    <div id="header" style={{ backgroundColor: "#0D411E", color: "white" }}>
      <h1>Slay The Day</h1>
      <h2>What will you do today?</h2>
      <AddEventForm />
    </div>
  );
}
