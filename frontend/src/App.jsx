import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Admin from "./Admin";
import Developer from "./Developer";
import Register from "./Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin /> }/>
 <Route path="/developer" element={<Developer /> }/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
