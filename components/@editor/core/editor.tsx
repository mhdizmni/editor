/**
 * npm install @tiptap/react @tiptap/pm @tiptap/starter-kit
 * 
 */

'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Bullet } from './blocks/bullet';
import { List } from './blocks/list-items';

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
            StarterKit,
            Bullet,
            List
        ],
        onUpdate: ({ editor }) => {
            onChange && onChange(JSON.stringify(
                editor.getJSON(),
                null,
                2
            ))
        },
    })

  return (
    <EditorContent
        editor={editor}
    />
  )
}

export default Editor