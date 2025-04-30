(function(Scratch) {
    'use strict';

    if (!Scratch.extensions.unsandboxed) {
        throw new Error("File extension must be run unsandboxed");
    }

    const vm = Scratch.vm;
    const runtime = vm.runtime;
    const Cast = Scratch.Cast;
    const ArgumentType = Scratch.ArgumentType;
    const BlockType = Scratch.BlockType;
    const BlockShape = Scratch.BlockShape;

    const menuIconURI = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTMxIiBoZWlnaHQ9IjkzMSIgdmlld0JveD0iMCAwIDkzMSA5MzEiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjQ2NS41IiBjeT0iNDY1LjUiIHI9IjQ2NS41IiBmaWxsPSIjRkNBMDNEIi8+CjxyZWN0IHg9IjE2NiIgeT0iMjgxLjQ5MiIgd2lkdGg9IjYwMCIgaGVpZ2h0PSI0MTQuMTciIHJ4PSI0NiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTE2NiAyODAuMzM4QzE2NiAyNTUuNDg1IDE4Ni4xNDcgMjM1LjMzOCAyMTEgMjM1LjMzOEgzNTZDMzY5LjU2NyAyMzUuMzM4IDM4Mi40MTEgMjQxLjQ1OSAzOTAuOTU1IDI1MS45OThMNDc0LjU1NyAzNTUuMTE2QzQ5OC40MDYgMzg0LjUzMiA0NzcuNDcxIDQyOC40NTUgNDM5LjYwMiA0MjguNDU1SDQyNy40ODVIMjExQzE4Ni4xNDcgNDI4LjQ1NSAxNjYgNDA4LjMwOCAxNjYgMzgzLjQ1NVYyODAuMzM4WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==';

    let lastOpenedFileInfo = {
        name: '', size: 0, type: '',
        content: null,
        readSuccess: false, isReading: false
    };
    let nextOpenFileAccept = '*/*';

    function _askOpenFileInternal(accept = '*/*', readAs = 'arraybuffer') {
        return new Promise((resolve, reject) => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = accept;
            input.style.display = 'none';

            input.onchange = (event) => {
                const file = event.target.files[0];
                document.body.removeChild(input);
                nextOpenFileAccept = '*/*';
                if (!file) return reject(new Error("No file selected."));

                lastOpenedFileInfo = { name: file.name, size: file.size, type: file.type, content: null, readSuccess: false, isReading: true };

                const reader = new FileReader();
                reader.onload = (e) => {
                    lastOpenedFileInfo.content = e.target.result;
                    lastOpenedFileInfo.readSuccess = true;
                    lastOpenedFileInfo.isReading = false;
                    resolve(file);
                };
                reader.onerror = (e) => {
                    // We no longer have a block to report the error, but we can still log it.
                    console.error(`Error reading file: ${reader.error}`);
                    lastOpenedFileInfo.readSuccess = false;
                    lastOpenedFileInfo.isReading = false;
                    reject(new Error(`Error reading file: ${reader.error}`));
                };

                if (readAs === 'text') reader.readAsText(file);
                else if (readAs === 'dataurl') reader.readAsDataURL(file);
                else reader.readAsArrayBuffer(file);
            };
            document.body.appendChild(input);
            input.click();
        });
    }

    function triggerDownload(blob, filename) {
        try {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none'; a.href = url; a.download = filename;
            document.body.appendChild(a); a.click(); document.body.removeChild(a);
            setTimeout(() => URL.revokeObjectURL(url), 100);
            return true;
        } catch (e) { console.error("Error triggering download:", e); return false; }
    }

    function tryDecodeBuffer(buffer) {
        if (!(buffer instanceof ArrayBuffer)) return null;
        try { return new TextDecoder('utf-8', { fatal: true }).decode(buffer); }
        catch (e) {
            try { return new TextDecoder('iso-8859-1').decode(buffer); }
            catch (e2) { console.warn("Could not decode file content as text (UTF-8 or Latin1)."); return null; }
        }
    }

    function formatFileSize(bytes) {
        if (bytes === 0 || !isFinite(bytes)) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.max(0, Math.floor(Math.log(Math.abs(bytes)) / Math.log(k)));
        const size = parseFloat((bytes / Math.pow(k, i)).toFixed(i === 0 ? 0 : 1));
        return `${size} ${sizes[i] || 'Bytes'}`;
    }

    class File {
        getInfo() {
            return {
                id: 'file',
                name: 'File',
                menuIconURI: menuIconURI,
                blockIconURI: menuIconURI,
                color1: '#FCA03D',
                color2: '#E99943',

                blocks: [
                    {
                        opcode: 'setOpenFileTypes',
                        blockType: BlockType.COMMAND,
                        text: 'Set accepted file types for next open to [TYPES]',
                        tooltip: 'Suggests file types for the next open dialog (e.g., "image/*, .png, .jpg"). Browser support varies.',
                        arguments: {
                            TYPES: { type: ArgumentType.STRING, defaultValue: 'text/*, .txt' }
                        }
                    },
                    {
                        opcode: 'askOpenFile',
                        blockType: BlockType.COMMAND,
                        text: 'Open file',
                        tooltip: 'Prompts user to select any file (uses last set file types). Use reporters to get content/info after.'
                    },
                    {
                        opcode: 'wasFileOpened',
                        blockType: BlockType.BOOLEAN,
                        blockShape: BlockShape.BOOLEAN,
                        text: 'File was opened successfully?',
                        tooltip: 'True if the last file open attempt succeeded and reading finished.',
                        disableMonitor: true
                    },
                    {
                        opcode: 'clearLastFileInfo',
                        blockType: BlockType.COMMAND,
                        text: 'Clear last opened file info',
                        tooltip: 'Resets the stored information about the last opened file.'
                    },
                    '---',
                    {
                        opcode: 'getLastOpenedTextContent',
                        blockType: BlockType.REPORTER,
                        blockShape: BlockShape.LEAF,
                        text: 'Last opened file text content',
                        tooltip: 'Attempts to return text content of the last opened file. Returns empty if not text or unreadable.',
                        disableMonitor: true
                    },
                    {
                        opcode: 'getLastOpenedFileName',
                        blockType: BlockType.REPORTER,
                        blockShape: BlockShape.LEAF,
                        text: 'Last opened file name',
                        disableMonitor: true
                    },
                    {
                        opcode: 'getLastOpenedFileSizeFormatted',
                        blockType: BlockType.REPORTER,
                        blockShape: BlockShape.LEAF,
                        text: 'Last opened file size',
                        tooltip: 'Returns the size of the last opened file, formatted (KB, MB, GB, etc.).',
                        disableMonitor: true
                    },
                    {
                        opcode: 'getLastOpenedFileType',
                        blockType: BlockType.REPORTER,
                        blockShape: BlockShape.LEAF,
                        text: 'Last opened file type (MIME)',
                        disableMonitor: true
                    },
                    '---',
                    {
                        opcode: 'downloadTextFile',
                        blockType: BlockType.COMMAND,
                        text: 'Download text [TEXT] as file [FILENAME]',
                        tooltip: 'Prompts the user to save the provided text to a file.',
                        arguments: {
                            TEXT: { type: ArgumentType.STRING, defaultValue: 'Hello World!' },
                            FILENAME: { type: ArgumentType.STRING, defaultValue: 'myFile.txt' }
                        }
                    }
                ],
                menus: {}
            };
        }

        setOpenFileTypes(args) {
            nextOpenFileAccept = Cast.toString(args.TYPES);
        }

        askOpenFile(args, util) {
            _askOpenFileInternal(nextOpenFileAccept, 'arraybuffer')
                .catch(err => console.warn("askOpenFile:", err.message));
        }

        wasFileOpened(args, util) {
            return !lastOpenedFileInfo.isReading && lastOpenedFileInfo.readSuccess;
        }

        clearLastFileInfo() {
            lastOpenedFileInfo = {
                name: '', size: 0, type: '',
                content: null, readSuccess: false, isReading: false
            };
            nextOpenFileAccept = '*/*';
        }

        getLastOpenedTextContent(args, util) {
            if (this.wasFileOpened()) {
                if (typeof lastOpenedFileInfo.content === 'string') return lastOpenedFileInfo.content;
                if (lastOpenedFileInfo.content instanceof ArrayBuffer) {
                    const decodedText = tryDecodeBuffer(lastOpenedFileInfo.content);
                    return decodedText !== null ? decodedText : '(Could not decode as text)';
                }
            }
            return '';
        }

        getLastOpenedFileName(args, util) { return lastOpenedFileInfo.name || ''; }

        getLastOpenedFileSizeFormatted(args, util) {
            return formatFileSize(lastOpenedFileInfo.size || 0);
        }

        getLastOpenedFileType(args, util) { return lastOpenedFileInfo.type || ''; }

        downloadTextFile(args, util) {
            const text = Cast.toString(args.TEXT);
            let filename = Cast.toString(args.FILENAME).trim();
            if (!filename) filename = 'download.txt';
            const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
            triggerDownload(blob, filename);
        }

    }

    Scratch.extensions.register(new File());
})(Scratch);