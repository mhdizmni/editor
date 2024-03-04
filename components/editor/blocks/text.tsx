import {
    extendedDefaultProps,
} from "../data";
import { getDirection } from "../tools";
import { blockSchema } from "../editor";

import { cn } from "@/lib/utils";

import {
    createReactBlockSpec,
    ReactSlashMenuItem,
} from "@blocknote/react";


import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";

// Creates a paragraph block with custom font.
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
            const textAlignment = block.props.textAlignment;

            let direction = block.props.textDirection;
            if (block.content?.[0] && !block.props.customTextDirection) {
                let handleDirection;
                if ('text' in block.content[0]) {
                    handleDirection = getDirection(block.content[0].text);
                } else {
                    handleDirection = getDirection(null);
                }
                editor.updateBlock(block, { props: {
                    ...block.props,
                    textDirection: handleDirection,
                    textAlignment: !block.props.customTextAlignment ? handleDirection as typeof textAlignment : block.props.textAlignment
                }});
            }
        
            return (
                <div
                    ref={contentRef}
                    className={cn(
                        "leading-6 w-full",
                    )}
                    data-text-alignment={textAlignment}
                    dir={direction === "right" ? "rtl" : "ltr"}
                />
            );
        },
    }
);

// Creates a slash menu item for inserting a font paragraph block.
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