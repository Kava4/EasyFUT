// ==UserScript==
// @name         EasyFUT Overlay
// @namespace    https://github.com/kavamav/EasyFUT
// @version      1.0
// @description  Enhances FUT Web App with additional features.
// @author       KavaMav
// @match        https://www.ea.com/fifa/ultimate-team/web-app/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  function loadScript(src) {
    const script = document.createElement("script");
    script.src = src;
    script.type = "text/javascript";
    document.head.appendChild(script);
  }

  function loadStylesheet(href) {
    const link = document.createElement("link");
    link.href = href;
    link.type = "text/css";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }

  // Load scripts from GitHub Pages
  const GITHUB_BASE = "https://raw.githubusercontent.com/Kava4/EasyFUT/main/";
  loadScript(GITHUB_BASE + "main.js");
  loadScript(GITHUB_BASE + "vendor.js");
  loadScript(GITHUB_BASE + "autosbc.js");
  loadStylesheet(GITHUB_BASE + "styles.css");

  console.log("EasyFUT Userscript Loaded!");
})();
