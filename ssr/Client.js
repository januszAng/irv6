import { hydrateRoot } from "react-dom/client";
import { createElement as ce } from "react";
import App from "./App.js";

hydrateRoot(document.getElementById("root"), ce(App));
