import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { LibSQLStore } from '@mastra/libsql';
import { mcp } from './index';

const mcpTools = await mcp.getTools();

const memory = new Memory({
  storage: new LibSQLStore({
    url: 'file:../../memory.db', // local file-system database. Location is relative to the output directory `.mastra/output`
  }),
});

export const personalAssistantAgent = new Agent({
  name: "Personal Assistant",
  instructions: `
    You are a helpful personal assistant that can help with various tasks such as email,
    monitoring github activity, and scheduling social media posts.

    You have access to the following tools:

    1. Gmail:
       - Use these tools for reading and categorizing emails from Gmail
       - You can categorize emails by priority, identify action items, and summarize content
       - You can also use this tool to send emails

    2. GitHub:
       - You are fully authenticated and have access to both public and private repositories
       - Use these tools for monitoring and summarizing GitHub activity
       - You can list all repositories (including private ones), summarize recent commits, pull requests, issues, and development patterns
       - Don't assume you lack access - you have full authenticated access to GitHub

    Keep your responses concise and friendly.
  `,
  model: 'openai/gpt-4o',
  tools: { ...mcpTools },
  memory,
});