import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,
    isLogginOut: false,
    isUpdatingProfile: false,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/auth/check');
            if (res.data?.success == true) {
                set({ authUser: res.data?.user });
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
            }
        }
        catch (error) {
            toast.error(error.response.data?.message);
        }
        finally {
            set({ isSigningUp: false });
        }
    },
}));