"use client";

import { useTheme } from "next-themes";

import {
    BlockNoteEditor,
    PartialBlock
} from "@blocknote/core";
import {
    BlockNoteView,
    useBlockNote
} from "@blocknote/react";
import "@blocknote/react/style.css";

interface EditorProps {
    onChange: (value: string) => void;
    initialContent?: string;
    editable?: boolean;
};

const Editor = ({
    onChange,
    initialContent,
    editable = true
}: EditorProps) => {
    const { resolvedTheme } = useTheme()

    const editor: BlockNoteEditor = useBlockNote({
        editable,
        initialContent: 
            initialContent 
            ? JSON.parse(initialContent)
            : undefined,
        onEditorContentChange: (editor) => {
            onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
        },
        uploadFile: async (file: File) => {
            const response = await "hi";
            return "hi"
        }
    });

    return (
        <BlockNoteView
            editor={editor}
            theme={resolvedTheme === "dark" ? "dark" : "light"}
            className="w-full"
        />
    );
}

export default Editor;