"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Breadcrumbs from '@/components/Breadcrumbs';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { TournamentInfo } from '@/data/allItemsData';

interface CompetitionDetailViewProps {
    tournament: TournamentInfo;
}

export default function CompetitionDetailView({ tournament }: CompetitionDetailViewProps) {
    const router = useRouter();
    const [isExpanded, setIsExpanded] = useState(false);
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

    // Limits for truncation
    const CHAR_LIMIT = 200;
    const isLong = tournament.description.length > CHAR_LIMIT;

    const toggleDescription = () => setIsExpanded(!isExpanded);

    const renderDescription = (text: string) => {
        const highlightWords = ['Nasional', 'Eksklusif', 'Gold', 'Silver', 'Bronze', 'Real-time', 'Juara', 'Tertinggi', 'Survival', 'Zombie', 'Gratis', 'Premium'];

        const highlightText = (paraText: string) => {
            let processed = paraText;
            highlightWords.forEach(word => {
                const regex = new RegExp(`\\b(${word})\\b`, 'gi');
                processed = processed.replace(regex, '<span class="text-orange-gradient fw-bold">$1</span>');
            });
            return <span dangerouslySetInnerHTML={{ __html: processed }} />;
        };

        if (!isLong || isExpanded) {
            return text.split('\n\n').map((para, i) => (
                <p key={i} className="mb-4">{highlightText(para)}</p>
            ));
        }
        return <p className="mb-0">{highlightText(text.substring(0, CHAR_LIMIT) + '...')}</p>;
    };

    const isTournament = tournament.type === "tournament" ||
        (tournament as any).category === "tournament" ||
        tournament.title.includes("Lomba Cerdas Cermat");

    const maxQuota = 100;
    const currentRegistered = 64;
    const progressPercent = (currentRegistered / maxQuota) * 100;

    const getYoutubeThumbnail = (url: string) => {
        if (!url) return null;
        let videoId = '';
        if (url.includes('youtube.com/embed/')) {
            videoId = url.split('youtube.com/embed/')[1]?.split('?')[0];
        } else if (url.includes('youtu.be/')) {
            videoId = url.split('youtu.be/')[1]?.split('?')[0];
        } else if (url.includes('youtube.com/watch?v=')) {
            videoId = url.split('v=')[1]?.split('&')[0];
        }
        return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;
    };

    const videoThumbnail = getYoutubeThumbnail(tournament.videoUrl || '');
    const displayImage = videoThumbnail || tournament.image;

    return (
        <>
            <Header />
            <main className={`main-container container-fluid d-flex pt-0 px-0 position-relative`}>
                <Sidebar />
                <article className="main-content mt-0 p-0 flex-grow-1 animate-fade-in" style={{ minWidth: 0 }}>
                    <div className={isTournament ? 'container-fluid px-lg-15 px-md-10 px-6 mt-lg-20 mt-10' : 'w-100 m-0 p-0 overflow-x-hidden'}>
                        {isTournament ? (
                            <>
                                <section className="font-display bg-[#0b0e12] text-[#f8f7f5] min-h-screen pt-32 pb-20" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                    <div className="container-fluid px-lg-15 px-md-10 px-6">
                                        <Breadcrumbs />
                                        <h1 className="display-five fw-extrabold text-uppercase tracking-tighter mb-8 animate-fade-in">
                                            {tournament.title}
                                        </h1>

                                        <div className="row g-8 lg:g-12 mt-4">
                                            <div className="col-lg-8 animate-slide-up">
                                                <div className="video-container rounded-4 overflow-hidden shadow-lg bg-black mb-8 border border-white/5 shadow-[#ff7a00]/5">
                                                    <div className="ratio ratio-16x9">
                                                        <iframe
                                                            src={tournament.videoUrl || "https://www.youtube.com/embed/h7MYJghRWt0"}
                                                            title="Tournament Preview"
                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                            allowFullScreen
                                                            className="w-100 h-100 border-0"
                                                        ></iframe>
                                                    </div>
                                                </div>

                                                <div className="bg-[#1a1c23] border border-white/5 p-8 rounded-4 shadow-sm mb-8 shadow-[#ff7a00]/2">
                                                    <h3 className="fs-four fw-bold mb-6 d-flex align-items-center gap-3">
                                                        <div className="w-1 h-6 bg-[#ffcc00] rounded-pill"></div>
                                                        Deskripsi Competition
                                                    </h3>
                                                    <div className="text-slate-300 fs-lg leading-relaxed premium-description">
                                                        {renderDescription(tournament.description)}
                                                    </div>
                                                </div>

                                                <div className="bg-[#1a1c23] border border-white/5 p-8 rounded-4 shadow-sm mb-8 shadow-[#ff7a00]/2">
                                                    <h3 className="fs-four fw-bold mb-6 text-[#22c55e] uppercase tracking-tight">Syarat & Ketentuan</h3>
                                                    <div className="rules-grid space-y-3">
                                                        {tournament.rules?.map((rule, index) => (
                                                            <div key={index} className="d-flex align-items-center gap-4 p-4 rounded-xl border border-white/5 bg-black/10 transition-all hover:bg-white/5">
                                                                <div className="bg-[#22c55e] flex items-center justify-center rounded-full w-6 h-6 flex-shrink-0">
                                                                    <i className="ti ti-check text-xs text-white"></i>
                                                                </div>
                                                                <span className="text-slate-200 fs-md">{rule}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-lg-4 animate-slide-right">
                                                <div className="sticky-top" style={{ top: '120px' }}>
                                                    <div className="bg-[#1a1c24] border border-white/10 rounded-4 overflow-hidden shadow-2xl shadow-black/50">
                                                        <div className="bg-[#22c55e] p-4 text-center">
                                                            <span className="text-xs font-bold text-white uppercase tracking-[0.2em]">Pendaftaran Dibuka</span>
                                                        </div>
                                                        <div className="p-8">
                                                            <div className="mb-8 text-center">
                                                                <span className="text-slate-500 text-[10px] uppercase tracking-widest font-bold d-block mb-1">Total Prize Pool</span>
                                                                <h2 className="text-4xl font-bold text-[#ffcc00] tracking-tighter m-0">{tournament.prizeMoney}</h2>
                                                                <span className="text-[10px] text-slate-600 uppercase font-bold mt-1 d-block">+ National Certificates</span>
                                                            </div>

                                                            <div className="d-flex flex-column gap-3 mb-8">
                                                                <Link
                                                                    href={`/competitions/${tournament.slug}/register`}
                                                                    className="w-100 py-4 bg-[#ff7a00] hover:bg-[#ff8c00] text-white font-bold d-flex align-items-center justify-content-center no-underline uppercase text-xs tracking-widest transition-all shadow-lg shadow-[#ff7a00]/20 hover-lift"
                                                                    style={{ borderRadius: '50px' }}
                                                                >
                                                                    <i className="ti ti-user-plus me-2 fs-5"></i>
                                                                    <span>Register Now</span>
                                                                </Link>
                                                            </div>

                                                            <div className="space-y-0">
                                                                <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-4 border-bottom border-white/20 pb-3">Competition Details</h4>
                                                                {[
                                                                    { label: "Qualifiers", value: tournament.date },
                                                                    { label: "Ticket Fee", value: tournament.ticketFee || 'Gratis' },
                                                                    { label: "Max Quota", value: tournament.teams || '100 Teams' },
                                                                    { label: "Platform", value: "Multi-platform" }
                                                                ].map((item, idx) => (
                                                                    <div key={idx} className="d-flex justify-content-between align-items-center py-3 border-bottom border-white/10">
                                                                        <span className="text-slate-400 text-xs font-medium">{item.label}</span>
                                                                        <span className={`font-bold text-xs uppercase text-white`}>{item.value}</span>
                                                                    </div>
                                                                ))}
                                                            </div>

                                                            <div className="mt-8 pt-6 border-top border-white/5">
                                                                <div className="d-flex justify-content-between items-end mb-2">
                                                                    <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">Slots Reserved</span>
                                                                    <span className="text-white font-bold text-xs">{progressPercent}%</span>
                                                                </div>
                                                                <div className="w-100 bg-white/5 h-1.5 rounded-full overflow-hidden">
                                                                    <div className="bg-[#22c55e] h-full" style={{ width: `${progressPercent}%` }}></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <Footer />
                            </>
                        ) : (
                            <div className="font-display bg-[#0a0a0a] text-slate-100 min-h-screen w-full" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                {/* Hero Section */}
                                <section className="relative w-full aspect-video md:aspect-[21/9] lg:h-[600px] overflow-hidden bg-black">
                                    <img
                                        src={tournament.image || displayImage}
                                        alt={tournament.title}
                                        className="w-100 h-100 object-fit-cover transition-transform duration-1000 hover:scale-105"
                                        style={{ objectPosition: 'center 20%' }}
                                    />

                                    {/* Gradient overlay for text readability at the bottom */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10"></div>

                                    {/* Details Overlay */}
                                    <div className="absolute inset-0 z-20 container-fluid px-lg-15 px-md-10 px-6 pb-12 d-flex flex-column justify-content-end">
                                        <div className="d-flex flex-column gap-6">
                                            <div>
                                                {tournament.status && (
                                                    <span className="inline-block bg-[#f26c0d] text-white text-[10px] font-black px-2 py-0.5 rounded mb-3 uppercase tracking-widest shadow-lg">{tournament.status}</span>
                                                )}
                                                <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tighter m-0 text-uppercase drop-shadow-2xl">
                                                    {tournament.title.split(':').map((part, i) => (
                                                        <React.Fragment key={i}>
                                                            {i === 0 ? <span className="text-white italic">{part}</span> : <><br /><span className="text-[#dce018] italic">{part.trim()}</span></>}
                                                        </React.Fragment>
                                                    ))}
                                                </h1>
                                            </div>
                                            <div className="d-flex gap-4 mt-2">
                                                <Link
                                                    href={tournament.playUrl || `/play/${tournament.slug}`}
                                                    target={tournament.playUrl ? "_blank" : "_self"}
                                                    rel={tournament.playUrl ? "noopener noreferrer" : ""}
                                                    className="bg-[#f26c0d] hover:bg-[#f26c0d]/90 text-white font-bold py-4 px-10 rounded-pill overflow-hidden d-flex align-items-center gap-2 transition-all transform hover:scale-105 text-decoration-none shadow-xl shadow-[#f26c0d]/20"
                                                >
                                                    <i className="ti ti-player-play-filled fs-5"></i>
                                                    PLAY NOW
                                                </Link>
                                                <button
                                                    onClick={() => setIsVideoModalOpen(true)}
                                                    className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold py-4 px-10 rounded-pill overflow-hidden d-flex align-items-center gap-2 transition-all border border-white/20 shadow-xl"
                                                >
                                                    <i className="ti ti-movie fs-5"></i>
                                                    WATCH TRAILER
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* Content Grid */}
                                <div className="container-fluid px-lg-15 px-md-10 px-6 py-10">
                                    <div className="row g-8">
                                        <div className="col-lg-8 space-y-12">
                                            {/* Video Player Section */}
                                            <div className="group relative rounded-xl overflow-hidden bg-[#1a1a1a] border border-white/5 aspect-video cursor-pointer shadow-2xl" onClick={() => setIsVideoModalOpen(true)}>
                                                <img src={displayImage} alt="Video Preview" className="absolute inset-0 w-100 h-100 object-fit-cover" />
                                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all d-flex align-items-center justify-content-center z-10">
                                                    <div className="w-20 h-20 bg-[#f26c0d] text-white rounded-full d-flex align-items-center justify-content-center cursor-pointer shadow-lg shadow-[#f26c0d]/40 transform group-hover:scale-110 transition-transform">
                                                        <i className="ti ti-player-play-filled fs-2"></i>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* About Section */}
                                            <section className="space-y-4">
                                                <div className="d-flex align-items-center gap-4">
                                                    <h2 className="text-2xl font-bold uppercase tracking-tight text-white m-0">Tentang Game Ini</h2>
                                                    <div className="h-px flex-1 bg-white/10"></div>
                                                </div>
                                                <div className="text-slate-400 leading-relaxed text-lg">
                                                    {renderDescription(tournament.description)}
                                                    {isLong && (
                                                        <button
                                                            onClick={toggleDescription}
                                                            className="text-[#f26c0d] hover:text-[#f26c0d]/80 text-sm font-bold mt-2 uppercase tracking-widest decoration-none border-0 bg-transparent p-0"
                                                        >
                                                            {isExpanded ? 'Show Less' : 'Show More'}
                                                        </button>
                                                    )}
                                                </div>
                                            </section>

                                            {/* Features Section */}
                                            <section className="space-y-6">
                                                <div className="d-flex align-items-center gap-4 mb-6">
                                                    <h2 className="text-2xl font-bold uppercase tracking-tight text-white m-0">Fitur Utama</h2>
                                                    <div className="h-px flex-1 bg-white/10"></div>
                                                </div>
                                                <div className="row g-4 pb-10">
                                                    {(tournament.features && tournament.features.length > 0 ? tournament.features : [
                                                        { icon: "ti-ghost", title: "Survival Challenge", desc: "Berlari dari kejaran gerombolan musuh sambil menyelesaikan puzzle logika yang rumit." },
                                                        { icon: "ti-chart-bar", title: "Survival Score", desc: "Kumpulkan poin dengan jawaban berturut-turut untuk mengaktifkan perisai pertahanan." },
                                                        { icon: "ti-world", title: "Global Leaderboard", desc: "Buktikan bahwa Anda adalah yang terpintar di dunia dengan mendaki peringkat musiman." },
                                                        { icon: "ti-sword", title: "Epic Duel", desc: "Pertarungan bos epik di mana setiap kesalahan membawa musuh lebih dekat ke posisi Anda." }
                                                    ]).map((f: any, i: number) => {
                                                        const brandColors = ['#f26c0d', '#dce018', '#92c83e'];
                                                        const color = brandColors[i % brandColors.length];
                                                        return (
                                                            <div key={i} className="col-md-6">
                                                                <div className="p-6 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all group">
                                                                    <div
                                                                        className="w-12 h-12 rounded-lg d-flex align-items-center justify-content-center mb-4 transition-transform group-hover:scale-110"
                                                                        style={{ backgroundColor: `${color}20`, color: color }}
                                                                    >
                                                                        <i className={`ti ${f.icon?.startsWith('ti-') ? f.icon : `ti-${f.icon || 'star'}`} fs-4`}></i>
                                                                    </div>
                                                                    <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
                                                                    <p className="text-slate-400 text-sm m-0">{f.description || f.desc || f.title}</p>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </section>
                                        </div>

                                        <div className="col-lg-4 space-y-6">
                                            <div className="sticky-top" style={{ top: '100px', zIndex: 10 }}>
                                                <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl overflow-hidden d-flex flex-column shadow-lg">
                                                    <div className="aspect-video position-relative bg-black overflow-hidden shadow-inner">
                                                        <img
                                                            src={tournament.image || displayImage}
                                                            alt={tournament.title}
                                                            className="w-100 h-100 object-fit-cover transition-transform duration-700 hover:scale-105"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent z-10"></div>
                                                    </div>

                                                    <div className="p-6 space-y-6 relative z-1">
                                                        <div className="bg-[#2a2a2a] p-4 rounded-xl border border-white/10">
                                                            <div className="d-flex align-items-center justify-content-between mb-2">
                                                                <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Rating Pemain</span>
                                                                <div className="d-flex align-items-center gap-1 text-[#dce018]">
                                                                    <i className="ti ti-star-filled fs-6"></i>
                                                                    <span className="font-black text-white">{tournament.rating || "4.9"}/5</span>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex align-items-center gap-3">
                                                                <span className="text-xs text-white/80 whitespace-nowrap">Sangat Positif</span>
                                                                <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden w-100">
                                                                    <div className="h-full bg-[#92c83e]" style={{ width: tournament.recommendedPercent || '98%', boxShadow: '0 0 10px rgba(146,200,62,0.5)' }}></div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="space-y-4">
                                                            {[
                                                                { label: "Developer", value: tournament.developer || "Blitz Studios" },
                                                                { label: "Publisher", value: tournament.publisher || "Rush Interactive" },
                                                                { label: "Genre", value: tournament.genre || "Trivia, Puzzle, Action" },
                                                                { label: "Rilis", value: tournament.releaseDate || "24 Okt 2023" }
                                                            ].map((item, idx) => (
                                                                <div key={idx} className="d-flex justify-content-between border-bottom border-white/5 pb-2 mb-3">
                                                                    <span className="text-slate-400 text-sm">{item.label}</span>
                                                                    <span className="text-white text-sm font-semibold">{item.value}</span>
                                                                </div>
                                                            ))}
                                                        </div>

                                                        <div className="d-flex flex-column gap-3 pt-4">
                                                            <Link
                                                                href={tournament.playUrl || `/play/${tournament.slug}`}
                                                                target={tournament.playUrl ? "_blank" : "_self"}
                                                                className="w-full bg-[#f26c0d] py-4 rounded-full font-black text-white hover:brightness-110 transition-all shadow-lg shadow-[#f26c0d]/20 uppercase tracking-widest text-decoration-none border-0 d-flex justify-content-center align-items-center gap-2"
                                                            >
                                                                <i className="ti ti-device-gamepad-2 fs-5"></i>
                                                                <span>PLAY GAME</span>
                                                            </Link>
                                                        </div>
                                                    </div>

                                                    <div className="bg-[#2a2a2a]/50 p-6 mt-auto border-top border-white/5">
                                                        <h4 className="text-white text-xs font-bold uppercase mb-3 d-flex align-items-center gap-2 m-0">
                                                            <i className="ti ti-info-circle fs-6"></i>
                                                            Spesifikasi Minimum
                                                        </h4>
                                                        <p className="text-xs text-slate-400 m-0">Windows 10 64-bit, Intel Core i5-4460 / AMD FX-6300, 8 GB RAM, NVIDIA GeForce GTX 760.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Footer />
                            </div>
                        )}
                    </div>
                </article>
            </main>

            {/* VIDEO MODAL */}
            {isVideoModalOpen && (
                <div
                    className="video-modal-overlay position-fixed inset-0 d-flex align-items-center justify-content-center animate-fade-in"
                    style={{ zIndex: 9999, background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(10px)' }}
                    onClick={() => setIsVideoModalOpen(false)}
                >
                    <button
                        className="modal-close-btn position-absolute top-10 end-10 btn-show-hide"
                        onClick={() => setIsVideoModalOpen(false)}
                        style={{ zIndex: 10001 }}
                    >
                        <i className="ti ti-x"></i>
                    </button>

                    <div
                        className="video-modal-content rounded-4 overflow-hidden border border-[#f26c0d]/40 animate-zoom-in"
                        onClick={(e) => e.stopPropagation()}
                        style={{ width: '95vw', maxWidth: '1600px', maxHeight: '90vh' }}
                    >
                        <div className="ratio ratio-16x9">
                            <iframe
                                src={`${tournament.videoUrl}?autoplay=1`}
                                title="Game Trailer"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                style={{ border: 'none' }}
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .animate-slide-up { animation: fadeInUp 0.8s ease-out forwards; }
                .animate-slide-right { animation: slideRight 0.8s ease-out forwards; }
                .animate-zoom-in { animation: zoomIn 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards; }
                .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }

                @keyframes fadeInUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes slideRight { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }
                @keyframes zoomIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

                .tracking-tighter { letter-spacing: -0.05em; }
                .text-orange-gradient {
                    background: linear-gradient(90deg, #f26c0d, #ff8c00);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .btn-show-hide {
                    background: rgba(255, 140, 0, 0.1);
                    border: 1px solid rgba(255, 140, 0, 0.3);
                    color: #ff8c00;
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 20px;
                    transition: all 0.4s ease;
                    cursor: pointer;
                }
                .btn-show-hide:hover {
                    background: #ff8c00;
                    color: #fff;
                    transform: scale(1.1);
                }
            `}</style>
        </>
    );
}
