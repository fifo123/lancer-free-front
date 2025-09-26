const emojiModal = document.getElementById("emojiModal");
const emojiBtn = document.getElementById("emojiBtn");

function getRandomEmoji() {
  return emojis[Math.floor(Math.random() * emojis.length)];
}

function renderEmojis() {
  emojiModal.innerHTML = "";
  emojis.forEach((emoji) => {
    const div = document.createElement("div");
    div.classList.add("emoji");
    div.textContent = emoji;
    div.addEventListener("click", () => {
      emojiBtn.textContent = emoji;
      emojiModal.style.display = "none";
    });
    emojiModal.appendChild(div);
  });
}

emojiBtn.addEventListener("click", () => {
  if (emojiModal.style.display === "grid") {
    emojiModal.style.display = "none";
    return;
  }
  emojiModal.style.display = "grid";
});

overlay.addEventListener("click", () => {
  emojiModal.style.display = "none";
});

renderEmojis();
emojiBtn.textContent = getRandomEmoji();
