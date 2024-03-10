/**
 * npm install @tiptap/extension-list-item
 */

import ListItem from '@tiptap/extension-list-item'
import { InputRule, ReactNodeViewRenderer, mergeAttributes, nodeInputRule, wrappingInputRule } from "@tiptap/react"
// import DraggableItem from '../nodes/draggable/component'
// import draggableItem from '../nodes/draggable/draggableItem'
// import Director from '../nodes/director/component'


ListItem.configure({
    HTMLAttributes: {
        class: "mitism",
    },
})
export const List = ListItem.extend({
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
    //             dir: "ltr"
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
    parseHTML() {
        return [
            { tag: 'div' },
        ]
    },
    
    renderHTML({ HTMLAttributes }) {
        return ['div', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
    },
    // onUpdate(this) {
    //     console.log("bullet")
    // },
    // draggable: true
    // addNodeView() {
    //     return ReactNodeViewRenderer(Director)
    // }
})
