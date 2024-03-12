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

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

import "./styles.css";

export const BlockNodeView = ({
    node,
    getPos,
    editor,
    deleteNode
}: NodeViewProps) => {
    const [open, setOpen] = useState(false);
    const isTable = useMemo(() => {
        const { content } = node.content as any;

        return content[0].type.name === "table";
    }, [node.content]);

    const { attrs } = node;

    const createNodeAfter = () => {
        const pos = getPos() + node.nodeSize;
        editor.commands.insertContentAt(pos, {
            type: "container",
            content: [
                {
                    type: "paragraph",
                },
            ],
        });
        // editor.commands.setTextSelection(pos)
        // editor.commands.selectNodeBackward()
        const { doc } = editor.state;
        const nextNode = doc.nodeAt(pos);
        if (nextNode) {
            const anchorPos = pos + nextNode.content.size;
            editor.commands.setTextSelection(anchorPos);
        }
    };

  return (
    <NodeViewWrapper className="w-full flex gap-1 items-start justify-start">
        {editor.isEditable && (
            <div data-block-handle className="flex items-center gap-1 text-neutral-500 opacity-0 transition-opacity group-hover:opacity-100 group-[.focus]:opacity-100" dir="ltr">
                <Button
                    variant="ghost"
                    className="p-0 h-6 w-6 rounded"
                    onClick={createNodeAfter}
                >
                    <Plus size={16} />
                </Button>
                {/* <Button
                    variant="ghost"
                    className="p-0 h-6 max-w-6 rounded"
                    contentEditable={false}
                    draggable
                    data-drag-handle
                    onClick={() => {
                        if (open === true) setOpen(false)
                        if (open === false) setOpen(true)
                    }}
                >
                    <GripVertical size={16} />
                </Button> */}
                <DropdownMenu
                // open={open}
                // modal={false}
                >
                    <DropdownMenuTrigger>
                        <Button
                            variant="ghost"
                            className="p-0 h-6 max-w-6 rounded"
                            contentEditable={false}
                            draggable
                            data-drag-handle
                        >
                            <GripVertical size={16} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                        <DropdownMenuItem>
                            Profile
                            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Billing
                            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Settings
                            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Keyboard shortcuts
                            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                        <DropdownMenuItem>Team</DropdownMenuItem>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem>Email</DropdownMenuItem>
                                <DropdownMenuItem>Message</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>More...</DropdownMenuItem>
                            </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuItem>
                            New Team
                            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>GitHub</DropdownMenuItem>
                        <DropdownMenuItem>Support</DropdownMenuItem>
                        <DropdownMenuItem disabled>API</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                        Log out
                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        )}
        <NodeViewContent
            className={`node-content w-full ${isTable ? "ml-6" : ""}`}
        />
    </NodeViewWrapper>
  );
};