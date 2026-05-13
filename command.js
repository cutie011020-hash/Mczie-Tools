async function sendCommand() {
  const apiKey = document.getElementById("apiKey").value;
  const serverId = document.getElementById("serverId").value;
  const command = document.getElementById("command").value;
  const status = document.getElementById("status");

  status.innerText = "Sending...";

  try {
    const res = await fetch(`https://srv.mcziehost.fun/api/client/servers/${serverId}/command`, {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + apiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        command: command
      })
    });

    if (res.status === 204) {
      status.innerText = "✅ Command sent!";
    } else {
      status.innerText = "⚠️ Error: " + res.status;
    }

  } catch (err) {
    status.innerText = "❌ Failed (CORS blocked)";
  }
}
