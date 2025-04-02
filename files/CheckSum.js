(function(Scratch){
    const blockIconURIKey = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTMxIiBoZWlnaHQ9IjkzMSIgdmlld0JveD0iMCAwIDkzMSA5MzEiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjQ2NS41IiBjeT0iNDY1LjUiIHI9IjQ2NS41IiBmaWxsPSIjOEU1OEFEIi8+CjxlbGxpcHNlIGN4PSIyMDUuNTQ1IiBjeT0iMjA1LjU0NSIgcng9IjIwNS41NDUiIHJ5PSIyMDUuNTQ1IiB0cmFuc2Zvcm09Im1hdHJpeCgtMC44MDE3NCAtMC41OTc2NzIgLTAuNTk3NjcyIDAuODAxNzQgNTkwLjI4NiA0MjMuNjk3KSIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTg0Mi41NTcgMzczLjQzMkw0NjIuMzExIDM3MS4yNzNDNDUyLjYyOSAzNzEuMjE4IDQ0NC4yOTkgMzc4LjEwNSA0NDIuNTMzIDM4Ny42MjRMNDE2Ljc4IDUyNi40MzVDNDE0LjQ5OCA1MzguNzMzIDQyMy45MzcgNTUwLjA4MyA0MzYuNDQ0IDU1MC4wODNMNDQzLjMzNCA1NTAuMDgzTDU2NS44MzggNTUwLjA4M0M1NzIuODE0IDU1MC4wODMgNTc5LjI4NyA1NDYuNDQ4IDU4Mi45MTcgNTQwLjQ5TDU5Ny41NzUgNTE2LjQzM0M2MDEuMTAxIDUxMC42NDUgNjA3LjMxOSA1MDcuMDM3IDYxNC4wOTUgNTA2Ljg0N0w2NzUuNTM4IDUwNS4xMjlDNjgwLjU0OCA1MDQuOTg4IDY4NS4zMjMgNTAyLjk3MyA2ODguOTE3IDQ5OS40OEw3MDguOTY4IDQ3OS45OTVDNzEyLjQ3OCA0NzYuNTg1IDcxNy4xMTYgNDc0LjU4IDcyMi4wMDQgNDc0LjM1OUw3MzkuNzIzIDQ3My41NTlDNzQyLjgxNSA0NzMuNDE5IDc0NS44OTggNDczLjk5OSA3NDguNzI4IDQ3NS4yNTNMNzk4LjU5MyA0OTcuMzQ5QzgwNS40OCA1MDAuNDAxIDgxMy40OTcgNDk5LjMyNCA4MTkuMzM1IDQ5NC41NjRMODgzLjE5OSA0NDIuNDg0Qzg5MS44NCA0MzUuNDM3IDg5My4wNSA0MjIuNjg1IDg4NS44ODkgNDE0LjEzOUw4NTcuNzczIDM4MC41ODZDODUzLjk5OCAzNzYuMDgxIDg0OC40MzQgMzczLjQ2NSA4NDIuNTU3IDM3My40MzJaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K';
    const blockIconURILock = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTMxIiBoZWlnaHQ9IjkzMSIgdmlld0JveD0iMCAwIDkzMSA5MzEiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjQ2NS41IiBjeT0iNDY1LjUiIHI9IjQ2NS41IiBmaWxsPSIjOEU1OEFEIi8+CjxyZWN0IHg9IjIyMyIgeT0iMzczIiB3aWR0aD0iNDg1IiBoZWlnaHQ9IjM2MyIgcng9IjI1IiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNNjEyLjUgMzkzQzYxMi41IDQ4Ni44MzYgNTQzLjgzNiA1NTcuNSA0NjUuNSA1NTcuNUMzODcuMTY0IDU1Ny41IDMxOC41IDQ4Ni44MzYgMzE4LjUgMzkzQzMxOC41IDMzOS45MzQgMzI2LjEzMyAyOTkuNjUzIDM0NS44NDEgMjcyLjgyN0MzNjMuODU0IDI0OC4zMDggMzk3LjA1NCAyMjguNSA0NjUuNSAyMjguNUM1MzMuOTQ2IDIyOC41IDU2Ny4xNDYgMjQ4LjMwOCA1ODUuMTU5IDI3Mi44MjdDNjA0Ljg2NyAyOTkuNjUzIDYxMi41IDMzOS45MzQgNjEyLjUgMzkzWiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSI2NyIvPgo8L3N2Zz4K';

    class CheckSumExtension{
        getInfo(){return {
            id: "checksum",
            name: "CheckSum",
            color1: "#8E58AD",
            color2: "#7A4A93",
            color3: "#663C7A",
            menuIconURI: blockIconURIKey,
            blockIconURI: blockIconURIKey,
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