import { useState } from "react";

import {
    defaultProps,
} from "@blocknote/core";
import {
    createReactBlockSpec,
    ReactSlashMenuItem,
} from "@blocknote/react";
import { blockSchema } from "../editor";

import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

// Creates a paragraph block with custom font.
export const Todo = createReactBlockSpec(
    {
        type: "todo",
        propSchema: {
            ...defaultProps,
            checked: {
                default: false
            },
        },
        content: "inline",
    },
    {
        render: ({ block, contentRef }) => {
            const isChecked = block.props.checked
            const [checked, setChecked] = useState<boolean | 'indeterminate'>(isChecked);
        
            return (
                <div className="flex items-start gap-2">
                    <Checkbox name={block.id} onCheckedChange={setChecked}/>
                    <Label htmlFor={block.id} ref={contentRef} className={checked ? "line-through text-neutral-500" : ""}></Label>
                </div>
            );
        },
        // toExternalHTML: ({ contentRef }) => <div ref={contentRef} />,
        // parse: (element) => {
        //     const isChecked = element.style.textDecoration;

        //     if (isChecked === "line-through") {
        //         return {
        //             checked: true,
        //         };
        //     }
        // },
    }
);

// Creates a slash menu item for inserting a font paragraph block.
export const insertTodo: ReactSlashMenuItem<typeof blockSchema> = {
    name: "To-do list",
    execute: (editor) => {
        // const font = prompt("Enter font name");

        editor.insertBlocks(
            [
                {
                    type: "todo",
                },
            ],
            editor.getTextCursorPosition().block,
            "after"
        );
    },
    aliases: ["todo", "to-do", "check"],
    group: "Basic blocks",
    icon:   <Image
                src="/blocks/to-do.png"
                alt="To Do"
                width={15}
                height={15}
            />,
};