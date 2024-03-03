import {
    defaultProps,
} from "@blocknote/core";
import {
    createReactBlockSpec,
    ReactSlashMenuItem,
} from "@blocknote/react";
import { CheckSquare2 } from "lucide-react";
import { blockSchema } from "../editor";

// Creates a paragraph block with custom font.
export const Todo = createReactBlockSpec(
    {
        type: "todo",
        propSchema: {
            ...defaultProps,
            font: {
                default: "Comic Sans MS",
            },
        },
        content: "inline",
    },
    {
        render: ({ block, contentRef }) => {
            const style = {
                fontFamily: block.props.font
            };
        
            return (
                <p ref={contentRef} style={style} />
            );
        },
        toExternalHTML: ({ contentRef }) => <p ref={contentRef} />,
        parse: (element) => {
            const font = element.style.fontFamily;
            
            if (font === "") {
                return;
            }
            
            return {
                font: font || undefined,
            };
        },
    }
);

// Creates a slash menu item for inserting a font paragraph block.
export const insertTodo: ReactSlashMenuItem<typeof blockSchema> = {
    name: "Insert Todo",
    execute: (editor) => {
        const font = prompt("Enter font name");

        editor.insertBlocks(
            [
                {
                    type: "todo",
                    props: {
                        font: font || undefined,
                    },
                },
            ],
            editor.getTextCursorPosition().block,
            "after"
        );
    },
    aliases: ["p", "paragraph", "font"],
    group: "Other",
    icon: <CheckSquare2 />,
};