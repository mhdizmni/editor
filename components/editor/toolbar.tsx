"use client";

import { useState } from "react";
import {
    BlockNoteEditor,
    DefaultProps as BaseProps,
    BlockSchema
} from "@blocknote/core";
import {
    BlockTypeDropdown,
    BlockTypeDropdownItem,
    FormattingToolbarProps,
    ImageCaptionButton,
    ReplaceImageButton,
    ToggledStyleButton,
    Toolbar,
    useEditorContentChange,
    useEditorSelectionChange
} from "@blocknote/react";
import { TextDirectionButton } from "./toolbar/block-direction";

export type DefaultProps = BaseProps & {
    textDirection: "rtl" | "ltr";
};

export const customToolbar = <BSchema extends BlockSchema>(
    props: FormattingToolbarProps<BSchema> & {
      blockTypeDropdownItems?: BlockTypeDropdownItem[];
    }
  ) => {
    return (
        <Toolbar>
            <BlockTypeDropdown {...props} items={props.blockTypeDropdownItems} />

            <ImageCaptionButton editor={props.editor} />
            <ReplaceImageButton editor={props.editor} />

            <ToggledStyleButton editor={props.editor} toggledStyle={"bold"} />
            <ToggledStyleButton editor={props.editor} toggledStyle={"italic"} />
            <ToggledStyleButton editor={props.editor} toggledStyle={"underline"} />
            <ToggledStyleButton editor={props.editor} toggledStyle={"strike"} />
{/* 
            <TextAlignButton editor={props.editor as any} textAlignment={"left"} />
            <TextAlignButton editor={props.editor as any} textAlignment={"center"} />
            <TextAlignButton editor={props.editor as any} textAlignment={"right"} /> */}
            <TextDirectionButton editor={props.editor as any} textDirection={"rtl"} />
        </Toolbar>
    );
};