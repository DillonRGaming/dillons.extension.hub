(function(Scratch) {
  'use strict';

  const svgIcon = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTMxIiBoZWlnaHQ9IjkzMSIgdmlld0JveD0iMCAwIDkzMSA5MzEiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjQ2NS41IiBjeT0iNDY1LjUiIHI9IjQ2NS41IiBmaWxsPSIjMkE0QTQxIi8+CjxyZWN0IHg9IjU2NC4xMTUiIHk9IjI2NC4yNjEiIHdpZHRoPSIyNTguNDUxIiBoZWlnaHQ9IjUxMi4wNTYiIHJ4PSIzMyIgdHJhbnNmb3JtPSJyb3RhdGUoNTguNDA1NyA1NjQuMTE1IDI2NC4yNjEpIiBmaWxsPSJ3aGl0ZSIvPgo8cmVjdCB4PSIxNzguOTgiIHk9IjQ2MS4zMiIgd2lkdGg9IjMyNi4yOTUiIGhlaWdodD0iMTI3LjYxIiByeD0iMzMiIHRyYW5zZm9ybT0icm90YXRlKDU4LjQwNTcgMTc4Ljk4IDQ2MS4zMikiIGZpbGw9IndoaXRlIi8+CjxyZWN0IHg9IjU4OC45OTciIHk9IjIwOS4xMzQiIHdpZHRoPSIzMjYuMjk1IiBoZWlnaHQ9IjEyNy42MSIgcng9IjMzIiB0cmFuc2Zvcm09InJvdGF0ZSg1OC40MDU3IDU4OC45OTcgMjA5LjEzNCkiIGZpbGw9IndoaXRlIi8+CjxyZWN0IHg9Ijc1Ni45MzciIHk9IjIxMy45MzQiIHdpZHRoPSIxNDMuNzYzIiBoZWlnaHQ9IjMxOC4yMTgiIHJ4PSIzMyIgdHJhbnNmb3JtPSJyb3RhdGUoNTguNDA1NyA3NTYuOTM3IDIxMy45MzQpIiBmaWxsPSJ3aGl0ZSIvPgo8cmVjdCB4PSI3NjkuOTYiIHk9IjE4OC44NTYiIHdpZHRoPSIxNzIuODM5IiBoZWlnaHQ9Ijc0LjMwNDciIHJ4PSIzMyIgdHJhbnNmb3JtPSJyb3RhdGUoNTguNDA1NyA3NjkuOTYgMTg4Ljg1NikiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik03NTUuNzQgMTkyLjMwOUM3NzcuODQ2IDIwMC40NzYgNzg0LjUxMyAyMjguNTE0IDc2OC40NDkgMjQ1Ljc1OEw3NDYuOTM5IDI2OC44NDdDNzM1LjEzOSAyODEuNTEzIDcxNS41NTggMjgyLjkwOCA3MDIuMDgxIDI3Mi4wNDRMNjA3LjQzNCAxOTUuNzM4QzYwMS41IDE5MC45NTQgNTk3Ljc3IDE4My45NjEgNTk3LjEwMSAxNzYuMzY4VjE3Ni4zNjhDNTk1LjI5OCAxNTUuODcxIDYxNS40NSAxNDAuNDc3IDYzNC43NSAxNDcuNjA4TDc1NS43NCAxOTIuMzA5WiIgZmlsbD0id2hpdGUiLz4KPHJlY3QgeD0iNjMzLjk3MiIgeT0iMTQwLjQ0NCIgd2lkdGg9IjQ3Ljc1NjIiIGhlaWdodD0iMjI2Ljk2NSIgcng9IjIzLjg3ODEiIHRyYW5zZm9ybT0icm90YXRlKDczLjQwNTcgNjMzLjk3MiAxNDAuNDQ0KSIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==";

  class Flashbang {
    getInfo() {
      return {
        id: 'flashbang',
        name: 'Flashbang',
        menuIconURI: svgIcon,
        blockIconURI: svgIcon,
        color1: '#2A4A41',
        color2: '#2A4A41',
        blocks: [
          {
            opcode: 'flash',
            blockType: Scratch.BlockType.COMMAND,
            text: 'flashbang for [DURATION] seconds',
            arguments: {
              DURATION: {
                type: Scratch.ArgumentType.STRING,
                menu: 'duration_options',
                defaultValue: '0.5',
              }
            }
          }
        ],
        menus: {
          duration_options: [
            '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5'
          ]
        }
      };
    }

    flash(args) {
      const durationSeconds = parseFloat(args.DURATION);
      const durationMs = durationSeconds * 1000;
      const darknessDurationSeconds = durationSeconds * 2;
      const darknessDurationMs = darknessDurationSeconds * 1000;

      const flashDiv = document.createElement('div');
      flashDiv.style.position = 'fixed';
      flashDiv.style.top = '0';
      flashDiv.style.left = '0';
      flashDiv.style.width = '100%';
      flashDiv.style.height = '100%';
      flashDiv.style.backgroundColor = 'white';
      flashDiv.style.zIndex = '10001';
      flashDiv.style.opacity = '1';
      flashDiv.style.transition = `opacity ${durationSeconds}s ease-in-out`;
      flashDiv.style.pointerEvents = 'none';

      const darknessDiv = document.createElement('div');
      darknessDiv.style.position = 'fixed';
      darknessDiv.style.top = '0';
      darknessDiv.style.left = '0';
      darknessDiv.style.width = '100%';
      darknessDiv.style.height = '100%';
      darknessDiv.style.backgroundColor = 'black';
      darknessDiv.style.zIndex = '10000';
      darknessDiv.style.opacity = '0';
      darknessDiv.style.transition = `opacity ${durationSeconds}s ease-in-out, opacity ${darknessDurationSeconds}s ease-in-out ${durationSeconds}s`;
      darknessDiv.style.pointerEvents = 'none';

      const audio = new Audio('https://kisuu-sounds.vercel.app/flashbang.mp3');
      audio.play();

      setTimeout(() => {
        document.body.appendChild(darknessDiv);
        document.body.appendChild(flashDiv);

        darknessDiv.offsetHeight;
        flashDiv.offsetHeight;

        setTimeout(() => {
          flashDiv.style.opacity = '0';
          darknessDiv.style.opacity = '0.7';
        }, 10);

        setTimeout(() => {
          darknessDiv.style.opacity = '0';
          setTimeout(() => {
            document.body.removeChild(flashDiv);
            document.body.removeChild(darknessDiv);
          }, darknessDurationMs);
        }, durationMs + 10);
      }, 300);
    }
  }

  Scratch.extensions.register(new Flashbang());
})(Scratch);
