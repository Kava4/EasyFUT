// Initialize script injection
const mainScript = document.createElement("script");
mainScript.src = chrome.runtime.getURL("main.js");
document.head.appendChild(mainScript);
mainScript.onload = () => mainScript.remove();

// Load vendor script
const vendorScript = document.createElement("script");
vendorScript.src = chrome.runtime.getURL("vendor.js");
document.head.appendChild(vendorScript);
vendorScript.onload = () => vendorScript.remove();

// Load AutoSBC script (Premium feature)
const autosbcScript = document.createElement("script");
autosbcScript.src = chrome.runtime.getURL("autosbc.js");
document.head.appendChild(autosbcScript);
autosbcScript.onload = () => autosbcScript.remove();

// Load styles
const link = document.createElement("link");
link.href = chrome.runtime.getURL("styles.css");
link.type = "text/css";
link.rel = "stylesheet";
document.head.appendChild(link);

// Handle events
const supportedMessageTypes = new Set([
  "notification",
  "createAlarm",
  "clearAlarm",
]);

const handleScriptEvents = (e) => {
  if (e.data.type === "fetchFromExternal") {
    chrome.runtime.sendMessage(e.data.payload, (response) => {
      window.postMessage({ response });
    });
  } else if (e.data.type === "fetchExtensionLogo") {
    window.postMessage({
      response: {
        response: chrome.runtime.getURL("header_image.png"),
        status: 200,
        identifier: e.data.payload.identifier,
      },
    });
  } else if (e.data.type === "closeWebApp") {
    chrome.runtime.sendMessage({ options: "closeWebApp" });
  } else if (supportedMessageTypes.has(e.data.type)) {
    chrome.runtime.sendMessage({
      options: { type: e.data.type, ...e.data.payload },
    });
  }
};

window.addEventListener("message", handleScriptEvents);
