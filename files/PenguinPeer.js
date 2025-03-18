(function (Scratch) {
    "use strict";
  
    function generatePenguinId() {
      const WORDS = ["Penguin"];
      const MAX_NUM = 999;
      return `${WORDS[Math.floor(Math.random() * WORDS.length)]}-${String(
        Math.floor(Math.random() * MAX_NUM)
      ).padStart(3, "0")}`;
    }
  
    class PenguinPeer {
      constructor() {
        this.penguin = null;
        this.penguinId = null;
        this.lastReceivedData = null;
        this.allReceivedData = [];
        this.connections = {};
        this.isPenguinStarted = false;
  
        this._loadPenguinJS(() => {
          if (typeof Peer === "undefined") {
            return;
          }
  
          this.penguin = new Peer(generatePenguinId(), {
            host: "0.peerjs.com",
            port: 443,
            secure: true,
            debug: 0,
          });
  
          this.penguin.on("open", (id) => {
            this.penguinId = id;
            this.isPenguinStarted = true;
          });
  
          this.penguin.on("connection", (conn) => {
            this.setupConnectionEvents(conn);
          });
  
          this.penguin.on("disconnected", () => {
            this.isPenguinStarted = false;
            this.penguinId = null;
            if (!this.penguin.destroyed) this.penguin.reconnect();
          });
  
          this.penguin.on("close", () => {
            this.isPenguinStarted = false;
            this.penguinId = null;
            this.connections = {};
          });
  
          this.penguin.on("error", (err) => {
            this.isPenguinStarted = false;
            this.penguinId = null;
            this.connections = {};
          });
        });
      }
  
      _loadPenguinJS(callback) {
        if (typeof Peer !== "undefined") {
          callback();
          return;
        }
  
        const script = document.createElement("script");
        script.src = "https://unpkg.com/peerjs@1.5.2/dist/peerjs.min.js";
        script.onload = callback;
        script.onerror = () => {
          alert("Failed to load PenguinJS. Check connection.");
          callback();
        };
        document.head.appendChild(script);
      }
  
      getInfo() {
        return {
          id: "penguinpeer",
          name: "PenguinPeer",
          color1: "#4a90e2",
          color2: "#357ebd",
          color3: "#2069a8",
          blocks: [
            {
              opcode: "getPenguinId",
              blockType: Scratch.BlockType.REPORTER,
              text: "My Penguin ID",
            },
            '---',
            {
              opcode: "connectToPenguin",
              blockType: Scratch.BlockType.COMMAND,
              text: "Connect to Penguin ID: [PENGUINID]",
              arguments: {
                PENGUINID: { type: Scratch.ArgumentType.STRING, defaultValue: "" },
              },
            },
            {
              opcode: "isPenguinConnected",
              blockType: Scratch.BlockType.BOOLEAN,
              text: "Is connected to Penguin [PENGUINID]?",
              arguments: {
                PENGUINID: { type: Scratch.ArgumentType.STRING, defaultValue: "" },
              },
            },
            '---',
            {
              opcode: "sendPenguinData",
              blockType: Scratch.BlockType.COMMAND,
              text: "Send [DATA] to Penguin [PENGUINID]",
              arguments: {
                DATA: { type: Scratch.ArgumentType.STRING, defaultValue: "Hello!" },
                PENGUINID: { type: Scratch.ArgumentType.STRING, defaultValue: "" },
              },
            },
            {
              opcode: "broadcastPenguinData",
              blockType: Scratch.BlockType.COMMAND,
              text: "Broadcast [DATA] to all Penguins",
              arguments: {
                DATA: { type: Scratch.ArgumentType.STRING, defaultValue: "Hello, Penguins!" },
              },
            },
            '---',
            {
              opcode: "whenPenguinDataReceived",
              blockType: Scratch.BlockType.HAT,
              text: "When Penguin data received",
            },
            {
              opcode: "getLastPenguinData",
              blockType: Scratch.BlockType.REPORTER,
              text: "Last received Penguin data",
            },
            {
              opcode: "getAllPenguinData",
              blockType: Scratch.BlockType.REPORTER,
              text: "All received Penguin data (JSON)",
            },
            {
              opcode: "clearPenguinData",
              blockType: Scratch.BlockType.COMMAND,
              text: "Clear received Penguin data",
            },
            '---',
            {
              opcode: "disconnectPenguin",
              blockType: Scratch.BlockType.COMMAND,
              text: "Disconnect from Penguin [PENGUINID]",
              arguments: {
                PENGUINID: { type: Scratch.ArgumentType.STRING, defaultValue: "" },
              },
            },
            {
              opcode: "disconnectAllPenguins",
              blockType: Scratch.BlockType.COMMAND,
              text: "Disconnect from all Penguins",
            },
            '---',
            {
              opcode: "connectedPenguinCount",
              blockType: Scratch.BlockType.REPORTER,
              text: "Number of connected Penguins",
            },
            {
              opcode: "listConnectedPenguins",
              blockType: Scratch.BlockType.REPORTER,
              text: "List of connected Penguins (JSON)",
            },
          ],
        };
      }
  
      getPenguinId() {
        return this.penguinId || "";
      }
  
      connectToPenguin(args) {
        if (!this.penguin || !this.isPenguinStarted) {
          alert("Penguin system not initialized yet. Try again.");
          return;
        }
  
        const penguinIdToConnect = args.PENGUINID;
        if (!penguinIdToConnect) {
          alert("Please enter a Penguin ID to connect to.");
          return;
        }
  
        if (this.connections[penguinIdToConnect]) {
          return;
        }
  
        const conn = this.penguin.connect(penguinIdToConnect, { reliable: true });
  
        conn.on("open", () => {
          this.setupConnectionEvents(conn);
          conn.send("Connected to Penguin " + this.penguinId);
        });
  
        conn.on("error", (err) => {
          alert(`Connection failed: ${err}`);
        });
      }
  
      sendPenguinData(args) {
        const penguinIdToSend = args.PENGUINID;
        if (!this.connections[penguinIdToSend]) return;
  
        this.connections[penguinIdToSend].send(args.DATA);
      }
  
      whenPenguinDataReceived() {
        return true;
      }
  
      disconnectPenguin(args) {
        const penguinId = args.PENGUINID;
        if (this.connections[penguinId]) {
          this.connections[penguinId].close();
          delete this.connections[penguinId];
        }
      }
  
      disconnectAllPenguins() {
        Object.keys(this.connections).forEach((penguinId) => {
          this.connections[penguinId].close();
          delete this.connections[penguinId];
        });
      }
  
      broadcastPenguinData(args) {
        Object.values(this.connections).forEach((conn) => {
          conn.send(args.DATA);
        });
      }
  
      setupConnectionEvents(conn) {
        this.connections[conn.peer] = conn;
  
        conn.on("data", (data) => {
          if (data === `Connected to Penguin ${this.penguinId}`) {
            return;
          }
          this.lastReceivedData = String(data);
          this.allReceivedData.push({ peer: conn.peer, data: String(data) });
          Scratch.vm.runtime.startHats("pangpeer_whenPenguinDataReceived");
        });
  
        conn.on("close", () => {
          delete this.connections[conn.peer];
        });
      }
  
      getLastPenguinData() {
        return this.lastReceivedData || "";
      }
  
      getAllPenguinData() {
        return JSON.stringify(this.allReceivedData);
      }
  
      clearPenguinData() {
        this.allReceivedData = [];
      }
  
      isPenguinConnected(args) {
        return !!this.connections[args.PENGUINID];
      }
  
      connectedPenguinCount() {
        return Object.keys(this.connections).length;
      }
  
      listConnectedPenguins() {
        return JSON.stringify(Object.keys(this.connections));
      }
    }
  
    Scratch.extensions.register(new PenguinPeer());
  })(Scratch);