import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from 'socket.io-client';

const BASE_URL = import.meta.env.MODE === 'development' ? 'http://localhost:5001' : '/';

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,
    isLogginOut: false,
    isUpdatingProfile: false,
    onlineUsers: [],
    socket: null,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/auth/check');
            if (res.data?.success == true) {
                set({ authUser: res.data?.user });
                get().connectSocket();
            }
        }
        catch (error) {
            console.log("Error in useAuthStore: ", error);
            set({ authUser: null });
        }
        finally {
            set({ isCheckingAuth: false });
        }
    },

    signUp: async (data) => {
        set({ isSigningUp: true });

        try {
            const res = await axiosInstance.post('/auth/signup', data);
            if (res.data?.success == true) {
                set({ authUser: res.data?.user });
                toast.success('Account created successfully');
                get().connectSocket();
            }
        }
        catch (error) {
            toast.error(error.response.data?.message);
        }
        finally {
            set({ isSigningUp: false });
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post('/auth/login', data);
            if (res.data?.success == true) {
                set({ authUser: res.data?.user });
                toast.success("Logged in successfully");
                get().connectSocket();
            }
        }
        catch (error) {
            toast.error(error.response.data?.message);
        }
        finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        set({ isLogginOut: true });
        try {
            const res = await axiosInstance.post('/auth/logout');
            if (res.data?.success) {
                set({ authUser: null });
                toast.success(res.data?.message);
                get().disconnectSocket();
            }
        }
        catch (error) {
            toast.error(error.response.data?.message);
        }
        finally {
            set({ isLogginOut: false });
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put("/auth/update-profile", data);
            if (res.data?.success === true) {
                set({ authUser: res.data?.user });
                toast.success("Profile updated successfully!");
            }
        }
        catch (error) {
            toast.error(error.response.data?.message);
        }
        finally {
            set({ isUpdatingProfile: false });
        }
    },

    connectSocket: () => {
        const { authUser } = get();
        if (!authUser || get().socket?.connected) return;

        const socket = io(BASE_URL, {
            query: {
                userId: authUser?._id,
            }
        });
        socket.connect();
        set({ socket: socket });

        socket.on('getOnlineUsers', (onlineUserIds) => {
            set({ onlineUsers: onlineUserIds });
        })
    },

    disconnectSocket: () => {
        const { socket } = get();
        if (socket?.connected) {
            socket.disconnect();
        }
    },
}));