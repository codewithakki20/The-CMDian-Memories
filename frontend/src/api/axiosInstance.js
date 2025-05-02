let IS_PROD = true;
const server = IS_PROD
  ? "https://the-cmdian-memories.onrender.com"
  : "http://localhost:5000";

export default server;