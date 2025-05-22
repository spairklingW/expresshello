async function handleKey(e) {
  if (e.key === "Enter") {
    const input = document.getElementById("input");
    const text = input.value.trim();
    if (!text) return;
    input.value = "";
    addMessage("You", text);

    try {
      const res = await fetch('/api/chat', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
      });
      const data = await res.json();
      addMessage("Bot", data.reply);
    } catch (e) {
      addMessage("Bot", "Error contacting server.");
    }
  }
}

function addMessage(sender, text) {
  const chat = document.getElementById("chat");
  const msg = document.createElement("div");
  msg.textContent = `${sender}: ${text}`;
  chat.appendChild(msg);
}
