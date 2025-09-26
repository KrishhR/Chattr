import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";


const MessageInput = () => {
    const fileInputRef = useRef(null);
    const { sendMessage } = useChatStore();

    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleRemoveImage = () => {
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSendMessage = async (event) => {
        event.preventDefault();

        if (!text.trim() && !imagePreview) return;
        try {
            await sendMessage({
                text: text.trim(),
                image: imagePreview,
            });
            // clear form
            setText("");
            setImagePreview(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
        catch (error) {
            toast.error("Failed to send message");
            console.log("Failed to send message: ", error);
        }
    };

    return (
        <div className="p-4 w-full">
            {/* Image Preview */}
            {imagePreview && (
                <div className="mb-3 flex items-center gap-2">
                    <div className="relative">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="size-20 object-cover rounded-lg border border-zinc-700"
                        />
                        <button
                            onClick={handleRemoveImage}
                            type="button"
                            className="absolute size-5 -top-1.5 -right-1.5 rounded-full bg-base-300 flex items-center justify-center"
                        >
                            <X className="size-3" />
                        </button>
                    </div>
                </div>
            )}

            {/* Form Input section */}
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <div className="flex-1 flex gap-2">
                    <input
                        type="text"
                        className="w-full input rounded-lg input-sm sm:input-md focus:outline-0"
                        value={text}
                        name="text"
                        placeholder="Type a message..."
                        onChange={(e) => setText(e.target.value)}
                        autoComplete="off"
                    />

                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        name="image"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                    />

                    <button
                        type="button"
                        className={`hidden sm:flex btn btn-circle ${imagePreview ? 'text-emerald-500' : 'text-zinc-400'}`}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Image size={20} />
                    </button>
                </div>
                <button
                    type="submit"
                    className={`btn btn-sm ${!text.trim() && !imagePreview ? 'bg-zinc-400' : 'btn-primary'}`}
                    disabled={!text.trim() && !imagePreview}
                >
                    <Send size={20} />
                </button>
            </form>
        </div>
    )
}

export default MessageInput;