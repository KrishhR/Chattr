import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, } from "lucide-react";

const Navbar = () => {
    const { authUser, logout } = useAuthStore();

    return (
        <header className="border-b border-base-300 w-full fixed top-0 z-40 backdrop-blur-lg bg-base-100/80">
            <div className="container mx-auto px-4 h-16">
                <div className="flex items-center justify-between h-full">

                    {/* LOGO */}
                    <div className="flex items-center gap-8">
                        <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
                            <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                                <MessageSquare className="size-5 text-primary" />
                            </div>
                            <h1 className="text-lg font-bold">Chattr</h1>
                        </Link>
                    </div>

                    {/* right side of navbar */}
                    <div className="flex items-center gap-2">
                        <Link to="/settings" className="btn btn-sm gap-2 transition-colors tooltip tooltip-left" data-tip="Settings">
                            <Settings className="size-6" />
                            {/* <span className="hidden sm:inline">Settings</span> */}
                        </Link>

                        {authUser && (
                            <>
                                <Link to="/profile" className="btn btn-sm flex items-center tooltip tooltip-bottom" data-tip="Profile">
                                    {/* <User className="size-4" /> */}
                                    <img
                                        src={authUser?.profileImgUrl || "/avatar.png"}
                                        alt="Profile Image"
                                        className="size-8 rounded-full object-cover"
                                    />
                                    {/* <span className="hidden sm:inline">Profile</span> */}
                                </Link>

                                <button className="btn btn-sm flex gap-2 items-center tooltip tooltip-bottom" data-tip="Logout" onClick={logout}>
                                    <LogOut className="size-6" />
                                    {/* <span className="hidden sm:inline">Logout</span> */}
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
