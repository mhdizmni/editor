import {
    createReactBlockSpec
} from "@blocknote/react";

import {
    extendedDefaultProps,
} from "../data";
import { handleDirections } from "../tools";
import { cn } from "@/lib/utils";
import { insertOrUpdateBlock } from "@blocknote/core";
import { schema } from "../editor";
import Image from "next/image";

export const Bullet = createReactBlockSpec(
    {
        type: "bullet",
        propSchema: {
            ...extendedDefaultProps,
        },
        content: "inline",
    },
    {
        render: ({ block, editor, contentRef }) => {
            let directions = handleDirections(block, editor);

            const handleKeyDown = (event: KeyboardEvent) => {
                if (event.key === "Enter") {
                    // Your logic here when Enter key is pressed
                    console.log("Enter key pressed");
                }
            };
        
            return (
                    <div 
                        className="relative w-full flex items-start gap-2"
                        dir={directions.dir === "right" ? "rtl" : "ltr"}
                    >
                        <p
                            ref={contentRef}
                            className={cn(
                                "leading-6",
                            )}
                            data-text-alignment={directions.alignment}
                            data-placeholder="List Item"
                            data-placeholder-fa="لیست"
                            data-empty={directions.isEmpty}
                        />
                    </div>
                );
            }
    }
);

export const insertBullet = (editor: typeof schema.BlockNoteEditor) => ({
    title: "Bullet",
    group: "mitism",
    onItemClick: () => {
        insertOrUpdateBlock(editor, {
            type: "bullet",
        });
    },
    aliases: [
      "alert",
      "notification",
      "emphasize",
      "warning",
      "error",
      "info",
      "success",
    ],
    icon: <Image
            src="/editor/blocks/todo.png"
            alt="To Do"
            width={15}
            height={15}
        />,
  });