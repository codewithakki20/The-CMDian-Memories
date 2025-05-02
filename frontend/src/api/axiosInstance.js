let IS_PROD = true;
const server = IS_PROD
  ? "https://the-cm-dian-memories.vercel.app"
  : "http://localhost:5000";

export default server;