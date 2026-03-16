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
                <div className="sidebar-menu-capsule">
                    <div className="sidebar-menu-items">
                        {menuItems.map((item) => (
                            <div key={item.href} className="position-relative w-100 d-flex justify-content-center">
                                {isActive(item.href) && <div className="active-neon-indicator"></div>}
                                <Link
                                    href={item.href}
                                    className={`menu-link ${isActive(item.href) ? 'active-menu' : ''}`}
                                    title={item.label}
                                    onClick={closeSidebar}
                                >
                                    <i className={`${item.icon.startsWith('ti') ? 'ti ' + item.icon : item.icon}`}></i>
                                </Link>
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
                    pointer-events: none;
                }
                .sidebar-wrapper {
                    pointer-events: auto;
                    z-index: 1000;
                    position: relative;
                }
                .sidebar-menu-capsule {
                    background: linear-gradient(180deg, #1f2128 0%, #111319 100%);
                    border-radius: 140px;
                    border: 1px solid rgba(255, 255, 255, 0.06);
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6), inset 0 2px 10px rgba(255,255,255,0.03);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin-left: 50px; /* Jarak lebih jauh agar layout jumbo terlihat lega */
                    margin-top: 36px;
                    padding: 70px 32px; /* Layout diperbesar secara signifikan */
                    z-index: 1000;
                    position: relative;
                }
                .sidebar-menu-items {
                    display: flex;
                    flex-direction: column;
                    gap: 54px; /* Jarak antar icon jumbo agar tidak sesak */
                    width: 100%;
                }
                .position-relative {
                    position: relative;
                }
                .menu-link {
                    color: rgba(255, 255, 255, 0.4);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 110px !important;
                    height: 110px !important;
                    min-width: 110px !important;
                    border-radius: 30px !important; /* Proporsi box jumbo yang modern */
                    position: relative;
                    border: none !important;
                    background: transparent !important;
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                .menu-link i {
                    font-size: 64px !important; /* Icon Raksasa sesuai request "sama-sama besar" */
                    -webkit-text-stroke: 1.8px currentColor;
                    transition: all 0.3s ease;
                }
                
                /* Active State */
                .active-menu {
                    background: rgba(255, 140, 0, 0.15) !important;
                    color: #ff8c00 !important;
                    box-shadow: 0 0 35px rgba(255, 140, 0, 0.15) inset;
                    border: 1px solid rgba(255, 140, 0, 0.2) !important;
                }
                .active-menu i {
                    color: #ff8c00 !important;
                    filter: drop-shadow(0 0 12px rgba(255, 140, 0, 0.9));
                }
                .active-neon-indicator {
                    position: absolute;
                    left: -32px;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 8px;
                    height: 64px;
                    background: linear-gradient(180deg, #ffb347 0%, #ff8c00 100%);
                    border-radius: 4px;
                    box-shadow: 0 0 18px #ff8c00, 0 0 6px #ff8c00;
                    animation: pulse-neon 2s infinite alternate;
                    z-index: 5;
                }
                @keyframes pulse-neon {
                    0% { opacity: 0.8; box-shadow: 0 0 8px #ff8c00; }
                    100% { opacity: 1; box-shadow: 0 0 20px #ff8c00, 0 0 8px #ff8c00; }
                }

                /* Hover State */
                .menu-link:hover:not(.active-menu) {
                    color: #fff !important;
                    background: rgba(255, 255, 255, 0.05) !important;
                    transform: scale(1.1);
                }
                .menu-link:hover:not(.active-menu) i {
                    filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.5));
                }

                /* Responsive */
                @media (max-width: 768px) {
                    .sidebar-menu-capsule {
                        margin-left: 10px;
                        margin-top: 10px;
                        height: 90vh;
                        border-radius: 50px;
                        padding: 24px 12px;
                    }
                    .sidebar-menu-items {
                        gap: 24px;
                    }
                    .menu-link {
                        width: 48px !important;
                        height: 48px !important;
                        min-width: 48px !important;
                        border-radius: 16px !important;
                    }
                    .menu-link i {
                        font-size: 24px !important;
                    }
                    .active-neon-indicator {
                        left: -12px;
                        height: 24px;
                        width: 4px;
                    }
                }
            `}</style>
        </aside>
    );
}
