"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebar } from '@/context/SidebarContext';

export default function Sidebar() {
    const pathname = usePathname();
    const { isSidebarOpen, closeSidebar } = useSidebar();

    const isActive = (path: string) => {
        if (path === '/home' && pathname === '/') return true;
        return pathname === path || pathname.startsWith(path + '/');
    };

    const menuItems = [
        { href: '/home', icon: 'ti-home', label: 'Home' },
        { href: '/competitions', icon: 'ti-trophy', label: 'Competitions' },
        { href: '/games', icon: 'ti-device-gamepad-2', label: 'Games' },
        { href: '/community', icon: 'ti-users', label: 'Community' },
        { href: '/about', icon: 'ti-info-circle', label: 'About' },
        { href: '/contact', icon: 'ti-mail', label: 'Contact' },
    ];

    return (
        <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
            <div className="sidebar-wrapper d-flex">
                <div className="sidebar-menu-capsule py-xxl-20 py-sm-15 py-10 px-6">
                    <div className="d-grid gap-sm-12 gap-8 sidebar-menu-items text-center">
                        {menuItems.map((item) => (
                            <div key={item.href} className="p-1 position-relative">
                                <Link
                                    href={item.href}
                                    className={`menu-link transition-all ${isActive(item.href) ? 'active-menu' : ''}`}
                                    title={item.label}
                                    onClick={closeSidebar}
                                >
                                    <i className={`${item.icon.startsWith('ti') ? 'ti ' + item.icon : item.icon}`} style={{ fontSize: '36px' }}></i>
                                </Link>
                                {isActive(item.href) && <div className="active-neon-indicator"></div>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <style jsx>{`
                .sidebar {
                    background: transparent !important;
                    border: none !important;
                    box-shadow: none !important;
                    z-index: 1000;
                }
                .sidebar-menu-capsule {
                    background: #1a1a1a;
                    border-radius: 100px;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
                    display: inline-block;
                    margin-left: 15px;
                    margin-top: 15px;
                }
                .menu-link {
                    color: rgba(255, 255, 255, 0.4);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 70px !important;
                    height: 70px !important;
                    min-width: 70px !important;
                    border-radius: 50% !important;
                    position: relative;
                    border: none !important;
                    background: transparent !important;
                    transition: all 0.3s ease;
                }
                .active-menu {
                    background: rgba(255, 140, 0, 0.1) !important;
                    color: #ff8c00 !important;
                    border: none !important;
                }
                .active-menu i {
                    text-shadow: 0 0 10px #ff8c00, 0 0 20px #ff4500;
                    color: #ff8c00 !important;
                }
                .active-neon-indicator {
                    position: absolute;
                    left: -10px;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 4px;
                    height: 24px;
                    background: #ff8c00;
                    border-radius: 0 4px 4px 0;
                    box-shadow: 0 0 15px #ff8c00, 0 0 5px #ff8c00;
                    animation: pulse-neon 1.5s ease-in-out infinite alternate;
                }
                @keyframes pulse-neon {
                    from { opacity: 0.7; box-shadow: 0 0 8px #ff8c00; }
                    to { opacity: 1; box-shadow: 0 0 18px #ff8c00, 0 0 8px #ff8c00; }
                }
                .menu-link:hover:not(.active-menu) {
                    color: #fff !important;
                    background: rgba(255, 140, 0, 0.2) !important;
                }
                .menu-link:hover i {
                    transform: scale(1.1);
                }
                .transition-all {
                    transition: all 0.3s ease;
                }

                @media (max-width: 991px) {
                    .sidebar-menu-capsule {
                        margin-left: 10px;
                        height: 90vh;
                        border-radius: 50px;
                    }
                }
            `}</style>
        </aside>
    );
}
