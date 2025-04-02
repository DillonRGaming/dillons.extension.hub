(function (Scratch) {
    "use strict";
  
    const svgIcon = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTMxIiBoZWlnaHQ9IjkzMSIgdmlld0JveD0iMCAwIDkzMSA5MzEiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjQ2NS41IiBjeT0iNDY1LjUiIHI9IjQ2NS41IiBmaWxsPSIjNEE5MEUyIi8+CjxwYXRoIGQ9Ik00ODcuMzU4IDc5NS43NjVDNTA2LjY1IDc0OC4zNjMgNTM2LjM3NiA3NjIuNDg1IDUzNi4zNzYgNzYyLjQ4NUM1NjcuMzgxIDc3My43MjcgNTg3LjI3MSA3OTUuNzY1IDU4Ny4yNzEgNzk1Ljc2NUg0ODcuMzU4WiIgZmlsbD0id2hpdGUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTUzNC41NzggNzYxLjgxOUM1NjUuNTgzIDc3My4wNTggNTg3LjI3NCA3OTUuNzcgNTg3LjI3NCA3OTUuNzdINDg1LjQ4NCIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTUzNC41NzggNzYxLjgxOUM1NjUuNTgzIDc3My4wNTggNTg3LjI3NCA3OTUuNzcgNTg3LjI3NCA3OTUuNzdINDg1LjQ4NCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIwLjUiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIvPgo8cGF0aCBkPSJNNDU1LjMwOCA3OTUuNzdDNDc3LjUyOCA3NzMuMTI3IDUxMy44NTYgNzY4LjkwNiA1MTMuODU2IDc2OC45MDZDNTQ0Ljg2MSA3ODAuMTQ4IDU1NS4yMiA3OTUuNzcgNTU1LjIyIDc5NS43N0g0NTUuMzA4WiIgZmlsbD0id2hpdGUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTUxMy44NTQgNzY4LjkwNkM1NDQuODU5IDc4MC4xNDggNTU1LjIxOCA3OTUuNzcgNTU1LjIxOCA3OTUuNzdINDUzLjQyOSIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTUxMy44NTQgNzY4LjkwNkM1NDQuODU5IDc4MC4xNDggNTU1LjIxOCA3OTUuNzcgNTU1LjIxOCA3OTUuNzdINDUzLjQyOSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIwLjUiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIvPgo8cGF0aCBkPSJNNTIyLjMzOCAxNjEuNzY2QzU0Ny4xMSAxODkuMTYyIDUxOC4yODQgMjIyLjQ0OSA1MTguMjg0IDIyMi40NDlDNTE4LjI4NCAyMjIuNDQ5IDUwOC4xNTkgMjQyLjU5OSA1MjEuMDYyIDI0OC4zODhDNTIxLjIzOSAzNDQuNzk2IDUxNi41NTggNTQ0Ljg0NCA1MTYuNTU4IDU0OC4yMDVDNTE2LjU1OCA1NTMuMDM1IDUyNy4zNjggNzQ5Ljg3OSA1MjguNDE2IDc1My42NTVDNTMwLjE1NyA3NTkuOTExIDUzNi4zNzYgNzY1LjU4MSA1MzYuMzc2IDc2NS41ODFDNTI2LjYxOSA3NjQuMzcxIDUxOC44MSA3NTQuODYxIDUxOC44MSA3NTQuODYxQzUyMS4yMTQgNzYzLjMxMyA1MjkuNzcxIDc2OC45IDUyOS43NzEgNzY4LjlDNTIyLjQxNCA3NjguMDEyIDUxNS4wNTYgNzY4LjU3MyA1MTEuNzUyIDc2OC41OTZDNTA4Ljc1IDc2OC42MDYgNDcwLjMxOSA3NzguMjU0IDQ1NS4zMDUgNzk1Ljc2N0gzNjQuNjIzQzM2Mi44MjIgNzk1Ljc2NyAyODYuNTU3IDcxNS40NjIgMjg0LjE1NCA2MjAuNjYzQzI4MS43NSA1MjUuODYzIDMwNy42NjggNDM0LjUzNSAzMjcuMzkyIDM5Mi4xOEMzNTAuMjkgMzQyLjk5NiAzODguNTcgMjQ5LjY3NCAzOTEuMjcyIDIzOC41NzdDMzkzLjk3NSAyMjcuNDg1IDM5MS4zNzMgMTgyLjM2OSA0MDguNzE1IDE1OS45NUM0MjAuNzY0IDE0NC4zNzIgNDQ0LjM0NCAxMzYuODU4IDQ1OS45NiAxMzYuODU4QzQ3NS41NzIgMTM2Ljg1OCA1MDguNTgxIDE0Ni41NDkgNTIyLjMzOCAxNjEuNzY2WiIgZmlsbD0id2hpdGUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIvPgo8cGF0aCBkPSJNNTI1LjI1NCAyNTMuNjI0QzUyNS4yNTQgMjUzLjYyNCA1NDAuMzU0IDI3NC4xMTIgNTUxLjg0MSAyOTguNTNDNTc3LjA2NCAzNTQuMzggNTkzLjI3OCA0MzcuMjU2IDU4NC4yOTkgNTM2LjQzOUM1NzYuMDE5IDYyNy45MiA1NjguMjA3IDY4Ni42MjkgNTQxLjQ3NSA3MzMuMTlDNTM4LjM5NCA3MzguNTU4IDUzOC4wMTYgNzQ4LjUgNTM4LjAxNiA3NDguNUM1MzguNzAyIDc1Ny4xNTkgNTQ4LjM5IDc3MC42NzMgNTQ4LjM5IDc3MC42NzNDNDc3IDc3MS4xMzcgNDI0LjY3OCA2ODIuMjUzIDQzMC4wODMgNjU3LjQ5N0M0MzUuNDg4IDYzMi43NDMgNDg1LjMzNCAzOTMuMDI1IDQ4OC41NDEgMzM5Ljg5MkM0OTEuNzQ0IDI4Ni43NTUgNTI1LjI1NCAyNTMuNjI0IDUyNS4yNTQgMjUzLjYyNFoiIGZpbGw9IndoaXRlIiBzdHJva2U9IndoaXRlIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiLz4KPHBhdGggZD0iTTQ4OS43NjMgMzI0LjgzOUM0OTIuMTY3IDI1Ny43NzIgNTIxLjA2NCAyNDguMzg5IDUyMS4wNjQgMjQ4LjM4OUw1MzMuMDMzIDI2NC41NTRDNTEwLjMwMiAyNjcuNDk5IDQ4OS43MzUgMzI1LjY1NCA0ODkuNzYzIDMyNC44MzlaIiBmaWxsPSJ3aGl0ZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNTI4LjQyIDc1My42NTVDNTI5Ljc3MSA3NjAuMDA2IDUzNi4zNzUgNzY1LjU4MSA1MzYuMzc1IDc2NS41ODFDNTI2LjYxOCA3NjQuMzcxIDUxOC44MSA3NTQuODYxIDUxOC44MSA3NTQuODYxQzUyMS4yMTMgNzYzLjMxMyA1MjkuNzcxIDc2OC45IDUyOS43NzEgNzY4LjlDNTIyLjQxMyA3NjguMDEyIDUxNS4wNTUgNzY4LjU3MyA1MTEuNzU1IDc2OC41OTZDNTA4Ljc1MyA3NjguNjA2IDQ3MC4zMTggNzc4LjI1NCA0NTUuMzA1IDc5NS43NjdIMzY0LjYyNkMzNjIuODI1IDc5NS43NjcgMjg2LjU1NyA3MTUuNDYyIDI4NC4xNTMgNjIwLjY2M0MyODEuNzU0IDUyNS44NjMgMzA3LjY3MiA0MzQuNTM1IDMyNy4zOTEgMzkyLjE4QzM1MC4yOTQgMzQyLjk5NiAzODguNTcgMjQ5LjY3NCAzOTEuMjcyIDIzOC41NzdDMzkzLjk3NCAyMjcuNDg1IDM5MS4zNzYgMTgyLjM2OSA0MDguNzE1IDE1OS45NUM0MjAuNzY4IDE0NC4zNzIgNDQ0LjM0NyAxMzYuODU4IDQ1OS45NTkgMTM2Ljg1OEM0NzUuNTczIDEzNi44NTggNTA5LjEyOCAxNDYuMDY4IDUyMi4zNDIgMTYxLjc2NiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTUyOC40MiA3NTMuNjU1QzUyOS43NzEgNzYwLjAwNiA1MzYuMzc1IDc2NS41ODEgNTM2LjM3NSA3NjUuNTgxQzUyNi42MTggNzY0LjM3MSA1MTguODEgNzU0Ljg2MSA1MTguODEgNzU0Ljg2MUM1MjEuMjEzIDc2My4zMTMgNTI5Ljc3MSA3NjguOSA1MjkuNzcxIDc2OC45QzUyMi40MTMgNzY4LjAxMiA1MTUuMDU1IDc2OC41NzMgNTExLjc1NSA3NjguNTk2QzUwOC43NTMgNzY4LjYwNiA0NzAuMzE4IDc3OC4yNTQgNDU1LjMwNSA3OTUuNzY3SDM2NC42MjZDMzYyLjgyNSA3OTUuNzY3IDI4Ni41NTcgNzE1LjQ2MiAyODQuMTUzIDYyMC42NjNDMjgxLjc1NCA1MjUuODYzIDMwNy42NzIgNDM0LjUzNSAzMjcuMzkxIDM5Mi4xOEMzNTAuMjk0IDM0Mi45OTYgMzg4LjU3IDI0OS42NzQgMzkxLjI3MiAyMzguNTc3QzM5My45NzQgMjI3LjQ4NSAzOTEuMzc2IDE4Mi4zNjkgNDA4LjcxNSAxNTkuOTVDNDIwLjc2OCAxNDQuMzcyIDQ0NC4zNDcgMTM2Ljg1OCA0NTkuOTU5IDEzNi44NThDNDc1LjU3MyAxMzYuODU4IDUwOS4xMjggMTQ2LjA2OCA1MjIuMzQyIDE2MS43NjYiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiLz4KPHBhdGggZD0iTTQ5Ni4yMTYgMjE5LjI4MUM0OTUuNTEgMjE5LjM4MyA1MjYuNzM4IDIwMS43OTQgNTI5LjA5NSAxODcuNTgxQzUzMC44OTYgMTc2LjcxMyA1MTkuMTg2IDE2NC43MSA1MjIuMzM5IDE2MS43NjhDNTI0LjQ0IDE1OS44MDUgNTI5LjEzNSAxNzAuMjUzIDUzOC4zMyAxNzQuOTAxQzU0OC4xNyAxNzkuODc5IDU2MS45NzQgMTg3LjEyOCA1ODQuNzE3IDE5MC4yOThDNjA3LjQ2NCAxOTMuNDY4IDYyNy4wNTggMTk5LjU4NCA2MzUuMzg5IDIwOC40MTNDNjQzLjcyMyAyMTcuMjQ1IDY0OCAyMjYuOTggNjQ4IDIyNi45OEM2NDggMjI2Ljk4IDYzNy40MTcgMjEwLjQ0OSA1NzQuMzU4IDIxNi43OTJDNTI1Ljk0MiAyMTkuMjgxIDUyMi4yNjMgMjI2LjYwMyA1MTUuMDU3IDIzMS4yMDhDNTA3Ljg1MSAyMzUuODA4IDUxNi40ODQgMjE2LjM0IDQ5Ni4yMTYgMjE5LjI4MVoiIGZpbGw9IndoaXRlIiBzdHJva2U9IndoaXRlIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiLz4KPHBhdGggZD0iTTUxMi40MyAyMTcuNjkzQzUxMi40MyAyMTcuNjkzIDUxNC40NDQgMjE2Ljk5MSA1MTguMDIyIDIxNi4wNTZDNTE5LjgyIDIxNS42MTEgNTIyLjAwMyAyMTUuMDcxIDUyNC41MDggMjE0LjQ0OEM1MjUuNzY1IDIxNC4xNTQgNTI3LjEwNSAyMTMuODQyIDUyOC41MTQgMjEzLjUxM0M1MjkuOTMgMjEzLjIwNSA1MzEuNDUxIDIxMy4xMTggNTMzLjAxNSAyMTIuODY0QzU0NS41NzIgMjExLjE1NCA1NjIuNDAyIDIwOS4zNTggNTc5LjMzIDIwOS4wNzhDNTg3Ljc5NCAyMDguOTMgNTk2LjI3MiAyMDkuMTQ3IDYwNC4xOTkgMjA5Ljg2MUM2MDguMTY2IDIxMC4yMTYgNjExLjk4NSAyMTAuNzM0IDYxNS41OTYgMjExLjMxQzYxOS4yMDIgMjExLjk1MSA2MjIuNTkzIDIxMi42OTQgNjI1LjY5MiAyMTMuNTI4QzYyNy4yMTYgMjE0LjAzNSA2MjguNzQgMjE0LjMyNCA2MzAuMDk5IDIxNC44OTdDNjMxLjQzMiAyMTUuNTEzIDYzMi43IDIxNi4wOTkgNjMzLjg4OSAyMTYuNjQ2QzYzNi4yMDYgMjE3LjkgNjM4LjE5OCAyMTguOTgzIDYzOS43MTkgMjIwLjFDNjQxLjMwOCAyMjEuMDg4IDY0Mi4zNzEgMjIyLjEyNSA2NDMuMTMxIDIyMi43NjJDNjQzLjg4MSAyMjMuNDE1IDY0NC4yODQgMjIzLjc1OCA2NDQuMjg0IDIyMy43NThDNjQ0LjI4NCAyMjMuNzU4IDY0My44MjcgMjIzLjQ5IDY0Mi45NjkgMjIyLjk4N0M2NDIuMTE1IDIyMi40ODMgNjQwLjg5NyAyMjEuNzE1IDYzOS4yMTUgMjIwLjk4QzYzNy41OTcgMjIwLjEzMiA2MzUuNDk2IDIxOS4zODIgNjMzLjEyMiAyMTguNTM0QzYzMC42ODYgMjE3LjgxMyA2MjcuOTQ0IDIxNy4wOTYgNjI0Ljk3OCAyMTYuMTQ3QzYyMS45NzMgMjE1LjMzOSA2MTguNjczIDIxNC42MTQgNjE1LjE0NSAyMTMuOTkxQzYxMS42MDcgMjEzLjQyNiA2MDcuODYgMjEyLjkxOSA2MDMuOTU4IDIxMi41NjhDNTk2LjE0OSAyMTEuODY0IDU4Ny43NjUgMjExLjY1MSA1NzkuMzggMjExLjc5NkM1NjIuNiAyMTIuMDcxIDU0NS44NiAyMTMuODU3IDUzMy4zODIgMjE1LjU2QzUzMC4yOCAyMTYuMTEgNTI3LjM5NCAyMTYuMzMxIDUyNC44MjggMjE2LjQ5NEM1MjIuMjcgMjE2LjcxOSA1MjAuMDQgMjE2LjkxOSA1MTguMjAyIDIxNy4wODJDNTE2LjM2NCAyMTcuMjU5IDUxNC45MiAyMTcuNCA1MTMuOTMyIDIxNy40OThDNTEyLjk2MyAyMTcuNTkzIDUxMi40MyAyMTcuNjkzIDUxMi40MyAyMTcuNjkzWiIgZmlsbD0id2hpdGUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTQ5Ni4yMTYgMjE5LjI4MUM0OTUuNTEgMjE5LjM4MyA1MjYuNzM4IDIwMS43OTQgNTI5LjA5NSAxODcuNTgxQzUzMC44OTYgMTc2LjcxMyA1MTkuMTg2IDE2NC43MSA1MjIuMzM5IDE2MS43NjhDNTI0LjQ0IDE1OS44MDUgNTI5LjEzNSAxNzAuMjUzIDUzOC4zMyAxNzQuOTAxQzU0OC4xNyAxNzkuODc5IDU2MS45NzQgMTg3LjEyOCA1ODQuNzE3IDE5MC4yOThDNjA3LjQ2NCAxOTMuNDY4IDYyNy4wNTggMTk5LjU4NCA2MzUuMzg5IDIwOC40MTNDNjQzLjcyMyAyMTcuMjQ1IDY0OCAyMjYuOTggNjQ4IDIyNi45OEM2NDggMjI2Ljk4IDYzNy40MTcgMjEwLjQ0OSA1NzQuMzU4IDIxNi43OTJDNTI1Ljk0MiAyMTkuMjgxIDUyMi4yNjMgMjI2LjYwMyA1MTUuMDU3IDIzMS4yMDhDNTA3Ljg1MSAyMzUuODA4IDUxNi40ODQgMjE2LjM0IDQ5Ni4yMTYgMjE5LjI4MVoiIGZpbGw9IndoaXRlIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIi8+CjxwYXRoIGQ9Ik00NzEuNDQ0IDE3Ny45ODZDNDcyLjAwNiAxNzMuMjMyIDQ3OC44NzcgMTY4LjkyOSA0ODkuNDYgMTY5LjM4MUM1MDMuNTM0IDE3MC41MTIgNTA1LjcyNCAxNzcuNjQ1IDUwNS42NzQgMTgwLjQ3NUM1MDUuNjEzIDE4My45MDIgNTA0LjY3NiAxODguODU0IDQ4OC41NzMgMTg4Ljg1NEM0NzQuODIgMTg4Ljg1NCA0NzAuOTM5IDE4Mi4yNTcgNDcxLjQ0NCAxNzcuOTg2WiIgZmlsbD0id2hpdGUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIvPgo8cGF0aCBkPSJNNDkxLjM3MiAxODguNzA3QzQ5MS4zNzIgMTg4LjcwNyA0ODUuODU3IDE4NS4zMTIgNDg2Ljk4IDE3OC44NTZDNDg4LjEwNSAxNzIuNDIyIDQ5NC43MTIgMTcxLjAwMSA0OTcuMjAzIDE3MS4yM0M0OTkuNjkyIDE3MS40NTUgNTAxLjY5MyAxNzMuNTg4IDUwMS42OTMgMTczLjU4OEM1MDEuNjkzIDE3My41ODggNTA3LjAyNSAxNzcuNjEgNTA1LjY3NCAxODIuMDI2QzUwNC4zMjMgMTg2LjQ0MiA0OTcuNjQzIDE4OC40MSA0OTcuNjQzIDE4OC40MUM0OTcuNjQzIDE4OC40MSA0OTIuMjYyIDE4OS4xNTkgNDkxLjM3MiAxODguNzA3WiIgZmlsbD0id2hpdGUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTQ3MS40NDQgMTc4LjI5NUM0NzIuMDA2IDE3My41NDIgNDc4Ljg3NyAxNjkuMjM4IDQ4OS40NiAxNjkuNjkxQzUwMy41MzQgMTcwLjgyMiA1MDUuNzI0IDE3Ny45NTUgNTA1LjY3NCAxODAuNzg0QzUwNS42MTMgMTg0LjIxMiA1MDQuNjc2IDE4OS4xNjQgNDg4LjU3MyAxODkuMTY0QzQ3NC44MiAxODkuMTY0IDQ3MC45MzkgMTgyLjU2NyA0NzEuNDQ0IDE3OC4yOTVaIiBmaWxsPSJ3aGl0ZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIwLjUiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIvPgo8cGF0aCBkPSJNNDcxLjQwMiAzNzMuN0M0ODEuNDk1IDQxNS4zNjMgNDgxLjEyNyA1MDAuNSA0NjUuNTE0IDU3NC43NjlDNDQ5LjkwMiA2NDkuMDM4IDM3OC40MzYgNzI2LjkyOSAzNzMuMDMyIDcyMy4zMDZDMzY3LjYyNyA3MTkuNjg0IDM2OS40MjkgNzExLjgzNyAzNzAuNjI4IDY4OC4yODhDMzcxLjgzMiA2NjQuNzM5IDM2Mi4yMjIgNjM2LjM1NyAzNTUuMDE3IDYyMy4wNzZDMzQ3LjgxIDYwOS43OTUgMzUwLjgxMSA1NzkuNjAyIDM1MC44MTEgNTc5LjYwMkMzNTAuODExIDU3OS42MDIgMzc3LjczMSA0MjAuMjk3IDM4My4yOSAzOTkuNDA0QzM5MC40NDYgMzcyLjQ5MyA0MTAuMTg4IDM2Mi44MzEgNDEwLjE4OCAzNjIuODMxIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNNDcxLjQwMiAzNzMuN0M0ODEuNDk1IDQxNS4zNjMgNDgxLjEyNyA1MDAuNSA0NjUuNTE0IDU3NC43NjlDNDQ5LjkwMiA2NDkuMDM4IDM3OC40MzYgNzI2LjkyOSAzNzMuMDMyIDcyMy4zMDZDMzY3LjYyNyA3MTkuNjg0IDM2OS40MjkgNzExLjgzNyAzNzAuNjI4IDY4OC4yODhDMzcxLjgzMiA2NjQuNzM5IDM2Mi4yMjIgNjM2LjM1NyAzNTUuMDE3IDYyMy4wNzZDMzQ3LjgxIDYwOS43OTUgMzUwLjgxMSA1NzkuNjAyIDM1MC44MTEgNTc5LjYwMkMzNTAuODExIDU3OS42MDIgMzc3LjczMSA0MjAuMjk3IDM4My4yOSAzOTkuNDA0QzM5MC40NDYgMzcyLjQ5MyA0MTAuMTg4IDM2Mi44MzEgNDEwLjE4OCAzNjIuODMxIiBzdHJva2U9IndoaXRlIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00NzEuNDAyIDM3My43QzQ4MS40OTUgNDE1LjM2MyA0ODEuMTI3IDUwMC41IDQ2NS41MTQgNTc0Ljc2OUM0NDkuOTAyIDY0OS4wMzggMzc4LjQzNiA3MjYuOTI5IDM3My4wMzIgNzIzLjMwNkMzNjcuNjI3IDcxOS42ODQgMzY5LjQyOSA3MTEuODM3IDM3MC42MjggNjg4LjI4OEMzNzEuODMyIDY2NC43MzkgMzYyLjIyMiA2MzYuMzU3IDM1NS4wMTcgNjIzLjA3NkMzNDcuODEgNjA5Ljc5NSAzNTAuODExIDU3OS42MDIgMzUwLjgxMSA1NzkuNjAyQzM1MC44MTEgNTc5LjYwMiAzNzcuNzMxIDQyMC4yOTcgMzgzLjI5IDM5OS40MDRDMzkwLjQ0NiAzNzIuNDkzIDQxMC4xODggMzYyLjgzMSA0MTAuMTg4IDM2Mi44MzEiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik00NzEuNDAyIDM3My43QzQ4MS40OTUgNDE1LjM2MyA0ODEuMTI3IDUwMC41IDQ2NS41MTQgNTc0Ljc2OUM0NDkuOTAyIDY0OS4wMzggMzc4LjQzNiA3MjYuOTI5IDM3My4wMzIgNzIzLjMwNkMzNjcuNjI3IDcxOS42ODQgMzY5LjQyOSA3MTEuODM3IDM3MC42MjggNjg4LjI4OEMzNzEuODMyIDY2NC43MzkgMzYyLjIyMiA2MzYuMzU3IDM1NS4wMTcgNjIzLjA3NkMzNDcuODEgNjA5Ljc5NSAzNTAuODExIDU3OS42MDIgMzUwLjgxMSA1NzkuNjAyQzM1MC44MTEgNTc5LjYwMiAzNzcuNzMxIDQyMC4yOTcgMzgzLjI5IDM5OS40MDRDMzkwLjQ0NiAzNzIuNDkzIDQxMC4xODggMzYyLjgzMSA0MTAuMTg4IDM2Mi44MzEiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiLz4KPC9zdmc+Cg==";
  
    function generatePenguinId() {
      const WORDS = ["Penguin"];
      const MAX_NUM = 999;
      return `${WORDS[Math.floor(Math.random() * WORDS.length)]}-${String(
        Math.floor(Math.random() * MAX_NUM)
      ).padStart(3, "0")}`;
    }
  
    class PenguinPeer {
      constructor() {
        this.penguin = null;
        this.penguinId = null;
        this.lastReceivedData = null;
        this.allReceivedData = [];
        this.connections = {};
        this.isPenguinStarted = false;
  
        this._loadPenguinJS(() => {
          if (typeof Peer === "undefined") {
            return;
          }
  
          this.penguin = new Peer(generatePenguinId(), {
            host: "0.peerjs.com",
            port: 443,
            secure: true,
            debug: 0,
          });
  
          this.penguin.on("open", (id) => {
            this.penguinId = id;
            this.isPenguinStarted = true;
          });
  
          this.penguin.on("connection", (conn) => {
            this.setupConnectionEvents(conn);
          });
  
          this.penguin.on("disconnected", () => {
            this.isPenguinStarted = false;
            this.penguinId = null;
            if (!this.penguin.destroyed) this.penguin.reconnect();
          });
  
          this.penguin.on("close", () => {
            this.isPenguinStarted = false;
            this.penguinId = null;
            this.connections = {};
          });
  
          this.penguin.on("error", (err) => {
            this.isPenguinStarted = false;
            this.penguinId = null;
            this.connections = {};
          });
        });
      }
  
      _loadPenguinJS(callback) {
        if (typeof Peer !== "undefined") {
          callback();
          return;
        }
  
        const script = document.createElement("script");
        script.src = "https://unpkg.com/peerjs@1.5.2/dist/peerjs.min.js";
        script.onload = callback;
        script.onerror = () => {
          alert("Failed to load PenguinJS. Check connection.");
          callback();
        };
        document.head.appendChild(script);
      }
  
      getInfo() {
        return {
          id: "penguinpeer",
          name: "PenguinPeer",
          menuIconURI: svgIcon,
          blockIconURI: svgIcon,
          color1: "#4a90e2",
          color2: "#357ebd",
          color3: "#2069a8",
          blocks: [
            {
              opcode: "getPenguinId",
              blockType: Scratch.BlockType.REPORTER,
              blockShape: Scratch.BlockShape.LEAF,
              text: "My Penguin ID",
            },
            '---',
            {
              opcode: "connectToPenguin",
              blockType: Scratch.BlockType.COMMAND,
              text: "Connect to Penguin ID: [PENGUINID]",
              arguments: {
                PENGUINID: { type: Scratch.ArgumentType.STRING, defaultValue: "" },
              },
            },
            {
              opcode: "isPenguinConnected",
              blockType: Scratch.BlockType.BOOLEAN,
              text: "Is connected to Penguin [PENGUINID]?",
              arguments: {
                PENGUINID: { type: Scratch.ArgumentType.STRING, defaultValue: "" },
              },
            },
            '---',
            {
              opcode: "sendPenguinData",
              blockType: Scratch.BlockType.COMMAND,
              text: "Send [DATA] to Penguin [PENGUINID]",
              arguments: {
                DATA: { type: Scratch.ArgumentType.STRING, defaultValue: "Hello!" },
                PENGUINID: { type: Scratch.ArgumentType.STRING, defaultValue: "" },
              },
            },
            {
              opcode: "broadcastPenguinData",
              blockType: Scratch.BlockType.COMMAND,
              text: "Broadcast [DATA] to all Penguins",
              arguments: {
                DATA: { type: Scratch.ArgumentType.STRING, defaultValue: "Hello, Penguins!" },
              },
            },
            '---',
            {
              opcode: "whenPenguinDataReceived",
              blockType: Scratch.BlockType.HAT,
              text: "When Penguin data received",
            },
            {
              opcode: "getLastPenguinData",
              blockType: Scratch.BlockType.REPORTER,
              blockShape: Scratch.BlockShape.LEAF,
              text: "Last received Penguin data",
            },
            {
              opcode: "getAllPenguinData",
              blockType: Scratch.BlockType.REPORTER,
              blockShape: Scratch.BlockShape.LEAF,
              text: "All received Penguin data (JSON)",
            },
            {
              opcode: "clearPenguinData",
              blockType: Scratch.BlockType.COMMAND,
              text: "Clear received Penguin data",
            },
            '---',
            {
              opcode: "disconnectPenguin",
              blockType: Scratch.BlockType.COMMAND,
              text: "Disconnect from Penguin [PENGUINID]",
              arguments: {
                PENGUINID: { type: Scratch.ArgumentType.STRING, defaultValue: "" },
              },
            },
            {
              opcode: "disconnectAllPenguins",
              blockType: Scratch.BlockType.COMMAND,
              text: "Disconnect from all Penguins",
            },
            '---',
            {
              opcode: "connectedPenguinCount",
              blockType: Scratch.BlockType.REPORTER,
              blockShape: Scratch.BlockShape.LEAF,
              text: "Number of connected Penguins",
            },
            {
              opcode: "listConnectedPenguins",
              blockType: Scratch.BlockType.REPORTER,
              blockShape: Scratch.BlockShape.LEAF,
              text: "List of connected Penguins (JSON)",
            },
          ],
        };
      }
  
      getPenguinId() {
        return this.penguinId || "";
      }
  
      connectToPenguin(args) {
        if (!this.penguin || !this.isPenguinStarted) {
          alert("Penguin system not initialized yet. Try again.");
          return;
        }
  
        const penguinIdToConnect = args.PENGUINID;
        if (!penguinIdToConnect) {
          alert("Please enter a Penguin ID to connect to.");
          return;
        }
  
        if (this.connections[penguinIdToConnect]) {
          return;
        }
  
        const conn = this.penguin.connect(penguinIdToConnect, { reliable: true });
  
        conn.on("open", () => {
          this.setupConnectionEvents(conn);
          conn.send("Connected to Penguin " + this.penguinId);
        });
  
        conn.on("error", (err) => {
          alert(`Connection failed: ${err}`);
        });
      }
  
      sendPenguinData(args) {
        const penguinIdToSend = args.PENGUINID;
        if (!this.connections[penguinIdToSend]) return;
  
        this.connections[penguinIdToSend].send(args.DATA);
      }
  
      whenPenguinDataReceived() {
        return true;
      }
  
      disconnectPenguin(args) {
        const penguinId = args.PENGUINID;
        if (this.connections[penguinId]) {
          this.connections[penguinId].close();
          delete this.connections[penguinId];
        }
      }
  
      disconnectAllPenguins() {
        Object.keys(this.connections).forEach((penguinId) => {
          this.connections[penguinId].close();
          delete this.connections[penguinId];
        });
      }
  
      broadcastPenguinData(args) {
        Object.values(this.connections).forEach((conn) => {
          conn.send(args.DATA);
        });
      }
  
      setupConnectionEvents(conn) {
        this.connections[conn.peer] = conn;
  
        conn.on("data", (data) => {
          if (data === `Connected to Penguin ${this.penguinId}`) {
            return;
          }
          this.lastReceivedData = String(data);
          this.allReceivedData.push({ peer: conn.peer, data: String(data) });
          Scratch.vm.runtime.startHats("pangpeer_whenPenguinDataReceived");
        });
  
        conn.on("close", () => {
          delete this.connections[conn.peer];
        });
      }
  
      getLastPenguinData() {
        return this.lastReceivedData || "";
      }
  
      getAllPenguinData() {
        return JSON.stringify(this.allReceivedData);
      }
  
      clearPenguinData() {
        this.allReceivedData = [];
      }
  
      isPenguinConnected(args) {
        return !!this.connections[args.PENGUINID];
      }
  
      connectedPenguinCount() {
        return Object.keys(this.connections).length;
      }
  
      listConnectedPenguins() {
        return JSON.stringify(Object.keys(this.connections));
      }
    }
  
    Scratch.extensions.register(new PenguinPeer());
  })(Scratch);