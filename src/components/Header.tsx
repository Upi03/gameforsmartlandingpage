"use client";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSearch } from '@/context/SearchContext';
import { gamesData } from '@/data/gamesData';
import { tournamentsData } from '@/data/tournamentsData';

import { useSidebar } from '@/context/SidebarContext';

export default function Header() {
    const { searchQuery, setSearchQuery } = useSearch();
    const { toggleSidebar, isSidebarOpen } = useSidebar();
    const router = useRouter();

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        const allData = [...gamesData, ...tournamentsData];
        const firstMatch = allData.find(item =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.type.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (firstMatch) {
            router.push(firstMatch.href);
        }
    };

    return (
        <header className="header-section bgn-4 w-100">
            <div className="py-sm-6 py-3 mx-xxl-10 mx-md-8 mx-2">
                <div className="d-between gap-lg-4 gap-2">
                    <div className="top-bar alt d-flex align-items-center gap-4">
                        <button
                            className={`sidebar-toggle-btn ${isSidebarOpen ? 'open' : ''}`}
                            type="button"
                            onClick={toggleSidebar}
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                        <Link className="navbar-brand d-flex align-items-center gap-4" href="/home" style={{ maxWidth: '240px', width: '100%' }}>
                            <img className="w-100 d-block" src="/images/gameforsmartlogo.webp" alt="GameForSmart Logo" />
                        </Link>
                    </div>
                    <div className="header-btn-area d-flex align-items-center justify-content-between gap-xl-6 gap-3 w-100 position-relative">
                        <div className="search-bar d-none d-lg-block" style={{ maxWidth: '400px', width: '100%' }}>
                            <form action="#" onSubmit={handleSearchSubmit}>
                                <div className="input-area d-flex align-items-center gap-2">
                                    <i className="ti ti-search"></i>
                                    <input
                                        type="text"
                                        placeholder="Search Competition, Games..."
                                        style={{ padding: '0 4px' }}
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </form>
                        </div>

                        <div className="header-btns d-flex align-items-center justify-content-end gap-lg-6 gap-sm-4 gap-2 w-100">
                            <button className="search-toggle-btn toggle-btn box-style fs-2xl d-block d-lg-none">
                                <i className="ti ti-search"></i>
                            </button>


                            <button className="ntf-btn box-style fs-2xl">
                                <i className="ti ti-bell-filled"></i>
                            </button>
                            <div className="header-profile pointer">
                                <div className="profile-wrapper d-flex align-items-center gap-3">
                                    <div className="img-area overflow-hidden">
                                        <img className="w-100" src="/assets/img/profile.png" alt="profile" />
                                    </div>
                                    <span className="user-name d-none d-xxl-block text-nowrap">David Malan</span>
                                    <i className="ti ti-chevron-down d-none d-xxl-block"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
