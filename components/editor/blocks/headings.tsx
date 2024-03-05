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

const config = (level: 1 | 2 | 3) => ({
    type: `heading${level}`,
    propSchema: {
        ...extendedDefaultProps,
    },
    level: {
        default: level,
        values: [1, 2, 3]
    },
    content: "inline",
} as const);

const implementation = (block: any, editor: any, contentRef: (node: HTMLElement | null) => void) => {
    let directions = handleDirections(block, editor);
    const level = block.props.level;
    let Container;
    let fontSize;
    switch (level) {
        case 1:
            Container = "h2",
            fontSize = "text-4xl"
            break;
        case 2:
            Container = "h3",
            fontSize = "text-3xl"
            break;
        case 3:
            Container = "h4",
            fontSize = "text-2xl"
            break;
    }

    let ContainerElement: keyof JSX.IntrinsicElements = "div"; // default value
    if (Container === "h2" || Container === "h3" || Container === "h4") {
        ContainerElement = Container;
    }

    return (
        <div className="relative" dir={directions.dir === "right" ? "rtl" : "ltr"}>
            <ContainerElement
                ref={contentRef}
                className={cn(
                    "w-full",
                    fontSize
                )}
                data-text-alignment={directions.alignment}
                data-empty={directions.isEmpty}
                data-placeholder={`Heading ${level}`}
                data-placeholder-fa={`عنوان ${level}`}
            />
        </div>
    );
};

const insertion = (level: 1 | 2 | 3) => ({
    name: "Heading "+level,
    execute: (editor) => {
        handleExecute(editor, `heading${level}`);
    },
    aliases: [
        "heading",
        "sub",
        "title",
    ],
    group: "Basic blocks",
    icon:   <Image
            src={`/editor/blocks/heading${level}.png`}
                alt={`Heading${level}`}
                width={15}
                height={15}
            />,
} as ReactSlashMenuItem<typeof blockSchema>)

export const Heading1 = createReactBlockSpec(
    {
        ...config(1)
    },
    {
        render: ({ block, editor, contentRef }) => {
            return implementation(block, editor, contentRef);
        },
    }
)
export const insertHeading1: ReactSlashMenuItem<typeof blockSchema> = insertion(1);