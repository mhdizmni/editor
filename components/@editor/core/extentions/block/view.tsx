import { useMemo, useState } from "react";
import {
    NodeViewWrapper,
    NodeViewProps,
    NodeViewContent,
} from "@tiptap/react";
import { Button } from "@/components/ui/button";
import {
    GripVertical,
    Plus
} from "lucide-react";

import "./styles.css";

export const BlockNodeView = ({
    node,
    getPos,
    editor,
    deleteNode
}: NodeViewProps) => {
    const [selected, setSelected] = useState<boolean>(false);
    const isTable = useMemo(() => {
        const { content } = node.content as any;

        return content[0].type.name === "table";
    }, [node.content]);

    const { attrs } = node;

    const createNodeAfter = () => {
        const pos = getPos() + node.nodeSize;
        editor.commands.insertContentAt(pos, {
            type: "blockContainer",
            content: [
                {
                    type: "paragraph",
                },
            ],
        });
        // editor.commands.selectNodeBackward()
        // const { doc } = editor.state;
        // const nextNode = doc.nodeAt(pos);
        // if (nextNode) {
        //     const anchorPos = pos + nextNode.content.size;
        //     editor.commands.setTextSelection(anchorPos);
        // }
    };

  return (
    <NodeViewWrapper as="div" className={`group w-full flex gap-1 items-start justify-start`} data-id={attrs.id}>
        {editor.isEditable && (
            <div data-block-handle className="flex items-center gap-1 text-neutral-500 opacity-0 transition-opacity group-hover:opacity-100" dir="ltr">
                <Button
                    variant="ghost"
                    className="p-0 h-6 w-6 rounded"
                    onClick={createNodeAfter}
                >
                    <Plus size={16} />
                </Button>
                <Button
                    variant="ghost"
                    className="p-0 h-6 max-w-6 rounded"
                >
                    <GripVertical size={16} />
                </Button>
            </div>
        )}
        <NodeViewContent
            className={`node-content w-full ${isTable ? "ml-6" : ""}`}
        />
    </NodeViewWrapper>
  );
};