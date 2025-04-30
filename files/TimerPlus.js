(function(Scratch) {
  'use strict';

  const svgIcon = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTMxIiBoZWlnaHQ9IjkzMSIgdmlld0JveD0iMCAwIDkzMSA5MzEiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjQ2NS41IiBjeT0iNDY1LjUiIHI9IjQ2NS41IiBmaWxsPSIjNTg2NUYyIi8+CjxjaXJjbGUgY3g9IjQ2My4yNDIiIGN5PSI1MjEuNDE5IiByPSIyNTUuNzQyIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjY1Ii8+CjxyZWN0IHg9IjQwNi40ODMiIHk9IjE3NS4zMDciIHdpZHRoPSIxMTMuNTE2IiBoZWlnaHQ9IjEwMC4xNjEiIGZpbGw9IndoaXRlIi8+CjxyZWN0IHg9IjM2OC42NDUiIHk9IjEyMyIgd2lkdGg9IjE4OS4xOTMiIGhlaWdodD0iNjIuMzIyNiIgcng9IjE0IiBmaWxsPSJ3aGl0ZSIvPgo8cmVjdCB4PSI2NzMuODk2IiB5PSIyNzUuNDI4IiB3aWR0aD0iNTkuNzE4NCIgaGVpZ2h0PSI3Ny40NDczIiB0cmFuc2Zvcm09InJvdGF0ZSg0Ny40Njk5IDY3My44OTYgMjc1LjQyOCkiIGZpbGw9IndoaXRlIi8+CjxyZWN0IHg9IjY4OS41ODgiIHk9IjIzMy4xNzciIHdpZHRoPSIxMDAuNzc1IiBoZWlnaHQ9IjQ4LjUyMTIiIHJ4PSIxNCIgdHJhbnNmb3JtPSJyb3RhdGUoNDcuNDY5OSA2ODkuNTg4IDIzMy4xNzcpIiBmaWxsPSJ3aGl0ZSIvPgo8cmVjdCB3aWR0aD0iNTkuNzE4NCIgaGVpZ2h0PSI3Ny40NDczIiB0cmFuc2Zvcm09Im1hdHJpeCgtMC42NzU5NzcgMC43MzY5MjMgMC43MzY5MjMgMC42NzU5NzcgMjU4LjgxNCAyNTkuODQ3KSIgZmlsbD0id2hpdGUiLz4KPHJlY3Qgd2lkdGg9IjEwMC43NzUiIGhlaWdodD0iNDguNTIxMiIgcng9IjE0IiB0cmFuc2Zvcm09Im1hdHJpeCgtMC42NzU5NzcgMC43MzY5MjMgMC43MzY5MjMgMC42NzU5NzcgMjQzLjEyMyAyMTcuNTk4KSIgZmlsbD0id2hpdGUiLz4KPGNpcmNsZSBjeD0iNDYzLjI0MyIgY3k9IjUyMS40MTkiIHI9IjY5IiBmaWxsPSJ3aGl0ZSIvPgo8cmVjdCB4PSI0MjkuODU0IiB5PSI1MDIuNDk5IiB3aWR0aD0iMjEzLjY3NyIgaGVpZ2h0PSIzNi43MjU4IiByeD0iMTguMzYyOSIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==";

  const Cast = Scratch.Cast;

  class TimerPlusExtension {
    constructor() {
      this.timers = {};
    }

    getInfo() {
      return {
        id: 'timerplus',
        name: 'TimerPlus',
        menuIconURI: svgIcon,
        blockIconURI: svgIcon,
        color1: '#5865F2',
        color2: '#4651D0',
        blocks: [
          {
            opcode: 'createTimer',
            blockType: Scratch.BlockType.COMMAND,
            text: 'create timer [NAME]',
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'my timer'
              }
            }
          },
          {
            opcode: 'startTimer',
            blockType: Scratch.BlockType.COMMAND,
            text: 'start timer [NAME]',
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                menu: 'timerNames',
                defaultValue: 'my timer'
              }
            }
          },
          {
            opcode: 'stopTimer',
            blockType: Scratch.BlockType.COMMAND,
            text: 'stop timer [NAME]',
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                menu: 'timerNames',
                defaultValue: 'my timer'
              }
            }
          },
          {
            opcode: 'resumeTimer',
            blockType: Scratch.BlockType.COMMAND,
            text: 'resume timer [NAME]',
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                menu: 'timerNames',
                defaultValue: 'my timer'
              }
            }
          },
          {
            opcode: 'deleteTimer',
            blockType: Scratch.BlockType.COMMAND,
            text: 'delete timer [NAME]',
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                menu: 'timerNames',
                defaultValue: 'my timer'
              }
            }
          },
          {
            opcode: 'addTime',
            blockType: Scratch.BlockType.COMMAND,
            text: 'change [NAME] by [SECONDS] seconds',
            arguments: {
              SECONDS: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              },
              NAME: {
                type: Scratch.ArgumentType.STRING,
                menu: 'timerNames',
                defaultValue: 'my timer'
              }
            }
          },
          {
            opcode: 'setTimerTime',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set timer [NAME] to [SECONDS] seconds',
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                menu: 'timerNames',
                defaultValue: 'my timer'
              },
              SECONDS: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              }
            }
          },
          {
            opcode: 'resetTimer',
            blockType: Scratch.BlockType.COMMAND,
            text: 'reset timer [NAME]',
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                menu: 'timerNames',
                defaultValue: 'my timer'
              }
            }
          },
          {
            opcode: 'getTimerTime',
            blockType: Scratch.BlockType.REPORTER,
            blockShape: Scratch.BlockShape.LEAF,
            text: 'time of timer [NAME]',
            disableMonitor: false,
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                menu: 'timerNames',
                defaultValue: 'my timer'
              }
            }
          },
          {
            opcode: 'timerIsRunning',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'timer [NAME] is running?',
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                menu: 'timerNames',
                defaultValue: 'my timer'
              }
            }
          },
          {
            opcode: 'listTimers',
            blockType: Scratch.BlockType.REPORTER,
            blockShape: Scratch.BlockShape.LEAF,
            text: 'list of timers',
            disableMonitor: false,
            arguments: {}
          }
        ],
        menus: {
          timerNames: {
            acceptReporters: true,
            items: '_getTimerNames'
          }
        }
      };
    }

    _getTimerNames() {
      const names = Object.keys(this.timers);
      if (names.length === 0) {
          return ['my timer'];
      }
      return names;
    }


    createTimer(args) {
      const name = Cast.toString(args.NAME);
      if (!name || name.trim() === '') {
          return;
      }
      this.timers[name] = {
        elapsedTime: 0,
        startTime: null,
        isRunning: false
      };
    }

    startTimer(args) {
      const name = Cast.toString(args.NAME);
      const timer = this.timers[name];
      if (timer && !timer.isRunning) {
        timer.startTime = Date.now();
        timer.isRunning = true;
      }
    }

    stopTimer(args) {
      const name = Cast.toString(args.NAME);
      const timer = this.timers[name];
      if (timer && timer.isRunning) {
        timer.elapsedTime += Date.now() - timer.startTime;
        timer.startTime = null;
        timer.isRunning = false;
      }
    }

    resumeTimer(args) {
        this.startTimer(args);
    }


    deleteTimer(args) {
      const name = Cast.toString(args.NAME);
      delete this.timers[name];
    }

    addTime(args) {
      const name = Cast.toString(args.NAME);
      const secondsToAdd = Cast.toNumber(args.SECONDS);
      const timer = this.timers[name];

      if (timer) {
        const msToAdd = secondsToAdd * 1000;
        timer.elapsedTime += msToAdd;
        if (timer.isRunning) {
          timer.startTime -= msToAdd;
        }
      }
    }

    setTimerTime(args) {
        const name = Cast.toString(args.NAME);
        const secondsToSet = Cast.toNumber(args.SECONDS);
        const timer = this.timers[name];

        if (timer) {
            const msToSet = Math.max(0, secondsToSet * 1000);
            timer.elapsedTime = msToSet;
            if (timer.isRunning) {
                timer.startTime = Date.now() - timer.elapsedTime;
            }
        }
    }

    resetTimer(args) {
        const name = Cast.toString(args.NAME);
        const timer = this.timers[name];
        if (timer) {
            timer.elapsedTime = 0;
            timer.startTime = null;
            timer.isRunning = false;
        }
    }

    getTimerTime(args) {
      const name = Cast.toString(args.NAME);
      const timer = this.timers[name];

      if (!timer) {
        return 0;
      }

      let currentElapsed = timer.elapsedTime;
      if (timer.isRunning) {
        currentElapsed += Date.now() - timer.startTime;
      }

      return currentElapsed / 1000;
    }

    timerIsRunning(args) {
        const name = Cast.toString(args.NAME);
        const timer = this.timers[name];
        return timer ? timer.isRunning : false;
    }

    listTimers() {
        return Object.keys(this.timers).join(',');
    }
  }

  Scratch.extensions.register(new TimerPlusExtension());
})(Scratch);
