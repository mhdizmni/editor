"use client";

import { useTheme } from "next-themes";

import {
    defaultBlockSchema,
    defaultBlockSpecs,
} from "@blocknote/core";
import {
    BlockNoteView,
    useBlockNote,
    getDefaultReactSlashMenuItems,
} from "@blocknote/react";
import "@blocknote/react/style.css";

import { Text, insertText } from "./blocks/text";
import { Todo, insertTodo } from "./blocks/to-do";

// Our block schema, which contains the configs for blocks that we want our
// editor to use.
export const blockSchema = {
    ...defaultBlockSchema,
    // paragraph: Text.config,
    todo: Todo.config,
};
// Our block specs, which contain the configs and implementations for blocks
// that we want our editor to use.
const blockSpecs = {
    ...defaultBlockSpecs,
    paragraph: Text,
    todo: Todo,
};

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

    const editor = useBlockNote({
        blockSpecs: blockSpecs,
        slashMenuItems: [
            ...getDefaultReactSlashMenuItems(blockSchema),
            insertTodo,
        ],
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
        },
    });

    return (
        <BlockNoteView
            editor={editor}
            theme={resolvedTheme === "dark" ? "dark" : "light"}
            className="w-full"
            spellCheck={false}
        >
        </BlockNoteView>
    );
}

export default Editor;