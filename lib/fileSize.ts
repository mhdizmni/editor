export function fileSize(sizeInBytes: number): {size: string, unit: string} {
    const units: string[] = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    let i = 0;
    while (sizeInBytes >= 1024 && i < units.length - 1) {
        sizeInBytes /= 1024;
        i++;
    }

    return {
        size: sizeInBytes.toFixed(2),
        unit: units[i]
    }
}
