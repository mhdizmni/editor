"use client"

import { useEffect, useState } from "react";
import axios from "axios";

import { useDropzone } from "react-dropzone";
import { CustomizedSection, FilesProps, fileTypes } from "./data";

import { toast } from "sonner";
import { cn } from "@/lib/utils";

import { Ban, FileAudio, FileText, FileUp, FileVideo, Grab, ImageIcon, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
    Button
} from "@nextui-org/react";

interface UploaderProps {
    type?: "image" | "video" | "audio" | "doc" | "any",
    multi?: boolean,
    disabled?: boolean,
    customize?: {
        [key: string]: CustomizedSection;
    },
    maxFileSize?: number,
    children?: React.ReactNode,
    className?: string,
    resetClassName?: boolean,
    onFilesChange?: (files: FilesProps[]) => void,
    config?: {},
    gate: "article" | "ad" | "track" | "album" | "list" | "profile" | "artist" | "other",
    id?: string,
    section?: string,
    quality?: FilesProps['quality']
}
export const typeKeys = {
    image: {
        text: "عکس",
        pluralText: "عکس\u200Cها",
        icon: <ImageIcon />
    },
    video: {
        text: "ویدئو",
        pluralText: "ویدئوها",
        icon: <FileVideo />
    },
    audio: {
        text: "فایل صوتی",
        pluralText: "فایل\u200Cهای صوتی",
        icon: <FileAudio />
    },
    doc: {
        text: "سند",
        pluralText: "اسناد",
        icon: <FileText />
    },
    any: {
        text: "فایل",
        pluralText: "فایل\u200Cها",
        icon: <FileUp />
    },
}

export const Uploader = (
    {
        type = "any",
        multi = false,
        disabled = false,
        customize,
        maxFileSize = 50,
        children,
        className,
        resetClassName = false,
        onFilesChange,
        config,
        gate = "other",
        id,
        section,
        quality,
    }: UploaderProps
) => {
    let defaultAccept;
    switch (type) {
        case "image":
            defaultAccept = fileTypes.image;
            break;
        case "video":
            defaultAccept = fileTypes.video;
            break;
        case "audio":
            defaultAccept = fileTypes.audio;
            break;
        case "doc":
            defaultAccept = fileTypes.doc;
            break;
        default:
            defaultAccept = fileTypes.any
            break;
    }
    const {
        acceptedFiles,
        fileRejections,
        isDragAccept,
        isDragReject,
        isFocused,
        getRootProps,
        getInputProps,
        open
    } = useDropzone({
        maxSize: (maxFileSize*1024*1024)+1,
        multiple: multi,
        accept: defaultAccept,
        maxFiles: 3,
        noClick: true,
        disabled: disabled,
        onDropRejected: (fileRejections) => {
            fileRejections.map(({ file, errors }) => {
                const filetypekey =
                    (Object.keys(fileTypes) as Array<keyof typeof fileTypes>).find((outerKey) =>
                        Object.keys(fileTypes[outerKey]).includes(file.type)
                    ) || "any";
                toast.custom((t) => (
                    <div className="bg-white text:black dark:bg-black dark:text-white flex flex-col rounded text-xs border border-red shadow-lg font-fa">
                        <div className="flex font-en p-2" dir="ltr">
                            <div className="flex flex-1 text-sm text-start items-center justify-start">
                                <div className="h-6 w-6">{typeKeys[filetypekey].icon}</div>
                                {file.name}
                            </div>
                            <Button
                                isIconOnly
                                onClick={() => toast.dismiss(t)}
                                className="h-6 w-6 !min-w-0 !rounded"
                            >
                                <X />
                            </Button>
                        </div>
                        <Separator className="bg-red"/>
                        <div className="font-bold px-2">امکان آپلود این فایل به {Object.keys(errors).length > 1 ? "دلایل" : "دلیل"} زیر وجود ندارد:</div>
                        <ul className="list-disc list-inside p-2">
                            {errors.map((e, index) => (
                                <li key={e.code}>
                                    {e.code === "file-too-large" ? `حجم فایل بیشتر از ${maxFileSize}MB می\u200Cباشد` : null}
                                    {e.code === "file-invalid-type" ? "فرمت فایل پشتیبانی نمی\u200Cشود" : null}
                                    {e.code === "too-many-files" ? "محدودیت تعداد فایل\u200Cهای قابل آپلود" : null}
                                    {Object.keys(errors).length > 1 && (index+1) !== Object.keys(errors).length ? '،' : ""}
                                    {(index+1) === Object.keys(errors).length ? "." : ""}
                                </li>
                            ))}
                        </ul>
                    </div>
                ), {
                    duration: 150000000,
                })
            })
        },
        onDrop: (acceptedFiles, fileRejections) => {
            const aFiles = acceptedFiles
            .filter(file => {
                return !files.some(existingFile => existingFile.key === file.lastModified + file.name + file.size);
            })
            .map(file => ({
                key: file.lastModified + file.name + file.size,
                percent: 0,
                controller: new AbortController(),
                data: file,
                typeKey: (Object.keys(fileTypes) as Array<keyof typeof fileTypes>).find((outerKey) =>
                    Object.keys(fileTypes[outerKey]).includes(file.type)),
                status: "idle",
                url: "",
                quality: quality || null
            }));
            aFiles.forEach(file => {
                const controller = file.controller;
                const signal = controller.signal;

                const key = file.data.lastModified + file.data.name + file.data.size;

                setFiles((currentFiles) => {
                    // Filter out existing files by name from new files
                    const uniqueNewFiles = aFiles.filter(aFiles => !currentFiles.some(existingFile => existingFile.key === aFiles.key));
            
                    // Combine the unique new files with the existing files
                    const updatedFiles = [...currentFiles, ...uniqueNewFiles];
            
                    return updatedFiles as FilesProps[];
                });

                // if (file.data.size < 100*1024*1024+1) {
                //     const timeout = (100*1024*1024 / 200*1024)*1000; // todo: maybe add timeout abort based on upload speed
                //     setTimeout(() => {
                //         controller.abort();
                //     }, timeout);
                // }
                
                const filetypekey =
                    (Object.keys(fileTypes) as Array<keyof typeof fileTypes>).find((outerKey) =>
                        Object.keys(fileTypes[outerKey]).includes(file.data.type)
                    ) || "any";
                axios.post('/api/upload',
                    {
                        name: file.data.name,
                        size: file.data.size,
                        type: file.data.type,
                        gate: gate,
                        id: id || "",
                        section: section || "",
                        quality: quality || "",
                    }
                )
                .then((res) => {
                    setFiles((currentFiles) => {
                        const updatedFiles = currentFiles.map((currentFile) => {
                            if (currentFile.key === key) {
                                return { ...currentFile, status: "uploading", url: res.data.durl };
                            }
                            return currentFile;
                        });
                        return updatedFiles as FilesProps[];
                    });
                    axios.put(res.data.url, file.data, {
                        headers: {
                            'Content-Type': file.data.type,
                        },
                        signal,
                        onUploadProgress: (e) => {
                            if (signal.aborted) {
                                return;
                            }

                            if(e.total !== undefined) {
                                var percentCompleted = Math.round((e.loaded * 100) / e.total);
                                setFiles((currentFiles) => {
                                    const updatedFiles = currentFiles.map((currentFile) => {
                                        if (currentFile.key === key) {
                                            return { ...currentFile, percent: percentCompleted };
                                        }
                                        return currentFile;
                                    });
                                    return updatedFiles;
                                });                                
                            }
                              
                        },
                    })
                    .then((res) => {
                        setFiles((currentFiles) => {
                            const updatedFiles = currentFiles.map((currentFile) => {
                                if (currentFile.key === key) {
                                    return { ...currentFile, status: "success" };
                                }
                                return currentFile;
                            });
                            return updatedFiles as FilesProps[];
                        });
                    })
                    .catch((err) => {
                        setFiles((currentFiles) => {
                            const updatedFiles = currentFiles.map((currentFile) => {
                                if (currentFile.key === key) {
                                    return { ...currentFile, status: "error", key: `err_${Date.now()}_${file.key}` };
                                }
                                return currentFile;
                            });
                            return updatedFiles as FilesProps[];
                        });
                        toast.custom((t) => (
                            <div className="bg-white text:black dark:bg-black dark:text-white flex flex-col rounded text-xs border border-red shadow-lg font-fa">
                                <div className="flex font-en p-2" dir="ltr">
                                    <div className="flex flex-1 text-sm text-start items-center justify-start">
                                        <div className="h-6 w-6">{typeKeys[filetypekey].icon}</div>
                                        {file.data.name}
                                    </div>
                                    <Button
                                        isIconOnly
                                        onClick={() => toast.dismiss(t)}
                                        className="h-6 w-6 !min-w-0 !rounded"
                                    >
                                        <X />
                                    </Button>
                                </div>
                                <Separator className="bg-red"/>
                                <div className="font-bold p-2">
                                {err.code === "ERR_CANCELED" ? "عملیات آپلود فایل متوقف شد." : "امکان آپلود فایل وجود ندارد."}</div>
                            </div>
                        ), {
                            duration: 150000000,
                        })
                    })
                })
                .catch((err) => {
                    toast.custom((t) => (
                        <div className="bg-white text:black dark:bg-black dark:text-white flex flex-col rounded text-xs border border-red shadow-lg font-fa">
                            <div className="flex font-en p-2" dir="ltr">
                                <div className="flex flex-1 text-sm text-start items-center justify-start">
                                    <div className="h-6 w-6">{typeKeys[filetypekey].icon}</div>
                                    {file.data.name}
                                </div>
                                <Button
                                    isIconOnly
                                    onClick={() => toast.dismiss(t)}
                                    className="h-6 w-6 !min-w-0 !rounded"
                                >
                                    <X />
                                </Button>
                            </div>
                            <Separator className="bg-red"/>
                            <div className="font-bold px-2">امکان آپلود این فایل به {Object.keys(err.response.data).length > 1 ? "دلایل" : "دلیل"} زیر وجود ندارد:</div>
                            <ul className="list-disc list-inside p-2">
                                {err.response.data}
                            </ul>
                        </div>
                    ), {
                        duration: 150000000,
                    })
                })
            })
            
        },
        ...config
    });
    
    const [files, setFiles] = useState<FilesProps[]>([]);

    // const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    //     <li key={file.name}>
    //       {file.name} - {file.size} bytes
    //       <ul>
    //         {errors.map(e => (
    //           <li key={e.code}>{e.message}</li>
    //         ))}
    //       </ul>
    //     </li>
    //   ));

    // Uploader Icon and Text based on type
     let customizedSections = {
        ...typeKeys,
        
        ...Object.keys(customize ?? {}).reduce((acc: {[key: string]: any} = {}, key) => {
            if (typeKeys[key as keyof typeof typeKeys]) { // chears // learn
                acc[key] = { ...typeKeys[key as keyof typeof typeKeys], ...(customize?.[key] ?? {}) };
            }
            return acc;
        }, {}),
    }

    useEffect(() => {
        onFilesChange?.(files);
    }, [files])
  
    return (
        <div
            className={resetClassName ? className : cn(
                " relative overflow-hidden rounded border-dashed border-2 bg-gray/50 cursor-pointer p-2 flex flex-col items-center justify-center",
                { "border-purple": isDragAccept },
                { "border-red": isDragReject},
                { "border-dark": isFocused},
                className
            )}
            {...getRootProps()}
            onClick={open}
        >
        <input {...getInputProps()} />
            {children
            ?
                children
            :
                <>
                    {customizedSections[type].icon}
                    <div className="flex flex-col items-center justify-center">
                        <div className="text-sm">انتخاب {multi ? customizedSections[type].pluralText : customizedSections[type].text}</div>
                        <div className="text-xs">میتوانید {multi ? customizedSections[type].pluralText : customizedSections[type].text} را به اینجا کشیده و رها کنید</div>
                        <Separator />
                        <div className="text-xs">حداکثر حجم {(multi ? "هر یک از " + customizedSections[type].pluralText : customizedSections[type].text)} <span className="font-en underline">{maxFileSize}MB</span> میتواند باشد.</div>
                    </div>
                    {(isDragAccept || isDragReject) && (
                        <div className={`absolute flex flex-col items-center justify-center h-full w-full backdrop-blur-sm ${isDragAccept ? "bg-purple/70" : "bg-red/70"}`}>
                            {isDragAccept
                            ?
                                <Grab />
                            :
                                <Ban />
                            }
                            <div className="text-xs">
                                {isDragAccept
                                ?
                                    "فایل(ها) را رها کنید!"
                                :
                                    "امکان آپلود برخی از فایل\u200Cها وجود ندارد"
                                }
                            </div>
                        </div>
                    )}
                    {/* {fileRejectionItems} */}
                </>
            }
        </div>
    );
}