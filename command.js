async function sendCommand() {
  const apiKey = document.getElementById("apiKey").value;
  const serverId = document.getElementById("serverId").value;
  const command = document.getElementById("command").value;
  const status = document.getElementById("status");

  status.innerText = "Sending...";

  try {
    const res = await fetch("https://mczie-tools.onrender.com/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        apiKey,
        serverId,
        command
      })
    });

    const text = await res.text();
    status.innerText = text;

  } catch (err) {
    status.innerText = "❌ Failed to connect backend";
  }
}
