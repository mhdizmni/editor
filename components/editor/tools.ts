export const getDirection = (text: string | null) => {
    if (!text) {
        return "rtl";
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
    return isRtl ? "rtl" : "ltr";
}