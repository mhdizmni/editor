export interface FilesProps {
    key: string;
    percent: number;
    controller: AbortController;
    data: File;
    typeKey: keyof typeof fileTypes;
    status: "uploading" | "success" | "error" | "idle" | "deleted";
    url: string;
    quality?: {
        value: string,
        unit: string
    };
}

export interface UrlProps {
    [key: string]: string;
}

export interface CustomizedSection {
    text?: string;
    pluralText?: string;
    icon?: React.ReactNode;
}

export const fileTypes = (() => {
    const image = {
        "image/jpeg": [".jpg", ".jpeg"],
        "image/png": [".png"],
        "image/gif": [".gif"],
        "image/webp": [".webp"],
    };
    
    const video = {
        "video/x-msvideo": [".avi"],
        "video/mp4": [".mp4"],
        "video/mpeg": [".mpeg"],
        "video/webm": [".webm"],
        "video/x-matroska": [".mkv"],
    };
    
    const audio = {
        "audio/aac": [".aac"],
        "audio/mpeg": [".mp3"],
        "audio/wav": [".wav"],
        "audio/webm": [".weba"],
    };
    
    const doc = {
        "application/pdf": [".pdf"],
        "application/vnd.ms-excel": [".xls"],
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
        "application/msword": [".doc"],
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
        "text/csv": [".csv"],
        "text/plain": [".txt"],
    };

    const any = {
        ...image,
        ...video,
        ...audio,
        ...doc
    };

    return {
        image,
        video,
        audio,
        doc,
        any
    };
})();
// export const fileTypes: {
//     image: { [key: string]: string[] };
//     video: { [key: string]: string[] };
//     audio: { [key: string]: string[] };
//     doc: { [key: string]: string[] };
//     any: { [key: string]: string[] };
// } = {
//     image: {
//         "image/jpeg": [".jpg", ".jpeg"],
//         "image/png": [".png"],
//         "image/gif": [".gif"],
//         "image/webp": [".webp"],
//     },
//     video: {
//         "video/x-msvideo": [".avi"],
//         "video/mp4": [".mp4"],
//         "video/mpeg": [".mpeg"],
//         "video/webm": [".webm"],
//         "video/x-matroska": [".mkv"],
//     },
//     audio: {
//         "audio/aac": [".aac"],
//         "audio/mpeg": [".mp3"],
//         "audio/wav": [".wav"],
//         "audio/webm": [".weba"],
//     },
//     doc: {
//         "application/pdf": [".pdf"],
//         "application/vnd.ms-excel": [".xls"],
//         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
//         "application/msword": [".doc"],
//         "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
//         "text/plain": [".txt"],
//     },
//     any: {
//         ...fileTypes.image,
//         ...fileTypes.video,
//         ...fileTypes.audio,
//         ...fileTypes.doc
//     }
// }

export const videoQualities = [
    {label: "240p", value: "240"},
    {label: "360p", value: "360"},
    {label: "480p", value: "480"},
    {label: "540p", value: "540"},
    {label: "720p", value: "720"},
    {label: "1080p", value: "1080"},
];

export const audioQualities = [
    {label: "96 kbps", value: "96"},
    {label: "128 kbps", value: "128"},
    {label: "192 kbps", value: "192"},
    {label: "256 kbps", value: "256"},
    {label: "320 kbps", value: "320"},
    {label: "FLAC", value: "FLAC"},
];