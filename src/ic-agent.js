import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "./declarations/your_canister_name"; // You'll need to generate this

const canisterId = process.env.VUE_APP_CANISTER_ID; // Store this in your .env file
const host = process.env.VUE_APP_IC_HOST || "https://ic0.app";

const agent = new HttpAgent({ host });
const actor = Actor.createActor(idlFactory, { agent, canisterId });

export default actor;