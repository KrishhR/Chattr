import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";


const LoginPage = () => {
    const { isLoggingIn, login } = useAuthStore();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const validateFormData = () => {
        if (!formData.email.trim()) return toast.error("Email is required");
        if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
        if (!formData.password) return toast.error("Password is required");
        if (formData.password.length < 6) return toast.error("Password must be atleast 6 characters");

        return true;
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const success = validateFormData();
        if (success === true) {
            login(formData);
        }
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2">

            {/* LEFT SIDE */}
            <div className="flex flex-col items-center justify-center p-6 sm:p-12">
                <div className="w-full max-w-md space-y-8">

                    {/* LOGO */}
                    <div className="text-center mb-8">
                        <div className="flex flex-col items-center gap-2 group">
                            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors animate-pulse">
                                <MessageSquare className="size-6 text-primary" />
                            </div>
                            <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
                            <p className="text-base-content/60">
                                Sign in to your account!
                            </p>
                        </div>
                    </div>

                    {/* FORM */}
                    <form onSubmit={(e) => handleFormSubmit(e)} className="space-y-6">

                        <div className="form-control">
                            <label htmlFor="email" className="label">
                                <span className="label-text text-sm font-medium">E-mail</span>
                            </label>
                            <div className="relative mt-1">
                                <div className="absolute z-10 inset-y-5 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="size-5 text-base-content/40" />
                                </div>
                                <input
                                    type="text"
                                    id="email"
                                    className="input focus:outline-none w-full pl-10"
                                    placeholder="mail@site.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="form-control">
                            <label htmlFor="password" className="label">
                                <span className="label-text text-sm font-medium">Password</span>
                            </label>
                            <div className="relative mt-1">
                                <div className="absolute z-10 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="size-5 text-base-content/40" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    className="input focus:outline-none w-full pl-10"
                                    placeholder="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                                <button
                                    type="button"
                                    className="absolute z-10 inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                    onClick={() => handleShowPassword()}
                                    onMouseDown={(e) => e.preventDefault()} // prevents input blur
                                >
                                    {showPassword ? (
                                        <EyeOff className="size-5 text-base-content/40" />
                                    ) : (
                                        <Eye className="size-5 text-base-content/40" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary w-full" disabled={isLoggingIn}>
                            {isLoggingIn ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    Loading...
                                </>
                            ) : (
                                "Sign in"
                            )}
                        </button>
                    </form>

                    <div className="text-center">
                        <p className="text-base-content/60">
                            Don&apos;t have an account?{" "}
                            <Link to={"/signup"} className="link no-underline link-primary">
                                Create Account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE */}
            <AuthImagePattern
                title="Welcome back!"
                subtitle="Sign in to continue your conversations and catch up with your messages."
            />
        </div>
    );
};

export default LoginPage;
