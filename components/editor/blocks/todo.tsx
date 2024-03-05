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
import { Checkbox } from "@/components/ui/checkbox";

export const Todo = createReactBlockSpec(
    {
        type: "todo",
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

            let isChecked = block.props.checked;
            const handleCheck = (value: boolean | 'indeterminate') => {
                let checked;
                if (value === 'indeterminate') {
                    checked = false;
                } else {
                    checked = value;
                }

                editor.updateBlock(block, { props: {
                    ...block.props,
                    checked: checked
                }});
            }
        
            return (
                <div className="relative flex items-start gap-2" dir={directions.dir === "right" ? "rtl" : "ltr"}>
                    <div className="w-6 h-6 flex items-center justify-center">
                        <Checkbox
                            checked={isChecked}
                            onCheckedChange={handleCheck}
                            className="w-4 h-4 rounded-sm"
                        />
                    </div>
                    <div
                        ref={contentRef}
                        className={cn(
                            "leading-6 w-full",
                            {"line-through text-neutral-500": isChecked}
                        )}
                        data-text-alignment={directions.alignment}
                        data-empty={directions.isEmpty}
                        data-placeholder="Todo"
                        data-placeholder-fa="تسک"
                    />
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

export const insertTodo: ReactSlashMenuItem<typeof blockSchema> = {
    name: "To-do list",
    execute: (editor) => {
        handleExecute(editor, "todo");
    },
    aliases: [
        "todo",
        "to-do",
        "checkmark",
        "task"
    ],
    group: "Basic blocks",
    icon:   <Image
                src="/editor/blocks/todo.png"
                alt="To Do"
                width={15}
                height={15}
            />,
};