(function (Scratch) {
    "use strict";
  
    if (!Scratch) return;
  
    let Peer = window.Peer;
    let peer = null;
    let myPeerId = null;
    let currentConnection = null;
    let chatHistory = [];
    let isPeerInitialized = false;
    let isInitializing = false;
    let isLoadingScript = false;
    let modalElementsCache = null;
  
    function _loadPeerJS(callback) {
      if (typeof window.Peer !== "undefined") {
        Peer = window.Peer;
        callback();
        return;
      }
      if (isLoadingScript) return;
      isLoadingScript = true;
  
      const script = document.createElement("script");
      script.src = "https://unpkg.com/peerjs@1.5.2/dist/peerjs.min.js";
      script.onload = () => {
        Peer = window.Peer;
        isLoadingScript = false;
        if (!Peer) {
          alert("Error: PeerJS loaded but failed to initialize properly.");
          callback(new Error("Peer object not found after script load"));
        } else {
          callback();
        }
      };
      script.onerror = (err) => {
        alert("Failed to load PeerJS library. Check connection or browser console.");
        isLoadingScript = false;
        callback(new Error("Failed to load PeerJS script"));
      };
      document.head.appendChild(script);
    }
  
    function generatePeerId() {
      const MAX_NUM = 999;
      return `Penguin-${String(Math.floor(Math.random() * MAX_NUM)).padStart(3, "0")}`;
    }
  
    class PeerChatExtension {
      getInfo() {
        return {
          id: "peerChatExtSettingsUI",
          name: "Peer Chat",
          color1: "#4C97FF",
          color2: "#4280D7",
          blocks: [],
          menus: {},
        };
      }
    }
  
    function initializePeer() {
      if (!Peer || peer || isInitializing) return;
      isInitializing = true;
      updateStatus(modalElementsCache, "Initializing Peer...");
  
      const generatedId = generatePeerId();
      try {
        peer = new Peer(generatedId, { host: "0.peerjs.com", port: 443, secure: true, debug: 0 });
      } catch (e) {
        updateStatus(modalElementsCache, "Error creating Peer object.");
        alert("Error creating Peer object. PeerJS might be blocked or unavailable.");
        isInitializing = false;
        return;
      }
  
      peer.on("open", (id) => {
        myPeerId = id;
        isPeerInitialized = true;
        isInitializing = false;
        if (modalElementsCache?.myIdDisplay) {
          modalElementsCache.myIdDisplay.textContent = id;
          modalElementsCache.myIdDisplay.title = "Click to copy";
        }
        updateStatus(modalElementsCache, "Ready. Share ID or connect.");
        updateUIForConnectionState(modalElementsCache, false);
      });
  
      peer.on("connection", (conn) => {
        if (currentConnection?.open) { conn.close(); return; }
        currentConnection = conn;
        setupConnectionEvents();
        updateStatus(modalElementsCache, `Incoming connection from ${conn.peer}...`);
      });
  
      peer.on("disconnected", () => {
        updateStatus(modalElementsCache, "Disconnected. Reconnecting...");
        isPeerInitialized = false; myPeerId = null;
        if (modalElementsCache?.myIdDisplay) { modalElementsCache.myIdDisplay.textContent = "Reconnecting..."; modalElementsCache.myIdDisplay.title = ""; }
        if (currentConnection) handleDisconnect();
      });
  
      peer.on("close", () => {
        updateStatus(modalElementsCache, "Peer connection closed.");
        isPeerInitialized = false; peer = null; myPeerId = null;
        if (modalElementsCache?.myIdDisplay) { modalElementsCache.myIdDisplay.textContent = "Closed"; modalElementsCache.myIdDisplay.title = ""; }
        if (currentConnection) handleDisconnect();
      });
  
      peer.on("error", (err) => {
        let message = "Peer Error";
        switch (err.type) {
          case "browser-incompatible": message = "Browser not supported."; break;
          case "disconnected": message = "Disconnected from server."; break;
          case "invalid-id": message = `Invalid ID. Retrying...`; peer = null; isInitializing = false; initializePeer(); break;
          case "network": message = "Network error."; break;
          case "peer-unavailable": message = "Peer not found."; break;
          case "server-error": message = "Server error."; break;
          case "socket-error": message = "Socket error."; break;
          case "socket-closed": message = "Socket closed."; break;
          case "unavailable-id": message = `ID taken. Retrying...`; peer = null; isInitializing = false; initializePeer(); break;
          case "webrtc": message = "WebRTC error."; break;
          default: message = `Error: ${err.type}`;
        }
        updateStatus(modalElementsCache, message);
        if (!["peer-unavailable", "invalid-id", "unavailable-id"].includes(err.type)) {
          if (currentConnection) handleDisconnect();
        }
      });
    }
  
    function setupConnectionEvents() {
      if (!currentConnection) return;
  
      currentConnection.on("open", () => {
        chatHistory = [];
        if (modalElementsCache?.chatMessages) modalElementsCache.chatMessages.innerHTML = "";
        displayMessage("System", `Connected to ${currentConnection.peer}`);
        updateStatus(modalElementsCache, `Connected to ${currentConnection.peer}`);
        updateUIForConnectionState(modalElementsCache, true);
      });
  
      currentConnection.on("data", (data) => { displayMessage(currentConnection.peer, String(data)); });
      currentConnection.on("close", () => { displayMessage("System", `Connection closed.`); handleDisconnect(); });
      currentConnection.on("error", (err) => { displayMessage("System", `Connection error: ${err.type}`); handleDisconnect(); });
    }
  
    function connectToPeer(targetId) {
      if (!peer || !isPeerInitialized || !targetId) { updateStatus(modalElementsCache, "Error: Peer not ready or no target ID."); return; }
      if (currentConnection?.open) { updateStatus(modalElementsCache, "Already connected. Close modal to disconnect."); return; }
      if (targetId === myPeerId) { updateStatus(modalElementsCache, "Cannot connect to yourself."); return; }
  
      updateStatus(modalElementsCache, `Connecting to ${targetId}...`);
      updateUIForConnectionState(modalElementsCache, false);
      if (modalElementsCache?.connectButton) modalElementsCache.connectButton.disabled = true;
  
      try {
        currentConnection = peer.connect(targetId, { reliable: true });
        setupConnectionEvents();
      } catch (e) {
        updateStatus(modalElementsCache, "Error initiating connection.");
        if (modalElementsCache?.connectButton) modalElementsCache.connectButton.disabled = false;
      }
    }
  
    function sendMessage(message) {
       if (!modalElementsCache) return;
      if (!currentConnection?.open || !message?.trim()) return;
      try {
        currentConnection.send(message);
        displayMessage("Me", message);
        if (modalElementsCache.messageInput) modalElementsCache.messageInput.value = "";
      } catch (e) {
        displayMessage("System", `Error sending message`);
      }
    }
  
    function displayMessage(sender, message) {
      if (!modalElementsCache?.chatMessages) return;
      const { chatMessages } = modalElementsCache;
      const messageElement = document.createElement("div");
      messageElement.classList.add("chat-message");
      const senderSpan = document.createElement("span");
      senderSpan.classList.add("message-sender");
  
      if (sender === "Me") { messageElement.classList.add("message-me"); senderSpan.textContent = "Me"; }
      else if (sender === "System") { messageElement.classList.add("message-system"); senderSpan.textContent = "System"; }
      else { messageElement.classList.add("message-peer"); senderSpan.textContent = sender.substring(0, 12) + (sender.length > 12 ? "..." : ""); senderSpan.title = sender; }
  
      const contentSpan = document.createElement("span");
      contentSpan.classList.add("message-content");
      contentSpan.textContent = message;
      messageElement.appendChild(senderSpan);
      messageElement.appendChild(contentSpan);
      chatMessages.appendChild(messageElement);
      chatHistory.push({ sender, message });
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  
    function handleDisconnect() {
      if (currentConnection?.open) currentConnection.close();
      currentConnection = null;
      updateStatus(modalElementsCache, "Disconnected.");
      updateUIForConnectionState(modalElementsCache, false);
    }
  
    function updateStatus(elements, text) {
      if (elements?.statusDisplay) elements.statusDisplay.textContent = text;
    }
  
    function updateUIForConnectionState(elements, isConnected) {
      if (!elements) return;
      const { peerIdInput, connectButton, messageInput, sendButton } = elements;
      if (peerIdInput) peerIdInput.disabled = isConnected;
      if (connectButton) connectButton.disabled = isConnected || !isPeerInitialized || isInitializing;
      if (messageInput) messageInput.disabled = !isConnected;
      if (sendButton) sendButton.disabled = !isConnected;
    }
  
    function addCustomMenuButton() {
      const findInsertionPointInterval = setInterval(() => {
        const menuBarMainMenu = document.querySelector(".menu-bar_main-menu_3wjWH");
        const fileMenu = menuBarMainMenu?.querySelector('.menu-bar_menu-bar-item_oLDa-[aria-label="File"]') || menuBarMainMenu?.firstElementChild;
        const insertBeforeElement = fileMenu?.nextElementSibling;
  
        if (menuBarMainMenu && insertBeforeElement?.parentElement) {
          clearInterval(findInsertionPointInterval);
          const parentMenu = insertBeforeElement.parentElement;
          if (parentMenu.querySelector("#peer-chat-button-span")) return;
  
          const customButtonContainer = document.createElement("div");
          customButtonContainer.className = "menu-bar_menu-bar-item_oLDa-";
          const buttonSpan = document.createElement("span");
          buttonSpan.className = "button_outlined-button_1bS__ menu-bar_menu-bar-button_3IDN0 community-button_community-button_2Lo_g";
          buttonSpan.setAttribute("role", "button"); buttonSpan.id = "peer-chat-button-span";
          const buttonIcon = document.createElement("img");
          buttonIcon.className = "community-button_community-button-icon_1IFvv button_icon_77d8G"; buttonIcon.draggable = false;
          buttonIcon.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTQiIGhlaWdodD0iOTYiIHZpZXdCb3g9IjAgMCA1NCA5NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTMwLjA1MDMgOTUuMTI3MUMzMi44MDYxIDg4LjM1NTYgMzcuMDUyNiA5MC4zNzMgMzcuMDUyNiA5MC4zNzNDNDEuNDgxNyA5MS45Nzg5IDQ0LjMyMyA5NS4xMjcxIDQ0LjMyMyA5NS4xMjcxSDMwLjA1MDNaIiBmaWxsPSJ3aGl0ZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMzYuNzk1OCA5MC4yNzczQzQxLjIyNSA5MS44ODI4IDQ0LjMyMzYgOTUuMTI3MiA0NC4zMjM2IDk1LjEyNzJIMjkuNzgyNyIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTM2Ljc5NTggOTAuMjc3M0M0MS4yMjUgOTEuODgyOCA0NC4zMjM2IDk1LjEyNzIgNDQuMzIzNiA5NS4xMjcySDI5Ljc4MjciIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiLz4KPHBhdGggZD0iTTI1LjQ3MjIgOTUuMTI2NkMyOC42NDY1IDkxLjg5MiAzMy44MzU5IDkxLjI4OTEgMzMuODM1OSA5MS4yODkxQzM4LjI2NSA5Mi44OTUgMzkuNzQ0OCA5NS4xMjY2IDM5Ljc0NDggOTUuMTI2NkgyNS40NzIyWiIgZmlsbD0id2hpdGUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTMzLjgzNTUgOTEuMjg5MUMzOC4yNjQ3IDkyLjg5NSAzOS43NDQ1IDk1LjEyNjYgMzkuNzQ0NSA5NS4xMjY2SDI1LjIwMzYiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0zMy44MzU1IDkxLjI4OTFDMzguMjY0NyA5Mi44OTUgMzkuNzQ0NSA5NS4xMjY2IDM5Ljc0NDUgOTUuMTI2NkgyNS4yMDM2IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIi8+CjxwYXRoIGQ9Ik0zNS4wNDczIDQuNTU4MDZDMzguNTg2IDguNDcxNjkgMzQuNDY4MyAxMy4yMjY4IDM0LjQ2ODMgMTMuMjI2OEMzNC40NjgzIDEzLjIyNjggMzMuMDIxOSAxNi4xMDUzIDM0Ljg2NTEgMTYuOTMyMkMzNC44OTA0IDMwLjcwNDMgMzQuMjIxNyA1OS4yODE1IDM0LjIyMTcgNTkuNzYxOEMzNC4yMjE3IDYwLjQ1MTcgMzUuNzY1OSA4OC41NzEzIDM1LjkxNTcgODkuMTEwNkMzNi4xNjQzIDkwLjAwNDQgMzcuMDUyNyA5MC44MTQzIDM3LjA1MjcgOTAuODE0M0MzNS42NTg4IDkwLjY0MTUgMzQuNTQzNCA4OS4yODI5IDM0LjU0MzQgODkuMjgyOUMzNC44ODY4IDkwLjQ5MDQgMzYuMTA5MiA5MS4yODg0IDM2LjEwOTIgOTEuMjg4NEMzNS4wNTgyIDkxLjE2MTYgMzQuMDA3MSA5MS4yNDE4IDMzLjUzNTEgOTEuMjQ1QzMzLjEwNjMgOTEuMjQ2NSAyNy42MTYzIDkyLjYyNDYgMjUuNDcxNSA5NS4xMjY1SDEyLjUxNzVDMTIuMjYwMSA5NS4xMjY1IDEuMzY1NTYgODMuNjU0OCAxLjAyMjI0IDcwLjExMjVDMC42Nzg5MjQgNTYuNTcwMiA0LjM4MTMxIDQzLjUyMzcgNy4xOTg4OSAzNy40NzMyQzEwLjQ2OTkgMzAuNDQ3MiAxNS45MzgzIDE3LjExNiAxNi4zMjQ0IDE1LjUzMDhDMTYuNzEwNCAxMy45NDYxIDE2LjMzODggNy41MDEyMiAxOC44MTYxIDQuMjk4NzNDMjAuNTM3NCAyLjA3MzM5IDIzLjkwNTcgMSAyNi4xMzY1IDFDMjguMzY2OCAxIDMzLjA4MjEgMi4zODQzOSAzNS4wNDczIDQuNTU4MDZaIiBmaWxsPSJ3aGl0ZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIi8+CjxwYXRoIGQ9Ik0zNS40NjQxIDE3LjY3OTdDMzUuNDY0MSAxNy42Nzk3IDM3LjYyMTMgMjAuNjA2NCAzOS4yNjIyIDI0LjA5NDVDNDIuODY1MyAzMi4wNzI4IDQ1LjE4MTUgNDMuOTExOSA0My44OTg4IDU4LjA4MDRDNDIuNzE2IDcxLjE0ODcgNDEuNjAwMSA3OS41MzUzIDM3Ljc4MTQgODYuMTg2N0MzNy4zNDEyIDg2Ljk1MzQgMzcuMjg3MiA4OC4zNzM4IDM3LjI4NzIgODguMzczOEMzNy4zODUyIDg5LjYxMDYgMzguNzY5MSA5MS41NDEyIDM4Ljc2OTEgOTEuNTQxMkMyOC41NzEgOTEuNjA3NSAyMS4wOTY3IDc4LjkxMDIgMjEuODY4OCA3NS4zNzM4QzIyLjY0MDggNzEuODM3NiAyOS43NjE1IDM3LjU5MzQgMzAuMjE5NiAzMC4wMDMyQzMwLjY3NzIgMjIuNDEyNSAzNS40NjQxIDE3LjY3OTcgMzUuNDY0MSAxNy42Nzk3WiIgZmlsbD0id2hpdGUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIvPgo8cGF0aCBkPSJNMzAuMzk0IDI3Ljg1MjdDMzAuNzM3NSAxOC4yNzIxIDM0Ljg2NTQgMTYuOTMxNiAzNC44NjU0IDE2LjkzMTZMMzYuNTc1MyAxOS4yNDA5QzMzLjMyODEgMTkuNjYxNiAzMC4zOSAyNy45NjkxIDMwLjM5NCAyNy44NTI3WiIgZmlsbD0id2hpdGUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTM1LjkxNjEgODkuMTEwNkMzNi4xMDkxIDkwLjAxNzkgMzcuMDUyNiA5MC44MTQzIDM3LjA1MjYgOTAuODE0M0MzNS42NTg4IDkwLjY0MTUgMzQuNTQzNCA4OS4yODI5IDM0LjU0MzQgODkuMjgyOUMzNC44ODY3IDkwLjQ5MDQgMzYuMTA5MSA5MS4yODg0IDM2LjEwOTEgOTEuMjg4NEMzNS4wNTgxIDkxLjE2MTYgMzQuMDA3IDkxLjI0MTggMzMuNTM1NSA5MS4yNDVDMzMuMTA2OCA5MS4yNDY1IDI3LjYxNjIgOTIuNjI0NiAyNS40NzE1IDk1LjEyNjVIMTIuNTE3OUMxMi4yNjA2IDk1LjEyNjUgMS4zNjU0OCA4My42NTQ4IDEuMDIyMTcgNzAuMTEyNUMwLjY3OTQ2NCA1Ni41NzAyIDQuMzgxODUgNDMuNTIzNyA3LjE5ODgyIDM3LjQ3MzJDMTAuNDcwNSAzMC40NDcyIDE1LjkzODMgMTcuMTE2IDE2LjMyNDMgMTUuNTMwOEMxNi43MTAzIDEzLjk0NjEgMTYuMzM5MiA3LjUwMTIyIDE4LjgxNjEgNC4yOTg3M0MyMC41Mzc5IDIuMDczMzkgMjMuOTA2MSAxIDI2LjEzNjQgMUMyOC4zNjY4IDEgMzMuMTYwMyAyLjMxNTYzIDM1LjA0NzkgNC41NTgwNiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTM1LjkxNjEgODkuMTEwNkMzNi4xMDkxIDkwLjAxNzkgMzcuMDUyNiA5MC44MTQzIDM3LjA1MjYgOTAuODE0M0MzNS42NTg4IDkwLjY0MTUgMzQuNTQzNCA4OS4yODI5IDM0LjU0MzQgODkuMjgyOUMzNC44ODY3IDkwLjQ5MDQgMzYuMTA5MSA5MS4yODg0IDM2LjEwOTEgOTEuMjg4NEMzNS4wNTgxIDkxLjE2MTYgMzQuMDA3IDkxLjI0MTggMzMuNTM1NSA5MS4yNDVDMzMuMTA2OCA5MS4yNDY1IDI3LjYxNjIgOTIuNjI0NiAyNS40NzE1IDk1LjEyNjVIMTIuNTE3OUMxMi4yNjA2IDk1LjEyNjUgMS4zNjU0OCA4My42NTQ4IDEuMDIyMTcgNzAuMTEyNUMwLjY3OTQ2NCA1Ni41NzAyIDQuMzgxODUgNDMuNTIzNyA3LjE5ODgyIDM3LjQ3MzJDMTAuNDcwNSAzMC40NDcyIDE1LjkzODMgMTcuMTE2IDE2LjMyNDMgMTUuNTMwOEMxNi43MTAzIDEzLjk0NjEgMTYuMzM5MiA3LjUwMTIyIDE4LjgxNjEgNC4yOTg3M0MyMC41Mzc5IDIuMDczMzkgMjMuOTA2MSAxIDI2LjEzNjQgMUMyOC4zNjY4IDEgMzMuMTYwMyAyLjMxNTYzIDM1LjA0NzkgNC41NTgwNiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIwLjUiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIvPgo8cGF0aCBkPSJNMzEuMzE1NyAxMi43NzRDMzEuMjE0OCAxMi43ODg1IDM1LjY3NTkgMTAuMjc1OSAzNi4wMTI1IDguMjQ1NkMzNi4yNjk4IDYuNjkzIDM0LjU5NyA0Ljk3ODM2IDM1LjA0NzQgNC41NTgxNEMzNS4zNDc1IDQuMjc3NjIgMzYuMDE4MSA1Ljc3MDE5IDM3LjMzMTcgNi40MzQxOEMzOC43Mzc0IDcuMTQ1MzIgNDAuNzA5MyA4LjE4MDg1IDQzLjk1ODIgOC42MzM3QzQ3LjIwNzcgOS4wODY1NSA1MC4wMDY3IDkuOTYwMTIgNTEuMTk2OCAxMS4yMjE0QzUyLjM4NzMgMTIuNDgzMSA1Mi45OTgzIDEzLjg3MzggNTIuOTk4MyAxMy44NzM4QzUyLjk5ODMgMTMuODczOCA1MS40ODY1IDExLjUxMjIgNDIuNDc4NCAxMi40MTg0QzM1LjU2MjEgMTIuNzc0IDM1LjAzNjYgMTMuODE5OSAzNC4wMDcxIDE0LjQ3NzdDMzIuOTc3NyAxNS4xMzQ5IDM0LjIxMSAxMi4zNTM4IDMxLjMxNTcgMTIuNzc0WiIgZmlsbD0id2hpdGUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIvPgo8cGF0aCBkPSJNMzMuNjMxMyAxMi41NDc1QzMzLjYzMTMgMTIuNTQ3NSAzMy45MTkxIDEyLjQ0NzIgMzQuNDMwMiAxMi4zMTM3QzM0LjY4NyAxMi4yNSAzNC45OTkgMTIuMTcyOSAzNS4zNTY3IDEyLjA4MzlDMzUuNTM2MyAxMi4wNDIgMzUuNzI3OCAxMS45OTc0IDM1LjkyOTEgMTEuOTUwNEMzNi4xMzE0IDExLjkwNjQgMzYuMzQ4NiAxMS44OTM5IDM2LjU3MiAxMS44NTc3QzM4LjM2NTggMTEuNjEzNCA0MC43NyAxMS4zNTY4IDQzLjE4ODIgMTEuMzE2OUM0NC4zOTcyIDExLjI5NTYgNDUuNjA4NCAxMS4zMjY3IDQ2Ljc0MDggMTEuNDI4NkM0Ny4zMDc1IDExLjQ3OTQgNDcuODUzMSAxMS41NTM0IDQ4LjM2ODggMTEuNjM1N0M0OC44ODQxIDExLjcyNzMgNDkuMzY4NCAxMS44MzM0IDQ5LjgxMTEgMTEuOTUyNEM1MC4wMjg4IDEyLjAyNDkgNTAuMjQ2NSAxMi4wNjYzIDUwLjQ0MDYgMTIuMTQ4QzUwLjYzMSAxMi4yMzYgNTAuODEyMiAxMi4zMTk4IDUwLjk4MjEgMTIuMzk4QzUxLjMxMyAxMi41NzcxIDUxLjU5NzcgMTIuNzMxOCA1MS44MTQ5IDEyLjg5MTNDNTIuMDQxOSAxMy4wMzI1IDUyLjE5MzcgMTMuMTgwNSA1Mi4zMDIzIDEzLjI3MTdDNTIuNDA5NCAxMy4zNjQ4IDUyLjQ2NzEgMTMuNDEzOSA1Mi40NjcxIDEzLjQxMzlDNTIuNDY3MSAxMy40MTM5IDUyLjQwMTcgMTMuMzc1NiA1Mi4yNzkyIDEzLjMwMzdDNTIuMTU3MiAxMy4yMzE3IDUxLjk4MzIgMTMuMTIyMSA1MS43NDI5IDEzLjAxN0M1MS41MTE3IDEyLjg5NTkgNTEuMjExNiAxMi43ODg3IDUwLjg3MjQgMTIuNjY3N0M1MC41MjQ1IDEyLjU2NDYgNTAuMTMyOCAxMi40NjIyIDQ5LjcwOTIgMTIuMzI2NkM0OS4yNzk5IDEyLjIxMTIgNDguODA4NCAxMi4xMDc3IDQ4LjMwNDUgMTIuMDE4NkM0Ny43OTkgMTEuOTM3OSA0Ny4yNjM3IDExLjg2NTQgNDYuNzA2MyAxMS44MTUzQzQ1LjU5MDkgMTEuNzE0OCA0NC4zOTMxIDExLjY4NDQgNDMuMTk1NCAxMS43MDVDNDAuNzk4MyAxMS43NDQ0IDM4LjQwNjkgMTEuOTk5NSAzNi42MjQ1IDEyLjI0MjdDMzYuMTgxMyAxMi4zMjE0IDM1Ljc2OSAxMi4zNTMgMzUuNDAyNSAxMi4zNzYyQzM1LjAzNzEgMTIuNDA4NCAzNC43MTg0IDEyLjQzNjkgMzQuNDU1OSAxMi40NjAxQzM0LjE5MzQgMTIuNDg1NSAzMy45ODcgMTIuNTA1NiAzMy44NDYgMTIuNTE5NkMzMy43MDc1IDEyLjUzMzEgMzMuNjMxMyAxMi41NDc1IDMzLjYzMTMgMTIuNTQ3NVoiIGZpbGw9IndoaXRlIiBzdHJva2U9IndoaXRlIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0zMS4zMTU3IDEyLjc3NEMzMS4yMTQ4IDEyLjc4ODUgMzUuNjc1OSAxMC4yNzU5IDM2LjAxMjUgOC4yNDU2QzM2LjI2OTggNi42OTMgMzQuNTk3IDQuOTc4MzYgMzUuMDQ3NCA0LjU1ODE0QzM1LjM0NzUgNC4yNzc2MiAzNi4wMTgxIDUuNzcwMTkgMzcuMzMxNyA2LjQzNDE4QzM4LjczNzQgNy4xNDUzMiA0MC43MDkzIDguMTgwODUgNDMuOTU4MiA4LjYzMzdDNDcuMjA3NyA5LjA4NjU1IDUwLjAwNjcgOS45NjAxMiA1MS4xOTY4IDExLjIyMTRDNTIuMzg3MyAxMi40ODMxIDUyLjk5ODMgMTMuODczOCA1Mi45OTgzIDEzLjg3MzhDNTIuOTk4MyAxMy44NzM4IDUxLjQ4NjUgMTEuNTEyMiA0Mi40Nzg0IDEyLjQxODRDMzUuNTYyMSAxMi43NzQgMzUuMDM2NiAxMy44MTk5IDM0LjAwNzEgMTQuNDc3N0MzMi45Nzc3IDE1LjEzNDkgMzQuMjExIDEyLjM1MzggMzEuMzE1NyAxMi43NzRaIiBmaWxsPSJ3aGl0ZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIwLjUiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIvPgo8cGF0aCBkPSJNMjcuNzc3MSA2Ljg3NjQxQzI3Ljg1NzQgNi4xOTczOSAyOC44Mzg5IDUuNTgyNjEgMzAuMzUwNyA1LjY0NzI2QzMyLjM2MTIgNS44MDg3OCAzMi42NzQxIDYuODI3NzIgMzIuNjY2OSA3LjIzMTk4QzMyLjY1ODIgNy43MjE1OCAzMi41MjQ0IDguNDI5MDMgMzAuMjI0MSA4LjQyOTAzQzI4LjI1OTQgOC40MjkwMyAyNy43MDUgNy40ODY1NiAyNy43NzcxIDYuODc2NDFaIiBmaWxsPSJ3aGl0ZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIi8+CjxwYXRoIGQ9Ik0zMC42MjQxIDguNDA4MDVDMzAuNjI0MSA4LjQwODA1IDI5LjgzNjIgNy45MjMwOSAyOS45OTY3IDcuMDAwOTFDMzAuMTU3NCA2LjA4MTcyIDMxLjEwMTIgNS44Nzg4MiAzMS40NTcgNS45MTE0NUMzMS44MTI2IDUuOTQzNTcgMzIuMDk4NCA2LjI0ODM5IDMyLjA5ODQgNi4yNDgzOUMzMi4wOTg0IDYuMjQ4MzkgMzIuODYwMiA2LjgyMjgyIDMyLjY2NzEgNy40NTM2NkMzMi40NzQxIDguMDg0NjEgMzEuNTE5OCA4LjM2NTY0IDMxLjUxOTggOC4zNjU2NEMzMS41MTk4IDguMzY1NjQgMzAuNzUxMiA4LjQ3MjcgMzAuNjI0MSA4LjQwODA1WiIgZmlsbD0id2hpdGUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTI3Ljc3NzEgNi45MjEzNEMyNy44NTc0IDYuMjQyMzIgMjguODM4OSA1LjYyNzUzIDMwLjM1MDcgNS42OTIxOEMzMi4zNjEyIDUuODUzNyAzMi42NzQxIDYuODcyNzQgMzIuNjY2OSA3LjI3NjlDMzIuNjU4MiA3Ljc2NjUxIDMyLjUyNDQgOC40NzM5MyAzMC4yMjQxIDguNDczOTNDMjguMjU5NCA4LjQ3MzkzIDI3LjcwNSA3LjUzMTQ5IDI3Ljc3NzEgNi45MjEzNFoiIGZpbGw9IndoaXRlIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIi8+CjxwYXRoIGQ9Ik0yNy43NzEyIDM0LjgzMTlDMjkuMjEzMSA0MC43ODM2IDI5LjE2MDUgNTIuOTQ1NiAyNi45MzAyIDYzLjU1NTFDMjQuNyA3NC4xNjQ1IDE0LjQ5MDkgODUuMjkxNCAxMy43MTg4IDg0Ljc3MzlDMTIuOTQ2OCA4NC4yNTY0IDEzLjIwNDEgODMuMTM1NSAxMy4zNzU1IDc5Ljc3MTRDMTMuNTQ3NCA3Ni40MDc0IDEyLjE3NDcgNzIuMzUzMSAxMS4xNDUzIDcwLjQ1NThDMTAuMTE1OSA2OC41NTg2IDEwLjU0NDYgNjQuMjQ1NCAxMC41NDQ2IDY0LjI0NTRDMTAuNTQ0NiA2NC4yNDU0IDE0LjM5MDEgNDEuNDg4NSAxNS4xODQzIDM4LjUwMzhDMTYuMjA2NSAzNC42NTk2IDE5LjAyNjYgMzMuMjc5MyAxOS4wMjY2IDMzLjI3OTMiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0yNy43NzEyIDM0LjgzMTlDMjkuMjEzMSA0MC43ODM2IDI5LjE2MDUgNTIuOTQ1NiAyNi45MzAyIDYzLjU1NTFDMjQuNyA3NC4xNjQ1IDE0LjQ5MDkgODUuMjkxNCAxMy43MTg4IDg0Ljc3MzlDMTIuOTQ2OCA4NC4yNTY0IDEzLjIwNDEgODMuMTM1NSAxMy4zNzU1IDc5Ljc3MTRDMTMuNTQ3NCA3Ni40MDc0IDEyLjE3NDcgNzIuMzUzMSAxMS4xNDUzIDcwLjQ1NThDMTAuMTE1OSA2OC41NTg2IDEwLjU0NDYgNjQuMjQ1NCAxMC41NDQ2IDY0LjI0NTRDMTAuNTQ0NiA2NC4yNDU0IDE0LjM5MDEgNDEuNDg4NSAxNS4xODQzIDM4LjUwMzhDMTYuMjA2NSAzNC42NTk2IDE5LjAyNjYgMzMuMjc5MyAxOS4wMjY2IDMzLjI3OTMiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTI3Ljc3MTIgMzQuODMxOUMyOS4yMTMxIDQwLjc4MzYgMjkuMTYwNSA1Mi45NDU2IDI2LjkzMDIgNjMuNTU1MUMyNC43IDc0LjE2NDUgMTQuNDkwOSA4NS4yOTE0IDEzLjcxODggODQuNzczOUMxMi45NDY4IDg0LjI1NjQgMTMuMjA0MSA4My4xMzU1IDEzLjM3NTUgNzkuNzcxNEMxMy41NDc0IDc2LjQwNzQgMTIuMTc0NyA3Mi4zNTMxIDExLjE0NTMgNzAuNDU1OEMxMC4xMTU5IDY4LjU1ODYgMTAuNTQ0NiA2NC4yNDU0IDEwLjU0NDYgNjQuMjQ1NEMxMC41NDQ2IDY0LjI0NTQgMTQuMzkwMSA0MS40ODg1IDE1LjE4NDMgMzguNTAzOEMxNi4yMDY1IDM0LjY1OTYgMTkuMDI2NiAzMy4yNzkzIDE5LjAyNjYgMzMuMjc5MyIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTI3Ljc3MTIgMzQuODMxOUMyOS4yMTMxIDQwLjc4MzYgMjkuMTYwNSA1Mi45NDU2IDI2LjkzMDIgNjMuNTU1MUMyNC43IDc0LjE2NDUgMTQuNDkwOSA4NS4yOTE0IDEzLjcxODggODQuNzczOUMxMi45NDY4IDg0LjI1NjQgMTMuMjA0MSA4My4xMzU1IDEzLjM3NTUgNzkuNzcxNEMxMy41NDc0IDc2LjQwNzQgMTIuMTc0NyA3Mi4zNTMxIDExLjE0NTMgNzAuNDU1OEMxMC4xMTU5IDY4LjU1ODYgMTAuNTQ0NiA2NC4yNDU0IDEwLjU0NDYgNjQuMjQ1NEMxMC41NDQ2IDY0LjI0NTQgMTQuMzkwMSA0MS40ODg1IDE1LjE4NDMgMzguNTAzOEMxNi4yMDY1IDM0LjY1OTYgMTkuMDI2NiAzMy4yNzkzIDE5LjAyNjYgMzMuMjc5MyIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIwLjUiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIvPgo8L3N2Zz4K";
          const buttonContentDiv = document.createElement("div");
          buttonContentDiv.className = "button_content_3jdgj";
          const buttonTextSpan = document.createElement("span"); buttonTextSpan.textContent = "Chat";
          buttonContentDiv.appendChild(buttonTextSpan); buttonSpan.appendChild(buttonIcon); buttonSpan.appendChild(buttonContentDiv); customButtonContainer.appendChild(buttonSpan);
          buttonSpan.addEventListener("click", showChatModal);
          parentMenu.insertBefore(customButtonContainer, insertBeforeElement);
          injectModalCSS();
        }
      }, 500);
      setTimeout(() => clearInterval(findInsertionPointInterval), 15000);
    }
  
    function showChatModal() {
      if (document.getElementById("peer-chat-modal-overlay")) return;
  
      const overlay = document.createElement("div");
      overlay.className = "ReactModal__Overlay ReactModal__Overlay--after-open modal_modal-overlay_1Lcbx";
      overlay.id = "peer-chat-modal-overlay";
  
      const content = document.createElement("div");
      content.className = "ReactModal__Content ReactModal__Content--after-open modal_modal-content_1h3ll settings-modal_modal-content_2bE7f";
      content.id = "peer-chat-modal-content";
      content.setAttribute("tabindex", "-1"); content.setAttribute("role", "dialog"); content.setAttribute("aria-label", "Peer Chat");
  
      const box = document.createElement("div");
      box.className = "box_box_2jjDp";
      box.style.flexDirection = "column"; box.style.flexGrow = "1";
  
      const header = document.createElement("div");
      header.className = "modal_header_1h7ps";
      const title = document.createElement("div");
      title.className = "modal_header-item_2zQTd modal_header-item-title_tLOU5"; title.textContent = "Peer Chat";
      const closeWrapper = document.createElement("div");
      closeWrapper.className = "modal_header-item_2zQTd modal_header-item-close_2XDeL";
      const closeButton = document.createElement("div");
      closeButton.className = "close-button_close-button_lOp2G close-button_large_2oadS";
      closeButton.setAttribute("role", "button"); closeButton.setAttribute("tabindex", "0"); closeButton.setAttribute("aria-label", "Close");
      const closeIcon = document.createElement("img");
      closeIcon.className = "close-button_close-icon_HBCuO"; closeIcon.src = "static/assets/cb666b99d3528f91b52f985dfb102afa.svg"; closeIcon.draggable = false;
      closeButton.appendChild(closeIcon); closeWrapper.appendChild(closeButton); header.appendChild(title); header.appendChild(closeWrapper);
  
      const body = document.createElement("div");
      body.className = "settings-modal_body_cAUJ0 box_box_2jjDp";
      body.id = "peer-chat-modal-body-content";
  
      body.innerHTML = `
        <div class="chat-section">
          <label>Your ID:</label>
          <span id="my-peer-id" class="peer-id-value" title="Click to copy">Loading...</span>
        </div>
  
        <div class="chat-section">
            <label for="peer-id-input">Connect to Peer ID:</label>
            <div class="input-button-row">
               <input type="text" id="peer-id-input" placeholder="Enter Peer ID" class="input_input-form_l9eYg">
               <button id="connect-button" class="chat-button">Connect</button>
            </div>
            <div id="status-display" class="peer-status-display">Loading PeerJS...</div>
        </div>
  
        <div class="chat-section chat-messages-section">
             <label>Chat:</label>
             <div id="chat-messages" class="peer-chat-messages"></div>
        </div>
  
        <div class="chat-section peer-chat-input-area">
             <label for="message-input">Message:</label>
             <div class="input-button-row">
                 <input type="text" id="message-input" placeholder="Type your message..." class="input_input-form_l9eYg" disabled>
                 <button id="send-button" class="chat-button" disabled>Send</button>
             </div>
        </div>
      `;
  
      box.appendChild(header); box.appendChild(body); content.appendChild(box); overlay.appendChild(content);
      document.body.appendChild(overlay);
  
      modalElementsCache = {
        myIdDisplay: body.querySelector("#my-peer-id"),
        peerIdInput: body.querySelector("#peer-id-input"),
        connectButton: body.querySelector("#connect-button"),
        statusDisplay: body.querySelector("#status-display"),
        chatMessages: body.querySelector("#chat-messages"),
        messageInput: body.querySelector("#message-input"),
        sendButton: body.querySelector("#send-button"),
        modalOverlay: overlay,
      };
  
      const closeModal = () => { handleDisconnect(); if (overlay) overlay.remove(); modalElementsCache = null; };
      closeButton.addEventListener("click", closeModal);
      overlay.addEventListener("click", (e) => { if (e.target === overlay) closeModal(); });
  
      modalElementsCache.myIdDisplay.addEventListener('click', () => {
        if (myPeerId) navigator.clipboard.writeText(myPeerId)
          .then(() => updateStatus(modalElementsCache, `ID ${myPeerId} copied!`))
          .catch(err => updateStatus(modalElementsCache, 'Failed to copy ID.'));
      });
      modalElementsCache.connectButton.addEventListener("click", () => {
        const targetId = modalElementsCache.peerIdInput.value.trim();
        if (targetId) connectToPeer(targetId); else updateStatus(modalElementsCache, "Please enter a Peer ID.");
      });
      modalElementsCache.sendButton.addEventListener("click", () => sendMessage(modalElementsCache.messageInput.value));
      modalElementsCache.messageInput.addEventListener("keypress", (e) => { if (e.key === "Enter" && !modalElementsCache.sendButton.disabled) sendMessage(modalElementsCache.messageInput.value); });
  
      _loadPeerJS((err) => {
        if (err) { updateStatus(modalElementsCache, "Error loading PeerJS."); if (modalElementsCache.connectButton) modalElementsCache.connectButton.disabled = true; return; }
        if (!isPeerInitialized && !isInitializing) initializePeer();
        else if (isPeerInitialized) {
          modalElementsCache.myIdDisplay.textContent = myPeerId; modalElementsCache.myIdDisplay.title = "Click to copy";
          if (currentConnection?.open) { updateStatus(modalElementsCache, `Connected to ${currentConnection.peer}`); modalElementsCache.chatMessages.innerHTML = ""; chatHistory.forEach(msg => displayMessage(msg.sender, msg.message)); }
          else { updateStatus(modalElementsCache, "Ready. Share ID or connect."); modalElementsCache.chatMessages.innerHTML = ""; }
        } else updateStatus(modalElementsCache, "Initializing Peer...");
        updateUIForConnectionState(modalElementsCache, currentConnection?.open);
      });
    }
  
    function injectModalCSS() {
      const styleId = "peer-chat-modal-styles-settings-clone";
      if (document.getElementById(styleId)) return;
  
      const css = `
        #peer-chat-modal-content.settings-modal_modal-content_2bE7f {
           max-height: 80vh;
        }
  
         #peer-chat-modal-body-content.settings-modal_body_cAUJ0 {
           overflow-y: auto;
           flex-grow: 1;
           min-height: 0;
           padding: 1rem 1.5rem;
           display: flex;
           flex-direction: column;
           gap: 1rem;
           font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
           color: hsla(225, 15%, 40%, 1);
         }
  
        .chat-section {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .chat-section label {
          font-weight: bold;
          color: #333; /* Darker text for labels */
          font-size: 0.9rem;
          margin-bottom: 0;
          display: block;
        }
  
         .peer-id-value {
          font-family: monospace;
          background-color: #fff; /* White background */
          padding: 0.375rem 0.75rem;
          border-radius: 0.25rem;
          cursor: pointer;
          border: 1px solid #ced4da;
          color: #495057;
          font-size: 0.95em;
          display: inline-block;
          line-height: 1.5;
          user-select: all;
          word-break: break-all;
        }
        .peer-id-value:hover { border-color: #007bff; } /* Lighter blue on hover */
  
        .input-button-row { display: flex; gap: 0.75rem; align-items: center; }
  
        #peer-chat-modal-body-content input.input_input-form_l9eYg {
          flex-grow: 1;
           font-size: 0.9rem;
           border-radius: 0.2rem;
        }
  
        #peer-chat-modal-body-content .chat-button {
           padding: 0.5rem 1rem;
           border: none;
           border-radius: 0.3rem;
           background-color: hsla(194, 100%, 50%, 1); /* Bootstrap primary color */
           color: white;
           font-weight: bold;
           cursor: pointer;
           transition: background-color 0.2s ease, opacity 0.2s ease;
           font-size: 0.95rem;
           flex-shrink: 0;
           line-height: 1.5;
        }
        #peer-chat-modal-body-content .chat-button:hover:not(:disabled) { background-color: #0056b3; } /* Darker blue on hover */
        #peer-chat-modal-body-content .chat-button:disabled { background-color: #e9ecef; color: #adb5bd; opacity: 1; cursor: not-allowed; } /* Light gray when disabled */
  
        .peer-status-display {
          font-size: 0.875rem;
          color: #495057; /* Darker status text */
          min-height: 1.4em;
          margin-top: 0.25rem;
          text-align: left;
        }
  
        .chat-messages-section {
           flex-grow: 1;
           min-height: 150px;
           display: flex;
           flex-direction: column;
        }
        .peer-chat-messages {
          flex-grow: 1;
          overflow-y: auto;
          padding: 0.75rem;
          border: 1px solid #ced4da;
          border-radius: 0.25rem;
          background-color: #fff; /* White background for messages */
          min-height: 100px;
          color: #212529; /* Darker text for messages */
          margin-top: 0.25rem;
        }
        .chat-message { margin-bottom: 0.5rem; line-height: 1.4; }
        .message-sender { font-weight: bold; margin-right: 0.4em; font-size: 0.9em; display: inline; }
        .message-content { white-space: pre-wrap; word-wrap: break-word; display: inline; }
        .message-me .message-sender { color: #0052cc; }
        .message-peer .message-sender { color: #177534; }
        .message-system { font-style: italic; color: #6c757d; font-size: 0.85em; }
        .message-system .message-sender { display: none; }
  
        .peer-chat-input-area {
          flex-shrink: 0;
          margin-top: 0.5rem;
        }
  
        #peer-chat-modal-body-content *:focus {
          outline: 2px solid #80bdff;
          outline-offset: 1px;
        }
        #peer-chat-modal-body-content *:focus:not(:focus-visible) { outline: none; }
      `;
      const styleElement = document.createElement("style");
      styleElement.id = styleId;
      styleElement.textContent = css;
      document.head.appendChild(styleElement);
    }
  
    if ((window.location.pathname.includes('/editor') || window.location.pathname.includes('projects/') || window.location.hash.includes('editor')) && typeof document !== 'undefined' && typeof requestAnimationFrame !== 'undefined') {
      requestAnimationFrame(() => addCustomMenuButton());
    }
    if (Scratch?.extensions?.register) Scratch.extensions.register(new PeerChatExtension());
  
  })(window.Scratch);