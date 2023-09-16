import { isConnected } from "../app.js";

export const PERSISTENCE = isConnected ? "MONGO" : "MEMORY";
