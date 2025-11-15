import { MCPClient } from '@mastra/mcp';
import { createSmitheryUrl } from "@smithery/sdk";

const smitheryGithubMCPServerUrl = createSmitheryUrl(
  "https://server.smithery.ai/@smithery-ai/github",
  {
    apiKey: process.env.SMITHERY_API_KEY,
    profile: process.env.SMITHERY_PROFILE,
  },
);

const mcp = new MCPClient({
  servers: {
    zapier: {
      url: new URL(process.env.ZAPIER_MCP_URL || ""),
      eventSourceInit: {
        fetch(input, init) {
          // Pass through the URL credentials without additional headers
          return fetch(input, init);
        },
      },
    },
    github: {
      url: smitheryGithubMCPServerUrl,
    },
  },
});

export { mcp };