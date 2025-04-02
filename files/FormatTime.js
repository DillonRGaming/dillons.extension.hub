(function(Scratch) {
    'use strict';
    
    const Cast = Scratch.Cast;
    const svgIcon = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTMxIiBoZWlnaHQ9IjkzMSIgdmlld0JveD0iMCAwIDkzMSA5MzEiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjQ2NS41IiBjeT0iNDY1LjUiIHI9IjQ2NS41IiBmaWxsPSIjRkY1OTFDIi8+CjxwYXRoIGQ9Ik03MTIuMTk2IDYzNy45OTRMNDAyLjY0MiA4NDAuODU5TDQwMS4xMzMgNDk2Ljc1Mkw3MTIuMTk2IDYzNy45OTRaTTY5Ny42MDggMzE3Ljg3N0w2NjYuODM0IDMxNi45ODFMNjk3LjYwOCAzMTcuODc3Wk0zMTUuMzE2IDIzMC4xNzRDMjk4LjE5NiAyMzEuMDQ4IDI4NC45NTUgMjE4LjM2MyAyODUuNzQyIDIwMS44NEMyODYuNTI5IDE4NS4zMTcgMzAxLjA0NSAxNzEuMjEzIDMxOC4xNjUgMTcwLjMzOUwzMTUuMzE2IDIzMC4xNzRaTTQzMi4wOTYgNjk1LjYwNUMzNzMuODMzIDY5OS42MzIgMzE1LjY0OSA2OTcuOTIyIDI3My4xMzEgNjc0LjE0NUMyMjcuMDA5IDY0OC4zNTIgMjA1LjY1NSA2MDAuNzQ0IDIxMC45MTYgNTMwLjMyTDI3Mi44MTcgNTI4LjcyM0MyNjguNjY5IDU4NC4yNDIgMjg1LjE1MyA2MDguNzIyIDMwOC4wNzEgNjIxLjUzOEMzMzQuNTkyIDYzNi4zNjkgMzc2LjY0OSA2MzkuNzg4IDQzMy43ODMgNjM1LjgzOUw0MzIuMDk2IDY5NS42MDVaTTIxMC45MTYgNTMwLjMyQzIxMy4zMTkgNDk4LjE0OSAyMjMuMjkzIDQ3MC43NTkgMjQxLjU3NiA0NDguNzc5QzI1OS43NzMgNDI2LjkwMSAyODMuNjU3IDQxMy40NDMgMzA4LjU0NiA0MDUuMDc2QzM1Ni4yNzUgMzg5LjAzIDQxNi4xNjkgMzg5LjI1NyA0NjguNjk1IDM4OS40NDFDNTI0Ljc3NCAzODkuNjM4IDU3My44MjkgMzg5Ljg1MiA2MTAuODQ0IDM3OS4wNThDNjI4LjQ4OSAzNzMuOTEzIDY0MC43MzMgMzY2LjkzMiA2NDkuMDg1IDM1OC4yOTRDNjU3LjExNiAzNDkuOTg3IDY2NC4xMDEgMzM3LjUyMiA2NjYuODM0IDMxNi45ODFMNzI4LjM4MyAzMTguNzczQzcyNC4yMTcgMzUwLjA5IDcxMi4yOTggMzc2LjI5MyA2OTIuNDY0IDM5Ni44MDVDNjcyLjk1IDQxNi45ODYgNjQ4LjM2OCA0MjguOTc1IDYyMy4yNzEgNDM2LjI5M0M1NzQuODAzIDQ1MC40MjcgNTE0LjcxMyA0NDkuNTQzIDQ2Mi4zNDkgNDQ5LjM2QzQwNi40MzMgNDQ5LjE2MyAzNTguNTg3IDQ0OS43MjYgMzIzLjY0MiA0NjEuNDczQzMwNy4xOTUgNDY3LjAwMyAyOTYuMDA5IDQ3NC4zMDYgMjg4LjQ0OCA0ODMuMzk2QzI4MC45NzIgNDkyLjM4NCAyNzQuNTAxIDUwNi4xNjkgMjcyLjgxNyA1MjguNzIzTDIxMC45MTYgNTMwLjMyWk02NjYuODM0IDMxNi45ODFDNjcxLjI3NyAyODMuNTc4IDY2Mi4wMjcgMjY0LjI5OSA2NDYuNzIxIDI1MS4zN0M2MjkuNzY0IDIzNy4wNDYgNjAyLjA4MiAyMjcuODIxIDU2NC42MTMgMjIzLjM0MkM0ODguNzY4IDIxNC4yNzYgMzkzLjYzMSAyMjYuMTczIDMxNS4zMTYgMjMwLjE3NEwzMTguMTY1IDE3MC4zMzlDMzg4Ljg2NiAxNjYuNzI3IDQ5NS4yNjcgMTUzLjk1NSA1NzguMTUzIDE2My44NjNDNjIwLjA1IDE2OC44NzEgNjYxLjAzMyAxODAuMDQzIDY5MC4xMjMgMjA0LjYxNUM3MjAuODY0IDIzMC41ODIgNzM1LjA0MyAyNjguNjk3IDcyOC4zODMgMzE4Ljc3M0w2NjYuODM0IDMxNi45ODFaIiBmaWxsPSIjRjNGM0YzIi8+Cjwvc3ZnPgo=";
  
    let totalSeconds = 0;
  
    class FormatTime {
      setTime(args) {
        totalSeconds = Cast.toNumber(args.TIME);
      }
  
      getTime(args) {
        const unit = args.UNIT;
        const pad = args.PADDING === 'padded';
        
        const seconds = Math.floor(totalSeconds % 60);
        const minutes = Math.floor(totalSeconds / 60) % 60;
        const hours = Math.floor(totalSeconds / 3600);
  
        const format = num => pad ? num.toString().padStart(2, '0') : num.toString();
  
        switch(unit) {
          case 'seconds': return format(seconds);
          case 'minutes': return format(minutes);
          case 'hours': return format(hours);
          default: return '0';
        }
      }
  
      getInfo() {
        return {
          id: "formatTime",
          name: "FormatTime",
          menuIconURI: svgIcon,
          blockIconURI: svgIcon,
          color1: "#FF591C",
          color2: "#E74E17",
          blocks: [
            {
              opcode: "setTime",
              text: "set time to [TIME] seconds",
              blockType: Scratch.BlockType.COMMAND,
              arguments: {
                TIME: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: "0"
                }
              }
            },
            {
              opcode: "getTime",
              text: "[UNIT] [PADDING]",
              blockType: Scratch.BlockType.REPORTER,
              blockShape: Scratch.BlockShape.LEAF,
              arguments: {
                UNIT: {
                  type: Scratch.ArgumentType.STRING,
                  menu: "units"
                },
                PADDING: {
                  type: Scratch.ArgumentType.STRING,
                  menu: "padding",
                  defaultValue: "padded"
                }
              }
            }
          ],
          menus: {
            units: {
              acceptReporters: false,
              items: [
                {text: "seconds", value: "seconds"},
                {text: "minutes", value: "minutes"},
                {text: "hours", value: "hours"}
              ]
            },
            padding: {
              acceptReporters: false,
              items: [
                {text: "padded", value: "padded"},
                {text: "unpadded", value: "unpadded"}
              ]
            }
          }
        };
      }
    }
    Scratch.extensions.register(new FormatTime());
  })(Scratch);