/* ==========================================
   Global AI Coder v2.0
   app.js
========================================== */

"use strict";

/* ==========================================
   DOM Elements
========================================== */

const messages = document.getElementById("messages");
const prompt = document.getElementById("prompt");
const sendBtn = document.getElementById("sendBtn");
const attachBtn = document.getElementById("attachBtn");
const voiceBtn = document.getElementById("voiceBtn");

const loadingScreen = document.getElementById("loadingScreen");
const typingIndicator = document.getElementById("typingIndicator");

const newChatBtn = document.getElementById("newChatBtn");
const historyList = document.getElementById("historyList");

const settingsBtn = document.getElementById("settingsBtn");
const settingsModal = document.getElementById("settingsModal");
const closeSettings = document.getElementById("closeSettings");

const aboutBtn = document.getElementById("aboutBtn");
const aboutModal = document.getElementById("aboutModal");
const closeAbout = document.getElementById("closeAbout");

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

/* ==========================================
   Config
========================================== */

const API_URL = "/api/chat";

let isGenerating = false;

let chatHistory = [];

/* ==========================================
   App Init
========================================== */

window.addEventListener("load", () => {

    setTimeout(() => {

        loadingScreen.style.opacity = "0";

        setTimeout(() => {

            loadingScreen.style.display = "none";

        }, 400);

    }, 1000);

    loadHistory();

});

/* ==========================================
   Auto Resize Textarea
========================================== */

prompt.addEventListener("input", () => {

    prompt.style.height = "auto";

    prompt.style.height = prompt.scrollHeight + "px";

});

/* ==========================================
   Enter To Send
========================================== */

prompt.addEventListener("keydown", e => {

    if (e.key === "Enter" && !e.shiftKey) {

        e.preventDefault();

        sendMessage();

    }

});

/* ==========================================
   Buttons
========================================== */

sendBtn.addEventListener("click", sendMessage);

newChatBtn.addEventListener("click", newChat);

settingsBtn.addEventListener("click", () => {

    settingsModal.classList.remove("hidden");

});

closeSettings.addEventListener("click", () => {

    settingsModal.classList.add("hidden");

});

aboutBtn.addEventListener("click", () => {

    aboutModal.classList.remove("hidden");

});

closeAbout.addEventListener("click", () => {

    aboutModal.classList.add("hidden");

});

/* ==========================================
   Mobile Sidebar
========================================== */

menuBtn.addEventListener("click", () => {

    sidebar.classList.toggle("open");

    overlay.classList.toggle("hidden");

});

overlay.addEventListener("click", () => {

    sidebar.classList.remove("open");

    overlay.classList.add("hidden");

});

/* ==========================================
   Helpers
========================================== */

function scrollBottom() {

    messages.scrollTop = messages.scrollHeight;

}

function showTyping() {

    typingIndicator.classList.remove("hidden");

    scrollBottom();

}

function hideTyping() {

    typingIndicator.classList.add("hidden");

}

function showToast(text) {

    const toast = document.getElementById("toast");

    toast.textContent = text;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2000);

                         }

/* ==========================================
   Send Message
========================================== */

async function sendMessage() {

    if (isGenerating) return;

    const text = prompt.value.trim();

    if (!text) return;

    isGenerating = true;

    addUserMessage(text);

    prompt.value = "";

    prompt.style.height = "auto";

    showTyping();

    try {

        const reply = await askAI(text);

        hideTyping();

        addAIMessage(reply);

        saveHistory();

    }

    catch (err) {

        hideTyping();

        addAIMessage(

`❌ **Error**

${err.message}`

        );

    }

    finally {

        isGenerating = false;

    }

}

/* ==========================================
   User Message
========================================== */

function addUserMessage(text){

const div=document.createElement("div");

div.className="message user";

div.innerHTML=`

<div class="avatar">

🧑

</div>

<div class="bubble">

${escapeHtml(text).replace(/\n/g,"<br>")}

</div>

`;

messages.appendChild(div);

scrollBottom();

}

/* ==========================================
   AI Message
========================================== */

function addAIMessage(text){

const div=document.createElement("div");

div.className="message ai";

let html=marked.parse(text);

div.innerHTML=`

<div class="avatar">

🤖

</div>

<div class="bubble">

${html}

</div>

`;

messages.appendChild(div);

highlightCode();

scrollBottom();

}

/* ==========================================
   Highlight.js
========================================== */

function highlightCode(){

document
.querySelectorAll("pre code")
.forEach(block=>{

hljs.highlightElement(block);

});

}

/* ==========================================
   Escape HTML
========================================== */

function escapeHtml(text){

const map={

"&":"&amp;",

"<":"&lt;",

">":"&gt;",

'"':"&quot;",

"'":"&#039;"

};

return text.replace(/[&<>"']/g,m=>map[m]);

}
