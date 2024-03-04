import {
    BlockNoteEditor,
    BlockSchema,
    PartialBlock,
} from "@blocknote/core";
import { useCallback, useMemo } from "react";
import { IconType } from "react-icons";
import {
    RiTextDirectionL,
    RiTextDirectionR
} from "react-icons/ri";

import { ToolbarButton, useSelectedBlocks } from "@blocknote/react";
import { DefaultProps } from "../toolbar";
  
type TextDirection = DefaultProps["textDirection"];
  
const icons: Record<TextDirection, IconType> = {
    ltr: RiTextDirectionL,
    rtl: RiTextDirectionR,
};
  
export const TextDirectionButton = <BSchema extends BlockSchema>(props: {
    editor: BlockNoteEditor<BSchema, any, any>;
    textDirection: TextDirection;
}) => {
    const selectedBlocks = useSelectedBlocks(props.editor);
  
    const textAlignment = useMemo(() => {
        const block = selectedBlocks[0];
    
        if ("textAlignment" in block.props) {
            return block.props.textDirection as TextDirection;
        }
    
        return;
    }, [selectedBlocks]);
  
    const setTextAlignment = useCallback(
        (textDirection: TextDirection) => {
            props.editor.focus();
  
            for (const block of selectedBlocks) {
                props.editor.updateBlock(block, {
                    props: { textDirection: textDirection },
                } as PartialBlock<BSchema, any, any>);
            }
        },
        [props.editor, selectedBlocks]
    );
  
    const show = useMemo(() => {
      return !!selectedBlocks.find((block) => "textDirection" in block.props);
    }, [selectedBlocks]);
  
    if (!show) {
      return null;
    }
  
    return (
      <ToolbarButton
        onClick={() => setTextAlignment(props.textDirection)}
        isSelected={textAlignment === props.textDirection}
        mainTooltip={
          props.textDirection === "rtl"
            ? "Justify Text"
            : "Align Text " +
              props.textDirection.slice(0, 1).toUpperCase() +
              props.textDirection.slice(1)
        }
        icon={icons[props.textDirection]}
      />
    );
  };