document.getElementById("summarizeBtn").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript(
      {
        target: { tabId: tabs[0].id },
        func: () => document.body.innerText
      },
      (results) => {
        const pageText = results[0].result;
        summarizeWithAI(pageText);
      }
    );
  });
});

document.getElementById("copyBtn").addEventListener("click", () => {
  const summary = document.getElementById("resultBox").innerText;
  navigator.clipboard.writeText(summary);
  alert("Summary copied!");
});

async function summarizeWithAI(text) {
  const resultBox = document.getElementById("resultBox");
  resultBox.innerText = "Summarizing...";

  try {
    // Replace with Chrome's built-in AI API call
    const response = await fetch("https://chrome-ai-api-endpoint/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: text })
    });

    const data = await response.json();
    resultBox.innerText = data.summary || "No summary generated.";
  } catch (err) {
    resultBox.innerText = "Error: " + err.message;
  }
}
