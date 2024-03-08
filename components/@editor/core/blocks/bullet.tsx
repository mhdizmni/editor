/**
 * npm install @tiptap/extension-bullet-list @tiptap/extension-list-item @tiptap/extension-text-style
 */

import BulletList from "@tiptap/extension-bullet-list"
import TextStyle from "@tiptap/extension-text-style"
import { InputRule, ReactNodeViewRenderer, mergeAttributes, nodeInputRule, wrappingInputRule } from "@tiptap/react"
import { List } from "./list-items"


BulletList.configure({
    HTMLAttributes: {
        class: "mitism",
    },
})
export const Bullet = BulletList.extend({
    addKeyboardShortcuts() {
        return {
            "Mod-l": () => this.editor.commands.toggleBulletList(),
        }
    },
    addOptions() {
        return {
            ...this.parent?.(),
            HTMLAttributes: {
                class: "bulletList",
                dir: "ltr"
            },
        }
    },
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
    draggable: true
})
