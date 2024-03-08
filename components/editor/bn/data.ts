import {
    defaultProps,
} from "@blocknote/core";

export const extendedDefaultProps = {
    ...defaultProps,
    textAlignment: {
        default: "right",
        values: defaultProps.textAlignment.values
    },
    textDirection: {
        default: "right",
        values: ["right", "left"]
    },
    customTextAlignment: {
        default: false,
        values: [true, false]
    },
    customTextDirection: {
        default: false,
        values: [true, false]
    },
}