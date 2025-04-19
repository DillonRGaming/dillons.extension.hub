(function(Scratch) {
  'use strict';

  
const menu_icon_square = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTMxIiBoZWlnaHQ9Ijk4NyIgdmlld0JveD0iMCAwIDkzMSA5ODciIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjQ2NS41IiBjeT0iNTIxLjUiIHI9IjQ2NS41IiBmaWxsPSIjOUY1NkMzIi8+CjxwYXRoIGQ9Ik00NjUuMzY4IDE5MC4zMzNDNDY5LjI3IDE4OC41ODUgNDczLjczNCAxODguNTg1IDQ3Ny42MzYgMTkwLjMzM0w3ODAuNjczIDMyNi4xMjVDNzkyLjUyMSAzMzEuNDM0IDc5Mi40ODYgMzQ4LjI2NyA3ODAuNjE2IDM1My41MjdMNDc3LjU3OSA0ODcuODAzQzQ3My43MDkgNDg5LjUxOCA0NjkuMjk1IDQ4OS41MTggNDY1LjQyNSA0ODcuODAzTDE2Mi4zODggMzUzLjUyN0MxNTAuNTE4IDM0OC4yNjcgMTUwLjQ4MyAzMzEuNDM0IDE2Mi4zMzEgMzI2LjEyNUw0NjUuMzY4IDE5MC4zMzNaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNNDUxLjM3OSA1MjIuNDU5QzQ1MS41MTUgNTE2LjQyOSA0NDguMDI1IDUxMC45MDQgNDQyLjUyMSA1MDguNDM2TDE1My4zNTQgMzc4Ljc0OUMxNDMuNTIyIDM3NC4zMzkgMTMyLjM4NSAzODEuNDI3IDEzMi4yMTggMzkyLjIwMkwxMjcuNDUyIDY5OS4yODFDMTI3LjM2MyA3MDUuMDQzIDEzMC41ODMgNzEwLjM0NyAxMzUuNzM2IDcxMi45MjdMNDIyLjQ3NCA4NTYuNDYyQzQzMi4zMTcgODYxLjM4OSA0NDMuOTM4IDg1NC4zODkgNDQ0LjE4NSA4NDMuMzg1TDQ1MS4zNzkgNTIyLjQ1OVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik00NzguMjIgNTI1LjMzOEM0NzguMzMxIDUxOS41NDcgNDgxLjc2NiA1MTQuMzM4IDQ4Ny4wNDUgNTExLjk1NUw3NzguNzYgMzgwLjI0NkM3ODguODU1IDM3NS42ODggODAwLjIzOCAzODMuMjY4IDc5OS45MjYgMzk0LjM0TDc5MC44NTcgNzE2LjAzM0M3OTAuNjk0IDcyMS43OTMgNzg3LjI0NiA3MjYuOTUxIDc4MS45ODUgNzI5LjMwNEw0OTMuMjE1IDg1OC40MTJDNDgzLjE3OSA4NjIuOSA0NzEuODg0IDg1NS40MjMgNDcyLjA5NSA4NDQuNDMxTDQ3OC4yMiA1MjUuMzM4WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==';
const block_icon_square = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTMxIiBoZWlnaHQ9Ijk4NyIgdmlld0JveD0iMCAwIDkzMSA5ODciIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjQ2NS41IiBjeT0iNTIxLjUiIHI9IjQ2NS41IiBmaWxsPSIjOUY1NkMzIi8+CjxwYXRoIGQ9Ik00NjUuMzY4IDE5MC4zMzNDNDY5LjI3IDE4OC41ODUgNDczLjczNCAxODguNTg1IDQ3Ny42MzYgMTkwLjMzM0w3ODAuNjczIDMyNi4xMjVDNzkyLjUyMSAzMzEuNDM0IDc5Mi40ODYgMzQ4LjI2NyA3ODAuNjE2IDM1My41MjdMNDc3LjU3OSA0ODcuODAzQzQ3My43MDkgNDg5LjUxOCA0NjkuMjk1IDQ4OS41MTggNDY1LjQyNSA0ODcuODAzTDE2Mi4zODggMzUzLjUyN0MxNTAuNTE4IDM0OC4yNjcgMTUwLjQ4MyAzMzEuNDM0IDE2Mi4zMzEgMzI2LjEyNUw0NjUuMzY4IDE5MC4zMzNaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNNDUxLjM3OSA1MjIuNDU5QzQ1MS41MTUgNTE2LjQyOSA0NDguMDI1IDUxMC45MDQgNDQyLjUyMSA1MDguNDM2TDE1My4zNTQgMzc4Ljc0OUMxNDMuNTIyIDM3NC4zMzkgMTMyLjM4NSAzODEuNDI3IDEzMi4yMTggMzkyLjIwMkwxMjcuNDUyIDY5OS4yODFDMTI3LjM2MyA3MDUuMDQzIDEzMC41ODMgNzEwLjM0NyAxMzUuNzM2IDcxMi45MjdMNDIyLjQ3NCA4NTYuNDYyQzQzMi4zMTcgODYxLjM4OSA0NDMuOTM4IDg1NC4zODkgNDQ0LjE4NSA4NDMuMzg1TDQ1MS4zNzkgNTIyLjQ1OVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik00NzguMjIgNTI1LjMzOEM0NzguMzMxIDUxOS41NDcgNDgxLjc2NiA1MTQuMzM4IDQ4Ny4wNDUgNTExLjk1NUw3NzguNzYgMzgwLjI0NkM3ODguODU1IDM3NS42ODggODAwLjIzOCAzODMuMjY4IDc5OS45MjYgMzk0LjM0TDc5MC44NTcgNzE2LjAzM0M3OTAuNjk0IDcyMS43OTMgNzg3LjI0NiA3MjYuOTUxIDc4MS45ODUgNzI5LjMwNEw0OTMuMjE1IDg1OC40MTJDNDgzLjE3OSA4NjIuOSA0NzEuODg0IDg1NS40MjMgNDcyLjA5NSA4NDQuNDMxTDQ3OC4yMiA1MjUuMzM4WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==';
const block_icon_camera = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTMxIiBoZWlnaHQ9IjkzMSIgdmlld0JveD0iMCAwIDkzMSA5MzEiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjQ2NS41IiBjeT0iNDY1LjUiIHI9IjQ2NS41IiBmaWxsPSIjOUY1NkMzIi8+CjxyZWN0IHg9IjkxIiB5PSIyNzUiIHdpZHRoPSI0NjAiIGhlaWdodD0iMzg2IiByeD0iNzAiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik02MDQgNDE3LjI2NUM2MDQgMzg5Ljc1OCA2MjAuMTExIDM2NC44IDY0NS4xNzggMzUzLjQ3NEw3NDIuMTc4IDMwOS42NDlDNzg4LjUxIDI4OC43MTUgODQxIDMyMi41OTggODQxIDM3My40NFY1NjAuNDQyQzg0MSA2MTAuOCA3ODkuNDIxIDY0NC42ODQgNzQzLjIwNCA2MjQuNjg3TDY0Ni4yMDQgNTgyLjcxOEM2MjAuNTg1IDU3MS42MzQgNjA0IDU0Ni4zODggNjA0IDUxOC40NzRWNDE3LjI2NVoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=';
const icon_right = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDMzIiBoZWlnaHQ9IjM0NyIgdmlld0JveD0iMCAwIDQzMyAzNDciIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0yNDYuODcgMzQ3QzI3Ni45ODYgMzQ3IDM1Ni42NTMgMjc1LjQ1MyA0MTUuNTU4IDIxNi4yODNDNDM4LjI4NyAxOTMuNDUzIDQzNy44MTkgMTU2LjQ3MyA0MTUuMTIgMTMzLjYxNEMzNjIuNDk5IDgwLjYyMzUgMjc4LjQ3NSAwIDI0Ni44NyAwQzIyNy4wNTQgMCAyMjEuOTg3IDI0LjcwMTkgMjIyLjI1OSA1MS4yMzQ3QzIyMi42MTYgODYuMTExIDIwMC42MTEgMTE5LjExNCAxNjUuODY4IDEyMi4xNzZDODcuMDc1NCAxMjkuMTIxIDAgMTM1Ljc5MyAwIDE3NC43MkMwIDIxNS4zOTUgMTAwLjg2NCAyMjQuMTU0IDE3Ni45MjkgMjMzLjU0NUMyMDcuMzI0IDIzNy4yOTggMjI2LjA1OCAyNjQuNzg0IDIyNS4yNzUgMjk1LjRDMjI0LjU3OSAzMjIuNjA3IDIyOC40ODIgMzQ3IDI0Ni44NyAzNDdaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K';
const icon_left = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDMzIiBoZWlnaHQ9IjM0NyIgdmlld0JveD0iMCAwIDQzMyAzNDciIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xODUuNjMxIDM0N0MxNTUuNTE1IDM0NyA3NS44NDc5IDI3NS40NTMgMTYuOTQyNiAyMTYuMjgzQy01Ljc4NTc2IDE5My40NTMgLTUuMzE4NSAxNTYuNDczIDE3LjM4MTEgMTMzLjYxNEM3MC4wMDIzIDgwLjYyMzUgMTU0LjAyNiAwIDE4NS42MzEgMEMyMDUuNDQ3IDAgMjEwLjUxNCAyNC43MDE5IDIxMC4yNDIgNTEuMjM0N0MyMDkuODg1IDg2LjExMSAyMzEuODkgMTE5LjExNCAyNjYuNjMzIDEyMi4xNzZDMzQ1LjQyNiAxMjkuMTIxIDQzMi41MDEgMTM1Ljc5MyA0MzIuNTAxIDE3NC43MkM0MzIuNTAxIDIxNS4zOTUgMzMxLjYzNyAyMjQuMTU0IDI1NS41NzIgMjMzLjU0NUMyMjUuMTc3IDIzNy4yOTggMjA2LjQ0MyAyNjQuNzg0IDIwNy4yMjYgMjk1LjRDMjA3LjkyMiAzMjIuNjA3IDIwNC4wMTkgMzQ3IDE4NS42MzEgMzQ3WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==';
const icon_up = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzQ4IiBoZWlnaHQ9IjQzNCIgdmlld0JveD0iMCAwIDM0OCA0MzQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0wLjI1MDk2NyAxODYuMzhDMC4yNTA5NjkgMTU2LjI2NSA3MS43OTgyIDc2LjU5NzQgMTMwLjk2OCAxNy42OTIxQzE1My43OTggLTUuMDM2MjYgMTkwLjc3OCAtNC41Njg5OSAyMTMuNjM3IDE4LjEzMDZDMjY2LjYyNyA3MC43NTE4IDM0Ny4yNTEgMTU0Ljc3NSAzNDcuMjUxIDE4Ni4zOEMzNDcuMjUxIDIwNi4xOTYgMzIyLjU0OSAyMTEuMjY0IDI5Ni4wMTYgMjEwLjk5MkMyNjEuMTQgMjEwLjYzNCAyMjguMTM3IDIzMi42MzkgMjI1LjA3NSAyNjcuMzgzQzIxOC4xMyAzNDYuMTc1IDIxMS40NTcgNDMzLjI1IDE3Mi41MzEgNDMzLjI1QzEzMS44NTYgNDMzLjI1IDEyMy4wOTYgMzMyLjM4NyAxMTMuNzA2IDI1Ni4zMjJDMTA5Ljk1MyAyMjUuOTI3IDgyLjQ2NzIgMjA3LjE5MiA1MS44NTE0IDIwNy45NzVDMjQuNjQ0MiAyMDguNjcyIDAuMjUwOTY3IDIwNC43NjkgMC4yNTA5NjcgMTg2LjM4WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==';
const icon_down = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzQ4IiBoZWlnaHQ9IjQzMyIgdmlld0JveD0iMCAwIDM0OCA0MzMiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0wLjI1MDk2NyAyNDYuODdDMC4yNTA5NjkgMjc2Ljk4NiA3MS43OTgyIDM1Ni42NTMgMTMwLjk2OCA0MTUuNTU4QzE1My43OTggNDM4LjI4NyAxOTAuNzc4IDQzNy44MTkgMjEzLjYzNyA0MTUuMTJDMjY2LjYyNyAzNjIuNDk5IDM0Ny4yNTEgMjc4LjQ3NSAzNDcuMjUxIDI0Ni44N0MzNDcuMjUxIDIyNy4wNTQgMzIyLjU0OSAyMjEuOTg3IDI5Ni4wMTYgMjIyLjI1OUMyNjEuMTQgMjIyLjYxNiAyMjguMTM3IDIwMC42MTEgMjI1LjA3NSAxNjUuODY4QzIxOC4xMyA4Ny4wNzU0IDIxMS40NTcgNS45MzU3MmUtMDYgMTcyLjUzMSA3LjYzNzI3ZS0wNkMxMzEuODU2IDkuNDE1MjFlLTA2IDEyMy4wOTYgMTAwLjg2NCAxMTMuNzA2IDE3Ni45MjlDMTA5Ljk1MyAyMDcuMzI0IDgyLjQ2NzIgMjI2LjA1OCA1MS44NTE0IDIyNS4yNzVDMjQuNjQ0MiAyMjQuNTc5IDAuMjUwOTY3IDIyOC40ODIgMC4yNTA5NjcgMjQ2Ljh7WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==';
const icon_away = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIyIiBoZWlnaHQ9IjMwNyIgdmlld0JveD0iMCAwIDMyMiAzMDciIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0zMTUuMzc3IDE5MS40N0MzMzUuOTgyIDE3MC44NjUgMzAxLjQzNyAxMTAuOTY1IDI4My4wMTEgNDcuNTc4NUMyNzQuMDE5IDE2LjY0NDEgMjQ3LjQwOSAtNi4wMTk2NSAyMTYuMjY3IDIuMjIzMDNDMTM4Ljg4NyAyMi43MDM2IDE1LjQzOTcgNjUuNjQyIDQuMjIwMDUgODMuOTcwMkMtMTkuNjY4MSAxMjIuOTk0IDgyLjM4NzggMTE0Ljc0OCA1Ny43NzUzIDE1My4zMTlDNTQuODkyOSAxNTcuODM2IDUxLjg3NzMgMTYyLjU3NCA0OC43MjI3IDE2Ny41NDJDMTQuMjk0OSAyMjUuODA0IC0wLjgzOTU3OCAyNzYuOTEgMjIuMjIwMSAyOTkuOTdDNTAuODQzNCAzMjguNTkzIDEwOS44OSAyNTEuNTEgMTYyLjUzNSAxOTguOTc0QzE4NC4yMTMgMTc3LjM0MSAyMTkuNDU5IDE4Mi4zNjIgMjQ4LjIzNCAxOTIuODQ2QzI3NC4wODEgMjAyLjI2NCAzMDIuNTIyIDIwNC4zMjUgMzE1LjM3NyAxOTEuNDdaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K';
const icon_rotatePitch = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzI0IiBoZWlnaHQ9IjQ0MyIgdmlld0JveD0iMCAwIDMyNCA0NDMiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik01LjU2MTMyIDE0OS44NzdDMTMuNTMwMyAxMjMuNzM1IDEwNC4wMTkgNTEuNzc2MyAxNjkuODAyIDQyLjI0NDJDMTc3Ljg2NCA0MS4wNzU5IDE4NS4wOCA0Ni42OTI3IDE4Ni45NDIgNTQuNjY0OUMyMDAuNzg0IDExMy45MjcgMjAyLjkzIDE3OS4wNjkgMTkzLjk0OCAyMDguNTMzQzE4NS40MzQgMjM2LjQ2MyAxNDAuNDQ2IDIwOS43NDIgMTI5LjgyNyAyMDIuOTY0QzEyOC4zMTQgMjAxLjk5OCAxMjYuNzA5IDIwMS4yMjIgMTI0Ljk5OCAyMDAuNjg5TDYwLjE4MDcgMTgwLjUwOEM1OS4zMTQ3IDE4MC4yMzkgNTguNDQyIDE4MC4wMzYgNTcuNTQ1NyAxNzkuOTAzQzM3LjIxMzUgMTc2Ljg5MSAtMS4zMjcyMyAxNzIuNDc1IDUuNTYxMzIgMTQ5Ljg3N1oiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0yMzEuMTgyIDEzNS4xMThDMjE4Ljk2NiAxMjcuNTcgMjE1LjE4MyAxMTEuNTQ4IDIyMi43MzEgOTkuMzMyNUMyMzAuMjggODcuMTE3MiAyNDYuMzAxIDgzLjMzMzggMjU4LjUxNyA5MC44ODIxTDIzMS4xODIgMTM1LjExOFpNMTA0IDI0Ni44NDVDMTA0IDMwMC41NDEgMTE1LjYzOSAzMzcuMjQyIDEzMS40NzkgMzU5Ljc0MUMxNDYuNzk3IDM4MS41MDIgMTY2LjU2MyAzOTEgMTg4IDM5MUwxODggNDQzQzE0OC42ODYgNDQzIDExMy40NTEgNDI0LjQ2OCA4OC45NTc5IDM4OS42NzVDNjQuOTg0OSAzNTUuNjIxIDUyIDMwNy4yNDQgNTIgMjQ2Ljg0NUwxMDQgMjQ2Ljg0NVpNMTg4IDM5MUMyMDkuNDM3IDM5MSAyMjkuMjAzIDM4MS41MDIgMjQ0LjUyMSAzNTkuNzQxQzI2MC4zNjEgMzM3LjI0MiAyNzIgMzAwLjU0MSAyNzIgMjQ2Ljg0NUwzMjQgMjQ2Ljg0NUMzMjQgMzA3LjI0NCAzMTEuMDE1IDM1NS42MjEgMjg3LjA0MiAzODkuNjc1QzI2Mi41NDkgNDI0LjQ2OCAyMjcuMzE0IDQ0MyAxODggNDQzTDE4OCAzOTFaTTEyNy44ODcgMTIzLjczNUMxMTMuMjkzIDE1NS45MjggMTA0IDE5OC45MTMgMTA0IDI0Ni44NDVMNTIgMjQ2Ljg0NUM1MiAxOTIuNjU5IDYyLjQzMjkgMTQyLjE3OCA4MC41MjU2IDEwMi4yNjVMMTI3Ljg4NyAxMjMuNzM1Wk0yNzIgMjQ2Ljg0NUMyNzIgMTkzLjIwNCAyNTguMzg2IDE1MS45MjkgMjMxLjE4MiAxMzUuMTE4TDI1OC41MTcgOTAuODgyMUMzMTAuNjU2IDEyMy4xMDEgMzI0IDE5MC40OTMgMzI0IDI0Ni44NDVMMjcyIDI0Ni44NDVaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K';
const icon_rotateYaw = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDQzIiBoZWlnaHQ9IjI2NSIgdmlld0JveD0iMCAwIDQ0MyAyNjUiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0zMjUuNDIxIDI2MC4xMDVDMzQzLjU0IDI1NC4wNjQgMzgzLjAwMSAyMDAuNTg0IDQwOC43MjEgMTYxLjg1NUM0MTUuMTI3IDE1Mi4yMSA0MTEuMjg4IDEzOS4zMTYgNDAwLjk2MyAxMzUuMjc4QzM2NS42MzQgMTIxLjQ2NCAzMDAuMDE2IDk2Ljk3NTMgMjgwLjgwOSAxMDMuMzhDMjU5Ljc2OCAxMTAuMzk1IDI3OS41MDMgMTQ3LjE3NiAyODQuODkyIDE1Ni40NjNDMjg1LjcyMSAxNTcuODkzIDI4Ni4zOTUgMTU5LjQwOSAyODYuODUyIDE2MS4wMTdMMzAyLjQzMiAyMTUuNzQ4QzMwNC43MzIgMjMyLjMyMiAzMDcuODUgMjY1Ljk2NCAzMjUuNDIxIDI2MC4xMDVaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMzQ3LjcxMSA3My42NzE3QzM2MC45NjcgNzkuMTkyOCAzNzYuMTg4IDcyLjkyMjYgMzgxLjcwOSA1OS42NjcxQzM4Ny4yMyA0Ni40MTE1IDM4MC45NiAzMS4xOSAzNjcuNzA1IDI1LjY2OUwzNDcuNzExIDczLjY3MTdaTTIyMi41ODggMTczQzE3MS4wMzggMTczIDEyNS42MTQgMTYzLjc1NSA5NC4wNTA3IDE0OS44NjdDNzguMjMyNiAxNDIuOTA3IDY3LjA1NiAxMzUuMjkxIDYwLjE5MzEgMTI4LjE1MkM1My40NTM2IDEyMS4xNCA1MiAxMTUuODkzIDUyIDExMi41SDBDMCAxMzIuOTk0IDkuNTQ4MzYgMTUwLjUwMSAyMi43MDQ3IDE2NC4xODhDMzUuNzM3NSAxNzcuNzQ2IDUzLjM1MDYgMTg4Ljc3IDczLjEwOCAxOTcuNDYzQzExMi42OTYgMjE0Ljg4MiAxNjUuNTY2IDIyNSAyMjIuNTg4IDIyNVYxNzNaTTUyIDExMi41QzUyIDEwOS4xMDcgNTMuNDUzNiAxMDMuODYgNjAuMTkzMSA5Ni44NDg1QzY3LjA1NiA4OS43MDkgNzguMjMyNiA4Mi4wOTM1IDk0LjA1MDcgNzUuMTMzNEMxMjUuNjE0IDYxLjI0NTQgMTcxLjAzOCA1MiAyMjIuNTg4IDUyVjBDMTY1LjU2NiAwIDExMi42OTYgMTAuMTE4MyA3My4xMDggMjcuNTM3MUM1My4zNTA2IDM2LjIzMDUgMzUuNzM3NSA0Ny4yNTQxIDIyLjcwNDcgNjAuODEyMUM5LjU0ODM2IDc0LjQ5ODUgMCA5Mi4wMDYzIDAgMTEyLjVINTJaTTM0MC44MzUgMTU0LjA0NUMzMDkuOTM2IDE2NS42MTkgMjY4LjYzNiAxNzMgMjIyLjU4OCAxNzNWMjI1QzI3My43MTcgMjI1IDMyMS4zNTggMjE2Ljg2OSAzNTkuMDc2IDIwMi43NEwzNDAuODM1IDE1NC4wNDVaTTIyMi41ODggNTJDMjcyLjI0OCA1MiAzMTYuMjgzIDYwLjU4MTcgMzQ3LjcxMSA3My42NzE3TDM2Ny43MDUgMjUuNjY5QzMyOC42NzkgOS40MTQ3OCAyNzcuNTk4IDAgMjIyLjU4OCAwVjUyWiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==';
const icon_rotateRoll = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDA3IiBoZWlnaHQ9IjM4OSIgdmlld0JveD0iMCAwIDQwNyAzODkiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik00MDEuMDcxIDIyNS41NjlDMzkzLjU1OCAyNDkuOTU2IDM0MC41MDQgMzA1LjgzMyAzMDAuNTE5IDM0NC4zMzVDMjkwLjQ1MiAzNTQuMDI4IDI3My43MDMgMzQ4LjcwNyAyNzAuODQ3IDMzNS4wMjdDMjYwLjkzNCAyODcuNTQyIDI0NS4yNDEgMjA1Ljc1OCAyNTMuMTc0IDE4MC4wMDVDMjYxLjg3NyAxNTEuNzU2IDI5My43OTEgMTcyLjY0NCAzMDMuNTE0IDE3OS44M0MzMDUuNDEzIDE4MS4yMzQgMzA3LjUwNiAxODIuMzcxIDMwOS43NjMgMTgzLjA2N0wzNTguNTM0IDE5OC4wOTJDMzU5LjY5NCAxOTguNDQ5IDM2MC44ODEgMTk4LjY4OSAzNjIuMDkgMTk4Ljc5OEMzNzguNDkgMjAwLjI3OCA0MDguMzAzIDIwMi4wOTIgNDAxLjA3MSAyMjUuNTY5WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTg2Ljk4ODcgMjY1LjI3OUM5Ni44NDkzIDI3NS43MTcgOTYuMzgxIDI5Mi4xNzMgODUuOTQyNiAzMDIuMDMzQzc1LjUwNDIgMzExLjg5NCA1OS4wNDg1IDMxMS40MjUgNDkuMTg3OSAzMDAuOTg3TDg2Ljk4ODcgMjY1LjI3OVpNMzA0LjQ5NCAxNzguNDQ1QzMwNC40OTQgMTA4LjYzNCAyNDguMDMyIDUyLjEzMjggMTc4LjQ5NCA1Mi4xMzI4TDE3OC40OTQgMC4xMzI4MDZDMjc2Ljg1MSAwLjEzMjgwMiAzNTYuNDk0IDgwLjAxNjIgMzU2LjQ5NCAxNzguNDQ1TDMwNC40OTQgMTc4LjQ0NVpNMTc4LjQ5NCA1Mi4xMzI4QzEwOC45NTcgNTIuMTMyOCA1Mi40OTQxIDEwOC42MzQgNTIuNDk0MSAxNzguNDQ1TDAuNDk0MTQ3IDE3OC40NDVDMC40OTQxNDMgODAuMDE2MiA4MC4xMzcyIDAuMTMyODEgMTc4LjQ5NCAwLjEzMjgwNkwxNzguNDk0IDUyLjEzMjhaTTI3NC40NjggMjYwLjI5MkMyOTMuMjA0IDIzOC4yMzggMzA0LjQ5NCAyMDkuNyAzMDQuNDk0IDE3OC40NDVMMzU2LjQ5NCAxNzguNDQ1QzM1Ni40OTQgMjIyLjQ4IDM0MC41MjYgMjYyLjg1MiAzMTQuMDk2IDI5My45NkwyNzQuNDY4IDI2MC4yOTJaTTUyLjQ5NDEgMTc4LjQ0NUM1Mi40OTQxIDIxMi4xIDY1LjU4ODkgMjQyLjYyNSA4Ni45ODg3IDI2NS4yNzlMNDkuMTg3OSAzMDAuOTg3QzE5LjAyMzIgMjY5LjA1NSAwLjQ5NDE0OSAyMjUuODg2IDAuNDk0MTQ3IDE3OC40NDVMNTIuNDk0MSAxNzguNDQ1WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==';


  class Vector3D {
    constructor(runtime) {
      this.runtime = runtime;
      this.scene = null;
      this.camera = null;
      this.renderer = null;
      this.renderCanvas = null;
      this.animationFrameId = null;
      this.sceneObjects = new Map();
      this._isPointerLookActive = false;
      this._pitch = 0;
      this._yaw = 0;
      this._sensitivityX = 0.002;
      this._sensitivityY = 0.002;
      this._pitchLimit = Math.PI / 2 - 0.01;
      this._resizeListenerAttached = false;
      this._pointerLockListenersAttached = false;
      this._needsRender = true;
      this._keyboardMoveActive = false;
      this._keyboardMoveKeys = {};
      this._keyboardMoveSpeed = 1;
      this._keysPressed = {};
      this._clock = null;
      this._running = false;

      // Binding is not needed for methods defined using arrow function syntax
      // this._onResize = this._onResize.bind(this);
      // this._onMouseMove = this._onMouseMove.bind(this);
      // this._onPointerlockChange = this._onPointerlockChange.bind(this);
      // this._onPointerlockError = this._onPointerlockError.bind(this);
      // this._onKeyDown = this._onKeyDown.bind(this);
      // this._onKeyUp = this._onKeyUp.bind(this);

      // _onStageResize was missing its definition and binding was causing error.
      // Define it below using arrow syntax, binding is implicit.
      // this._onStageResize = this._onStageResize.bind(this);

      this._loadThreeJS(() => {
        this.initializeView();
      });

      // Ensure runtime exists before adding listeners
      if (this.runtime) {
        this.runtime.on('PROJECT_STOP_ALL', () => {
          this.stopRenderLoop();
        });

        this.runtime.on('PROJECT_LOADED', () => {
          // Re-initialize if needed, might depend on desired behavior
          this.initializeView();
        });

        this.runtime.on('RUNTIME_DISPOSED', () => {
          this.clearView();
        });

        // Use the defined _onStageResize handler
        this.runtime.on('STAGE_SIZE_CHANGED', this._onStageResize);
      }
    }

    getInfo() {
      return {
        id: 'vector3d',
        name: 'Vector3D',
        menuIconURI: menu_icon_square,
        blockIconURI: block_icon_square,
        color1: '#9F56C3',
        color2: '#8E45B3',
        color3: '#3B006A',
        blocks: [
          {
            opcode: 'initializeView',
            blockIconURI: block_icon_square,
            blockType: Scratch.BlockType.COMMAND,
            text: 'initialize 3D view'
          },
          {
            opcode: 'clearView',
            blockIconURI: block_icon_square,
            blockType: Scratch.BlockType.COMMAND,
            text: 'clear 3D view'
          },
          '---',
          {
            opcode: 'setBackgroundColor',
            blockIconURI: block_icon_square,
            blockType: Scratch.BlockType.COMMAND,
            text: 'set background color [COLOR]',
            arguments: {
              COLOR: { type: Scratch.ArgumentType.COLOR, defaultValue: '#000000' },
            },
          },
          {
            opcode: 'removeBackgroundColor',
            blockIconURI: block_icon_square,
            blockType: Scratch.BlockType.COMMAND,
            text: 'remove background color',
          },
          '---',
          {
            opcode: 'setCameraPosition',
            blockIconURI: block_icon_camera,
            blockType: Scratch.BlockType.COMMAND,
            text: 'set camera position [ICON_X] x: [X] [ICON_Y] y: [Y] [ICON_Z] z: [Z]',
            arguments: {
              ICON_X: { type: Scratch.ArgumentType.IMAGE, dataURI: icon_right, width: 20, height: 20 },
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              ICON_Y: { type: Scratch.ArgumentType.IMAGE, dataURI: icon_up, width: 20, height: 20 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              ICON_Z: { type: Scratch.ArgumentType.IMAGE, dataURI: icon_away, width: 20, height: 20 },
              Z: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
            },
          },
          {
            opcode: 'changeCameraPosition',
            blockIconURI: block_icon_camera,
            blockType: Scratch.BlockType.COMMAND,
            text: 'change camera position [ICON_X] x: [X] [ICON_Y] y: [Y] [ICON_Z] z: [Z]',
            arguments: {
              ICON_X: { type: Scratch.ArgumentType.IMAGE, dataURI: icon_right, width: 20, height: 20 },
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              ICON_Y: { type: Scratch.ArgumentType.IMAGE, dataURI: icon_up, width: 20, height: 20 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              ICON_Z: { type: Scratch.ArgumentType.IMAGE, dataURI: icon_away, width: 20, height: 20 },
              Z: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
            },
          },
          {
            opcode: 'pointCameraAt',
            blockIconURI: block_icon_camera,
            blockType: Scratch.BlockType.COMMAND,
            text: 'point camera at [ICON_X] x: [X] [ICON_Y] y: [Y] [ICON_Z] z: [Z]',
            arguments: {
              ICON_X: { type: Scratch.ArgumentType.IMAGE, dataURI: icon_right, width: 20, height: 20 },
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              ICON_Y: { type: Scratch.ArgumentType.IMAGE, dataURI: icon_up, width: 20, height: 20 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              ICON_Z: { type: Scratch.ArgumentType.IMAGE, dataURI: icon_away, width: 20, height: 20 },
              Z: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            },
          },
          {
            opcode: 'getCameraPositionX',
            blockIconURI: block_icon_camera,
            blockType: Scratch.BlockType.REPORTER,
            blockShape: Scratch.BlockShape.ROUND,
            text: '[ICON_X] camera x position',
            arguments: {
              ICON_X: { type: Scratch.ArgumentType.IMAGE, dataURI: icon_right, width: 20, height: 20 },
            },
          },
          {
            opcode: 'getCameraPositionY',
            blockIconURI: block_icon_camera,
            blockType: Scratch.BlockType.REPORTER,
            blockShape: Scratch.BlockShape.ROUND,
            text: '[ICON_Y] camera y position',
            arguments: {
              ICON_Y: { type: Scratch.ArgumentType.IMAGE, dataURI: icon_up, width: 20, height: 20 },
            },
          },
          {
            opcode: 'getCameraPositionZ',
            blockIconURI: block_icon_camera,
            blockType: Scratch.BlockType.REPORTER,
            blockShape: Scratch.BlockShape.ROUND,
            text: '[ICON_Z] camera z position',
            arguments: {
              ICON_Z: { type: Scratch.ArgumentType.IMAGE, dataURI: icon_away, width: 20, height: 20 },
            },
          },
          {
            opcode: 'getCameraRotationPitch',
            blockIconURI: block_icon_camera,
            blockType: Scratch.BlockType.REPORTER,
            blockShape: Scratch.BlockShape.ROUND,
            text: '[ICON_PITCH] camera pitch (degrees)',
            arguments: {
              ICON_PITCH: { type: Scratch.ArgumentType.IMAGE, dataURI: icon_rotatePitch, width: 20, height: 20 },
            },
          },
          {
            opcode: 'getCameraRotationYaw',
            blockIconURI: block_icon_camera,
            blockType: Scratch.BlockType.REPORTER,
            blockShape: Scratch.BlockShape.ROUND,
            text: '[ICON_YAW] camera yaw (degrees)',
            arguments: {
              ICON_YAW: { type: Scratch.ArgumentType.IMAGE, dataURI: icon_rotateYaw, width: 20, height: 20 },
            },
          },
          {
            opcode: 'getCameraRotationRoll',
            blockIconURI: block_icon_camera,
            blockType: Scratch.BlockType.REPORTER,
            blockShape: Scratch.BlockShape.ROUND,
            text: '[ICON_ROLL] camera roll (degrees)',
            arguments: {
              ICON_ROLL: { type: Scratch.ArgumentType.IMAGE, dataURI: icon_rotateRoll, width: 20, height: 20 },
            },
          },
          {
            opcode: 'isPointerLookActive',
            blockIconURI: block_icon_camera,
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'is camera pointer look active?',
          },
          '---',
          {
            opcode: 'startPointerLook',
            blockIconURI: block_icon_camera,
            blockType: Scratch.BlockType.COMMAND,
            text: 'start camera pointer look and lock',
          },
          {
            opcode: 'stopPointerLook',
            blockIconURI: block_icon_camera,
            blockType: Scratch.BlockType.COMMAND,
            text: 'stop camera pointer look',
          },
          {
            opcode: 'setPointerSensitivity',
            blockIconURI: block_icon_camera,
            blockType: Scratch.BlockType.COMMAND,
            text: 'set pointer sensitivity x: [X] y: [Y]',
            arguments: {
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0.002 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0.002 },
            },
          },
          {
            opcode: 'startKeyboardMovement',
            blockIconURI: block_icon_camera,
            blockType: Scratch.BlockType.COMMAND,
            text: 'start keyboard movement [ICON_FORWARD] [FORWARD_KEY] [ICON_BACKWARD] [BACKWARD_KEY] [ICON_LEFT] [LEFT_KEY] [ICON_RIGHT] [RIGHT_KEY] speed [SPEED]',
            arguments: {
              ICON_FORWARD: { type: Scratch.ArgumentType.IMAGE, dataURI: icon_up, width: 20, height: 20 },
              FORWARD_KEY: { type: Scratch.ArgumentType.STRING, defaultValue: 'w' },
              ICON_BACKWARD: { type: Scratch.ArgumentType.IMAGE, dataURI: icon_down, width: 20, height: 20 },
              BACKWARD_KEY: { type: Scratch.ArgumentType.STRING, defaultValue: 's' },
              ICON_LEFT: { type: Scratch.ArgumentType.IMAGE, dataURI: icon_left, width: 20, height: 20 },
              LEFT_KEY: { type: Scratch.ArgumentType.STRING, defaultValue: 'a' },
              ICON_RIGHT: { type: Scratch.ArgumentType.IMAGE, dataURI: icon_right, width: 20, height: 20 },
              RIGHT_KEY: { type: Scratch.ArgumentType.STRING, defaultValue: 'd' },
              SPEED: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 },
            },
          },
          {
            opcode: 'stopKeyboardMovement',
            blockIconURI: block_icon_camera,
            blockType: Scratch.BlockType.COMMAND,
            text: 'stop keyboard movement',
          },
          '---',
          {
            opcode: 'createObject',
            blockIconURI: block_icon_square,
            blockType: Scratch.BlockType.COMMAND,
            text: 'create [SHAPE] named [NAME] size [SIZE] color [COLOR]',
            arguments: {
              SHAPE: { type: Scratch.ArgumentType.STRING, menu: 'SHAPE' },
              NAME: { type: Scratch.ArgumentType.STRING, defaultValue: 'myObject' },
              SIZE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
              COLOR: { type: Scratch.ArgumentType.COLOR, defaultValue: '#ffffff' },
            },
          },
          '---',
          {
            opcode: 'setObjectPosition',
            blockIconURI: block_icon_square,
            blockType: Scratch.BlockType.COMMAND,
            text: 'set object [NAME] position [ICON_X] x [X] [ICON_Y] y [Y] [ICON_Z] z [Z]',
            arguments: {
              NAME: { type: Scratch.ArgumentType.STRING, menu: 'objectNames', defaultValue: 'myObject' },
              ICON_X: { type: Scratch.ArgumentType.IMAGE, dataURI: icon_right, width: 20, height: 20 },
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              ICON_Y: { type: Scratch.ArgumentType.IMAGE, dataURI: icon_up, width: 20, height: 20 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              ICON_Z: { type: Scratch.ArgumentType.IMAGE, dataURI: icon_away, width: 20, height: 20 },
              Z: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            },
          },
          {
            opcode: 'changeObjectPosition',
            blockIconURI: block_icon_square,
            blockType: Scratch.BlockType.COMMAND,
            text: 'change object [NAME] position [ICON_X] x: [X] [ICON_Y] y: [Y] [ICON_Z] z: [Z]',
            arguments: {
              NAME: { type: Scratch.ArgumentType.STRING, menu: 'objectNames', defaultValue: 'myObject' },
              ICON_X: { type: Scratch.ArgumentType.IMAGE, dataURI: icon_right, width: 20, height: 20 },
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              ICON_Y: { type: Scratch.ArgumentType.IMAGE, dataURI: icon_up, width: 20, height: 20 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              ICON_Z: { type: Scratch.ArgumentType.IMAGE, dataURI: icon_away, width: 20, height: 20 },
              Z: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            },
          },
          {
            opcode: 'changeObjectRotation',
            blockIconURI: block_icon_square,
            blockType: Scratch.BlockType.COMMAND,
            text: 'change object [NAME] rotation [ICON_PITCH] x by [X] [ICON_YAW] y by [Y] [ICON_ROLL] z by [Z] (degrees)',
            arguments: {
              NAME: { type: Scratch.ArgumentType.STRING, menu: 'objectNames', defaultValue: 'myObject' },
              ICON_PITCH: { type: Scratch.ArgumentType.IMAGE, dataURI: icon_rotatePitch, width: 20, height: 20 },
              X: { type: Scratch.ArgumentType.ANGLE, defaultValue: 0 },
              ICON_YAW: { type: Scratch.ArgumentType.IMAGE, dataURI: icon_rotateYaw, width: 20, height: 20 },
              Y: { type: Scratch.ArgumentType.ANGLE, defaultValue: 0 },
              ICON_ROLL: { type: Scratch.ArgumentType.IMAGE, dataURI: icon_rotateRoll, width: 20, height: 20 },
              Z: { type: Scratch.ArgumentType.ANGLE, defaultValue: 0 },
            },
          },
          {
            opcode: 'setObjectRotation',
            blockIconURI: block_icon_square,
            blockType: Scratch.BlockType.COMMAND,
            text: 'set object [NAME] rotation [ICON_PITCH] x to [X] [ICON_YAW] y to [Y] [ICON_ROLL] z to [Z] (degrees)',
            arguments: {
              NAME: { type: Scratch.ArgumentType.STRING, menu: 'objectNames', defaultValue: 'myObject' },
              ICON_PITCH: { type: Scratch.ArgumentType.IMAGE, dataURI: icon_rotatePitch, width: 20, height: 20 },
              X: { type: Scratch.ArgumentType.ANGLE, defaultValue: 0 },
              ICON_YAW: { type: Scratch.ArgumentType.IMAGE, dataURI: icon_rotateYaw, width: 20, height: 20 },
              Y: { type: Scratch.ArgumentType.ANGLE, defaultValue: 0 },
              ICON_ROLL: { type: Scratch.ArgumentType.IMAGE, dataURI: icon_rotateRoll, width: 20, height: 20 },
              Z: { type: Scratch.ArgumentType.ANGLE, defaultValue: 0 },
            },
          },
          {
            opcode: 'setObjectScale',
            blockIconURI: block_icon_square,
            blockType: Scratch.BlockType.COMMAND,
            text: 'set object [NAME] scale [ICON_X] x [X] [ICON_Y] y [Y] [ICON_Z] z [Z]',
            arguments: {
              NAME: { type: Scratch.ArgumentType.STRING, menu: 'objectNames', defaultValue: 'myObject' },
              ICON_X: { type: Scratch.ArgumentType.IMAGE, dataURI: icon_right, width: 20, height: 20 },
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
              ICON_Y: { type: Scratch.ArgumentType.IMAGE, dataURI: icon_up, width: 20, height: 20 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
              ICON_Z: { type: Scratch.ArgumentType.IMAGE, dataURI: icon_away, width: 20, height: 20 },
              Z: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
            },
          },
          {
            opcode: 'setObjectColor',
            blockIconURI: block_icon_square,
            blockType: Scratch.BlockType.COMMAND,
            text: 'set object [NAME] color [COLOR]',
            arguments: {
              NAME: { type: Scratch.ArgumentType.STRING, menu: 'objectNames', defaultValue: 'myObject' },
              COLOR: { type: Scratch.ArgumentType.COLOR, defaultValue: '#ffffff' },
            },
          },
          {
            opcode: 'setObjectVisible',
            blockIconURI: block_icon_square,
            blockType: Scratch.BlockType.COMMAND,
            text: 'set object [NAME] to [VISIBLE_STATE]',
            arguments: {
              NAME: { type: Scratch.ArgumentType.STRING, menu: 'objectNames', defaultValue: 'myObject' },
              VISIBLE_STATE: { type: Scratch.ArgumentType.STRING, menu: 'VISIBILITY_STATE', defaultValue: 'visible' },
            },
          },
          {
            opcode: 'removeObject',
            blockIconURI: block_icon_square,
            blockType: Scratch.BlockType.COMMAND,
            text: 'remove object [NAME]',
            arguments: {
              NAME: { type: Scratch.ArgumentType.STRING, menu: 'objectNames', defaultValue: 'myObject' },
            },
          },
          '---',
          {
            opcode: 'getObjectPositionX',
            blockIconURI: block_icon_square,
            blockType: Scratch.BlockType.REPORTER,
            blockShape: Scratch.BlockShape.ROUND,
            text: 'object [NAME] [ICON_X] x position',
            arguments: {
              NAME: { type: Scratch.ArgumentType.STRING, menu: 'objectNames', defaultValue: 'myObject' },
              ICON_X: { type: Scratch.ArgumentType.IMAGE, dataURI: icon_right, width: 20, height: 20 },
            },
          },
          {
            opcode: 'getObjectPositionY',
            blockIconURI: block_icon_square,
            blockType: Scratch.BlockType.REPORTER,
            blockShape: Scratch.BlockShape.ROUND,
            text: 'object [NAME] [ICON_Y] y position',
            arguments: {
              NAME: { type: Scratch.ArgumentType.STRING, menu: 'objectNames', defaultValue: 'myObject' },
              ICON_Y: { type: Scratch.ArgumentType.IMAGE, dataURI: icon_up, width: 20, height: 20 },
            },
          },
          {
            opcode: 'getObjectPositionZ',
            blockIconURI: block_icon_square,
            blockType: Scratch.BlockType.REPORTER,
            blockShape: Scratch.BlockShape.ROUND,
            text: 'object [NAME] [ICON_Z] z position',
            arguments: {
              NAME: { type: Scratch.ArgumentType.STRING, menu: 'objectNames', defaultValue: 'myObject' },
              ICON_Z: { type: Scratch.ArgumentType.IMAGE, dataURI: icon_away, width: 20, height: 20 },
            },
          },
          {
            opcode: 'getObjectRotationPitch',
            blockIconURI: block_icon_square,
            blockType: Scratch.BlockType.REPORTER,
            blockShape: Scratch.BlockShape.ROUND,
            text: 'object [NAME] [ICON_PITCH] pitch (degrees)',
            arguments: {
              NAME: { type: Scratch.ArgumentType.STRING, menu: 'objectNames', defaultValue: 'myObject' },
              ICON_PITCH: { type: Scratch.ArgumentType.IMAGE, dataURI: icon_rotatePitch, width: 20, height: 20 },
            },
          },
          {
            opcode: 'getObjectRotationYaw',
            blockIconURI: block_icon_square,
            blockType: Scratch.BlockType.REPORTER,
            blockShape: Scratch.BlockShape.ROUND,
            text: 'object [NAME] [ICON_YAW] yaw (degrees)',
            arguments: {
              NAME: { type: Scratch.ArgumentType.STRING, menu: 'objectNames', defaultValue: 'myObject' },
              ICON_YAW: { type: Scratch.ArgumentType.IMAGE, dataURI: icon_rotateYaw, width: 20, height: 20 },
            },
          },
          {
            opcode: 'getObjectRotationRoll',
            blockIconURI: block_icon_square,
            blockType: Scratch.BlockType.REPORTER,
            blockShape: Scratch.BlockShape.ROUND,
            text: 'object [NAME] [ICON_ROLL] roll (degrees)',
            arguments: {
              NAME: { type: Scratch.ArgumentType.STRING, menu: 'objectNames', defaultValue: 'myObject' },
              ICON_ROLL: { type: Scratch.ArgumentType.IMAGE, dataURI: icon_rotateRoll, width: 20, height: 20 },
            },
          },
        ],
        menus: {
          objectNames: '_getObjectNamesMenu',
          SHAPE: ['cube', 'sphere', 'cylinder', 'cone', 'plane'],
          VISIBILITY_STATE: {
            acceptReporters: true,
            items: ['visible', 'hidden']
          }
        },
      };
    }

    _getObjectNamesMenu() {
      if (!this.sceneObjects || !(this.sceneObjects instanceof Map) || this.sceneObjects.size === 0) {
        return [{ text: 'no objects', value: '' }];
      }
      return Array.from(this.sceneObjects.keys()).map(name => ({ text: name, value: name }));
    }

    _loadThreeJS(callback) {
      if (typeof THREE !== 'undefined') {
        callback();
        return;
      }
      const scriptThree = document.createElement('script');
      scriptThree.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.159.0/three.min.js';
      scriptThree.async = true;
      scriptThree.onload = () => {
        if (typeof THREE !== 'undefined') {
          callback();
        }
      };
      scriptThree.onerror = () => {
        console.error("Failed to load Three.js");
      };
      document.head.appendChild(scriptThree);
    }

    initializeView() {
      if (this._running) return;
      this._loadThreeJS(() => {
        if (typeof THREE !== 'undefined') {
          this._initializeViewInternal();
        } else {
          console.error("Three.js is not loaded, cannot initialize view.");
        }
      });
    }

    _initializeViewInternal() {
      // Ensure THREE is available
      if (typeof THREE === 'undefined') {
        console.error("THREE is undefined in _initializeViewInternal");
        return;
      }
      // Ensure runtime and renderer are available
      if (!this.runtime || !this.runtime.renderer || !this.runtime.renderer.canvas) {
        console.error("Scratch runtime or renderer not available.");
        return;
      }

      const stage = this.runtime.renderer.canvas;
      const aspect = stage.width / stage.height;

      if (!this.scene) this.scene = new THREE.Scene();
      this.scene.background = null;

      if (!this.camera) {
        this.camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
        this.camera.position.set(0, 0, 10);
        this.camera.lookAt(0, 0, 0);
        this.camera.rotation.order = 'YXZ'; // Use YXZ order for intuitive yaw/pitch

        // Initialize internal pitch/yaw based on initial lookAt
        const euler = new THREE.Euler(0, 0, 0, 'YXZ');
        euler.setFromQuaternion(this.camera.quaternion);
        this._pitch = euler.x;
        this._yaw = euler.y;
        // Apply pitch limit immediately
        this._pitch = Math.max(-this._pitchLimit, Math.min(this._pitch, this._pitchLimit));
        this.camera.rotation.set(this._pitch, this._yaw, 0); // Set rotation based on calculated pitch/yaw
      } else {
        // Update existing camera aspect ratio if it exists
        this.camera.aspect = aspect;
        this.camera.updateProjectionMatrix();
      }


      if (!this.renderer) {
        try {
          this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
          this.renderCanvas = this.renderer.domElement;
          this.renderCanvas.style.position = 'absolute';
          this.renderCanvas.style.top = '0';
          this.renderCanvas.style.left = '0';
          this.renderCanvas.style.zIndex = '1'; // Place above Scratch stage? Check if needed.
          this.renderCanvas.style.pointerEvents = 'none'; // Allow clicks to pass through initially

          const scratchStageContainer = this.runtime.renderer.canvas.parentElement;
          if (scratchStageContainer) {
            // Ensure the container can hold absolutely positioned children
            if (window.getComputedStyle(scratchStageContainer).position === 'static') {
              scratchStageContainer.style.position = 'relative';
            }
            // Remove any old canvas potentially left over
            const oldCanvas = scratchStageContainer.querySelector('canvas[style*="z-index: 1"]');
            if (oldCanvas && oldCanvas !== this.renderCanvas) {
              scratchStageContainer.removeChild(oldCanvas);
            }
            // Add the new canvas if it's not already there
            if (!scratchStageContainer.contains(this.renderCanvas)) {
              scratchStageContainer.appendChild(this.renderCanvas);
            }
            this.renderCanvas.style.display = 'block'; // Make sure it's visible
          } else {
            console.error("Scratch stage container not found.");
            // Fallback or error handling needed?
            // document.body.appendChild(this.renderCanvas); // Avoid appending to body directly if possible
            return; // Stop initialization if container is missing
          }
          this.renderer.autoClear = true; // Default is true, explicit for clarity

          // Attach resize listener
          if (!this._resizeListenerAttached) {
            // Use the runtime event if available (preferred)
            // Note: The constructor already adds this listener via runtime.on('STAGE_SIZE_CHANGED', this._onStageResize);
            // We just need to ensure it's correctly handled by _onStageResize -> _onResize
            // If runtime listener isn't reliable or available, fallback to window resize
            // window.addEventListener('resize', this._onResize); // Fallback if needed
            this._resizeListenerAttached = true; // Mark as attached
          }

          // Attach pointer lock listeners
          if (!this._pointerLockListenersAttached) {
            document.addEventListener('pointerlockchange', this._onPointerlockChange, false);
            document.addEventListener('mozpointerlockchange', this._onPointerlockChange, false);
            document.addEventListener('webkitpointerlockchange', this._onPointerlockChange, false);
            document.addEventListener('pointerlockerror', this._onPointerlockError, false);
            document.addEventListener('mozpointerlockerror', this._onPointerlockError, false);
            document.addEventListener('webkitpointerlockerror', this._onPointerlockError, false);
            this._pointerLockListenersAttached = true;
          }

          if (!this._clock) {
            this._clock = new THREE.Clock();
          }
        } catch (e) {
          console.error("Error creating WebGLRenderer:", e);
          this.clearView(); // Clean up if renderer creation fails
          return;
        }
      }

      // Set size, pixel ratio, and clear color (transparent)
      this.renderer.setSize(stage.width, stage.height);
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setClearColor(0x000000, 0); // Transparent background

      // Add default lighting if not present
      let ambientLight = this.scene.getObjectByName('ambientLight');
      if (!ambientLight) {
        ambientLight = new THREE.AmbientLight(0x606060); // Soft white light
        ambientLight.name = 'ambientLight';
        this.scene.add(ambientLight);
      }

      let directionalLight = this.scene.getObjectByName('directionalLight');
      if (!directionalLight) {
        directionalLight = new THREE.DirectionalLight(0xffffff, 1.0); // White directional light
        directionalLight.position.set(1, 1.5, 1).normalize(); // Position it
        directionalLight.name = 'directionalLight';
        this.scene.add(directionalLight);
      }

      this._needsRender = true; // Flag that a render is needed
      this.startRenderLoop(); // Start the loop if not already running
      this._running = true;
    }

    // Define the missing _onStageResize method using arrow syntax for auto-binding
    _onStageResize = () => {
        // This method is called by the runtime event 'STAGE_SIZE_CHANGED'
        // It should trigger the actual resize logic.
        this._onResize();
    }


    _startRenderLoop() {
      if (this.animationFrameId) { // Already running
        return;
      }
      if (!this.renderer || !this.scene || !this.camera || typeof THREE === 'undefined') {
        console.error("Cannot start render loop: Renderer, scene, camera, or THREE is missing.");
        return;
      }

      if (!this._clock) {
        this._clock = new THREE.Clock();
      }
      if (!this._clock.running) {
        this._clock.start();
      }

      const animate = () => {
        // Check if still valid to run
        if (!this.renderer || !this.scene || !this.camera) {
          this.animationFrameId = null;
          if (this._clock) this._clock.stop();
          this._running = false;
          return;
        }

        const deltaTime = this._clock.getDelta();
        let needsRenderThisFrame = this._needsRender; // Start with the persistent flag

        // --- Keyboard Movement Update ---
        if (this._keyboardMoveActive && typeof THREE !== 'undefined') {
          // Calculate movement direction based on pressed keys
          const moveForward = (this._keysPressed[this._keyboardMoveKeys.forward] ? 1 : 0) - (this._keysPressed[this._keyboardMoveKeys.backward] ? 1 : 0);
          const moveRight = (this._keysPressed[this._keyboardMoveKeys.right] ? 1 : 0) - (this._keysPressed[this._keyboardMoveKeys.left] ? 1 : 0); // Corrected left/right logic

          if (moveForward !== 0 || moveRight !== 0) {
            const direction = new THREE.Vector3();
            this.camera.getWorldDirection(direction); // Get camera's forward direction

            // Project forward direction onto the XZ plane for horizontal movement
            const forward = new THREE.Vector3(direction.x, 0, direction.z).normalize();
            // Calculate right direction perpendicular to the projected forward and world up (Y)
            const right = new THREE.Vector3().crossVectors(this.camera.up, forward).normalize(); // Use camera.up which should be (0,1,0)

            const movement = new THREE.Vector3();
            // Apply movement based on delta time and speed
            movement.addScaledVector(forward, moveForward * this._keyboardMoveSpeed * deltaTime);
            movement.addScaledVector(right, moveRight * this._keyboardMoveSpeed * deltaTime); // Use calculated right vector

            this.camera.position.add(movement);
            needsRenderThisFrame = true; // Movement occurred, need to render
          }
        }
        // --- End Keyboard Movement Update ---


        if (needsRenderThisFrame) {
          try {
            this.renderer.clear(); // Clear the canvas (important for alpha background)
            this.renderer.render(this.scene, this.camera); // Render the scene
            this._needsRender = false; // Reset the persistent flag after rendering
          } catch (e) {
            console.error("Error during rendering:", e);
            // Stop the loop on render error to prevent spamming
            if (this.animationFrameId) {
              cancelAnimationFrame(this.animationFrameId);
              this.animationFrameId = null;
            }
            if (this._clock) this._clock.stop();
            this._running = false;
            return; // Exit the animate function
          }
        }

        // Decide whether to continue the loop
        if (this._keyboardMoveActive || this._isPointerLookActive || this._needsRender) {
          // Continue if keyboard/mouse input is active or if something else flagged a needed render
          this.animationFrameId = requestAnimationFrame(animate);
        } else {
          // Stop the loop if nothing requires continuous updates
          this.animationFrameId = null;
          if (this._clock) this._clock.stop();
          this._running = false;
        }
      };

      // Start the first frame
      this.animationFrameId = requestAnimationFrame(animate);
    }


    startRenderLoop() {
      this._needsRender = true; // Always flag render needed when explicitly starting
      if (!this.animationFrameId) { // Only start if not already running
        this._startRenderLoop();
        this._running = true;
      }
    }

    stopRenderLoop() {
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
      }
      if (this._clock) {
        this._clock.stop();
      }
      this._running = false;
    }

    clearView() {
      // Stop everything first
      this.stopRenderLoop();
      this.stopPointerLook(); // Ensure pointer lock is released
      this.stopKeyboardMovement(); // Ensure keyboard listeners are removed

      this._clearViewInternal(); // Call the internal cleanup

      // Reset state variables
      this._pitch = 0;
      this._yaw = 0;
      this._needsRender = true; // Ready for potential re-initialization
    }


    _clearViewInternal() { // Removed internalCall parameter, logic simplified
      // Remove event listeners only if they were attached
      if (this._resizeListenerAttached) {
        // Runtime listener is removed via runtime.off or similar if needed,
        // but typically managed by runtime disposal.
        // window.removeEventListener('resize', this._onResize); // Remove fallback if used
        this._resizeListenerAttached = false;
      }

      if (this._pointerLockListenersAttached) {
        document.removeEventListener('pointerlockchange', this._onPointerlockChange, false);
        document.removeEventListener('mozpointerlockchange', this._onPointerlockChange, false);
        document.removeEventListener('webkitpointerlockchange', this._onPointerlockChange, false);
        document.removeEventListener('pointerlockerror', this._onPointerlockError, false);
        document.removeEventListener('mozpointerlockerror', this._onPointerlockError, false);
        document.removeEventListener('webkitpointerlockerror', this._onPointerlockError, false);
        this._pointerLockListenersAttached = false;
      }

      // Keyboard listeners are removed by stopKeyboardMovement called in clearView

      // Dispose of Three.js resources
      if (this.scene && typeof THREE !== 'undefined') {
        // Dispose geometries and materials
        this.scene.traverse((object) => {
          if (object.geometry && object.geometry.dispose) {
            object.geometry.dispose();
          }
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(material => {
                if (material.map && material.map.dispose) material.map.dispose();
                if (material.dispose) material.dispose();
              });
            } else {
              if (object.material.map && object.material.map.dispose) object.material.map.dispose();
              if (object.material.dispose) object.material.dispose();
            }
          }
        });

        // Remove all children from the scene
        while (this.scene.children.length > 0) {
          this.scene.remove(this.scene.children[0]);
        }
      }

      // Clear the object map
      if (this.sceneObjects) {
        this.sceneObjects.clear();
      }

      // Dispose of the renderer and remove its canvas
      if (this.renderer) {
        this.renderer.dispose();
        if (this.renderCanvas && this.renderCanvas.parentElement) {
          this.renderCanvas.parentElement.removeChild(this.renderCanvas);
        }
      }

      // Nullify references
      this.scene = null;
      this.camera = null;
      this.renderer = null;
      this.renderCanvas = null;
      // Keep clock instance? Maybe nullify: this._clock = null;
    }


    startPointerLook() {
      if (!this.renderCanvas || typeof THREE === 'undefined') return;
      const targetElement = this.renderCanvas;

      // Make the canvas interactive *before* requesting lock
      targetElement.style.pointerEvents = 'auto';

      // Check if already locked to this element
      if (document.pointerLockElement === targetElement ||
          document.mozPointerLockElement === targetElement ||
          document.webkitPointerLockElement === targetElement) {
        // Already locked, ensure internal state is correct
        if (!this._isPointerLookActive) {
            this._isPointerLookActive = true;
            document.addEventListener('mousemove', this._onMouseMove, false);
            this.startRenderLoop(); // Ensure loop is running
        }
        return; // Already locked, nothing more to do
      }

      // Request pointer lock
      if (targetElement.requestPointerLock) {
        targetElement.requestPointerLock();
      } else if (targetElement.mozRequestPointerLock) { /* Firefox */
        targetElement.mozRequestPointerLock();
      } else if (targetElement.webkitRequestPointerLock) { /* Chrome, Safari, Opera */
        targetElement.webkitRequestPointerLock();
      } else {
         // Pointer lock not supported or failed, revert pointer events
         console.warn("Pointer Lock API not supported or request failed.");
         targetElement.style.pointerEvents = 'none';
      }
    }

    stopPointerLook() {
      // Check if pointer lock is active on *any* element before trying to exit
      if (document.pointerLockElement || document.mozPointerLockElement || document.webkitPointerLockElement) {
          if (document.exitPointerLock) {
            document.exitPointerLock();
          } else if (document.mozExitPointerLock) { /* Firefox */
            document.mozExitPointerLock();
          } else if (document.webkitExitPointerLock) { /* Chrome, Safari, Opera */
            document.webkitExitPointerLock();
          }
      }

      // Clean up internal state regardless of whether exitPointerLock was called or successful
      // This handles cases where lock was lost without explicit exit (e.g., Esc key)
      if (this._isPointerLookActive) {
          this._isPointerLookActive = false;
          document.removeEventListener('mousemove', this._onMouseMove, false);
          if (this.renderCanvas) {
              // Revert canvas interaction state
              this.renderCanvas.style.pointerEvents = 'none';
          }
          // Loop might stop on its own if nothing else requires it
      }
    }


    isPointerLookActive() {
      // Return the internal state, which should be updated by _onPointerlockChange
      return this._isPointerLookActive;
    }

    // Arrow function for auto-binding
    _onPointerlockChange = () => {
      const targetElement = this.renderCanvas;
      if (!targetElement) return; // Should not happen if initialized

      const isActiveElement = document.pointerLockElement === targetElement ||
                              document.mozPointerLockElement === targetElement ||
                              document.webkitPointerLockElement === targetElement;

      if (isActiveElement) {
        // Pointer lock successfully acquired or re-acquired for our canvas
        if (!this._isPointerLookActive) {
            this._isPointerLookActive = true;
            targetElement.style.pointerEvents = 'auto'; // Ensure interactive
            document.addEventListener('mousemove', this._onMouseMove, false);
            this.startRenderLoop(); // Ensure render loop is active
        }
      } else {
        // Pointer lock lost (e.g., user pressed Esc, or switched tabs)
        if (this._isPointerLookActive) {
            this._isPointerLookActive = false;
            targetElement.style.pointerEvents = 'none'; // Make non-interactive again
            document.removeEventListener('mousemove', this._onMouseMove, false);
            // Render loop might stop if nothing else requires it
        }
      }
    }

    // Arrow function for auto-binding
    _onPointerlockError = () => {
      console.error("Pointer lock failed or error occurred.");
      // Ensure state is cleaned up if lock fails
      this._isPointerLookActive = false;
      if (this.renderCanvas) {
        this.renderCanvas.style.pointerEvents = 'none';
      }
      document.removeEventListener('mousemove', this._onMouseMove, false);
    }

    // Arrow function for auto-binding
    _onMouseMove = (event) => {
      // Only process if pointer lock is active and camera exists
      if (!this._isPointerLookActive || !this.camera || typeof THREE === 'undefined') return;

      const movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
      const movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

      // Adjust yaw (rotation around Y) and pitch (rotation around X)
      this._yaw -= movementX * this._sensitivityX;
      this._pitch -= movementY * this._sensitivityY;

      // Clamp pitch to prevent flipping over
      this._pitch = Math.max(-this._pitchLimit, Math.min(this._pitch, this._pitchLimit));

      // Apply rotation using Euler angles in YXZ order
      this.camera.rotation.set(this._pitch, this._yaw, 0);
      this._needsRender = true; // Flag that rendering is needed
      // No need to explicitly call startRenderLoop here, the loop itself checks _isPointerLookActive
    }

    // Arrow function for auto-binding
    _onResize = () => {
      if (!this.renderer || !this.camera || !this.runtime || !this.runtime.renderer || !this.runtime.renderer.canvas) {
          console.warn("Resize called but essential components are missing.");
          return;
      }
      const stage = this.runtime.renderer.canvas;
      const newWidth = stage.width;
      const newHeight = stage.height;

      // Update camera aspect ratio
      this.camera.aspect = newWidth / newHeight;
      this.camera.updateProjectionMatrix(); // Important after changing aspect

      // Update renderer size
      this.renderer.setSize(newWidth, newHeight);

      // Update our canvas element size to match the Scratch stage
      if (this.renderCanvas && this.renderCanvas !== stage) {
        this.renderCanvas.style.width = `${newWidth}px`;
        this.renderCanvas.style.height = `${newHeight}px`;
      }
      this._needsRender = true; // Flag that rendering is needed
      this.startRenderLoop(); // Ensure loop is running to process the resize render
    }


    // Arrow function for auto-binding
    _onKeyDown = (event) => {
        if (!this._keyboardMoveActive) return;
        const key = event.key.toLowerCase();
        this._keysPressed[key] = true;
        // No need to start render loop here, the loop checks _keyboardMoveActive
    }

    // Arrow function for auto-binding
    _onKeyUp = (event) => {
        if (!this._keyboardMoveActive) return;
        const key = event.key.toLowerCase();
        this._keysPressed[key] = false;
    }


    startKeyboardMovement({ FORWARD_KEY, BACKWARD_KEY, LEFT_KEY, RIGHT_KEY, SPEED }) {
        if (this._keyboardMoveActive) {
            // Stop previous movement if already active
            this.stopKeyboardMovement();
        }
        // Store normalized keys and speed
        this._keyboardMoveKeys = {
            forward: String(FORWARD_KEY).toLowerCase(),
            backward: String(BACKWARD_KEY).toLowerCase(),
            left: String(LEFT_KEY).toLowerCase(),
            right: String(RIGHT_KEY).toLowerCase()
        };
        this._keyboardMoveSpeed = Math.max(0, Number(SPEED)); // Ensure speed is non-negative
        this._keysPressed = {}; // Reset pressed keys state

        // Add listeners
        document.addEventListener('keydown', this._onKeyDown);
        document.addEventListener('keyup', this._onKeyUp);
        this._keyboardMoveActive = true;

        this.startRenderLoop(); // Ensure render loop is active
    }

    stopKeyboardMovement() {
        if (!this._keyboardMoveActive) return; // Do nothing if not active

        // Remove listeners
        document.removeEventListener('keydown', this._onKeyDown);
        document.removeEventListener('keyup', this._onKeyUp);

        // Reset state
        this._keyboardMoveActive = false;
        this._keyboardMoveKeys = {};
        this._keysPressed = {};
        // Render loop might stop on its own if nothing else requires it
    }


    setBackgroundColor({ COLOR }) {
      if (!this.scene || typeof THREE === 'undefined') return;
      try {
        // Setting background to a THREE.Color makes it opaque
        this.scene.background = new THREE.Color(COLOR);
        this._needsRender = true;
        this.startRenderLoop();
      } catch (e) {
        console.error("Invalid color value for background:", COLOR, e);
      }
    }

    removeBackgroundColor() {
        if (!this.scene || typeof THREE === 'undefined') return;
        // Setting background to null makes it transparent (shows Scratch stage)
        this.scene.background = null;
        this._needsRender = true;
        this.startRenderLoop();
    }

    setCameraPosition({ X, Y, Z }) {
      if (!this.camera || typeof THREE === 'undefined') return;
      const posX = Number(X);
      const posY = Number(Y);
      const posZ = Number(Z);
      // Check if conversion resulted in valid numbers
      if (!isNaN(posX) && !isNaN(posY) && !isNaN(posZ)) {
          this.camera.position.set(posX, posY, posZ);
          this._needsRender = true;
          this.startRenderLoop();
      } else {
          console.warn("Invalid input for setCameraPosition:", X, Y, Z);
      }
    }

    changeCameraPosition({ X, Y, Z }) {
      if (!this.camera || typeof THREE === 'undefined') return;
      const dX = Number(X);
      const dY = Number(Y);
      const dZ = Number(Z); // This is change along camera's forward/backward axis

      if (!isNaN(dX) && !isNaN(dY) && !isNaN(dZ)) {
          // Get camera's local axes based on its current orientation
          const quaternion = this.camera.quaternion;
          const right = new THREE.Vector3(1, 0, 0).applyQuaternion(quaternion);
          const localUp = new THREE.Vector3(0, 1, 0).applyQuaternion(quaternion); // Camera's local up
          const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(quaternion); // Camera's local forward (-Z)

          // Apply changes along the camera's local axes
          this.camera.position.addScaledVector(right, dX);    // Move right/left locally
          this.camera.position.addScaledVector(localUp, dY);  // Move up/down locally
          this.camera.position.addScaledVector(forward, dZ);  // Move forward/backward locally

          this._needsRender = true;
          this.startRenderLoop();
      } else {
          console.warn("Invalid input for changeCameraPosition:", X, Y, Z);
      }
    }


    pointCameraAt({ X, Y, Z }) {
      if (!this.camera || typeof THREE === 'undefined') return;
      const targetX = Number(X);
      const targetY = Number(Y);
      const targetZ = Number(Z);
      if (!isNaN(targetX) && !isNaN(targetY) && !isNaN(targetZ)) {
          const target = new THREE.Vector3(targetX, targetY, targetZ);
          this.camera.lookAt(target); // Make the camera look at the target point

          // After lookAt, the quaternion changes. We need to update our internal
          // _pitch and _yaw representation based on the new orientation.
          // Use YXZ order consistent with pointer look.
          const euler = new THREE.Euler(0, 0, 0, 'YXZ');
          euler.setFromQuaternion(this.camera.quaternion);
          this._pitch = euler.x;
          this._yaw = euler.y;

          // Apply pitch limits to the new orientation
          this._pitch = Math.max(-this._pitchLimit, Math.min(this._pitch, this._pitchLimit));

          // Re-apply the potentially clamped rotation
          // Note: This might slightly alter the direction if pitch was clamped,
          // but it keeps the internal state consistent with pointer look.
          this.camera.rotation.set(this._pitch, this._yaw, 0);

          this._needsRender = true;
          this.startRenderLoop();
      } else {
          console.warn("Invalid input for pointCameraAt:", X, Y, Z);
      }
    }


    getCameraPositionX() {
      return this.camera ? this.camera.position.x : 0;
    }

    getCameraPositionY() {
      return this.camera ? this.camera.position.y : 0;
    }

    getCameraPositionZ() {
      return this.camera ? this.camera.position.z : 0;
    }

    // Return rotation in degrees based on internal state for consistency with pointer look
    getCameraRotationPitch() {
      return this.camera ? THREE.MathUtils.radToDeg(this._pitch) : 0;
    }

    getCameraRotationYaw() {
      return this.camera ? THREE.MathUtils.radToDeg(this._yaw) : 0;
    }

    // Roll (Z rotation) is generally kept at 0 for FPS-style controls
    getCameraRotationRoll() {
      return this.camera ? THREE.MathUtils.radToDeg(this.camera.rotation.z) : 0;
    }


    setPointerSensitivity({ X, Y }) {
      const sensX = Number(X);
      const sensY = Number(Y);
      // Set sensitivity, ensuring it's a positive value
      this._sensitivityX = (!isNaN(sensX) && sensX > 0) ? sensX : 0.002;
      this._sensitivityY = (!isNaN(sensY) && sensY > 0) ? sensY : 0.002;
    }

    createObject({ SHAPE, NAME, SIZE, COLOR }) {
      if (!this.scene || typeof THREE === 'undefined') {
        console.warn("Scene or THREE not ready, cannot create object.");
        return;
      }
      const objectName = String(NAME).trim();
      if (objectName === '') {
          console.warn("Object name cannot be empty.");
          return;
      }
      if (this.sceneObjects.has(objectName)) {
          console.warn(`Object named "${objectName}" already exists.`);
          return; // Don't overwrite existing objects
      }
      const size = Number(SIZE);
      if (isNaN(size) || size <= 0) {
          console.warn(`Invalid size "${SIZE}" for object "${objectName}". Size must be a positive number.`);
          return;
      }

      let geometry = null;
      let material = null;

      try {
        // Create geometry based on shape
        switch (String(SHAPE).toLowerCase()) {
          case 'sphere':
            geometry = new THREE.SphereGeometry(size / 2, 32, 16); // Radius is size/2
            break;
          case 'cylinder':
            geometry = new THREE.CylinderGeometry(size / 2, size / 2, size, 32); // Radius, height
            break;
          case 'cone':
            geometry = new THREE.ConeGeometry(size / 2, size, 32); // Radius, height
            break;
          case 'plane':
            geometry = new THREE.PlaneGeometry(size, size); // Width, height
            break;
          case 'cube':
          default: // Default to cube if shape is unknown or 'cube'
            geometry = new THREE.BoxGeometry(size, size, size); // Width, height, depth
            break;
        }

        // Create a standard material
        material = new THREE.MeshStandardMaterial({
          color: COLOR, // Use the provided color string/hex
          roughness: SHAPE === 'plane' ? 0.8 : 0.6, // Make planes less shiny
          metalness: SHAPE === 'plane' ? 0.1 : 0.3, // Low metalness
          side: SHAPE === 'plane' ? THREE.DoubleSide : THREE.FrontSide // Render both sides for planes
        });

        // Create the mesh and add it to the scene
        const mesh = new THREE.Mesh(geometry, material);
        mesh.name = objectName; // Assign the name for later retrieval
        this.scene.add(mesh);
        this.sceneObjects.set(objectName, mesh); // Store reference in our map
        this._needsRender = true;
        this.startRenderLoop();
      } catch (e) {
        console.error(`Error creating object "${objectName}":`, e);
        // Clean up geometry/material if created before error
        if (geometry && geometry.dispose) geometry.dispose();
        if (material && material.dispose) material.dispose();
      }
    }

    setObjectPosition({ NAME, X, Y, Z }) {
      const obj = this.sceneObjects.get(NAME);
      if (!obj || typeof THREE === 'undefined') {
        // console.warn(`Object "${NAME}" not found for setObjectPosition.`);
        return;
      }
      const posX = Number(X);
      const posY = Number(Y);
      const posZ = Number(Z);
      if (!isNaN(posX) && !isNaN(posY) && !isNaN(posZ)) {
          obj.position.set(posX, posY, posZ);
          this._needsRender = true;
          this.startRenderLoop();
      } else {
          console.warn(`Invalid position input for object "${NAME}":`, X, Y, Z);
      }
    }

    changeObjectPosition({ NAME, X, Y, Z }) {
        const obj = this.sceneObjects.get(NAME);
        if (!obj || typeof THREE === 'undefined') {
          // console.warn(`Object "${NAME}" not found for changeObjectPosition.`);
          return;
        }
        const dX = Number(X);
        const dY = Number(Y);
        const dZ = Number(Z);
        if (!isNaN(dX) && !isNaN(dY) && !isNaN(dZ)) {
            obj.position.x += dX;
            obj.position.y += dY;
            obj.position.z += dZ;
            this._needsRender = true;
            this.startRenderLoop();
        } else {
            console.warn(`Invalid position change input for object "${NAME}":`, X, Y, Z);
        }
    }

    changeObjectRotation({ NAME, X, Y, Z }) {
      const obj = this.sceneObjects.get(NAME);
      if (!obj || typeof THREE === 'undefined') {
        // console.warn(`Object "${NAME}" not found for changeObjectRotation.`);
        return;
      }
      // Convert degrees to radians for internal use
      const deltaX = THREE.MathUtils.degToRad(Number(X));
      const deltaY = THREE.MathUtils.degToRad(Number(Y));
      const deltaZ = THREE.MathUtils.degToRad(Number(Z));

      if (!isNaN(deltaX) && !isNaN(deltaY) && !isNaN(deltaZ)) {
          // Add to existing rotation values
          obj.rotation.x += deltaX;
          obj.rotation.y += deltaY;
          obj.rotation.z += deltaZ;
          this._needsRender = true;
          this.startRenderLoop();
      } else {
          console.warn(`Invalid rotation change input for object "${NAME}":`, X, Y, Z);
      }
    }

    setObjectRotation({ NAME, X, Y, Z }) {
      const obj = this.sceneObjects.get(NAME);
      if (!obj || typeof THREE === 'undefined') {
        // console.warn(`Object "${NAME}" not found for setObjectRotation.`);
        return;
      }
      // Convert degrees to radians
      const rotationX = THREE.MathUtils.degToRad(Number(X));
      const rotationY = THREE.MathUtils.degToRad(Number(Y));
      const rotationZ = THREE.MathUtils.degToRad(Number(Z));

      if (!isNaN(rotationX) && !isNaN(rotationY) && !isNaN(rotationZ)) {
          // Set rotation, preserving the object's rotation order (usually 'XYZ')
          obj.rotation.set(rotationX, rotationY, rotationZ, obj.rotation.order);
          this._needsRender = true;
          this.startRenderLoop();
      } else {
          console.warn(`Invalid rotation set input for object "${NAME}":`, X, Y, Z);
      }
    }

    setObjectScale({ NAME, X, Y, Z }) {
      const obj = this.sceneObjects.get(NAME);
      if (!obj || typeof THREE === 'undefined') {
        // console.warn(`Object "${NAME}" not found for setObjectScale.`);
        return;
      }
      // Ensure scale factors are positive and non-zero
      const scaleX = Math.max(0.001, Number(X));
      const scaleY = Math.max(0.001, Number(Y));
      const scaleZ = Math.max(0.001, Number(Z));

      if (!isNaN(scaleX) && !isNaN(scaleY) && !isNaN(scaleZ)) {
          obj.scale.set(scaleX, scaleY, scaleZ);
          this._needsRender = true;
          this.startRenderLoop();
      } else {
          console.warn(`Invalid scale input for object "${NAME}":`, X, Y, Z);
      }
    }

    setObjectColor({ NAME, COLOR }) {
      const obj = this.sceneObjects.get(NAME);
      if (!obj || !obj.material || typeof THREE === 'undefined') {
        // console.warn(`Object "${NAME}" or its material not found for setObjectColor.`);
        return;
      }
      try {
        const color = new THREE.Color(COLOR); // Attempt to parse the color
        // Handle both single material and multi-material objects
        if (Array.isArray(obj.material)) {
          obj.material.forEach(material => {
            if (material.color) material.color.set(color);
          });
        } else if (obj.material.color) {
          obj.material.color.set(color);
        }
        this._needsRender = true;
        this.startRenderLoop();
      } catch (e) {
        console.error(`Invalid color value "${COLOR}" for object "${NAME}":`, e);
      }
    }

    setObjectVisible({ NAME, VISIBLE_STATE }) {
      const obj = this.sceneObjects.get(NAME);
      if (!obj || typeof THREE === 'undefined') {
        // console.warn(`Object "${NAME}" not found for setObjectVisible.`);
        return;
      }
      // Set visibility based on the string input
      const isVisible = String(VISIBLE_STATE).toLowerCase() === 'visible';
      obj.visible = isVisible;
      this._needsRender = true;
      this.startRenderLoop();
    }

    removeObject({ NAME }) {
      const obj = this.sceneObjects.get(NAME);
      if (!obj || !this.scene || typeof THREE === 'undefined') {
        // console.warn(`Object "${NAME}" not found for removal.`);
        return;
      }

      // Dispose of associated geometry and material(s) to free GPU memory
      if (obj.geometry && obj.geometry.dispose) {
          obj.geometry.dispose();
      }
      if (obj.material) {
          if (Array.isArray(obj.material)) {
              obj.material.forEach(mat => {
                  if (mat.map && mat.map.dispose) mat.map.dispose(); // Dispose textures if any
                  if (mat.dispose) mat.dispose();
              });
          } else {
              if (obj.material.map && obj.material.map.dispose) obj.material.map.dispose();
              if (obj.material.dispose) obj.material.dispose();
          }
      }

      // Remove from scene and our map
      this.scene.remove(obj);
      this.sceneObjects.delete(NAME);
      this._needsRender = true;
      this.startRenderLoop();
    }

    getObjectPositionX({ NAME }) {
      const obj = this.sceneObjects.get(NAME);
      return obj ? obj.position.x : 0;
    }

    getObjectPositionY({ NAME }) {
      const obj = this.sceneObjects.get(NAME);
      return obj ? obj.position.y : 0;
    }

    getObjectPositionZ({ NAME }) {
      const obj = this.sceneObjects.get(NAME);
      return obj ? obj.position.z : 0;
    }

    // Return rotation in degrees
    getObjectRotationPitch({ NAME }) {
      const obj = this.sceneObjects.get(NAME);
      // Ensure THREE is available for MathUtils
      return (obj && typeof THREE !== 'undefined') ? THREE.MathUtils.radToDeg(obj.rotation.x) : 0;
    }

    getObjectRotationYaw({ NAME }) {
      const obj = this.sceneObjects.get(NAME);
      return (obj && typeof THREE !== 'undefined') ? THREE.MathUtils.radToDeg(obj.rotation.y) : 0;
    }

    getObjectRotationRoll({ NAME }) {
      const obj = this.sceneObjects.get(NAME);
      return (obj && typeof THREE !== 'undefined') ? THREE.MathUtils.radToDeg(obj.rotation.z) : 0;
    }
  } // End class Vector3D

  // Ensure Scratch and Scratch.vm exist before registering
  if (typeof Scratch !== 'undefined' && Scratch.vm && Scratch.vm.runtime) {
    Scratch.extensions.register(new Vector3D(Scratch.vm.runtime));
  } else {
    console.error("Scratch or Scratch.vm.runtime not found, Vector3D extension not registered.");
  }

})(Scratch);