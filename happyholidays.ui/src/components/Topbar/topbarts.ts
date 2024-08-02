import { toast } from "react-toastify";

export const handleCopyClick = (event: Event) => {
    // navigator.clipboard.writeText(target.textContent || "")
    //     .then(() => {
    //         console.log(target.textContent);
    //     })
    //     .catch(() => {
    //         console.error("Failed to copy text");
    //     });
    try {
        const target = event.target as HTMLElement;
        navigator.clipboard.writeText(target.textContent || "");
        console.log(target.textContent);
        toast.info("Text Coppied!", {
            position: "top-center",
            theme: "dark",
            autoClose: 2500,
        })
    } catch (err) {
        console.error("Failed to copy text");
        toast.error("Text Coppied!", {
            position: "top-center",
            theme: "dark",
            autoClose: 2500,
        })
    }
}