import { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore';
import SidebarSkeleton from './skeletons/SidebarSkeleton';
import { User } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

const Sidebar = () => {
    const { users, selectedUser, setSelectedUser, isUsersLoading, getUsers } = useChatStore();
    const { onlineUsers } = useAuthStore();

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    if (isUsersLoading) return <SidebarSkeleton />;
    return (
        <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
            {/* Header */}
            <div className="border-b border-base-300 w-full p-5">
                <div className="flex items-center gap-2">
                    <User className="size-6" />
                    <span className="font-medium hidden lg:block">Contacts</span>
                </div>
                {/* Online filter Toggle */}
            </div>

            <div className="overflow-y-auto w-full py-3">
                {users.map((user) => (
                    <button
                        key={user._id}
                        onClick={() => setSelectedUser(user)}
                        className={`
                            w-full p-3 flex items-center gap-3 hover:bg-base-300/50 transition-colors border-b border-b-base-300/30
                            ${selectedUser?._id === user._id ? "bg-base-300/50 ring-1 ring-base-300" : ""}    
                        `}
                    >
                        <div className="relative mx-auto lg:mx-0">
                            <img
                                src={user.profileImgUrl || "/avatar.png"}
                                alt={user.fullName}
                                className='size-12 rounded-full object-cover'
                            />
                            {onlineUsers.includes(user._id) && (
                                <span className='absolute bottom-0 right-0 
                                size-3 bg-green-500 rounded-full 
                                ring-2 ring-zinc-900' />
                            )}
                        </div>

                        {/* User Info - only visible on large screens */}
                        <div className="hidden lg:block flex-1 text-left min-w-0">
                            <div className="font-medium truncate">{user.fullName}</div>
                            <div className="text-sm text-zinc-400">
                                {onlineUsers.includes(user._id) ? "Online" : "Offine"}
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </aside>
    )
}

export default Sidebar;