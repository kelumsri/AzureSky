import { Auth0Provider } from "@auth0/auth0-react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
    <Auth0Provider
        domain="dev-gd46by85swq1glsr.us.auth0.com"
        clientId="fL2e4GVIVKZ6sBjOZR6CXXy4ZvS0wlLw"
        authorizationParams={{
            redirect_uri: window.location.origin,
        }}
    >
        <App />
    </Auth0Provider>
);
