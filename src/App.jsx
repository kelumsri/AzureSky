import React from "react";
import Home from "./Pages/Home";
import Lnading from "./Pages/Lnading";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
    const { isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return <>{isAuthenticated ? <Home /> : <Lnading />}</>;
}

export default App;
