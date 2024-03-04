import {
    defaultProps,
} from "@blocknote/core";
import {
    createReactBlockSpec,
    ReactSlashMenuItem,
} from "@blocknote/react";
import { blockSchema } from "../editor";

import { cn } from "@/lib/utils";
import { getDirection } from "../tools";

import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";

// Creates a paragraph block with custom font.
export const Todo = createReactBlockSpec(
    {
        type: "todo",
        propSchema: {
            ...defaultProps,
            checked: {
                default: false
            },
            textDirection: {
                default: "rtl"
            },
            textAlignment: {
                default: "right"
            },
            customDirection: {
                default: false
            },
            customAlignment: {
                default: false
            }
        },
        content: "inline",
    },
    {
        render: ({ block, editor, contentRef }) => {
            const textAlignment = block.props.textAlignment;

            let direction = block.props.textDirection;
            if (block.content?.[0] && !block.props.customDirection) {
                let handleDirection;
                if ('text' in block.content[0]) {
                    handleDirection = getDirection(block.content[0].text);
                } else {
                    handleDirection = getDirection(null);
                }
                editor.updateBlock(block, { props: {
                    ...block.props,
                    textDirection: handleDirection
                } });
            }
            // todo: check custom direction & alignment
            let isChecked = block.props.checked;
            const handleChecked = (value: boolean | 'indeterminate') => {
                let checked;
                if (value === 'indeterminate') {
                    checked = false;
                } else {
                    checked = value;
                }

                editor.updateBlock(block, { props: {
                    ...block.props,
                    checked: checked
                } });
            }
        
            return (
                <div className="flex items-start gap-2" dir={direction}>
                    <div className="w-6 h-6 flex items-center justify-center">
                        <Checkbox
                            checked={isChecked}
                            onCheckedChange={handleChecked}
                            className="w-4 h-4 rounded-sm"
                        />
                    </div>
                    <div
                        ref={contentRef}
                        className={cn(
                            "leading-6 w-full",
                            {"line-through text-neutral-500": isChecked}
                        )}
                        data-text-alignment={textAlignment}
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

// Creates a slash menu item for inserting a font paragraph block.
export const insertTodo: ReactSlashMenuItem<typeof blockSchema> = {
    name: "To-do list",
    execute: (editor) => {
        const insertedBlock = editor.insertBlocks(
            [
                {
                    type: "todo",
                },
            ],
            editor.getTextCursorPosition().block,
            "after"
        );
        editor.setTextCursorPosition(insertedBlock[0], 'start');
    },
    aliases: ["todo", "to-do", "check", "checkmark", "task"],
    group: "Basic blocks",
    icon:   <Image
                src="/blocks/to-do.png"
                alt="To Do"
                width={15}
                height={15}
            />,
};