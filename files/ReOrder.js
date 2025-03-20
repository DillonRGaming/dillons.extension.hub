(function (Scratch) {
    'use strict';

    class ReOrder {
        getInfo() {
            return {
                id: 'reorder',
                name: 'ReOrder',
                color1: '#374799',
                color2: '#2C3E75'
            };
        }

        constructor() {
            this.initialize();
            this.startExtensionWatcher();
        }

        initialize() {
            this.cleanup();
            this.injectDragAndDrop();
        }

        cleanup() {
            const menu = document.querySelector('.scratchCategoryMenu');
            if (menu) {
                menu.removeEventListener('mousedown', this.startDrag);
                document.removeEventListener('mousemove', this.onMouseMove);
                document.removeEventListener('mouseup', this.onMouseUp);
            }
        }

        startExtensionWatcher() {
            setInterval(() => {
                const menu = document.querySelector('.scratchCategoryMenu');
                if (!menu) return;

                const currentItems = menu.querySelectorAll('.scratchCategoryMenuItem').length;
                if (this.previousItemCount !== undefined && this.previousItemCount !== currentItems) {
                    this.initialize();
                }
                this.previousItemCount = currentItems;
            }, 1000);
        }

        injectDragAndDrop() {
            const interval = setInterval(() => {
                const menu = document.querySelector('.scratchCategoryMenu');
                if (!menu) return;

                const container = menu.querySelector('.scratchCategoryMenuRow') || menu;
                container.style.position = 'relative';
                clearInterval(interval);

                let draggedItem = null;
                let dragClone = null;
                let placeholder = null;
                let offsetY = 0;
                let isDragging = false;
                let initialMouseX = 0;
                let initialMouseY = 0;

                const getDragAfterElement = (container, y) => {
                    const draggableElements = [...container.querySelectorAll('.scratchCategoryMenuItem:not(.dragging)')];
                    return draggableElements.reduce((closest, child) => {
                        const box = child.getBoundingClientRect();
                        const offset = y - box.top - box.height / 2;
                        if (offset < 0 && offset > closest.offset) {
                            return { offset: offset, element: child };
                        } else {
                            return closest;
                        }
                    }, { offset: Number.NEGATIVE_INFINITY }).element;
                };

                const startDrag = (event) => {
                    const target = event.target.closest('.scratchCategoryMenuItem');
                    if (!target || target.classList.contains('dragging')) return;

                    draggedItem = target;
                    offsetY = event.clientY - draggedItem.getBoundingClientRect().top;
                    initialMouseX = event.clientX;
                    initialMouseY = event.clientY;

                    document.addEventListener('mousemove', onMouseMove);
                    document.addEventListener('mouseup', onMouseUp);
                };

                const onMouseMove = (event) => {
                    if (!draggedItem) return;

                    const deltaX = Math.abs(event.clientX - initialMouseX);
                    const deltaY = Math.abs(event.clientY - initialMouseY);
                    if (deltaX < 5 && deltaY < 5) return;

                    if (!isDragging) {
                        isDragging = true;
                        draggedItem.classList.add('dragging');

                        dragClone = draggedItem.cloneNode(true);
                        dragClone.style.position = 'absolute';
                        dragClone.style.width = `${draggedItem.offsetWidth}px`;
                        dragClone.style.height = `${draggedItem.offsetHeight}px`;
                        dragClone.style.zIndex = '1000';
                        dragClone.style.pointerEvents = 'none';
                        dragClone.style.opacity = '0.8';
                        dragClone.style.left = `${draggedItem.offsetLeft}px`;
                        dragClone.style.top = `${draggedItem.offsetTop}px`;
                        container.appendChild(dragClone);

                        placeholder = document.createElement('div');
                        placeholder.className = 'drag-placeholder';
                        placeholder.style.width = `${draggedItem.offsetWidth}px`;
                        placeholder.style.height = `${draggedItem.offsetHeight}px`;
                        placeholder.style.background = 'rgba(0,0,0,0.1)';
                        draggedItem.parentNode.insertBefore(placeholder, draggedItem);
                        draggedItem.style.display = 'none';
                    }

                    const containerRect = container.getBoundingClientRect();
                    const newY = event.clientY - containerRect.top - offsetY;
                    dragClone.style.top = `${newY}px`;

                    const afterElement = getDragAfterElement(container, event.clientY);
                    if (afterElement && afterElement !== placeholder.nextSibling) {
                        container.insertBefore(placeholder, afterElement);
                    } else if (!afterElement && container.lastChild !== placeholder) {
                        container.appendChild(placeholder);
                    }
                };

                const onMouseUp = () => {
                    if (!draggedItem) return;

                    if (isDragging) {
                        draggedItem.style.display = 'block';
                        draggedItem.classList.remove('dragging');
                        placeholder.parentNode.insertBefore(draggedItem, placeholder);
                    }

                    dragClone?.remove();
                    placeholder?.remove();
                    draggedItem = null;
                    dragClone = null;
                    placeholder = null;
                    isDragging = false;

                    document.removeEventListener('mousemove', onMouseMove);
                    document.removeEventListener('mouseup', onMouseUp);
                };

                menu.addEventListener('mousedown', startDrag);
            }, 500);
        }
    }

    Scratch.extensions.register(new ReOrder());
})(Scratch);