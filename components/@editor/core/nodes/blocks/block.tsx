/**
 * Level 1
 */
import { mergeAttributes, Node } from '@tiptap/core'
import { Plugin, PluginKey } from 'prosemirror-state'


export interface ParagraphOptions {
  HTMLAttributes: Record<string, any>,
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    paragraph: {
      /**
       * Toggle a paragraph
       */
      setParagraph: () => ReturnType,
    }
  }
}

export const Root = Node.create<ParagraphOptions>({
  name: 'paragraph',

  priority: 1000,

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  group: 'block',

  content: 'inline*',

  parseHTML() {
    return [
      { tag: 'div' },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['p', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },

  addCommands() {
    return {
      setParagraph: () => ({ commands }) => {
        return commands.setNode(this.name)
      },
    }
  },

  addKeyboardShortcuts() {
    return {
      'Alt-0': () => this.editor.commands.setParagraph(),
    }
  },
  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          handleDOMEvents: {
            // Prevent dragging child nodes from figure
            dragstart: (view, event) => {
              if (!event.target) {
                return false
              }

              const pos = view.posAtDOM(event.target as HTMLElement, 0)
              const $pos = view.state.doc.resolve(pos)

              if ($pos.parent.type.name === this.type.name) {
                event.preventDefault()
              }

              return false
            },
          },
        },
      }),
    ]
  },
})