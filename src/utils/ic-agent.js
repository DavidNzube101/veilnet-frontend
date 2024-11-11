import { HttpAgent, Actor } from '@dfinity/agent';
import { idlFactory } from '../../declarations/veilnet_backend/veilnet_backend.did.js'; // Import the DID file

const canisterId = process.env.VUE_APP_CANISTER_ID || 'your-canister-id';
const agent = new HttpAgent({ host: process.env.VUE_APP_IC_HOST || 'https://ic0.app' });

// Create an actor to interact with your canister
const actor = Actor.createActor(idlFactory, {
  agent,
  canisterId,
});

export async function createPost(content) {
  try {
    await actor.createPost({ content });
  } catch (err) {
    console.error('Error creating post:', err);
  }
}

export async function getPosts() {
  try {
    const posts = await actor.getPosts();
    return posts;
  } catch (err) {
    console.error('Error fetching posts:', err);
  }
}
