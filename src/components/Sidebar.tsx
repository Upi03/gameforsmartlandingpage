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
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6), inset 0 2px 10px rgba(255,255,255,0.03);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin-left: 50px;
                    margin-top: 36px;
                    padding: 60px 24px; /* Slightly reduced padding for better balance */
                    z-index: 1000;
                    position: relative;
                }
                .sidebar-menu-items {
                    display: flex;
                    flex-direction: column;
                    gap: 42px; /* Standardized gap for consistent spacing */
                    width: 100%;
                }
                .position-relative {
                    position: relative;
                }
                .menu-link {
                    color: rgba(255, 255, 255, 0.35);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 108px !important; /* Increased from 96px */
                    height: 108px !important;
                    min-width: 108px !important;
                    border-radius: 30px !important;
                    position: relative;
                    border: 1px solid transparent !important;
                    background: transparent !important;
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    overflow: hidden;
                }
                .menu-link i {
                    font-size: 68px !important; /* Increased from 60px for even better visibility */
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    height: 100%;
                    -webkit-text-stroke: 1.8px currentColor;
                    transition: all 0.3s ease;
                }
                
                /* Active State */
                .active-menu {
                    background: rgba(255, 140, 0, 0.12) !important;
                    color: #ff8c00 !important;
                    box-shadow: 0 0 30px rgba(255, 140, 0, 0.1) inset;
                    border: 1px solid rgba(255, 140, 0, 0.25) !important;
                }
                .active-menu i {
                    color: #ff8c00 !important;
                    filter: drop-shadow(0 0 12px rgba(255, 140, 0, 0.8));
                }
                .active-neon-indicator {
                    position: absolute;
                    left: -20px; /* Brought closer to match smaller height */
                    top: 50%;
                    transform: translateY(-50%);
                    width: 4px; /* Thinner as requested */
                    height: 48px; /* Shorter as requested */
                    background: linear-gradient(180deg, #ffb347 0%, #ff8c00 100%);
                    border-radius: 4px;
                    box-shadow: 0 0 15px #ff8c00, 0 0 5px #ff8c00;
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
                    background: rgba(255, 255, 255, 0.04) !important;
                    border-color: rgba(255, 255, 255, 0.1) !important;
                    transform: translateY(-2px);
                }
                .menu-link:hover:not(.active-menu) i {
                    filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.4));
                }

                /* Responsive */
                @media (max-width: 1400px) {
                    .sidebar-menu-capsule {
                        margin-left: 30px;
                        padding: 50px 20px;
                    }
                    .menu-link {
                        width: 80px !important;
                        height: 80px !important;
                        min-width: 80px !important;
                    }
                    .menu-link i {
                        font-size: 40px !important;
                    }
                    .sidebar-menu-items {
                        gap: 32px;
                    }
                }

                @media (max-width: 768px) {
                    .sidebar-menu-capsule {
                        margin-left: 10px;
                        margin-top: 10px;
                        height: auto;
                        min-height: auto;
                        border-radius: 50px;
                        padding: 24px 12px;
                    }
                    .sidebar-menu-items {
                        gap: 20px;
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
