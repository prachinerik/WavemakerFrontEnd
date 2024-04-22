//import { useState } from "react";

import "./App.css";
import Login from "./Login/Login";
import OptionsDisplay from "./OptionsDisplay/OptionsDisplay";
import Programs from "./Programs/Programs";
import Questions from "./Questions/Questions";
import {
  BrowserRouter,
  Routes, //replaces "Switch" used till v5
  Route,
} from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="app">
          <Routes>
            <Route path="/login" element={<Login isLoginDone={false} />} />
            <Route
              path="/survey"
              element={
                <div>
                  <Questions></Questions>
                  <OptionsDisplay></OptionsDisplay>
                </div>
              }
            />
            <Route path="/ourPrograms" element={<Programs />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
