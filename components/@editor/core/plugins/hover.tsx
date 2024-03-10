import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from 'prosemirror-state'

export const HoverPlugin = Extension.create({
  name: 'hover',

  addProseMirrorPlugins() {
    return [
      new Plugin({
        // key: new PluginKey('hover'),
        props: {
          // handleDOMEvents: {
          //   mouseover(view, event) {
          //     console.log(view);
          //     console.log(event);
          //   }
          // },
          handleTextInput: (view, from, to, text) => {
            console.log(view.state)
          },
        },
      }),
    ]
  },
})