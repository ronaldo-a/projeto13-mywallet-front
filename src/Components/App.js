import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import NewCredit from "./NewCredit";
import NewDebit from "./NewDebit";
import Registration from "./Registration";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/registration" element={<Registration />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/newcredit" element={<NewCredit />}></Route>
        <Route path="/newdebit" element={<NewDebit />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
