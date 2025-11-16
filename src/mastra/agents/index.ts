import { MCPClient } from '@mastra/mcp';
import { createSmitheryUrl } from "@smithery/sdk";
import path from "path";

const smitheryGithubMCPServerUrl = createSmitheryUrl(
  "https://server.smithery.ai/@smithery-ai/github",
  {
    apiKey: process.env.SMITHERY_API_KEY,
    profile: process.env.SMITHERY_PROFILE,
  },
);

// Build servers object conditionally
const servers: Record<string, any> = {
  github: {
    url: smitheryGithubMCPServerUrl,
  },
  hackernews: {
    command: "npx",
    args: ["-y", "@devabdultech/hn-mcp-server"],
  },
};

// Only add Zapier if URL is configured
if (process.env.ZAPIER_MCP_URL) {
  servers.zapier = {
    url: new URL(process.env.ZAPIER_MCP_URL),
    eventSourceInit: {
      fetch(input, init) {
        // Pass through the URL credentials without additional headers
        return fetch(input, init);
      },
    },
  };
}

const mcp = new MCPClient({ servers });

export { mcp };