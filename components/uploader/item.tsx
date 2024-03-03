import React, { useState } from "react";

import { fileSize } from "@/lib/fileSize";
import { cn } from "@/lib/utils";

import { FilesProps } from "./data";
import { typeKeys } from "./dropzone";

import Image from "next/image";
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
    Tooltip,
    Link,
    Chip,
} from "@nextui-org/react";

import { Trash2, X } from "lucide-react";

import VideoPlayer from "@/components/video/player";
import { Spinner } from "@/components//spinner";

export const Item = ({
    item,
    deletable
}: {
    item: FilesProps,
    deletable?: () => void
}) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [modalV, setModalV] = useState<boolean>(false);
    const blob = new Blob([item.data], { type: item.data.type });
    const blobUrl = URL.createObjectURL(blob);

    const deleteItem = () => {
        deletable?.();
        item.status = "deleted"
    }
    
    // const [order, setOrder] = useState<number>(); // todo: order items
    // useEffect(() => {
    //     const now = Date.now();
    //     let orderNumber;
    //     switch (item.status) {
    //         case "error":
    //             orderNumber = now*100;
    //             break;
    //         case "uploading":
    //             orderNumber = now*10000;
    //             break;
    //         case "success":
    //             orderNumber = now*1000000;
    //             break;
    //         default:
    //             orderNumber = now;
    //             break;
    //     }
    //     setOrder(orderNumber);
    // }, [item.status])
    return (
        <div
            key={item.key}
            className={cn(
                "flex rounded border relative p-1",
                item.status === "uploading" ? "border-blue animate-pulse" : null,
                item.status === "success" ? "border-green" : null,
                item.status === "error" ? "border-red" : null
            )}
            dir="ltr"
            id={item.key.replace(/\./g, '')}
        >
            <Button
                className="group flex flex-col items-center justify-center aspect-square w-16 h-16 !min-w-0 rounded overflow-hidden relative p-0 bg-transparent"
                onClick={() => item.typeKey !== "doc" && setModalV(true)}
            >
                {item.typeKey === "image" ?
                    <Image
                        src={blobUrl}
                        alt={item.data.name}
                        className="h-full w-full object-cover"
                        width={100}
                        height={100}
                    />
                :
                    React.cloneElement(typeKeys[item.typeKey].icon, { size: "100px" })
                }
                {item.typeKey !== "doc" ?
                    <div dir="rtl" className={cn(
                        "text-xs absolute flex items-center justify-center w-full bottom-0 truncate bg-black text-white",
                        // the following is the style for hover; deprecated
                        // (item.typeKey === "image" && "text-black h-full top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray/70 backdrop-blur")
                    )}>
                        نمایش فایل
                    </div>
                : null}
            </Button>
            <Modal
                isOpen={modalV}
                onClose={() => setModalV(false)}
                className="rounded"
                motionProps={{
                    variants: {
                        enter: {
                        y: 0,
                        opacity: 1,
                        transition: {
                            duration: 0.3,
                            ease: "easeOut",
                        },
                        },
                        exit: {
                        y: -20,
                        opacity: 0,
                        transition: {
                            duration: 0.2,
                            ease: "easeIn",
                        },
                        },
                    }
                    }}
            >
                <ModalContent>
                        <ModalHeader className="flex !gap-1 items-center justify-center font-normal text-sm">
                            پیش&zwnj;نمایش: <strong>{item.data.name}</strong>
                        </ModalHeader>
                        <ModalBody>
                            {item.typeKey === "image" ?
                                <Image
                                    src={blobUrl}
                                    alt={item.data.name}
                                    className="h-full w-full"
                                    width={100}
                                    height={100}
                                />
                            : null}
                            {item.typeKey === "video" ?
                                <VideoPlayer //
                                    options={{
                                        autoplay: true,
                                        controls: true,
                                        responsive: true,
                                        fluid: true,
                                        sources: [{
                                            src: blobUrl,
                                            type: item.data.type
                                        }]
                                    }}
                                />
                            : null}
                            {/* // todo: add previewer for docs */}
                        </ModalBody>
                </ModalContent>
            </Modal>
            <div className="flex flex-col justify-between flex-1">
                <div className="flex flex-col">
                    <div className="flex justify-start items-center text-sm w-[calc(100%-10px)]">
                        {item.typeKey === "image" ?
                            <div>
                                {React.cloneElement(typeKeys[item.typeKey].icon, { size: "20px" })}
                            </div>
                        : null}
                        <Tooltip
                            showArrow={true}
                            content={item.data.name}
                            className="rounded"
                        >
                            <div className={cn(
                                "truncate",
                                item.status === "error" ? "line-through" : null
                            )}>
                                {item.data.name}
                            </div>
                        </Tooltip>
                    </div>
                    <div className="flex justify-start items-center text-2xs font-en">
                        {item.percent === 0 && item.status !== "error" ?
                            <Spinner />
                        : null}
                        {item.percent === 0 && item.status === "error" ?
                            <div>-</div>
                        : null}
                        {item.percent !== 0 ?
                            <div className={cn(
                                item.status === "uploading" ? "text-blue" : null,
                                item.status === "success" ? "text-green" : null,
                                item.status === "error" ? "text-red" : null
                            )}>
                                <strong>{fileSize(item.data.size*item.percent/100).size} </strong>
                                {fileSize(item.data.size*item.percent/100).unit}
                            </div>
                        : null}
                        /
                        <div>
                            <strong>{fileSize(item.data.size).size} </strong>
                            {fileSize(item.data.size).unit}
                        </div>
                    </div>
                    {item.quality && (<Chip variant="flat" className="rounded text-2xs p-1 h-auto"><strong>{item.quality.value}</strong>{item.quality.unit}</Chip>)}
                </div>
                <div className="flex justify-center items-center">
                    {item.status === "success" ?
                        <Button
                            href={item.url}
                            as={Link}
                            showAnchorIcon={true}
                            target="_blank"
                            className="rounded w-full h-7 bg-green text-white"
                        >
                            لینک
                        </Button>
                    :
                        <>
                        <div className="bg-gray w-full h-3 rounded overflow-hidden">
                            <div
                                style={{ width: `${item.percent}%` }}
                                className={cn(
                                    "h-full bg-green rounded",
                                    item.status === "uploading" ? "bg-blue" : null,
                                    item.status === "error" ? "bg-red" : null,
                                )}
                            >
                            </div>
                        </div>
                        <div className="text-xs font-en">{item.percent}%</div>
                        </>
                    }
                    
                </div>
            </div>
            {item.status === "uploading" ?
                <>
                <Button
                    isIconOnly
                    className="absolute top-0 right-0 m-1 w-4 h-4 rounded !min-w-0 bg-black hover:bg-red"
                    onPress={onOpen}
                >
                    <X className="text-white" />
                </Button>
                <Modal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    className="rounded"
                    motionProps={{
                        variants: {
                            enter: {
                            y: 0,
                            opacity: 1,
                            transition: {
                                duration: 0.3,
                                ease: "easeOut",
                            },
                            },
                            exit: {
                            y: -20,
                            opacity: 0,
                            transition: {
                                duration: 0.2,
                                ease: "easeIn",
                            },
                            },
                        }
                        }}
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                            <ModalHeader className="flex flex-col gap-1 text-center" dir="ltr">
                                {item.data.name}
                            </ModalHeader>
                            <ModalBody>
                                آپلود فایل متوقف شود؟
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="danger"
                                    className="rounded"
                                    variant="light"
                                    onPress={onClose}
                                    onClick={() => item.controller?.abort()}
                                >
                                    بله
                                </Button>
                                <Button
                                    color="primary"
                                    className="rounded"
                                    onPress={onClose}
                                >
                                    خیر
                                </Button>
                            </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
                </>
            : null}
            {item.status === "success" && deletable ?
                <>
                <Button
                    isIconOnly
                    className="absolute top-0 right-0 m-1 w-4 h-4 p-1 rounded !min-w-0 bg-black hover:bg-red"
                    onPress={onOpen}
                >
                    <Trash2 className="text-white" />
                </Button>
                <Modal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    className="rounded"
                    motionProps={{
                        variants: {
                            enter: {
                            y: 0,
                            opacity: 1,
                            transition: {
                                duration: 0.3,
                                ease: "easeOut",
                            },
                            },
                            exit: {
                            y: -20,
                            opacity: 0,
                            transition: {
                                duration: 0.2,
                                ease: "easeIn",
                            },
                            },
                        }
                        }}
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                            <ModalHeader className="flex flex-col gap-1 text-center" dir="ltr">
                                {item.data.name}
                            </ModalHeader>
                            <ModalBody>
                                فایل حذف شود؟
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="danger"
                                    className="rounded"
                                    variant="light"
                                    onPress={onClose}
                                    onClick={deleteItem}
                                >
                                    بله
                                </Button>
                                <Button
                                    color="primary"
                                    className="rounded"
                                    onPress={onClose}
                                >
                                    خیر
                                </Button>
                            </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
                </>
            : null}
        </div>
    );
}