import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

const SignupPage = () => {
    const { isSigningUp, signUp } = useAuthStore();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
    });

    const handleShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const validateFormData = () => {
        if (!formData.fullName.trim()) return toast.error("Full name is required");
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
            signUp(formData);
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
                            <h1 className="text-2xl font-bold mt-2">Create Account</h1>
                            <p className="text-base-content/60">
                                Get started with your free account!
                            </p>
                        </div>
                    </div>

                    {/* FORM */}
                    <form onSubmit={(e) => handleFormSubmit(e)} className="space-y-6">
                        <div className="form-control">
                            <label htmlFor="fullName" className="label">
                                <span className="label-text text-sm font-medium">
                                    Full Name
                                </span>
                            </label>
                            <div className="relative mt-1">
                                <div className="absolute z-10 inset-y-5 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="size-5 text-base-content/40" />
                                </div>
                                <input
                                    type="text"
                                    id="fullName"
                                    className="input focus:outline-none w-full pl-10"
                                    placeholder="Jon Doe"
                                    value={formData.fullName}
                                    onChange={(e) =>
                                        setFormData({ ...formData, fullName: e.target.value })
                                    }
                                />
                            </div>
                        </div>

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
                                    onChange={(e) =>
                                        setFormData({ ...formData, email: e.target.value })
                                    }
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
                                    onChange={(e) =>
                                        setFormData({ ...formData, password: e.target.value })
                                    }
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

                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                            disabled={isSigningUp}
                        >
                            {isSigningUp ? (
                                <>
                                    <Loader2 className="size-5 animate-spin" />
                                    Loading...
                                </>
                            ) : (
                                "Create Account"
                            )}
                        </button>
                    </form>

                    <div className="text-center">
                        <p className="text-base-content/60">
                            Already have an account?{" "}
                            <Link to={"/login"} className="link no-underline link-primary">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE */}
            <AuthImagePattern
                title="Join our community"
                subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
            />
        </div>
    );
};

export default SignupPage;

{
    /* <div className="form-control">
      <label htmlFor="fullName" className="label">
          <span className="label-text text-sm font-medium">Full Name</span>
      </label>
  
      <div className="relative mt-1">
          <div className="absolute z-10 top-2.5 left-0 pl-3 flex items-center pointer-events-none">
              <User className="size-5 text-base-content/40" />
          </div>
          <input
              type="text"
              id="fullName"
              className="input validator focus:outline-none w-full pl-10"
              placeholder="Jon Doe"
              pattern="[A-Za-z][A-Za-z\s\-]*"
              minLength="3"
              maxLength="30"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
          />
  
          <p className="validator-hint mt-1 text-xs text-gray-500">
              Must be 3 to 30 characters
              <br />containing only letters
          </p>
      </div>
  </div> */
}
