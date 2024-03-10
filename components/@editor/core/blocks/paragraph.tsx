/**
 * npm install @tiptap/extension-bullet-list @tiptap/extension-list-item @tiptap/extension-text-style
 */

import BulletList from "@tiptap/extension-bullet-list"
import View from "../nodes/view/view"
import Paragraph from "@tiptap/extension-paragraph"
import { ReactNodeViewRenderer } from "@tiptap/react"


BulletList.configure({
    HTMLAttributes: {
        class: "mitism",
    },
})
export const Paraph = Paragraph.extend({
    // addKeyboardShortcuts() {
    //     return {
    //         "Mod-l": () => this.editor.commands.toggleBulletList(),
    //     }
    // },
    // addOptions() {
    //     return {
    //         ...this.parent?.(),
    //         HTMLAttributes: {
    //             class: "bulletList",
    //             dir: "ltr",
    //         },
    //     }
    // },
    // addInputRules() {
    //     let inputRule = wrappingInputRule({
    //         find: /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/,
    //         type: this.type,
    //         getAttributes: match => ({
    //             dir: match ? "rtl" : "ltr",
    //         }),
    //     })
    //     return [
    //         inputRule
    //     ]
    // },
    // addCommands() {
    //     return {
    //       toggleBulletList: () => ({ commands, chain }) => {
    //         if (this.options.keepAttributes) {
    //           return chain().toggleList(this.name, this.options.itemTypeName, this.options.keepMarks).updateAttributes(List.name, this.editor.getAttributes(TextStyle.name)).run()
    //         }
    //         return commands.toggleList(this.name, this.options.itemTypeName, this.options.keepMarks)
    //       },
    //     }
    //   },
    // parseHTML() {
    //     return [
    //         { tag: 'div' },
    //     ]
    // },
    
    // renderHTML({ HTMLAttributes }) {
    //     return ['div', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
    // },
    addNodeView() {
        return ReactNodeViewRenderer(View)
      },
    // onUpdate() {
    //     console.log(this)
    // },
})