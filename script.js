let apiQuotes = [];
const quoteContainer = document.getElementById("quoute-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const vkBtn = document.getElementById("vk-button");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// Show loading

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide loading

function complete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// Show new Quote
function newQuotee() {
  loading();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  if (quote.text.length > 50) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  if (!quote.author) {
    authorText.textContent = " - Unknown - ";
  } else {
    authorText.textContent = `- ${quote.author} - `;
  }
  quoteText.textContent = quote.text;
  complete();
}

// VK post
function vkPost() {
  const vkUrl = `https://vk.com/share.php?url=?message=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(vkUrl, "_blank");
}

vkBtn.addEventListener("click", vkPost);

newQuoteBtn.addEventListener("click", function () {
  newQuotee();
});
// Get Quotes form API

async function getQuotes() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuotee();
  } catch (error) {
    // Cacth error here
  }
}

// On load
getQuotes();
