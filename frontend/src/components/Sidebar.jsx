import { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore';
import SidebarSkeleton from './skeletons/SidebarSkeleton';
import { User } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useState } from 'react';

const Sidebar = () => {
    const { users, selectedUser, setSelectedUser, isUsersLoading, getUsers } = useChatStore();
    const { onlineUsers } = useAuthStore();
    const [showOnlineOnly, setShowOnlineOnly] = useState(false);

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    const filteredUsers = showOnlineOnly ? users.filter(user => onlineUsers?.includes(user?._id)) : users;

    if (isUsersLoading) return <SidebarSkeleton />;
    return (
        <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
            {/* Header */}
            <div className="border-b border-base-300 w-full p-5">
                <div className="flex items-center gap-2">
                    <User className="size-6" />
                    <span className="font-medium hidden lg:block">Contacts</span>
                </div>

                <div className='mt-3 hidden lg:flex items-center gap-2'>
                    <label className='cursor-pointer flex items-center gap-2'>
                        <input
                            type="checkbox"
                            checked={showOnlineOnly}
                            className='checkbox checkbox-sm'
                            onChange={() => setShowOnlineOnly(!showOnlineOnly)}
                        />
                        <span className='text-sm'>Show online only</span>
                    </label>
                    <span className='text-sx text-zinc-500'>({onlineUsers.length - 1} users)</span>
                </div>

            </div>

            <div className="overflow-y-auto w-full py-3">
                {filteredUsers.map((user) => (
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

                {filteredUsers.length === 0 && (
                    <div className='text-center text-zinc-500 py-4'>No online users</div>
                )}
            </div>
        </aside>
    )
}

export default Sidebar;