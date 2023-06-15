import "./App.css";
import logo from "./assets/logo.png";
import Form from "./components/Form";

function App() {
  return (
    <div className="App">
      <header className="logo-container">
        <img src={logo} alt="logo" className="logo" />
        <h1 className="header">צור את ההדפסה שלך</h1>
      </header>
      <Form />
    </div>
  );
}

export default App;
