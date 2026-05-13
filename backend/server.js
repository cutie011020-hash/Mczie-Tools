const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/send", async (req, res) => {
  const { apiKey, serverId, command } = req.body;

  if (!apiKey || !serverId || !command) {
    return res.status(400).send("Missing fields");
  }

  try {
    const response = await fetch(
      `https://srv.mcziehost.fun/api/client/servers/${serverId}/command`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ command })
      }
    );

    if (response.status === 204) {
      res.send("✅ Command Sent!");
    } else {
      const text = await response.text();
      res.status(response.status).send("Error: " + text);
    }

  } catch (err) {
    res.status(500).send("❌ Server error");
  }
});

app.get("/", (req, res) => {
  res.send("MCZie Backend Running");
});

app.listen(3000, () => console.log("Server running on port 3000"));
