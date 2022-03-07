import "./App.css";
import Logo from "./logo.svg";
export const App = () => {
  const name = "asmiriti";
  return (
    <>
      <h1 className="text">
        hello world -{process.env.NODE_ENV} -{process.env.name}-{name}
      </h1>
      <img src={Logo} alt="react logo" />
    </>
  );
};
