import { Extension } from "@tiptap/core";

import { NodeSelection, Plugin } from "@tiptap/pm/state";
// @ts-ignore
import { __serializeForClipboard, EditorView } from "@tiptap/pm/view";
export interface DragHandleOptions {
    /**
     * The width of the drag handle
     */
    dragHandleWidth: number;
  }
  function absoluteRect(node: Element) {
    const data = node.getBoundingClientRect();
  
    return {
      top: data.top,
      left: data.left,
      width: data.width,
    };
  }
  
  function nodeDOMAtCoords(coords: { x: number; y: number }) {
    return document
      .elementsFromPoint(coords.x, coords.y)
      .find(
        (elem: Element) =>
          elem.parentElement?.matches?.(".ProseMirror") ||
          elem.matches(
            [
              "li",
              "p:not(:first-child)",
              "pre",
              "blockquote",
              "h1, h2, h3, h4, h5, h6",
            ].join(", ")
          )
      );
  }
  
  function nodePosAtDOM(
    node: Element,
    view: EditorView,
    options: DragHandleOptions
  ) {
    const boundingRect = node.getBoundingClientRect();
  
    return view.posAtCoords({
      left: boundingRect.left + 50 + options.dragHandleWidth,
      top: boundingRect.top + 1,
    })?.inside;
  }
  
  function DragHandle(options: DragHandleOptions) {
    function handleDragStart(event: DragEvent, view: EditorView) {
      view.focus();
  
      if (!event.dataTransfer) return;
  
      const node = nodeDOMAtCoords({
        x: event.clientX + 50 + options.dragHandleWidth,
        y: event.clientY,
      });
  
      if (!(node instanceof Element)) return;
  
      const nodePos = nodePosAtDOM(node, view, options);
      if (nodePos == null || nodePos < 0) return;
  
      view.dispatch(
        view.state.tr.setSelection(NodeSelection.create(view.state.doc, nodePos))
      );
  
      const slice = view.state.selection.content();
      const { dom, text } = __serializeForClipboard(view, slice);
  
      event.dataTransfer.clearData();
      event.dataTransfer.setData("text/html", dom.innerHTML);
      event.dataTransfer.setData("text/plain", text);
      event.dataTransfer.effectAllowed = "copyMove";
  
      event.dataTransfer.setDragImage(node, 0, 0);
  
      view.dragging = { slice, move: event.ctrlKey };
    }
  
    function handleClick(event: MouseEvent, view: EditorView) {
      view.focus();
  
      view.dom.classList.remove("dragging");
  
      const node = nodeDOMAtCoords({
        x: event.clientX + 50 + options.dragHandleWidth,
        y: event.clientY,
      });
  
      if (!(node instanceof Element)) return;
  
      const nodePos = nodePosAtDOM(node, view, options);
      if (!nodePos) return;
  
      view.dispatch(
        view.state.tr.setSelection(NodeSelection.create(view.state.doc, nodePos))
      );
    }
  
    let dragHandleElement: HTMLElement | null = null;
  
    function hideDragHandle() {
      if (dragHandleElement) {
        dragHandleElement.classList.add("hide");
      }
    }
  
    function showDragHandle() {
      if (dragHandleElement) {
        dragHandleElement.classList.remove("hide");
      }
    }
  }