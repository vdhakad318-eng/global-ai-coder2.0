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
