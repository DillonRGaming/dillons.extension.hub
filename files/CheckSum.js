(function(Scratch){
    const blockIconURIKey = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTMxIiBoZWlnaHQ9IjkzMSIgdmlld0JveD0iMCAwIDkzMSA5MzEiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjQ2NS41IiBjeT0iNDY1LjUiIHI9IjQ2NS41IiBmaWxsPSIjOEU1OEFEIi8+CjxlbGxpcHNlIGN4PSIyMDEuOTk0IiBjeT0iMjAxLjk5NCIgcng9IjIwMS45OTQiIHJ5PSIyMDEuOTk0IiB0cmFuc2Zvcm09Im1hdHJpeCgtMC44MDE3NCAtMC41OTc2NzIgLTAuNTk3NjcyIDAuODAxNzQgNTkyLjQxNyA0MzEuMTA2KSIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTg0MC4xNzEgMzgxLjcwOUw0NjYuOTQ0IDM3OS41OUM0NTcuMjYzIDM3OS41MzUgNDQ4LjkzMiAzODYuNDIyIDQ0Ny4xNjYgMzk1Ljk0MUw0MjEuOTg2IDUzMS42NjFDNDE5LjcwNSA1NDMuOTU5IDQyOS4xNDQgNTU1LjMxIDQ0MS42NTEgNTU1LjMxTDQ0OC4wMDYgNTU1LjMxTDU2OC4xOTkgNTU1LjMxQzU3NS4xNzYgNTU1LjMxIDU4MS42NDggNTUxLjY3NCA1ODUuMjc4IDU0NS43MTZMNTk5LjQ4NCA1MjIuNDAxQzYwMy4wMTEgNTE2LjYxMyA2MDkuMjI5IDUxMy4wMDUgNjE2LjAwNCA1MTIuODE2TDY3Ni4wNjQgNTExLjEzNUM2ODEuMDc0IDUxMC45OTUgNjg1Ljg0OCA1MDguOTc5IDY4OS40NDMgNTA1LjQ4N0w3MDguOTU3IDQ4Ni41MjRDNzEyLjQ2NiA0ODMuMTE0IDcxNy4xMDQgNDgxLjEwOSA3MjEuOTkyIDQ4MC44ODhMNzM5LjE5MyA0ODAuMTExQzc0Mi4yODUgNDc5Ljk3MSA3NDUuMzY4IDQ4MC41NTEgNzQ4LjE5OCA0ODEuODA1TDc5Ni45MzMgNTAzLjQwMUM4MDMuODIgNTA2LjQ1MiA4MTEuODM3IDUwNS4zNzYgODE3LjY3NSA1MDAuNjE1TDg3OS45OTkgNDQ5Ljc5MUM4ODguNjQgNDQyLjc0NCA4ODkuODUxIDQyOS45OTIgODgyLjY4OSA0MjEuNDQ2TDg1NS4zODcgMzg4Ljg2NEM4NTEuNjEyIDM4NC4zNTkgODQ2LjA0OCAzODEuNzQzIDg0MC4xNzEgMzgxLjcwOVoiIGZpbGw9IndoaXRlIi8+CjxjaXJjbGUgY3g9IjIxOS4zMjciIGN5PSI0NzIuODkiIHI9IjYxLjc5NjYiIGZpbGw9IiM4RTU4QUQiLz4KPC9zdmc+Cg==';
    const blockIconURILock = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTMxIiBoZWlnaHQ9IjkzMSIgdmlld0JveD0iMCAwIDkzMSA5MzEiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjQ2NS41IiBjeT0iNDY1LjUiIHI9IjQ2NS41IiBmaWxsPSIjOEU1OEFEIi8+CjxyZWN0IHg9IjIwOS41NTciIHk9IjM0OC40ODQiIHdpZHRoPSI1MTIuNDQzIiBoZWlnaHQ9IjM4My4wODkiIHJ4PSIyNSIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTQ2NS43NzggMTg0LjkyOEM1MzkuNzIgMTg0LjkyOCA1NzguMTEgMjA2LjUwNSA1OTkuNDg3IDIzNS42OTZDNjIyLjE2NCAyNjYuNjYzIDYzMC4xNjQgMzExLjg5OSA2MzAuMTY0IDM2OC4zODVDNjMwLjE2NCA0NzIuMDU3IDU1NC4zMjQgNTUxLjg0MyA0NjUuNzc4IDU1MS44NDNDMzc3LjIzMiA1NTEuODQzIDMwMS4zOTIgNDcyLjA1NyAzMDEuMzkyIDM2OC4zODVDMzAxLjM5MiAzMTEuODk5IDMwOS4zOTIgMjY2LjY2MyAzMzIuMDY5IDIzNS42OTZDMzUzLjQ0NiAyMDYuNTA1IDM5MS44MzYgMTg0LjkyOCA0NjUuNzc4IDE4NC45MjhaIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjUxIi8+CjxjaXJjbGUgY3g9IjQ2NC45NDkiIGN5PSI1MzUuODgzIiByPSI1OS43MDIxIiBmaWxsPSIjOEU1OEFEIi8+CjxyZWN0IHg9IjQzNi43NTYiIHk9IjQ5Ni4wODIiIHdpZHRoPSI1Ni4zODUzIiBoZWlnaHQ9IjE4MC43NjUiIHJ4PSIyMCIgZmlsbD0iIzhFNThBRCIvPgo8L3N2Zz4K';

    class CheckSumExtension{
        getInfo(){return {
            id: "checksum",
            name: "CheckSum",
            color1: "#8E58AD",
            color2: "#7A4A93",
            color3: "#663C7A",
            menuIconURI: blockIconURILock,
            blockIconURI: blockIconURILock,
            blocks: [
                {
                    opcode: "generate",
                    text: "Generate checksum for [text]",
                    blockType: Scratch.BlockType.REPORTER,
                    blockShape: Scratch.BlockShape.LEAF,
                    arguments: {text: {type: Scratch.ArgumentType.STRING, defaultValue: "Foo Bar"}},
                    blockIconURI: blockIconURIKey
                },
                {
                    opcode: "validate",
                    text: "Validate checksum [checksum] for [text]",
                    blockType: Scratch.BlockType.BOOLEAN,
                    arguments: {text: {type: Scratch.ArgumentType.STRING, defaultValue: "Foo Bar"}, checksum: {type: Scratch.ArgumentType.STRING, defaultValue: '777035526402228'}},
                    blockIconURI: blockIconURILock
                }
            ]
        }}
        generate(args){
            const input = String(args.text);
            let output = []
            for (let i = 0; i < input.length; i += 2) {
                const char1 = input[i];
                const char2 = input[i + 1] || null;
                const code1 = char1.charCodeAt(0);

                if (char2 === null) {
                    output.push(code1 * 2);
                } else {
                    const code2 = char2.charCodeAt(0);
                    output.push(code1 * code2);
                }
            }
            return output.join('');
        }
        validate(args){
            return this.generate({ text: args.text }) === String(args.checksum);
        }
    }
    Scratch.extensions.register(new CheckSumExtension())
})(Scratch)