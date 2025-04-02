(function(Scratch) {
    'use strict';
  
    const Cast = Scratch.Cast;
  
    const svgIcon = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTMxIiBoZWlnaHQ9IjkzMSIgdmlld0JveD0iMCAwIDkzMSA5MzEiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjQ2NS41IiBjeT0iNDY1LjUiIHI9IjQ2NS41IiBmaWxsPSJibGFjayIvPgo8cGF0aCBkPSJNNzA0LjgyOSA0NjIuNDk4TDcwMS44MTcgNDc2LjU2M0w3MTAuODUyIDQ5OS42NzFMNzE3Ljg3OSA1MjcuODAxVjU2NS45NzhMNzEzLjg2MyA1OTkuMTMxTDcwNy44NCA2MjYuMjU3TDcwMS44MTcgNjM4LjMxM0w2OTAuNzc1IDY1MS4zNzNMNjgxLjc0MSA2NTYuMzk2TDY1Ny42NDkgNjU4LjQwNkw2NDYuNjA3IDY1NC4zODdMNjM1LjU2NSA2NTEuMzczTDYyMy41MiA2NDguMzU5TDYwNS40NTEgNjQ5LjM2NEw1OTguNDI0IDY1NC4zODdMNTk1LjQxMyA2NjYuNDQzVjY4MC41MDhMNTk5LjQyOCA2OTcuNTg3TDYwNS40NTEgNzE1LjY3MUw2MDQuNDQ3IDczMi43NUw2MDEuNDM2IDc0MS43OTJMNTkwLjM5NCA3NDQuODA2TDU4MS4zNTkgNzUxLjgzOEw1ODAuMzU1IDc1OS44NzZMNTcxLjMyMSA3NjcuOTEzTDU2Mi4yODcgNzc2Ljk1NUw1NDcuMjI5IDc3Mi45MzZMNTQzLjIxNCA3NjcuOTEzTDUzMi4xNzIgNzUzLjg0OEw1MzAuMTY1IDc1NS44NTdMNTI5LjE2MSA3NjMuODk0TDUyNS4xNDUgNzc1Ljk1TDUyMC4xMjYgNzg1Ljk5N0w1MTAuMDg4IDc5My4wMjlMNDk4LjA0MiA3OTQuMDM0TDQ4NyA3OTEuMDJMNDgyLjk4NSA3ODMuOTg3TDQ4MC45NzcgNzc2Ljk1NUw0NzMuOTUxIDc2Mi44OUw0NjkuOTM1IDc2Ny45MTNMNDY4LjkzMiA3NzcuOTU5TDQ2MC45MDEgNzg3LjAwMUw0NTIuODcxIDc5Mi4wMjVMNDQ1Ljg0NCA3OTMuMDI5TDQzNy44MTMgNzkyLjAyNUw0MzEuNzkgNzg4LjAwNkw0MjMuNzYgNzc5Ljk2OUw0MTkuNzQ1IDc2Ny45MTNMNDE4Ljc0MSA3NjMuODk0TDQxNi43MzMgNzU5Ljg3Nkw0MDUuNjkxIDc2OC45MThMMzk4LjY2NCA3NzYuOTU1TDM4Ni42MTkgNzc1Ljk1TDM4MS41OTkgNzcwLjkyN0wzNzEuNTYxIDc1OS44NzZMMzU3LjUwOCA3NDguODI1TDM0OC40NzMgNzM5Ljc4M0wzNDAuNDQzIDcyNy43MjdMMzQ2LjQ2NiA3MTIuNjU3TDM1NS41IDY4OS41NUwzNTguNTEyIDY3Ni40ODlMMzUwLjQ4MSA2NTguNDA2TDM0NS40NjIgNjUwLjM2OEwzMjYuMzg5IDY0Ni4zNUwzMTEuMzMyIDY0OC4zNTlMMjkyLjI2IDY1NS4zOTJIMjc4LjIwNkgyNjcuMTY0TDI1OS4xMzQgNjUwLjM2OEwyNDkuMDk1IDYzMy4yODlMMjQxLjA2NSA2MDguMTczTDIzNS4wNDIgNTgzLjA1N0wyMzMuMDM0IDU2MC45NTRWNTM1LjgzOEwyMzcuMDUgNTEyLjczMUwyNDIuMDY5IDQ5Ni42NTdMMjQ5LjA5NSA0ODEuNTg3TDI0NS4wOCA0NjAuNDg5TDIzMS4wMjcgNDIxLjMwOEwyMjQgMzgwLjExN1YzNDAuOTM1VjMwNC43NjhMMjMxLjAyNyAyNzguNjQ3TDI0NS4wOCAyMzkuNDY1TDI3Ni4xOTkgMjAwLjI4NEwzMjAuMzY3IDE3Mi4xNTRMMzc0LjU3MyAxNTAuMDUxTDQyOS43ODMgMTQyLjAxNEw0ODAuOTc3IDEzOUw1NDIuMjEgMTQxLjAwOUw1OTEuMzk3IDE1Ni4wNzlMNjM0LjU2MiAxNzUuMTY4TDY3MC42OTkgMjAyLjI5M0w2OTcuODAyIDIzNC40NDJMNzIwLjg5IDI3Ni42MzdMNzI1LjkwOSAzMjIuODUyVjM3Ny4xMDNMNzIwLjg5IDQwNy4yNDJMNzA5Ljg0OCA0NDYuNDI0TDcwNC44MjkgNDYyLjQ5OFoiIGZpbGw9IndoaXRlIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjExIi8+CjxwYXRoIGQ9Ik02NjYuMTQ4IDU1NC4yNTJMNjcxLjE2MSA1MzIuMTA1TDY3My4xNjYgNTI0LjA1MlY1MTUuOTk5TDY3MS4xNjEgNTAxLjkwNkw2NjAuMTMyIDQ4My43ODZMNjQ1LjA5MyA0NzQuNzI2TDYyMS4wMyA0NjcuNjc5TDU5MS45NTUgNDY1LjY2Nkg1NTguODY5TDUzMi44MDEgNDcxLjcwNkw1MTIuNzQ5IDQ4Mi43NzlMNTA1LjczMSA0OTguODg2TDUwNC43MjkgNTExLjk3Mkw1MDcuNzM2IDUyOS4wODVMNTE4Ljc2NSA1NDEuMTY1TDU0NC44MzMgNTYxLjI5OEw1NjkuODk4IDU3OC40MTFMNTk1Ljk2NSA1ODYuNDY0SDYyNy4wNDZMNjQ1LjA5MyA1NzcuNDA1TDY1NC4xMTYgNTcxLjM2NUw2NjYuMTQ4IDU1NC4yNTJaIiBmaWxsPSJibGFjayIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSIxMSIvPgo8cGF0aCBkPSJNMjgzLjc2MiA1NTQuMjUyTDI3OC43NDkgNTMyLjEwNUwyNzYuNzQzIDUyNC4wNTJWNTE1Ljk5OUwyNzguNzQ5IDUwMS45MDZMMjg5Ljc3NyA0ODMuNzg2TDMwNC44MTYgNDc0LjcyNkwzMjguODc5IDQ2Ny42NzlMMzU3Ljk1NCA0NjUuNjY2SDM5MS4wNEw0MTcuMTA4IDQ3MS43MDZMNDM3LjE2IDQ4Mi43NzlMNDQ0LjE3OCA0OTguODg2TDQ0NS4xODEgNTExLjk3Mkw0NDIuMTczIDUyOS4wODVMNDMxLjE0NCA1NDEuMTY1TDQwNS4wNzcgNTYxLjI5OEwzODAuMDExIDU3OC40MTFMMzUzLjk0NCA1ODYuNDY0SDMyMi44NjNMMzA0LjgxNiA1NzcuNDA1TDI5NS43OTMgNTcxLjM2NUwyODMuNzYyIDU1NC4yNTJaIiBmaWxsPSJibGFjayIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSIxMSIvPgo8cGF0aCBkPSJNNDgxLjI2NCA2ODAuNTE0TDQ3Ni4xNDggNjczLjU1OEw0NjYuMjc4IDY4NS43NDJMNDU5LjMzNSA2OTEuODYxTDQ0Ny4yNjMgNjkwLjAyMUw0MzkuMTYzIDY4NS4xMTRMNDM0LjAwNiA2NzUuMTQ2TDQzOC44MDEgNjU5LjAxN0w0NTEuMzkgNjI1LjcxM0w0NTkuMTk3IDYwOS41NDJDNDU5LjE5NyA2MDkuNTQyIDQ3Mi42NTYgNTg3LjMwNyA0NzcuNjc1IDU4Ny4yMzdDNDgyLjY5MyA1ODcuMTY4IDQ5MC43MjUgNjA0LjMwNCA0OTAuNzI1IDYwNC4zMDRMNDk4LjUwOSA2MjEuMDQ0TDUxMC45MyA2NDcuOTc3TDUxNi4xNDMgNjYxLjk1OUw1MTcuMzU2IDY3Ny4wMDFMNTE0LjQ4NCA2ODcuMDhMNTA0LjUzMSA2OTMuMjQyTDQ5OC41MDggNjkzLjMyNUw0ODkuNDQ3IDY5MS40NDNMNDgxLjI2NCA2ODAuNTE0WiIgZmlsbD0iYmxhY2siIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMTEiLz4KPC9zdmc+";
  
    class CountdownExtension {
      constructor(runtime) {
        this.runtime = runtime;
        this.storageKey = 'countdownTargetTimestamp';
        this.targetTimestamp = this._loadOrGenerateTargetTimestamp();
      }
  
      getInfo() {
        return {
          id: 'countdown',
          name: 'Countdown',
          menuIconURI: svgIcon,
          blockIconURI: svgIcon,
          color1: '#000000',
          color2: '#252525',
          blocks: [
            {
              opcode: 'getTimeLeftFormatted',
              blockType: Scratch.BlockType.REPORTER,
              blockShape: Scratch.BlockShape.LEAF,
              text: 'Time Left?',
              disableMonitor: true,
              filter: [Scratch.TargetType.SPRITE, Scratch.TargetType.STAGE],
            }
          ],
          menus: {}
        };
      }
  
      _loadOrGenerateTargetTimestamp() {
        let storedTimestamp = null;
        try {
          storedTimestamp = localStorage.getItem(this.storageKey);
        } catch (e) {
          return this._generateNewTargetTimestamp();
        }
  
        if (storedTimestamp) {
          const timestamp = parseInt(storedTimestamp, 10);
          if (!isNaN(timestamp) && timestamp > Date.now() - 3600000 ) {
             return timestamp;
          } else {
            localStorage.removeItem(this.storageKey);
            return this._generateAndSaveNewTimestamp();
          }
        } else {
          return this._generateAndSaveNewTimestamp();
        }
      }
  
      _generateAndSaveNewTimestamp() {
        const newTimestamp = this._generateNewTargetTimestamp();
        try {
          localStorage.setItem(this.storageKey, newTimestamp.toString());
        } catch (e) {
           console.error("Countdown: Could not save target time to localStorage.", e);
        }
        return newTimestamp;
      }
  
      _generateNewTargetTimestamp() {
        const now = Date.now();
        const minHours = 2;
        const maxYears = 60;
        const msPerHour = 3600000;
        const msPerDay = 86400000;
        const msPerYear = 31556952000;
        const minDurationMs = minHours * msPerHour;
        const maxDurationMs = maxYears * msPerYear;
        const randomDurationMs = Math.random() * (maxDurationMs - minDurationMs) + minDurationMs;
        const targetTimestamp = Math.floor(now + randomDurationMs);
        return targetTimestamp;
      }
  
      _formatDuration(msRemaining) {
        if (msRemaining <= 0) {
          if (msRemaining < -1000) {
               return "Time's up!";
          } else {
               return "0 seconds";
          }
        }
  
        let totalSeconds = Math.floor(msRemaining / 1000);
        const seconds = totalSeconds % 60;
        totalSeconds = Math.floor(totalSeconds / 60);
        const minutes = totalSeconds % 60;
        totalSeconds = Math.floor(totalSeconds / 60);
        const hours = totalSeconds % 24;
        totalSeconds = Math.floor(totalSeconds / 24);
        const daysPerYearApprox = 365.2425;
        const daysPerMonthApprox = daysPerYearApprox / 12;
        const years = Math.floor(totalSeconds / daysPerYearApprox);
        let remainingDaysAfterYears = totalSeconds % daysPerYearApprox;
        const months = Math.floor(remainingDaysAfterYears / daysPerMonthApprox);
        let remainingDaysAfterMonths = remainingDaysAfterYears % daysPerMonthApprox;
        const days = Math.floor(remainingDaysAfterMonths);
  
        const parts = [];
        if (years > 0) parts.push(`${years} year${years !== 1 ? 's' : ''}`);
        if (months > 0) parts.push(`${months} month${months !== 1 ? 's' : ''}`);
        if (days > 0) parts.push(`${days} day${days !== 1 ? 's' : ''}`);
        if (hours > 0) parts.push(`${hours} hour${hours !== 1 ? 's' : ''}`);
        if (minutes > 0) parts.push(`${minutes} minute${minutes !== 1 ? 's' : ''}`);
        if (seconds > 0 || parts.length === 0) {
          parts.push(`${seconds} second${seconds !== 1 ? 's' : ''}`);
        }
  
        if (parts.length === 0) {
          return "Less than a second!";
        }
  
        return parts.join(', ');
      }
  
      getTimeLeftFormatted() {
        const now = Date.now();
        const remainingMs = this.targetTimestamp - now;
        return this._formatDuration(remainingMs);
      }
    }
  
    Scratch.extensions.register(new CountdownExtension());
  
  })(Scratch);