(function(Scratch) {
    "use strict";

    if (!Scratch.extensions.unsandboxed) {
        alert("This extension requires unsandboxed mode to work!");
        return;
    }

    const svgIcon = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTMxIiBoZWlnaHQ9IjkzMSIgdmlld0JveD0iMCAwIDkzMSA5MzEiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjQ2NS41IiBjeT0iNDY1LjUiIHI9IjQ2NS41IiBmaWxsPSIjMjYyNjI2Ii8+CjxwYXRoIGQ9Ik0zNzAuNjk2IDU2My4xMTFDNDM2LjE5MSA2MjcuNzMzIDQ2OS4xOTQgNzc3IDQ2OS4xOTQgNzc3QzQ2OS4xOTQgNzc3IDUwNS4wOTggNjMyLjE0OCA1NjguOTIzIDU2OC4wMjhDNjMyLjU4OSA1MDQuMDY3IDc3NyA0NjcuMjI5IDc3NyA0NjcuMjI5Qzc3NyA0NjcuMjI5IDYyOC4yNzUgNDM1LjA1NyA1NjMuOTk4IDM3MC4xMTlDNDk5LjM4MSAzMDQuODM2IDQ2OS4xOTQgMTU1IDQ2OS4xOTQgMTU1QzQ2OS4xOTQgMTU1IDQzNi4zMDkgMzA0Ljk5NSAzNzAuNjk2IDM3MC4xMTlDMzA0LjkxMiA0MzUuNDExIDE1NCA0NjcuMjI5IDE1NCA0NjcuMjI5QzE1NCA0NjcuMjI5IDMwNC44NTggNDk4LjE1MSAzNzAuNjk2IDU2My4xMTFaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K";

    const DEFAULT_API_KEY = "AIzaSyDvvjZyWTeocOIzR96ST6SGpok6_APMVjc";
    let apiKey = DEFAULT_API_KEY;
    let customPrompt = "Be short and concise";
    let selectedModel = "gemini-2.0-flash";
    let temperature = 0.7;
    let failCount = 0;

    class GeminiExtension {
        getInfo() {
            return {
                id: "gemini",
                name: "Gemini",
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
                        "gemini-2.0-flash",
                        "gemini-2.0-flash-thinking-exp-01-21",
                        "gemini-2.5-pro-exp-03-25"
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
                let response = await makeRequest(apiKey);
                const data = await response.json();

                if (data.candidates && data.candidates.length > 0) {
                    failCount = 0;
                    return data.candidates[0].content.parts[0].text;
                } else {
                    failCount++;
                    return "Error: No response from Gemini.";
                }
            } catch (error) {
                console.error("Error fetching data from Gemini:", error);
                failCount++;
                return "Error: Unable to contact Gemini.";
            }
        }
    }

    Scratch.extensions.register(new GeminiExtension());
})(Scratch);
