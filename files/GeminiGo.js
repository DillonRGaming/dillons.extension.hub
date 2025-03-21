(function(Scratch) {
    "use strict";

    if (!Scratch.extensions.unsandboxed) {
        alert("This extension requires unsandboxed mode to work!");
        return;
    }

    const DEFAULT_API_KEY = "AIzaSyDvvjZyWTeocOIzR96ST6SGpok6_APMVjc";
    let apiKey = DEFAULT_API_KEY;
    let backupApiKey = "";
    let customPrompt = "Be short and concise";
    let selectedModel = "gemini-2.0-flash";
    let failCount = 0;
    let useBackup = false;

    class GeminiGoExtension {
        getInfo() {
            return {
                id: "geminiGo",
                name: "GeminiGo",
                color1: "#262626",
                color2: "#262626",
                blocks: [
                    {
                        opcode: "setApiKey",
                        text: "set api key to [API_KEY]",
                        blockType: Scratch.BlockType.COMMAND,
                        arguments: {
                            API_KEY: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ""
                            }
                        }
                    },
                    {
                        opcode: "setBackupApiKey",
                        text: "set backup api key to [API_KEY]",
                        blockType: Scratch.BlockType.COMMAND,
                        arguments: {
                            API_KEY: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ""
                            }
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
                        arguments: {
                            QUESTION: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "What is AI?"
                            }
                        }
                    },
                    {
                        opcode: "askGeminiWithPrompt",
                        text: "ask gemini (no memory) prompt: [PROMPT] question: [QUESTION]",
                        blockType: Scratch.BlockType.REPORTER,
                        arguments: {
                            PROMPT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "Be short and concise",
                            },
                            QUESTION: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "What is AI?",
                            },
                        },
                    },
                    {
                        opcode: "setPrompt",
                        text: "set prompt to [PROMPT]",
                        blockType: Scratch.BlockType.COMMAND,
                        arguments: {
                            PROMPT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: customPrompt
                            }
                        }
                    },
                    {
                        opcode: "selectModel",
                        text: "select model [MODEL]",
                        blockType: Scratch.BlockType.COMMAND,
                        arguments: {
                            MODEL: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "gemini_models",
                                defaultValue: selectedModel
                            }
                        }
                    }
                ],
                menus: {
                    gemini_models: ["gemini-2.0-flash", "gemini-1.5-flash"]
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

        async askGemini(args) {
            const question = args.QUESTION;
            const prompt = customPrompt;
            let currentApiKey = useBackup ? backupApiKey : apiKey;

            const makeRequest = async (key) => {
              const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${selectedModel}:generateContent?key=${key}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{ text: `${prompt} ${question}` }]
                        }]
                    })
                });
              return response;
            }

            try {
                let response;

                if (useBackup) {
                  // Always try backup if we're using it
                  response = await makeRequest(backupApiKey);
                } else {
                  response = await makeRequest(apiKey);
                }

                const data = await response.json();

                if (data.candidates && data.candidates.length > 0) {
                    failCount = 0;
                    useBackup = false; // Reset to using the main API key
                    return data.candidates[0].content.parts[0].text;
                } else {
                    if (!useBackup) { // Only increment if we weren't already using backup
                      failCount++;
                    }

                    if (failCount >= 2 && !useBackup) {
                        useBackup = true;
                        console.log("Switching to backup API key.");
                        if (backupApiKey) {
                          return this.askGemini(args); // Retry with backup
                        } else {
                          return "Error: No response and no backup API key set.";
                        }

                    }
                    return "Error: No response from Gemini.";
                }
            } catch (error) {
                console.error("Error fetching data from Gemini:", error);
                if (!useBackup) {
                  failCount++;
                }
                if (failCount >= 2 && !useBackup) {
                    useBackup = true;
                    console.log("Switching to backup API key.");
                    if (backupApiKey) {
                      return this.askGemini(args); // Retry with backup
                    } else {
                      return "Error: Unable to contact and no backup API key.";
                    }
                }
                return "Error: Unable to contact Gemini.";
            }
        }

        async askGeminiWithPrompt(args) {
            const question = args.QUESTION;
            const prompt = args.PROMPT;
            let currentApiKey = useBackup ? backupApiKey : apiKey;

            const makeRequest = async (key) => {
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${selectedModel}:generateContent?key=${key}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{ text: `${prompt} ${question}` }]
                        }]
                    })
                });
                return response;
            };

            try {
                let response;
                if (useBackup) {
                  response = await makeRequest(backupApiKey);
                } else {
                  response = await makeRequest(apiKey);
                }

                const data = await response.json();
                if (data.candidates && data.candidates.length > 0) {
                    failCount = 0;
                    useBackup = false;
                    return data.candidates[0].content.parts[0].text;
                } else {
                  if (!useBackup) {
                    failCount++;
                  }
                    if (failCount >= 2 && !useBackup) {
                        useBackup = true;
                        console.log("Switching to backup API key.");
                        if (backupApiKey) {
                          return this.askGeminiWithPrompt(args);
                        } else {
                          return "Error: No response and no backup API key set.";
                        }
                    }
                    return "Error: No response from Gemini.";
                }
            } catch (error) {
                console.error("Error fetching data from Gemini:", error);
                if(!useBackup){
                  failCount++;
                }

                if (failCount >= 2 && !useBackup) {
                    useBackup = true;
                    console.log("Switching to backup API key.");
                    if (backupApiKey) {
                      return this.askGeminiWithPrompt(args);
                    } else {
                      return "Error: Unable to contact and no backup API key.";
                    }
                }
                return "Error: Unable to contact Gemini.";
            }
        }

        setPrompt(args) {
            customPrompt = args.PROMPT;
            console.log(`Prompt set to: ${customPrompt}`);
        }

        selectModel(args) {
            selectedModel = args.MODEL;
            console.log(`Model selected: ${selectedModel}`);
        }
    }

    Scratch.extensions.register(new GeminiGoExtension());
})(Scratch);
