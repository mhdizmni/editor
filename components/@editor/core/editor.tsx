/**
 * npm install @tiptap/react @tiptap/pm @tiptap/starter-kit
 * @tiptap/extension-hard-break
 */

'use client'

import { useEditor, EditorContent } from '@tiptap/react'
// import StarterKit from '@tiptap/starter-kit'
// import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Focus from '@tiptap/extension-focus'
import Block from './extentions/block'
import Document from './extentions/document'
import Text from '@tiptap/extension-text'
import HardBreak from '@tiptap/extension-hard-break'
import { Bullet } from './blocks/bullet';
import { List } from './blocks/list-items';
import BulletList from '@tiptap/extension-bullet-list'
import { Placeholder } from './extentions/placeholder'
import Dropcursor from '@tiptap/extension-dropcursor'
// // import { BlockHandleMenu } from './components/menus/block-handle/block-handle';
// import { HoverPlugin } from './plugins/hover';
// import { Root } from './nodes/blocks/block'
// import Dropcursor from './blocks/dropcursor/dropcursor'
// import { Paraph } from './blocks/paragraph'

interface EditorProps {
    initialContent?: string;
    editable?: boolean;
    onChange?: (value: string) => void;
}

const Editor = ({
    initialContent = "",
    editable = true,
    onChange
}: EditorProps) => {
    const editor = useEditor({
        content: initialContent,
        editable: editable,
        // autofocus: 'start', // not working
        enableInputRules: true,
        // enablePasteRules: true,
        // injectCSS: false,
        editorProps: {
            attributes: {
                class: "editor",
            },
        },
        extensions: [
            // StarterKit,
            Block,
            Document,
            Text,
            HardBreak,
            Paragraph,
            BulletList,
            List,
            Placeholder,
            Focus.configure({
                className: 'focus',
                mode: 'shallowest'
            }),
            // HoverPlugin,
            Dropcursor.configure({
                color: "#a0c9f2",
                width: 8,
            })
        ],
        onUpdate: ({ editor }) => {
            onChange && onChange(JSON.stringify(
                editor.getJSON()
                .content
                ,
                null,
                2
            ))
        },
    })

  return (
    <>
        <EditorContent
            spellCheck={false}
            editor={editor}
        />
        {/* <BlockHandleMenu editor={editor} /> */}
    </>
  )
}

export default Editor