import React from "react";
import { Link } from "react-router-dom";
import RenderRouter from "./routes";

const App = () => {
  return (
    <>
      <div>
        <Link to="/Home">Home</Link> 
        <Link to="/Test">test</Link> 
        <Link to="/User">User</Link> 

      </div>

      <RenderRouter></RenderRouter>
    </>
  );
};
export default App;
