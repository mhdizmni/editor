import {
    extendedDefaultProps,
} from "../data";
import { handleDirections } from "../tools";
import { blockSchema } from "../editor";

import { cn } from "@/lib/utils";

import {
    createReactBlockSpec,
    ReactSlashMenuItem,
} from "@blocknote/react";

import Image from "next/image";

export const Text = createReactBlockSpec(
    {
        type: "paragraph",
        propSchema: {
            ...extendedDefaultProps,
            checked: {
                default: false
            },
        },
        content: "inline",
    },
    {
        render: ({ block, editor, contentRef }) => {
            let directions = handleDirections(block, editor);
        
            return (
                <div
                    ref={contentRef}
                    className={cn(
                        "leading-6 w-full",
                    )}
                    data-text-alignment={directions.alignment}
                    dir={directions.dir === "right" ? "rtl" : "ltr"}
                />
            );
        },
    }
);

export const insertText: ReactSlashMenuItem<typeof blockSchema> = {
    name: "Text",
    execute: (editor) => {
        const insertedBlock = editor.insertBlocks(
            [
                {
                    type: "paragraph",
                },
            ],
            editor.getTextCursorPosition().block,
            "after"
        );
        editor.setTextCursorPosition(insertedBlock[0], 'start');
    },
    aliases: ["text", "parapgraph", "sentence", "passage", "article"],
    group: "Basic blocks",
    icon:   <Image
                src="/blocks/text.png"
                alt="Text"
                width={15}
                height={15}
            />,
};