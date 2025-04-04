(function(Scratch) {
    "use strict";

    if (!Scratch.extensions.unsandboxed) {
        alert("This extension requires unsandboxed mode to work!");
        return;
    }

    const svgIcon = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTMxIiBoZWlnaHQ9IjkzMSIgdmlld0JveD0iMCAwIDkzMSA5MzEiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjQ2NS41IiBjeT0iNDY1LjUiIHI9IjQ2NS41IiBmaWxsPSIjMjYyNjI2Ii8+CjxwYXRoIGQ9Ik00NTcuNTI0IDE4Ny43MzdDNDYwLjM2OCAxNzkuNzcyIDQ3MS42MzIgMTc5Ljc3MiA0NzQuNDc2IDE4Ny43MzdMNTUwLjIyOCAzOTkuODc5QzU1MS4xMTEgNDAyLjM1MiA1NTMuMDMgNDA0LjMxNiA1NTUuNDgxIDQwNS4yNTZMNzYxLjA4NSA0ODQuMDk3Qzc2OC43ODkgNDg3LjA1MSA3NjguNzg5IDQ5Ny45NDkgNzYxLjA4NSA1MDAuOTAzTDU1NS40ODEgNTc5Ljc0NEM1NTMuMDMgNTgwLjY4NCA1NTEuMTExIDU4Mi42NDggNTUwLjIyOCA1ODUuMTIxTDQ3NC40NzYgNzk3LjI2M0M0NzEuNjMyIDgwNS4yMjggNDYwLjM2OCA4MDUuMjI4IDQ1Ny41MjQgNzk3LjI2M0wzODEuNzcyIDU4NS4xMjFDMzgwLjg4OSA1ODIuNjQ4IDM3OC45NyA1ODAuNjg0IDM3Ni41MTkgNTc5Ljc0NEwxNzAuOTE1IDUwMC45MDNDMTYzLjIxMSA0OTcuOTQ5IDE2My4yMTEgNDg3LjA1MSAxNzAuOTE1IDQ4NC4wOTdMMzc2LjUxOSA0MDUuMjU2QzM3OC45NyA0MDQuMzE2IDM4MC44ODkgNDAyLjM1MiAzODEuNzcyIDM5OS44NzlMNDU3LjUyNCAxODcuNzM3WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==";

    const DEFAULT_API_KEY = "AIzaSyDvvjZyWTeocOIzR96ST6SGpok6_APMVjc";
    let apiKey = DEFAULT_API_KEY;
    let backupApiKey = "";
    let customPrompt = "Be short and concise";
    let selectedModel = "gemini-2.0-flash";
    let temperature = 0.7;
    let failCount = 0;
    let useBackup = false;

    class GeminiGoExtension {
        getInfo() {
            return {
                id: "geminiGo",
                name: "GeminiGo",
                menuIconURI: svgIcon,
                blockIconURI: svgIcon,
                color1: "#262626",
                color2: "#262626",
                blocks: [
                    {
                        opcode: "setApiKey",
                        text: "set api key to [API_KEY]",
                        blockType: Scratch.BlockType.COMMAND,
                        arguments: {
                            API_KEY: { type: Scratch.ArgumentType.STRING, defaultValue: "" }
                        }
                    },
                    {
                        opcode: "setBackupApiKey",
                        text: "set backup api key to [API_KEY]",
                        blockType: Scratch.BlockType.COMMAND,
                        arguments: {
                            API_KEY: { type: Scratch.ArgumentType.STRING, defaultValue: "" }
                        }
                    },
                    {
                        opcode: "useDefaultApiKey",
                        text: "use default api key",
                        blockType: Scratch.BlockType.COMMAND,
                    },
                    {
                        opcode: "askGemini",
                        text: "ask gemini (no memory) [QUESTION]",
                        blockType: Scratch.BlockType.REPORTER,
                        blockShape: Scratch.BlockShape.LEAF,
                        arguments: {
                            QUESTION: { type: Scratch.ArgumentType.STRING, defaultValue: "What is AI?" }
                        }
                    },
                    {
                        opcode: "askGeminiWithPrompt",
                        text: "ask gemini (no memory) prompt: [PROMPT] question: [QUESTION]",
                        blockType: Scratch.BlockType.REPORTER,
                        blockShape: Scratch.BlockShape.LEAF,
                        arguments: {
                            PROMPT: { type: Scratch.ArgumentType.STRING, defaultValue: "Be short and concise" },
                            QUESTION: { type: Scratch.ArgumentType.STRING, defaultValue: "What is AI?" }
                        }
                    },
                    {
                        opcode: "setPrompt",
                        text: "set prompt to [PROMPT]",
                        blockType: Scratch.BlockType.COMMAND,
                        arguments: {
                            PROMPT: { type: Scratch.ArgumentType.STRING, defaultValue: customPrompt }
                        }
                    },
                    {
                        opcode: "selectModel",
                        text: "select model [MODEL]",
                        blockType: Scratch.BlockType.COMMAND,
                        arguments: {
                            MODEL: { type: Scratch.ArgumentType.STRING, menu: "gemini_models", defaultValue: selectedModel }
                        }
                    },
                    {
                        opcode: "setTemperature",
                        text: "set temperature to [TEMP]",
                        blockType: Scratch.BlockType.COMMAND,
                        arguments: {
                            TEMP: { type: Scratch.ArgumentType.NUM, menu: "temperature_values", defaultValue: 0.7 }
                        }
                    }
                ],
                menus: {
                    gemini_models: [
                        "gemini-2.0-flash-lite",
                        "gemini-2.0-flash",
                        "gemini-1.5-flash-001",
                        "gemini-1.5-flash-002",
                        "gemini-1.5-pro-001",
                        "gemini-1.5-pro-002",
                        "gemini-1.0-pro-vision"
                    ],
                    temperature_values: [
                      {text: "0.0", value: 0.0},
                      {text: "0.2", value: 0.2},
                      {text: "0.4", value: 0.4},
                      {text: "0.6", value: 0.6},
                      {text: "0.7", value: 0.7},
                      {text: "0.8", value: 0.8},
                      {text: "1.0", value: 1.0},
                      {text: "1.2", value: 1.2},
                      {text: "1.4", value: 1.4},
                      {text: "1.6", value: 1.6},
                      {text: "1.8", value: 1.8},
                      {text: "2.0", value: 2.0}
                    ]
                }
            };
        }

        setApiKey(args) {
            apiKey = args.API_KEY;
            console.log("API key set.");
        }

        setBackupApiKey(args) {
            backupApiKey = args.API_KEY;
            console.log("Backup API key set.");
        }

        useDefaultApiKey() {
            apiKey = DEFAULT_API_KEY;
            console.log("Using default API key.");
        }

        setPrompt(args) {
            customPrompt = args.PROMPT;
            console.log(`Prompt set to: ${customPrompt}`);
        }

        selectModel(args) {
            selectedModel = args.MODEL;
            console.log(`Model selected: ${selectedModel}`);
        }

        setTemperature(args) {
            temperature = args.TEMP;
            console.log(`Temperature set to: ${temperature}`);
        }

        async askGemini(args) {
            const question = args.QUESTION;
            return await this.makeRequest(customPrompt, question);
        }

        async askGeminiWithPrompt(args) {
            return await this.makeRequest(args.PROMPT, args.QUESTION);
        }

        async makeRequest(prompt, question) {
            const makeRequest = async (key) => {
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${selectedModel}:generateContent?key=${key}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: `${prompt} ${question}` }] }],
                        generationConfig: {
                          temperature: temperature
                        }
                    })
                });
                return response;
            };

            return await this.handleRequest(makeRequest);
        }

        async handleRequest(makeRequest) {
            try {
                let response = useBackup ? await makeRequest(backupApiKey) : await makeRequest(apiKey);
                const data = await response.json();

                if (data.candidates && data.candidates.length > 0) {
                    failCount = 0;
                    useBackup = false;
                    return data.candidates[0].content.parts[0].text;
                } else {
                    if (!useBackup) failCount++;
                    if (failCount >= 2 && !useBackup) {
                        useBackup = true;
                        console.log("Switching to backup API key.");
                        return backupApiKey ? await this.retryRequest(makeRequest, backupApiKey) : "Error: No response and no backup API key set.";
                    }
                    return "Error: No response from Gemini.";
                }
            } catch (error) {
                console.error("Error fetching data from Gemini:", error);
                if (!useBackup) failCount++;
                if (failCount >= 2 && !useBackup) {
                    useBackup = true;
                    console.log("Switching to backup API key.");
                    return backupApiKey ? await this.retryRequest(makeRequest, backupApiKey) : "Error: Unable to contact and no backup API key.";
                }
                return "Error: Unable to contact Gemini.";
            }
        }
      
        async retryRequest(makeRequest, key) {
            try {
                const response = await makeRequest(key);
                const data = await response.json();
                if (data.candidates && data.candidates.length > 0) {
                    failCount = 0;
                    useBackup = false;
                    return data.candidates[0].content.parts[0].text;
                } else {
                    return "Error: No response from Gemini even with backup API key.";
                }
            } catch (error) {
                console.error("Error fetching data from Gemini with backup API key:", error);
                return "Error: Unable to contact Gemini with backup API key.";
            }
        }
    }

    Scratch.extensions.register(new GeminiGoExtension());
})(Scratch);