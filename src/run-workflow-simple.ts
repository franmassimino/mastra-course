// src/run-workflow-simple.ts
import 'dotenv/config';
import { contentWorkflow } from "./mastra/workflows/content-workflow";

async function runContentWorkflow() {
  console.log("🚀 Running workflow programmatically...\n");

  try {
    console.log("🎬 Executing workflow...\n");

    // Create a run instance
    const run = await contentWorkflow.createRunAsync();

    // Execute with input data
    const result = await run.start({
      inputData: {
        content:
          "Climate change is one of the most pressing challenges of our time, requiring immediate action from governments, businesses, and individuals worldwide.",
        type: "blog",
      }
    });

    if (result.status === "success") {
      console.log("✅ Workflow completed successfully!\n");
      console.log("📊 Results:");
      console.log("   Content:", result.result.content.substring(0, 50) + "...");
      console.log("   Type:", result.result.type);
      console.log("   Word Count:", result.result.wordCount);
      console.log("   Reading time:", result.result.metadata.readingTime, "minutes");
      console.log("   Difficulty:", result.result.metadata.difficulty);
      console.log("   Processed at:", result.result.metadata.processedAt);
      console.log("   Summary:", result.result.summary);
    } else if (result.status === "failed") {
      console.error("❌ Workflow failed:", result.error);
    } else {
      console.log("⏸️  Workflow suspended");
    }

  } catch (error) {
    console.error("❌ Error:", (error as Error).message);
  }
}

// Run the workflow
runContentWorkflow();
