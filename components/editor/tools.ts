const getDirection = (text: string | null) => {
    if (!text) {
        return "right";
    }
    // Remove numbers and spaces from the beginning of the text
    const trimmedText = text.replace(/^[\d\s]+/, "");

    // Get the first character after trimming
    const firstChar = trimmedText.charAt(0);

    // Define regex for checking RTL characters
    const rtlRegex = /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/;

    // Check if the first character is an RTL character
    const isRtl = rtlRegex.test(firstChar);

    // Return direction based on the first character
    return isRtl ? "right" : "left";
}

const handleDirections = (
    block: any,
    editor: any
) => {
    const alignment = block.props.textAlignment;
    const direction = block.props.textDirection;
    let hasValue = !!block.content?.[0] ? true : false;

    if (block.content?.[0] && block.props.customTextDirection === false) {
        let handledDirection;
        let handledAlignment = alignment;

        if ('text' in block.content[0]) {
            handledDirection = getDirection(block.content[0].text);
        } else {
            handledDirection = getDirection(null);
        }

        if (block.props.customTextAlignment === false) {
            handledAlignment = handledDirection;
        }
        editor.updateBlock(block, { props: {
            ...block.props,
            textDirection: handledDirection,
            textAlignment: handledAlignment
        }});
    }

    return {
        dir: direction,
        alignment,
        isEmpty: !hasValue
    };
}

const handleExecute = (
    editor: any,
    type: string
) => {
    const currentBlock = editor.getTextCursorPosition().block;
    let insertedBlock = editor.insertBlocks(
        [
            {
                type: type,
            },
        ],
        editor.getTextCursorPosition().block,
        "before"
    );
    editor.removeBlocks([currentBlock])
    editor.setTextCursorPosition(insertedBlock[0], "start");

    return insertedBlock[0];
}

export {
    getDirection,
    handleDirections,
    handleExecute
}