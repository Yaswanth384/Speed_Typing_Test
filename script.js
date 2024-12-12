const displayType = document.getElementById("quoteDisplay");
const timerId = document.getElementById("timer");
const submitEl = document.getElementById("submitBtn");
const textareaEl = document.getElementById("quoteInput");
const resultMsg = document.getElementById("result");
const resetEl = document.getElementById("resetBtn");

let id, counter = 0;


const fetchQuote = async () => {
    const url = "https://apis.ccbp.in/random-quote";
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayType.innerHTML = data.content
            .split(" ")
            .map((word) => `<span>${word}</span>`)
            .join(" ");
    } catch {
        displayType.textContent = "Failed to fetch quote. Try again later.";
    }
};


const startTimer = () => {
    counter = 0;
    timerId.textContent = "0 seconds";
    clearInterval(id);
    id = setInterval(() => {
        counter++;
        timerId.textContent = `${counter} seconds`;
    }, 1000);
};


textareaEl.addEventListener("input", () => {
    const userInput = textareaEl.value.trim();
    const quoteWords = displayType.textContent.split(" ");
    const userWords = userInput.split(" ");

    for (let i = 0; i < quoteWords.length; i++) {
        const wordSpan = displayType.querySelectorAll("span")[i];
        wordSpan.classList.remove("error", "current-word"); 

        if (userWords[i] === undefined) {
            continue; 
        } else if (userWords[i] !== quoteWords[i]) {
            wordSpan.classList.add("error"); 
        } else {
            wordSpan.classList.remove("error"); 
        }

        if (i === userWords.length - 1) {
            wordSpan.classList.add("current-word"); 
        }
    }
});


submitEl.addEventListener("click", () => {
    clearInterval(id);
    const userInput = textareaEl.value.trim();
    if (userInput === displayType.textContent) {
        resultMsg.textContent = `You typed in ${counter} seconds`;
    } else {
        resultMsg.textContent = "You typed the quote incorrectly.";
    }
});


resetEl.addEventListener("click", () => {
    textareaEl.value = "";
    resultMsg.textContent = "";
    fetchQuote();
    startTimer();
});


textareaEl.addEventListener("paste", (event) => event.preventDefault());
textareaEl.addEventListener("keydown", (event) => {
    if (event.key === "Tab") event.preventDefault();
});


fetchQuote();
startTimer();
