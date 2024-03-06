"use client";

import { useTheme } from "next-themes";

import {
    BlockNoteView,
    useCreateBlockNote,
} from "@blocknote/react";

import "@blocknote/react/style.css";
import "./styles.css";

interface EditorProps {
    initialContent?: string;
    onChange: (value: string) => void;
    editable?: boolean;
};

const Editor = ({
    initialContent,
    editable = true,
    onChange,
}: EditorProps) => {
    const { resolvedTheme } = useTheme()

    const editor = useCreateBlockNote({
        initialContent: initialContent 
                        ? JSON.parse(initialContent)
                        : undefined,
        domAttributes: {
            editor: {
                class: "editor"
            },
            block: {
                class: "editor-block"
            },
            blockGroup: {
                class: "editor-block-group"
            },
            blockContent: {
                class: "editor-block-content"
            },
            inlineContent: {
                class: "editor-inline-content"
            },
        },
        defaultStyles: false,
        uploadFile: async (file: File) => {
            const response = await "hi";
            return "hi"
        },
        // collaboration,
        // schema,
    });
    return (
        <BlockNoteView
            spellCheck={false}
            editor={editor}
            editable={editable}
            // onSelectionChange={() => console.log("selection")}
            onChange={() => {
                onChange(JSON.stringify(
                    editor.document,
                    null,
                    2
                ))
            }}
            theme={resolvedTheme === "dark" ? "dark" : "light"}
            // formattingToolbar?: boolean;
            // hyperlinkToolbar?: boolean;
            // sideMenu?: boolean;
            // slashMenu?: boolean;
            // imageToolbar?: boolean;
            // tableHandles?: boolean;
        />
    );
}

export default Editor;