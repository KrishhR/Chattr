import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios.js";

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    // TODO: optimize it later
    setSelectedUser: (user) => {
        set({ selectedUser: user })
    },

    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("/chat/users");

            if (res.data?.success == true) {
                set({ users: res.data?.users });
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
        finally {
            set({ isUsersLoading: false });
        }
    },

    getMessages: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const res = await axiosInstance.get(`/chat/get/${userId}`);
            if (res.data?.success === true) {
                set({ messages: res.data?.messages });
            }
        }
        catch (error) {
            toast.error(error.response.data?.message);
        }
        finally {
            set({ isMessagesLoading: false });
        }
    },

    sendMessage: async (messageData) => {
        const { messages, selectedUser } = get();
        try {
            const res = await axiosInstance.post(`/chat/send/${selectedUser?._id}`, messageData);
            if (res.data?.success == true) {
                set({ messages: [...messages, res.data?.newMessage] });
            }
        }
        catch (error) {
            toast.error(error.response.data.message);
        }
    },
}));