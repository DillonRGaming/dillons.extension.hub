(function(Scratch) {
    "use strict";

    if (!Scratch.extensions.unsandboxed) {
        alert("This extension requires unsandboxed mode to work!");
        return;
    }

    const DEFAULT_API_KEY = "AIzaSyDvvjZyWTeocOIzR96ST6SGpok6_APMVjc";
    let apiKey = DEFAULT_API_KEY;
    let customPrompt = "Be short and concise";
    let selectedModel = "gemini-2.0-flash";

    class GeminiGoExtension {
        getInfo() {
            return {
                id: "geminiGo",
                name: "GeminiGo",
                color1: "#333333",
                color2: "#333333",
                blocks: [
                    {
                        opcode: "setApiKey",
                        text: "set API key to [API_KEY]",
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
                        text: "use default API key",
                        blockType: Scratch.BlockType.COMMAND,
                    },
                    {
                        opcode: "askGemini",
                        text: "ask Gemini (No Memory) [QUESTION]",
                        blockType: Scratch.BlockType.REPORTER,
                        arguments: {
                            QUESTION: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "What is AI?"
                            }
                        }
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

        useDefaultApiKey() {
            apiKey = DEFAULT_API_KEY;
            console.log("Using default API key.");
        }

        async askGemini(args) {
            const question = args.QUESTION;
            const prompt = customPrompt;

            try {
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${selectedModel}:generateContent?key=${apiKey}`, {
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

                const data = await response.json();
                if (data.candidates && data.candidates.length > 0) {
                    return data.candidates[0].content.parts[0].text;
                } else {
                    return "Error: No response from Gemini.";
                }
            } catch (error) {
                console.error("Error fetching data from Gemini:", error);
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
