"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Breadcrumbs from '@/components/Breadcrumbs';
import Link from 'next/link';
import { TournamentInfo } from '@/data/allItemsData';

interface CompetitionDetailViewProps {
    tournament: TournamentInfo;
}

export default function CompetitionDetailView({ tournament }: CompetitionDetailViewProps) {
    const router = useRouter();
    const [isExpanded, setIsExpanded] = useState(false);
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const [isPlayInline, setIsPlayInline] = useState(false);
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

    const heroMedia = [
        { type: 'image', url: tournament.image, title: tournament.title },
        ...(tournament.videoUrl ? [{ type: 'video', url: tournament.videoUrl, title: 'Official Trailer' }] : []),
        ...(tournament.gameplayVideoUrl ? [{ type: 'video', url: tournament.gameplayVideoUrl, title: 'Gameplay Preview' }] : [])
    ];

    const nextMedia = () => {
        setCurrentMediaIndex((prev) => (prev + 1) % heroMedia.length);
    };

    const prevMedia = () => {
        setCurrentMediaIndex((prev) => (prev - 1 + heroMedia.length) % heroMedia.length);
    };

    // Limits for truncation
    const CHAR_LIMIT = 200;
    const isLong = tournament.description.length > CHAR_LIMIT;

    const toggleDescription = () => setIsExpanded(!isExpanded);

    const renderDescription = (text: string) => {
        // Highlighting important terms for game details
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
    const isFull = currentRegistered >= maxQuota;

    return (
        <>
            <Header />
            <main className={`main-container container-fluid d-flex pt-0 px-0 position-relative`}>
                <Sidebar />
                <article className="main-content mt-0 p-0 flex-grow-1 animate-fade-in" style={{ minWidth: 0 }}>
                    <div className={isTournament ? 'container-fluid px-lg-15 px-md-10 px-6 mt-lg-20 mt-10' : 'w-100 m-0 p-0 overflow-x-hidden'}>
                        {isTournament && (
                            <section className="tournament-details-modern font-display bg-[#221710] text-[#f8f7f5] min-h-screen pt-[120px] pb-20" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                <div className="max-w-none mx-auto px-2 lg:px-4">
                                    <Breadcrumbs />

                                    {/* PREMIUM HERO SECTION (TOURNAMENT) */}
                                    <div className="row mb-12">
                                        <div className="col-12 text-center mb-12 position-relative animate-fade-in-up">
                                            <div className="hero-glow-bg position-absolute top-50 start-50 translate-middle w-100 h-100" style={{ pointerEvents: 'none', zIndex: -1 }}>
                                                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '150%', background: 'radial-gradient(circle, rgba(255, 140, 0, 0.15) 0%, rgba(0, 0, 0, 0) 70%)', filter: 'blur(50px)' }}></div>
                                            </div>
                                            <button onClick={() => router.back()} className="text-[#f8f7f5] hover:text-[#f26c0d] transition-colors focus:outline-none !rounded-full p-2 hover:bg-white/5 d-none d-md-flex" style={{ left: '20px', top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}>
                                                <i className="ti ti-arrow-left fs-xl"></i>
                                            </button>
                                            <h1 className="premium-title text-uppercase fw-extrabold display-two mb-4 tracking-tighter position-relative z-1" style={{ textShadow: '0 0 40px rgba(255, 140, 0, 0.3)' }}>
                                                {tournament.title.includes(' - ') ? (
                                                    <>
                                                        {tournament.title.split(' - ')[0]} - <span className="text-orange-gradient">{tournament.title.split(' - ')[1]}</span>
                                                    </>
                                                ) : tournament.title}
                                            </h1>
                                            <p className="tcn-6 fs-four max-w-2xl mx-auto position-relative z-1">
                                                Ajang Kompetisi Bergengsi dengan Hadiah Puluhan Juta Rupiah
                                            </p>
                                        </div>
                                        <div className="col-12 px-xl-20">
                                            <div className="video-hero-wrapper rounded-4 overflow-hidden shadow-premium-orange animate-zoom-in">
                                                <div className="ratio ratio-16x9">
                                                    <iframe
                                                        src="https://www.youtube.com/embed/h7MYJghRWt0"
                                                        title="Tournament Preview"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                        style={{ border: 'none' }}
                                                    ></iframe>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mt-8">

                                        {/* LEFT CONTENT (70%) */}
                                        <div className="lg:col-span-2 flex flex-col gap-8 animate-slide-up">
                                            {/* DESKRIPSI COMPETITION VISUAL */}
                                            <div className="content-card-premium mb-8 p-sm-10 p-6 position-relative border" style={{ background: 'linear-gradient(145deg, #2d1e15, #221710)', borderColor: '#3d2a1d', boxShadow: '0 0 20px rgba(242,108,13,0.05)' }}>
                                                <h3 className="premium-section-title mb-8 d-flex align-items-center gap-3">
                                                    <i className="ti ti-target text-orange-glow fs-two"></i>
                                                    Deskripsi Competition
                                                </h3>

                                                <div className="row g-4 mb-8">
                                                    <div className="col-md-6">
                                                        <div className="d-flex align-items-start gap-3 p-4 rounded-4 h-100" style={{ background: 'rgba(255,140,0,0.05)', border: '1px solid rgba(255,140,0,0.15)' }}>
                                                            <div className="icon-circle bg-orange-gradient text-white mt-1" style={{ width: '48px', height: '48px', flexShrink: 0, boxShadow: '0 0 15px rgba(255,140,0,0.2)' }}>
                                                                <i className="ti ti-bulb fs-2xl"></i>
                                                            </div>
                                                            <div>
                                                                <h5 className="tcn-1 fw-bold fs-md mb-2">Tujuan Kompetisi</h5>
                                                                <p className="tcn-6 fs-sm mb-0">Menguji kemampuan akademik, mental juara, dan ketepatan siswa/i secara real-time.</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="d-flex align-items-start gap-3 p-4 rounded-4 h-100" style={{ background: 'rgba(255,140,0,0.05)', border: '1px solid rgba(255,140,0,0.15)' }}>
                                                            <div className="icon-circle bg-orange-gradient text-white mt-1" style={{ width: '48px', height: '48px', flexShrink: 0, boxShadow: '0 0 15px rgba(255,140,0,0.2)' }}>
                                                                <i className="ti ti-trophy fs-2xl"></i>
                                                            </div>
                                                            <div>
                                                                <h5 className="tcn-1 fw-bold fs-md mb-2">Tingkat Kompetisi</h5>
                                                                <p className="tcn-6 fs-sm mb-0">Persaingan skala besar antar siswa-siswi terbaik.</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="d-flex align-items-start gap-3 p-4 rounded-4 h-100" style={{ background: 'rgba(255,140,0,0.05)', border: '1px solid rgba(255,140,0,0.15)' }}>
                                                            <div className="icon-circle bg-orange-gradient text-white mt-1" style={{ width: '48px', height: '48px', flexShrink: 0, boxShadow: '0 0 15px rgba(255,140,0,0.2)' }}>
                                                                <i className="ti ti-rocket fs-2xl"></i>
                                                            </div>
                                                            <div>
                                                                <h5 className="tcn-1 fw-bold fs-md mb-2">Manfaat Peserta</h5>
                                                                <p className="tcn-6 fs-sm mb-0">Sertifikat nasional & relasi komunitas eksklusif.</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="d-flex align-items-start gap-3 p-4 rounded-4 h-100" style={{ background: 'rgba(255,140,0,0.05)', border: '1px solid rgba(255,140,0,0.15)' }}>
                                                            <div className="icon-circle bg-orange-gradient text-white mt-1" style={{ width: '48px', height: '48px', flexShrink: 0, boxShadow: '0 0 15px rgba(255,140,0,0.2)' }}>
                                                                <i className="ti ti-ticket fs-2xl"></i>
                                                            </div>
                                                            <div>
                                                                <h5 className="tcn-1 fw-bold fs-md mb-2">Biaya Daftar</h5>
                                                                <p className="tcp-1 fw-bold fs-md mb-0">{tournament.ticketFee || 'Gratis'}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="tcn-6 fs-lg premium-description pt-6 border-top border-secondary border-opacity-10 position-relative">
                                                    {renderDescription(tournament.description)}
                                                    {isLong && (
                                                        <button
                                                            onClick={toggleDescription}
                                                            className="btn-show-hide mt-4 d-flex align-items-center gap-2"
                                                        >
                                                            {isExpanded ? (
                                                                <i className="ti ti-chevron-up"></i>
                                                            ) : (
                                                                <i className="ti ti-chevron-down"></i>
                                                            )}
                                                        </button>
                                                    )}
                                                </div>
                                            </div>


                                            <div className="content-card-premium mb-10 p-sm-10 p-6 rounded-xl border border-[#3d2a1d]" style={{ background: '#2d1e15' }}>
                                                <h3 className="premium-section-title mb-8 font-bold uppercase tracking-tight text-white">Syarat & Ketentuan</h3>
                                                <div className="rules-grid space-y-3">
                                                    {tournament.rules?.map((rule, index) => (
                                                        <div key={index} className="rule-item d-flex align-items-center gap-4 p-4 rounded-xl border border-[#3d2a1d] transition-all hover:bg-[#3d2a1d]/30" style={{ background: '#221710' }}>
                                                            <div className="icon-circle-check bg-[#f26c0d] flex items-center justify-center rounded-full w-8 h-8">
                                                                <i className="ti ti-check fs-xl text-white"></i>
                                                            </div>
                                                            <span className="text-[#f8f7f5] fs-lg fw-medium">{rule}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* RIGHT SIDEBAR (30%) */}
                                        <div className="lg:col-span-1">
                                            <div className="sticky top-[180px] flex flex-col gap-6">
                                                <div className="bg-[#1a1a1a] border border-[#333] rounded-xl overflow-hidden shadow-lg">
                                                    <div className="bg-[#f26c0d] p-4 flex items-center justify-between">
                                                        <span className="text-xs font-bold text-white uppercase tracking-wider">Registration Open</span>
                                                        <div className="flex items-center gap-2">
                                                            <span className="w-2 h-2 rounded-full bg-[#f26c0d]"></span>
                                                            <span className="text-[10px] font-bold text-white/80 uppercase">Online</span>
                                                        </div>
                                                    </div>

                                                    <div className="p-8">
                                                        <div className="mb-8">
                                                            <span className="text-slate-500 text-[10px] uppercase tracking-widest font-bold d-block mb-2">Total Prize Pool</span>
                                                            <h2 className="text-3xl lg:text-4xl font-bold text-[#f26c0d] tracking-tighter m-0">
                                                                {tournament.prizeMoney}
                                                            </h2>
                                                            <span className="text-[10px] text-white/40 uppercase font-bold mt-1 d-block">+ Grand Prize Awards</span>
                                                        </div>

                                                        <div className="flex flex-col gap-0 border-t border-white/5">
                                                            {[
                                                                { label: "Qualifiers", value: tournament.date, icon: "calendar_month" },
                                                                { label: "Final Round", value: tournament.finalRound, icon: "trophy", highlight: true },
                                                                { label: "Entry Fee", value: tournament.ticketFee || 'Gratis', icon: "payments" },
                                                                { label: "Max Quota", value: tournament.teams, icon: "group" }
                                                            ].map((item, idx, arr) => (
                                                                <div key={idx} className={`flex justify-between items-center py-4 ${idx !== arr.length - 1 ? 'border-b border-white/5' : ''}`}>
                                                                    <div className="flex items-center gap-3">
                                                                        <span className="material-symbols-outlined text-slate-500 text-lg">{item.icon}</span>
                                                                        <span className="text-slate-500 text-[11px] uppercase tracking-wider font-bold">{item.label}</span>
                                                                    </div>
                                                                    <span className={`font-bold text-xs text-right ${item.highlight ? 'text-[#f26c0d]' : 'text-slate-200'}`}>
                                                                        {item.value || "N/A"}
                                                                    </span>
                                                                </div>
                                                            ))}
                                                        </div>

                                                        <div className="mt-8 pt-6 border-t border-white/5">
                                                            <div className="flex justify-between items-end mb-3">
                                                                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Slots Reserved</span>
                                                                <span className="font-bold text-white text-xs">{progressPercent}% Full</span>
                                                            </div>
                                                            <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden border border-[#333]">
                                                                <div className="bg-[#f26c0d] h-full rounded-full" style={{ width: `${progressPercent}%` }}></div>
                                                            </div>
                                                        </div>

                                                        <div className="mt-10">
                                                            {isFull ? (
                                                                <button className="w-100 py-4 !rounded-full font-bold text-slate-500 bg-white/5 border border-white/10 opacity-50 cursor-not-allowed uppercase text-xs tracking-[0.1em] transition-all">
                                                                    Max Quota Reached
                                                                </button>
                                                            ) : (
                                                                <Link
                                                                    href={`/competitions/${tournament.slug}/register`}
                                                                    className="w-100 py-4 !rounded-full bg-[#f26c0d] hover:bg-[#ff7a00] text-white font-bold text-center no-underline uppercase text-xs tracking-wider transition-all block shadow-lg shadow-[#f26c0d]/20"
                                                                >
                                                                    Register Now <i className="ti ti-chevron-right ms-2"></i>
                                                                </Link>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* TIMELINE KOMPETISI SECTION */}
                                <div className="row mt-15 animate-slide-up">
                                    <div className="col-12 text-center mb-10">
                                        <h2 className="display-six tcn-1 fw-extrabold text-uppercase m-0 d-inline-flex align-items-center gap-3">
                                            <i className="ti ti-calendar-stats text-orange-gradient"></i> Timeline Kompetisi
                                        </h2>
                                        <div className="title-underline mx-auto mt-4" style={{ width: '80px', height: '4px', background: '#ff8c00', borderRadius: '2px' }}></div>
                                    </div>
                                    <div className="col-12">
                                        <div className="timeline-horizontal-premium p-10 rounded-xl border border-[#3d2a1d] position-relative overflow-hidden" style={{ background: '#221710' }}>
                                            <div className="timeline-line position-absolute top-50 start-0 w-100" style={{ height: '4px', background: '#3d2a1d', transform: 'translateY(-50%)', zIndex: 0 }}></div>
                                            <div className="timeline-line-active position-absolute top-50 start-0" style={{ height: '4px', width: '50%', background: '#f26c0d', transform: 'translateY(-50%)', zIndex: 1, boxShadow: '0 0 15px rgba(242,108,13,0.5)' }}></div>

                                            <div className="row position-relative z-2 text-center">
                                                <div className="col-4">
                                                    <div className="timeline-step">
                                                        <div className="mb-4 tcn-6 fs-md fw-bold text-uppercase">Tahap 1</div>
                                                        <div className="timeline-dot mx-auto mb-4 bg-orange-gradient neon-orange-glow" style={{ width: '24px', height: '24px', borderRadius: '50%', border: '4px solid #111' }}></div>
                                                        <h4 className="tcn-1 fw-bold fs-lg mb-1">Pendaftaran</h4>
                                                        <p className="tcp-1 fs-sm fw-bold">Dibuka</p>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="timeline-step">
                                                        <div className="mb-4 tcn-6 fs-md fw-bold text-uppercase">Tahap 2</div>
                                                        <div className="timeline-dot mx-auto mb-4 bg-orange-gradient neon-orange-glow" style={{ width: '24px', height: '24px', borderRadius: '50%', border: '4px solid #111' }}></div>
                                                        <h4 className="tcn-1 fw-bold fs-lg mb-1">Penyisihan</h4>
                                                        <p className="tcp-1 fs-sm fw-bold">{tournament.date}</p>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="timeline-step">
                                                        <div className="mb-4 tcn-6 fs-md fw-bold text-uppercase">Tahap 3</div>
                                                        <div className="timeline-dot mx-auto mb-4 bgn-3" style={{ width: '24px', height: '24px', borderRadius: '50%', border: '4px solid rgba(255,255,255,0.2)' }}></div>
                                                        <h4 className="tcn-6 fw-bold fs-lg mb-1">Grand Final</h4>
                                                        <p className="tcn-6 fs-sm opacity-50">{tournament.finalRound}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* HADIAH & PENGHARGAAN SECTION */}
                                <div className="row mt-15 animate-slide-up">
                                    <div className="col-12 text-center mb-12">
                                        <h2 className="display-four tcn-1 fw-extrabold text-uppercase m-0 d-inline-flex align-items-center gap-3">
                                            <i className="ti ti-gift text-orange-gradient"></i> Hadiah & Penghargaan
                                        </h2>
                                        <div className="title-underline mx-auto mt-4" style={{ width: '100px', height: '4px', background: '#ff8c00', borderRadius: '2px' }}></div>
                                    </div>
                                    <div className="col-12">
                                        <div className="row g-6 justify-content-center">
                                            {/* Juara 1 */}
                                            <div className="col-xl-4 col-md-6">
                                                <div className="glass-prize-card prize-gold text-center transition-all p-10 h-100 rounded-xl border border-[#3d2a1d]" style={{ background: 'linear-gradient(180deg, rgba(242,108,13,0.1) 0%, #2d1e15 100%)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                                                    <div className="prize-visual mb-6 position-relative z-1">
                                                        <i className="ti ti-trophy fs-display-one text-[#f26c0d] d-inline-block hover-float" style={{ filter: 'drop-shadow(0 0 20px rgba(242,108,13,0.6))' }}></i>
                                                    </div>
                                                    <h4 className="fw-extrabold mb-2 text-uppercase tracking-widest text-[#f26c0d]">{tournament.prizes?.[0]?.place || 'JUARA 1'}</h4>
                                                    <h2 className="display-five fw-extrabold text-white mb-4">{tournament.prizes?.[0]?.amount || 'Rp 7.500.000'}</h2>
                                                    <p className="text-[#94a3b8] fs-md mb-0">{tournament.prizes?.[0]?.reward || 'Trofi Eksklusif & Sertifikat Nasional Gold'}</p>
                                                </div>
                                            </div>
                                            {/* Juara 2 */}
                                            <div className="col-xl-4 col-md-6 mt-xl-10">
                                                <div className="glass-prize-card prize-silver text-center transition-all p-10 h-100 rounded-xl border border-[#3d2a1d]" style={{ background: 'linear-gradient(180deg, rgba(148,163,184,0.05) 0%, #2d1e15 100%)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                                                    <div className="prize-visual mb-6 position-relative z-1">
                                                        <i className="ti ti-medal fs-display-two text-[#94a3b8] d-inline-block hover-float" style={{ filter: 'drop-shadow(0 0 20px rgba(148,163,184,0.3))' }}></i>
                                                    </div>
                                                    <h4 className="text-[#94a3b8] fw-extrabold mb-2 text-uppercase tracking-widest">{tournament.prizes?.[1]?.place || 'JUARA 2'}</h4>
                                                    <h2 className="display-six fw-extrabold text-white mb-4">{tournament.prizes?.[1]?.amount || 'Rp 5.000.000'}</h2>
                                                    <p className="text-[#94a3b8] fs-md mb-0">{tournament.prizes?.[1]?.reward || 'Medali Perak & Sertifikat Nasional Silver'}</p>
                                                </div>
                                            </div>
                                            {/* Juara 3 */}
                                            <div className="col-xl-4 col-md-6 mt-xl-14">
                                                <div className="glass-prize-card prize-bronze text-center transition-all p-10 h-100 rounded-xl border border-[#3d2a1d]" style={{ background: 'linear-gradient(180deg, rgba(205,127,50,0.05) 0%, #2d1e15 100%)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                                                    <div className="prize-visual mb-6 position-relative z-1">
                                                        <i className="ti ti-medal fs-display-two d-inline-block hover-float" style={{ color: '#cd7f32', filter: 'drop-shadow(0 0 20px rgba(205,127,50,0.3))' }}></i>
                                                    </div>
                                                    <h4 className="fw-extrabold mb-2 text-uppercase tracking-widest" style={{ color: '#cd7f32' }}>{tournament.prizes?.[2]?.place || 'JUARA 3'}</h4>
                                                    <h2 className="display-six fw-extrabold mb-4 text-white" style={{ color: '#e89e5a' }}>{tournament.prizes?.[2]?.amount || 'Rp 2.500.000'}</h2>
                                                    <p className="text-[#94a3b8] fs-md mb-0">{tournament.prizes?.[2]?.reward || 'Medali Perunggu & Sertifikat Nasional Bronze'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}

                        {!isTournament && (
                            <section className="font-display bg-[#221710] text-[#f8f7f5] min-h-screen flex flex-col" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>

                                {/* 1. Exact Header from code.html - Offset for main header */}
                                <header className="sticky top-[75px] lg:top-[90px] z-[60] flex items-center bg-[#221710] border-b border-[#3d2a1d] p-4 justify-between">
                                    <div className="flex items-center gap-4">
                                        <h1 className="text-lg font-bold leading-tight tracking-tight uppercase truncate max-w-[250px] lg:max-w-none">
                                            {tournament.title}
                                        </h1>
                                    </div>
                                    <div className="flex items-center gap-3">
                                    </div>
                                </header>

                                {/* Main Content Scrollable */}
                                <div className="flex-1 overflow-y-auto">

                                    {/* 2. Hero Section - Multimedia Carousel */}
                                    <section className="relative">
                                        <div className="w-full aspect-video md:aspect-[21/9] bg-[#111] relative group overflow-hidden">

                                            {/* Media Slider Container */}
                                            <div
                                                className="w-full h-full flex transition-transform duration-700 ease-in-out"
                                                style={{ transform: `translateX(-${currentMediaIndex * 100}%)` }}
                                            >
                                                {heroMedia.map((media, idx) => (
                                                    <div key={idx} className="w-full h-full flex-shrink-0 relative">
                                                        {/* Media Type Label */}
                                                        <div className="absolute top-6 left-6 z-40">
                                                            <span className="px-4 py-1.5 bg-[#f26c0d] text-white text-[10px] font-bold rounded-full uppercase tracking-[0.2em] shadow-lg border border-white/20">
                                                                {media.title}
                                                            </span>
                                                        </div>

                                                        {media.type === 'video' && currentMediaIndex === idx ? (
                                                            <div className="w-full h-full">
                                                                <iframe
                                                                    src={`${media.url}?autoplay=0&mute=1&controls=1&rel=0`}
                                                                    className="w-full h-full border-none"
                                                                    title={media.title}
                                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                    allowFullScreen
                                                                ></iframe>
                                                                {/* Transparent overlay to allow clicking navigation buttons without iframe interference */}
                                                                <div className="absolute inset-0 pointer-events-none z-10"></div>
                                                            </div>
                                                        ) : (
                                                            <div
                                                                className="w-full h-full bg-cover bg-center"
                                                                style={{
                                                                    backgroundImage: `linear-gradient(to bottom, rgba(34,23,16,0) 0%, rgba(34,23,16,0.8) 100%), url('${media.url}')`
                                                                }}
                                                            >
                                                                {/* Only show play button for games, not tournaments */}
                                                                {idx === 0 && !isTournament && (
                                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                                        <button
                                                                            onClick={() => setIsVideoModalOpen(true)}
                                                                            className="bg-[#f26c0d] p-4 !rounded-full shadow-lg shadow-[#f26c0d]/40 hover:scale-110 transition-transform focus:outline-none"
                                                                        >
                                                                            <span className="material-symbols-outlined text-4xl text-white block leading-none">play_arrow</span>
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Navigation Overlay - Always Visible */}
                                            <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between items-center z-30 pointer-events-none">
                                                <button
                                                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); prevMedia(); }}
                                                    className="w-12 h-12 !rounded-full bg-[#f26c0d] hover:bg-[#ff7a00] text-white flex items-center justify-center transition-all shadow-lg pointer-events-auto border-2 border-white/20"
                                                >
                                                    <span className="material-symbols-outlined font-bold">chevron_left</span>
                                                </button>
                                                <button
                                                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); nextMedia(); }}
                                                    className="w-12 h-12 !rounded-full bg-[#f26c0d] hover:bg-[#ff7a00] text-white flex items-center justify-center transition-all shadow-lg pointer-events-auto border-2 border-white/20"
                                                >
                                                    <span className="material-symbols-outlined font-bold">chevron_right</span>
                                                </button>
                                            </div>

                                            {/* Indicator Dots */}
                                            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 z-30">
                                                {heroMedia.map((_, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={(e) => { e.stopPropagation(); setCurrentMediaIndex(idx); }}
                                                        className={`h-1 !rounded-full transition-all duration-300 ${idx === currentMediaIndex ? 'w-8 bg-[#f26c0d]' : 'w-2 bg-white/30 hover:bg-white/50'}`}
                                                        aria-label={`Go to slide ${idx + 1}`}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        <div className="px-4 -mt-12 relative z-10 space-y-4 max-w-none mx-auto">
                                            <div className="flex gap-3">
                                                <span className="px-3 py-1 bg-[#f26c0d] text-white text-xs font-bold rounded-full uppercase tracking-wider">Free Game</span>
                                                <span className="px-3 py-1 bg-[#2d1e15] border border-[#3d2a1d] text-slate-100 text-xs font-bold rounded-full uppercase tracking-wider">{tournament.genre || 'Action-Trivia'}</span>
                                            </div>

                                            <div className="space-y-6">
                                                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4">
                                                    <div className="flex-1">
                                                        <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter text-white">
                                                            {tournament.title.split(':').map((part, i, arr) => (
                                                                <React.Fragment key={i}>
                                                                    {part.trim()}
                                                                    {i < arr.length - 1 && <br />}
                                                                </React.Fragment>
                                                            ))}
                                                        </h2>
                                                        <p className="text-[#94a3b8] mt-4 max-w-xl text-lg leading-relaxed font-medium">
                                                            {tournament.description || "Escape the swarm by solving lightning-fast puzzles. Every second counts in this high-stakes survival trivia experience."}
                                                        </p>
                                                    </div>
                                                    {!isTournament && (
                                                        <div className="flex flex-col gap-3 w-full md:w-auto md:min-w-[240px]">
                                                            <Link
                                                                href={`/play/${tournament.slug}`}
                                                                className="bg-[#f26c0d] hover:bg-[#f26c0d]/90 text-white font-bold py-4 px-10 !rounded-full transition-all flex items-center justify-center gap-2 no-underline hover:scale-105"
                                                            >
                                                                <span className="material-symbols-outlined">bolt</span>
                                                                PLAY NOW
                                                            </Link>
                                                            <button
                                                                onClick={() => setIsVideoModalOpen(true)}
                                                                className="bg-[#2d1e15] hover:bg-[#3d2a1d] text-white font-bold py-4 px-10 !rounded-full border border-[#3d2a1d] transition-all flex items-center justify-center gap-2 hover:scale-105"
                                                            >
                                                                <span className="material-symbols-outlined">movie</span>
                                                                WATCH TRAILER
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    {/* 3. Stats & Info Grid from code.html */}
                                    <section className="p-4 mt-8 grid grid-cols-1 md:grid-cols-12 gap-6 max-w-none mx-auto">

                                        {/* Left Column: Rating & Features (col-span-8) */}
                                        <div className="md:col-span-8 space-y-6">

                                            {/* Rating Card */}
                                            <div className="bg-[#2d1e15] border border-[#3d2a1d] rounded-xl p-6">
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className="text-4xl font-bold text-[#f26c0d]">{tournament.rating || "4.9"}</div>
                                                        <div>
                                                            <div className="flex text-[#f26c0d]">
                                                                <span className="material-symbols-outlined fill-1">star</span>
                                                                <span className="material-symbols-outlined fill-1">star</span>
                                                                <span className="material-symbols-outlined fill-1">star</span>
                                                                <span className="material-symbols-outlined fill-1">star</span>
                                                                <span className="material-symbols-outlined fill-1">star</span>
                                                            </div>
                                                            <div className="text-xs text-[#94a3b8] uppercase tracking-widest font-bold">Community Rating</div>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-xl font-bold text-white">{tournament.recommendedPercent || "82%"}</div>
                                                        <div className="text-xs text-[#94a3b8] uppercase font-bold">Recommended</div>
                                                    </div>
                                                </div>

                                                <div className="w-full bg-[#3d2a1d] h-2 rounded-full overflow-hidden">
                                                    <div className="bg-[#f26c0d] h-full transition-all duration-1000" style={{ width: tournament.recommendedPercent || "82%" }}></div>
                                                </div>
                                            </div>

                                            {/* Features Grid */}
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                                {(tournament.features && tournament.features.length > 0 ? tournament.features.slice(0, 3) : [
                                                    { icon: "timer", title: "Zombie Escape 60 Detik" },
                                                    { icon: "trophy", title: "Survival Score Challenge" },
                                                    { icon: "groups", title: "Global Multiplayer" }
                                                ]).map((f: any, i: number) => (
                                                    <div key={i} className="bg-[#2d1e15] border border-[#3d2a1d] p-4 rounded-xl flex flex-col items-center text-center gap-3">
                                                        <div className="bg-[#f26c0d]/20 p-3 rounded-lg flex items-center justify-center">
                                                            <span className="material-symbols-outlined text-[#f26c0d]">{f.icon}</span>
                                                        </div>
                                                        <h3 className="text-sm font-bold uppercase leading-tight text-white">{f.title}</h3>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Right Column: Metadata (col-span-4) */}
                                        <div className="md:col-span-4">
                                            <div className="bg-[#2d1e15] border border-[#3d2a1d] rounded-xl p-6 space-y-6">
                                                <h3 className="text-lg font-bold uppercase tracking-tight border-b border-[#3d2a1d] pb-3">Game Details</h3>
                                                <div className="space-y-4">
                                                    {[
                                                        { label: "Developer", value: tournament.developer || "Neon Brain Studio" },
                                                        { label: "Publisher", value: tournament.publisher || "Global Blitz Games" },
                                                        { label: "Genre", value: tournament.genre || "Action, Trivia, Horror", highlight: true },
                                                        { label: "Platform", value: tournament.platform || "PC, Mobile, Console" },
                                                        { label: "Release Date", value: tournament.releaseDate || "OCT 24, 2023" }
                                                    ].map((item, idx, arr) => (
                                                        <div key={idx} className={`flex justify-between items-center py-2 ${idx !== arr.length - 1 ? 'border-b border-[#3d2a1d]/30' : ''}`}>
                                                            <span className="text-[#94a3b8] text-sm">{item.label}</span>
                                                            <span className={`font-bold text-sm uppercase ${item.highlight ? 'text-[#f26c0d]' : 'text-white'}`}>{item.value}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="bg-[#3d2a1d]/50 rounded-lg p-4 flex items-center gap-3">
                                                    <span className="material-symbols-outlined text-[#f26c0d]">language</span>
                                                    <div>
                                                        <p className="text-[10px] text-[#94a3b8] uppercase font-bold">Supported Languages</p>
                                                        <p className="text-sm font-bold">{tournament.languages || "English, Indonesian, Arab"}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                </div>
                            </section>
                        )}
                    </div>
                </article>
            </main>

            {/* VIDEO MODAL at true root level to escape all parent transforms */}
            {
                isVideoModalOpen && (
                    <div className="video-modal-overlay position-fixed inset-0 d-center animate-fade-in" style={{ width: '100vw', height: '100vh', top: 0, left: 0 }}>
                        <button
                            className="modal-close-btn position-absolute top-10 end-10 btn-show-hide"
                            onClick={() => setIsVideoModalOpen(false)}
                            style={{ zIndex: 10001 }}
                        >
                            <i className="ti ti-x"></i>
                        </button>
                        <div className="container" onClick={(e) => e.stopPropagation()}>
                            <div className="row justify-content-center">
                                <div className="col-lg-10">
                                    <div className="video-modal-content rounded-5 overflow-hidden shadow-orange-intense animate-zoom-in">
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
                            </div>
                        </div>
                    </div>
                )
            }

            <style jsx>{`
                .animate-slide-up { animation: fadeInUp 0.8s ease-out forwards; }
                .animate-slide-right { animation: slideRight 0.8s ease-out forwards; }
                .animate-zoom-in { animation: zoomIn 1.2s cubic-bezier(0.165, 0.84, 0.44, 1) forwards; }
                .animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }
                .d-center { display: flex; align-items: center; justify-content: center; }

                @keyframes fadeInUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes slideRight { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }
                @keyframes zoomIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

                .tracking-tighter { letter-spacing: -0.05em; }
                .tracking-wide { letter-spacing: 0.05em; }
                .tracking-widest { letter-spacing: 0.2em; }
                
                .text-orange-gradient {
                    background: linear-gradient(90deg, #ff7a00, #ff4500);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .bg-orange-gradient {
                    background: linear-gradient(90deg, #ff7a00, #ff4500);
                }

                /* MOBILE REDESIGN STYLES */
                .btn-icon-plain { background: none; border: none; }
                .badge-mobile { background: #ff8c00; color: #fff; font-size: 10px; font-weight: 800; border-radius: 999px !important; border: none; letter-spacing: 0.5px; }
                .btn-mobile-action { transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); border: none; }
                .btn-orange-solid { background: #f47920; box-shadow: 0 8px 24px rgba(244, 121, 32, 0.3); color: #fff !important; border-radius: 999px !important; }
                .btn-orange-solid:active { transform: scale(0.96); background: #e65c00; }
                .btn-dark-outline { background: #2f1d16; border-bottom: 3px solid #1a100c; color: #fff !important; border-radius: 999px !important; }
                .btn-dark-outline:active { transform: translateY(2px); border-bottom-width: 1px; }
                .display-five { font-family: 'Outfit', sans-serif; font-weight: 800; letter-spacing: -1px; }
                .shadow-premium-orange { box-shadow: 0 10px 40px rgba(244, 121, 32, 0.2), inset 0 0 15px rgba(255, 255, 255, 0.1); }
                .shadow-glow-orange { box-shadow: 0 0 15px rgba(244, 121, 32, 0.6); }

                .badge-premium-tag {
                    background: rgba(255, 255, 255, 0.08);
                    border: 1px solid rgba(255, 255, 255, 0.15);
                    border-radius: 999px !important;
                    font-size: 11px;
                    font-weight: 800;
                    color: #fff;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    backdrop-filter: blur(4px);
                    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
                }

                .btn-premium-primary, .btn-premium-cta {
                    background: linear-gradient(90deg, #ff7a00, #ff4500);
                    border: none;
                    box-shadow: 0 4px 15px rgba(255, 69, 0, 0.3);
                    border-radius: 999px !important;
                }
                .btn-premium-primary:hover, .btn-premium-cta:hover {
                    box-shadow: 0 0 25px rgba(255, 69, 0, 0.5), inset 0 0 10px rgba(255, 255, 255, 0.2);
                    transform: translateY(-2px);
                    color: #fff;
                }
                .btn-premium-secondary {
                    background: transparent;
                    border: 1px solid rgba(255, 255, 255, 0.4);
                    border-radius: 999px !important;
                }
                .btn-premium-secondary:hover {
                    background: rgba(255, 255, 255, 0.1);
                    border-color: #fff;
                    transform: translateY(-2px);
                    color: #fff;
                }

                .premium-feature-card {
                    transition: all 0.3s ease;
                }
                .premium-feature-card:hover {
                    transform: translateY(-5px);
                    border-color: rgba(255, 140, 0, 0.4) !important;
                    box-shadow: 0 15px 30px rgba(0,0,0,0.5), 0 0 30px rgba(255, 140, 0, 0.15) !important;
                }
                .premium-feature-card:hover .feature-icon {
                    transform: scale(1.15);
                    text-shadow: 0 0 20px rgba(255, 140, 0, 0.6);
                }

                .description-highlighted strong {
                    color: #ff8c00;
                    font-weight: 700;
                    text-shadow: 0 0 10px rgba(255,140,0,0.2);
                }
                .description-text p {
                    margin-bottom: 24px;
                }
                .description-text p:last-child {
                    margin-bottom: 0;
                }

                .video-modal-overlay {
                    z-index: 9999 !important;
                    background: rgba(0, 0, 0, 0.98) !important;
                    backdrop-filter: blur(30px) !important;
                    position: fixed !important;
                    top: 0 !important;
                    left: 0 !important;
                    width: 100vw !important;
                    height: 100vh !important;
                }

                .video-modal-content {
                    background: #000;
                    border: 1px solid rgba(255, 122, 0, 0.4);
                    box-shadow: 0 0 50px rgba(255, 122, 0, 0.2);
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
                    backdrop-filter: blur(12px);
                }
                .btn-show-hide:hover {
                    background: #ff8c00;
                    color: #fff;
                    transform: translateY(-3px) scale(1.02);
                    box-shadow: 0 8px 25px rgba(255, 140, 0, 0.4);
                }

                @media (max-width: 991px) {
                    .hero-title-massive { font-size: 3.5rem !important; }
                    .game-hero-premium { min-height: 50vh !important; }
                    .btn-premium-primary, .btn-premium-secondary { width: 100%; justify-content: center; }
                    .col-lg-4 { margin-top: 40px; }
                }

                /* Game Details Mobile Responsive Sidebar Spacing */
                .game-details-mobile {
                    width: 100%;
                }

                @media (max-width: 1750px) {
                    .game-details-mobile header,
                    .game-details-mobile > div:nth-child(2),
                    .game-details-mobile nav {
                        margin-left: 0 !important;
                        width: 100% !important;
                    }
                }

                @media (min-width: 1751px) {
                    .game-details-mobile {
                        margin-left: 0;
                    }

                    .game-details-mobile header,
                    .game-details-mobile > div:nth-child(2),
                    .game-details-mobile nav {
                        width: calc(100vw - 80px);
                    }
                }

                /* GLASS PRIZE CARDS (for tournament part) */
                .glass-prize-card {
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 32px;
                    position: relative;
                    overflow: hidden;
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                .glass-prize-card:hover {
                    transform: translateY(-15px) scale(1.02);
                }
                .prize-gold:hover {
                    border-color: #ffaa00 !important;
                    box-shadow: 0 15px 40px rgba(255, 140, 0, 0.4), inset 0 0 30px rgba(255, 140, 0, 0.1) !important;
                }
                .prize-silver:hover {
                    border-color: rgba(255, 255, 255, 0.6) !important;
                    box-shadow: 0 15px 40px rgba(255, 255, 255, 0.2), inset 0 0 30px rgba(255, 255, 255, 0.1) !important;
                }
                .prize-bronze:hover {
                    border-color: #e89e5a !important;
                    box-shadow: 0 15px 40px rgba(205, 127, 50, 0.3), inset 0 0 30px rgba(205, 127, 50, 0.1) !important;
                }
                .hover-float { transition: transform 0.4s ease; }
                .glass-prize-card:hover .hover-float { transform: translateY(-8px) scale(1.1); }
            `}</style>
        </>
    );
}
