import React from "react";
import { BrowserRouter } from "react-router-dom";
import NavigationManager from "./navigations/NavigationManager";


const App = () => {
  return (
    <div>
        <BrowserRouter>
            <NavigationManager />
        </BrowserRouter>
    </div>
  );
};

export default App;
