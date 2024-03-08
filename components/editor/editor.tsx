"use client";

import { useTheme } from "next-themes";

import {
    BlockNoteView,
    SuggestionMenuController,
    useCreateBlockNote,
    getDefaultReactSlashMenuItems,
} from "@blocknote/react";
import {
    BlockNoteSchema,
    defaultBlockSchema,
    defaultBlockSpecs,
    filterSuggestionItems
} from "@blocknote/core";

import "@blocknote/react/style.css";
import "./styles.css";
import { Bullet, insertBullet } from "./bn/blocks/bullets";
import { CustomBulletList } from "./bn/blocks/test";

export const schema = BlockNoteSchema.create({
    blockSpecs: {
      // enable the default blocks if desired
    //   ...defaultBlockSpecs,

      bullet: Bullet
   
      // Add your own custom blocks:
      // customBlock: CustomBlock,
    },
    // inlineContentSpecs: {
    //   // enable the default inline content if desired
    //   ...defaultInlineContentSpecs,
   
    //   // Add your own custom inline content:
    //   // customInlineContent: CustomInlineContent,
    // },
    // styleSpecs: {
    //   // enable the default styles if desired
    //   ...defaultStyleSpecs,
   
    //   // Add your own custom styles:
    //   // customStyle: CustomStyle
    // },
});

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
        schema: schema,
        _tiptapOptions: {
            extensions: [
                CustomBulletList
            ],
            onUpdate: () => {
                console.log("hi updated")
            } 
        }
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
        >
            <SuggestionMenuController
                triggerCharacter={"/"}
                getItems={async (query) =>
                    filterSuggestionItems(
                        [
                            // ...getDefaultReactSlashMenuItems(editor),
                            insertBullet(editor)
                        ],
                        query
                    )
                }
            />
        </BlockNoteView>
    );
}

export default Editor;