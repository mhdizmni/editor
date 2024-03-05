import {
    extendedDefaultProps,
} from "../data";
import {
    handleDirections,
    handleExecute
} from "../tools";
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
        },
        content: "inline",
    },
    {
        render: ({ block, editor, contentRef }) => {
            let directions = handleDirections(block, editor);

            return (
                <div className="relative" dir={directions.dir === "right" ? "rtl" : "ltr"}>
                    <div
                        ref={contentRef}
                        className={cn(
                            "leading-6 w-full",
                        )}
                        data-text-alignment={directions.alignment}
                        data-empty={directions.isEmpty}
                        data-placeholder="Type something..."
                        data-placeholder-fa="چیزی بنویسید..."
                    />
                </div>
            );
        },
    }
);

export const insertText: ReactSlashMenuItem<typeof blockSchema> = {
    name: "Text",
    execute: (editor) => {
        handleExecute(editor, "paragraph");
    },
    aliases: [
        "text",
        "parapgraph",
        "sentence",
        "passage",
        "article"
    ],
    group: "Basic blocks",
    icon:   <Image
                src="/editor/blocks/text.png"
                alt="Text"
                width={15}
                height={15}
            />,
};