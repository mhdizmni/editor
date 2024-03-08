/**
 * npm install @tiptap/extension-bullet-list @tiptap/extension-list-item
 */

import BulletList from "@tiptap/extension-bullet-list"
import { InputRule, nodeInputRule, wrappingInputRule } from "@tiptap/react"


BulletList.configure({
    HTMLAttributes: {
        class: "mitism",
    },
})
export const BNBullet = BulletList.extend({
  name: "bulletMITI",
    addKeyboardShortcuts() {
        return {
            "Mod-l": () => this.editor.commands.toggleBulletList(),
        }
    },
    addOptions() {
        return {
            ...this.parent?.(),
            itemTypeName: 'bulletMITI',
            HTMLAttributes: {
                class: "bulletList",
                dir: "ltr"
            },
        }
    },
    addInputRules() {
        let inputRule = wrappingInputRule({
            find: /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/,
            type: this.type,
            getAttributes: match => ({
                dir: match ? "rtl" : "ltr",
            }),
        })
        return [
            inputRule
        ]
    },
    onUpdate(this) {
        console.log("bullet")
    },
    draggable: true
})
