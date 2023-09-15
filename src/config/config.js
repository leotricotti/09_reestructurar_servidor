import { isConnected } from "../app";

export const PERSISTENCE = isConnected ? "MONGO" : "MEMORY";
