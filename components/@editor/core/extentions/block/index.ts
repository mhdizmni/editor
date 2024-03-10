import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { BlockNodeView } from "./view";

import { v4 } from 'uuid';


export interface BlockOptions {
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        blockContainer: {
            /**
             * Toggle a blockContainer
             */
            setBlock: (position?: number) => ReturnType;
        };
    }
}

const Block = Node.create<BlockOptions>({
    name: "blockContainer",

    priority: 1000,

    group: "blockContainer",

    content: "block",

    draggable: true,

    selectable: true,

    inline: false,

    addOptions() {
        return {
            HTMLAttributes: {},
        };
    },

    parseHTML() {
        return [{ tag: 'div[data-type="d-block"]' }];
    },

    renderHTML({ HTMLAttributes }) {
        return [
            "div",
            mergeAttributes(HTMLAttributes, { "data-type": "d-block" }),
            0,
        ];
    },

    addCommands() {
        return {
            setBlock: (position) => ({ state, chain }) => {
                const {
                    selection: { from },
                } = state;

                const pos =
                    position !== undefined || position !== null ? from : position;

                return  chain()
                        .insertContentAt(pos, {
                            type: this.name,
                            content: [
                                {
                                    type: "paragraph",
                                },
                            ],
                        })
                        .focus(pos + 2)
                        .run();
            },
        };
    },

    addNodeView() {
        return ReactNodeViewRenderer(BlockNodeView);
    },

    addKeyboardShortcuts() {
        return {
            "Mod-Alt-0": () => this.editor.commands.setBlock(),
            Enter: ({ editor }) => {
                const {
                    selection: { $head, from, to },
                    doc,
                } = editor.state;

                const parent = $head.node($head.depth - 1);

                if (parent.type.name !== "blockContainer") return false;

                let currentActiveNodeTo = -1;

                doc.descendants((node, pos) => {
                if (currentActiveNodeTo !== -1) return false;
                // eslint-disable-next-line consistent-return
                if (node.type.name === this.name) return;

                const [nodeFrom, nodeTo] = [pos, pos + node.nodeSize];

                if (nodeFrom <= from && to <= nodeTo) currentActiveNodeTo = nodeTo;
                    return false;
                });

                const content = doc.slice(from, currentActiveNodeTo)?.toJSON().content;

                return  editor
                        .chain()
                        .insertContentAt(
                            { from, to: currentActiveNodeTo },
                            {
                                type: this.name,
                                content,
                            }
                        )
                        .focus(from + 4)
                        .run();
            },
        };
    },
    addAttributes() {
        // Return an object with attribute configuration
        return {
            id: {
                default: v4()
            }
        }
    },
});
export default Block