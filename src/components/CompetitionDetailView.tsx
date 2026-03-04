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
    const isTournament = tournament.type === "tournament";
    const maxQuota = 100;
    const currentRegistered = 64;
    const progressPercent = (currentRegistered / maxQuota) * 100;
    const isFull = currentRegistered >= maxQuota;

    return (
        <>
            <Header />
            <main className={`main-container container-fluid d-flex pt-0 px-0 position-relative`}>
                <Sidebar />
                <article className={`main-content mt-0 p-0 w-100 animate-fade-in`}>
                    <div className={isTournament ? 'container-fluid px-lg-15 px-md-10 px-6 mt-lg-20 mt-10' : 'w-100 m-0 p-0'}>
                        {isTournament && (
                            <section className="tournament-details pb-120">
                                <Breadcrumbs />

                                {/* PREMIUM HERO SECTION (TOURNAMENT) */}
                                <div className="row mb-12">
                                    <div className="col-12 text-center mb-12 position-relative animate-fade-in-up">
                                        <div className="hero-glow-bg position-absolute top-50 start-50 translate-middle w-100 h-100" style={{ pointerEvents: 'none', zIndex: -1 }}>
                                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '150%', background: 'radial-gradient(circle, rgba(255, 140, 0, 0.15) 0%, rgba(0, 0, 0, 0) 70%)', filter: 'blur(50px)' }}></div>
                                        </div>
                                        <button onClick={() => router.back()} className="btn-back-floating shadow-btn d-none d-md-flex" style={{ left: '20px', top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}>
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

                                <div className="row g-10">
                                    {/* LEFT CONTENT: Description, Highlight Box & Rules */}
                                    <div className="col-lg-8 animate-slide-up">
                                        {/* DESKRIPSI COMPETITION VISUAL */}
                                        <div className="content-card-premium mb-8 p-sm-10 p-6 position-relative border" style={{ background: 'linear-gradient(145deg, rgba(20,20,20,0.95), rgba(10,10,10,0.9))', borderColor: 'rgba(255,140,0,0.3)', boxShadow: '0 0 20px rgba(255,140,0,0.05)' }}>
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


                                        <div className="content-card-premium mb-10 p-sm-10 p-6">
                                            <h3 className="premium-section-title mb-8">Syarat & Ketentuan</h3>
                                            <div className="rules-grid">
                                                {tournament.rules?.map((rule, index) => (
                                                    <div key={index} className="rule-item d-flex align-items-center gap-4 p-4 rounded-3 mb-3 transition-all">
                                                        <div className="icon-circle-check bg-orange-gradient">
                                                            <i className="ti ti-check fs-xl"></i>
                                                        </div>
                                                        <span className="tcn-1 fs-lg fw-medium">{rule}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* RIGHT CONTENT: Premium Info Card */}
                                    <div className="col-lg-4">
                                        <div className="sticky-info-card" style={{ top: '120px' }}>
                                            <div className="premium-info-card p-8 rounded-4 shadow-orange-intense">
                                                <div className="status-badge-area d-flex justify-content-between align-items-center mb-8">
                                                    <span className="premium-status-pill text-uppercase">Registration Open</span>
                                                    <div className="live-dot-wrapper d-flex align-items-center gap-2">
                                                        <span className="live-dot"></span>
                                                        <span className="tcn-6 fs-xs fw-bold text-uppercase">Online</span>
                                                    </div>
                                                </div>

                                                <div className="prize-main-area mb-8">
                                                    <span className="tcn-6 fs-sm text-uppercase tracking-widest d-block mb-1">Total Hadiah</span>
                                                    <h1 className="display-five fw-extrabold text-orange-gradient m-0">
                                                        {tournament.prizeMoney} <span className="fs-two">+ Grand Prize</span>
                                                    </h1>
                                                </div>

                                                <div className="premium-divider mb-6"></div>

                                                <div className="features-list d-grid gap-6 mb-10">
                                                    <div className="d-flex align-items-center gap-4 mb-6">
                                                        <div className="icon-circle bgn-3 tcn-1">
                                                            <i className="ti ti-calendar fs-2xl"></i>
                                                        </div>
                                                        <div>
                                                            <label className="d-block tcn-6 fs-xs text-uppercase fw-bold">Babak Penyisihan</label>
                                                            <span className="tcn-1 fw-bold fs-four">{tournament.date}</span>
                                                        </div>
                                                    </div>

                                                    {tournament.finalRound && (
                                                        <div className="d-flex align-items-center gap-4 mb-6">
                                                            <div className="icon-circle bgn-3" style={{ border: '1px solid rgba(255, 172, 5, 0.4)' }}>
                                                                <i className="ti ti-trophy fs-2xl text-orange-glow"></i>
                                                            </div>
                                                            <div>
                                                                <label className="d-block tcn-6 fs-xs text-uppercase fw-bold">Babak Final</label>
                                                                <span className="tcn-1 fw-bold fs-four text-orange-glow">{tournament.finalRound}</span>
                                                            </div>
                                                        </div>
                                                    )}

                                                    <div className="d-flex align-items-center gap-4 mb-6">
                                                        <div className="icon-circle bgn-3 tcn-1">
                                                            <i className="ti ti-ticket fs-2xl"></i>
                                                        </div>
                                                        <div>
                                                            <label className="d-block tcn-6 fs-xs text-uppercase fw-bold">Biaya Pendaftaran</label>
                                                            <span className="tcn-1 fw-bold fs-four text-orange-gradient">{tournament.ticketFee || 'Gratis'}</span>
                                                        </div>
                                                    </div>

                                                    <div className="d-flex align-items-center gap-4 mb-10">
                                                        <div className="icon-circle bgn-3 tcn-1">
                                                            <i className="ti ti-users fs-2xl"></i>
                                                        </div>
                                                        <div>
                                                            <label className="d-block tcn-6 fs-xs text-uppercase fw-bold">Total Kuota</label>
                                                            <span className="tcn-1 fw-bold fs-four">{tournament.teams}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="quota-logic mb-10">
                                                    <div className="d-flex justify-content-between align-items-end mb-3">
                                                        <span className="tcn-6 fs-xs text-uppercase fw-bold">Kapasitas Terisi</span>
                                                        <span className="tcn-1 fw-bold fs-five">{progressPercent}%</span>
                                                    </div>
                                                    <div className="premium-progress-bar">
                                                        <div className="progress-fill shadow-glow-orange" style={{ width: `${progressPercent}%` }}></div>
                                                    </div>
                                                </div>

                                                {isFull ? (
                                                    <button
                                                        className="premium-cta-btn w-100 py-2 rounded-pill text-uppercase fw-bold tracking-widest transition-all d-flex justify-content-center align-items-center btn-disabled"
                                                        disabled
                                                    >
                                                        Kuota Penuh
                                                    </button>
                                                ) : (
                                                    <Link
                                                        href={`/competitions/${tournament.slug}/register`}
                                                        className="premium-cta-btn w-100 py-2 rounded-pill text-uppercase fw-bold tracking-widest transition-all d-flex justify-content-center align-items-center bg-orange-gradient hover-lift shadow-btn text-white text-decoration-none"
                                                    >
                                                        Daftar <i className="ti ti-chevron-right ms-2 animate-bounce-right"></i>
                                                    </Link>
                                                )}
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
                                        <div className="timeline-horizontal-premium p-10 rounded-4 border border-secondary border-opacity-10 position-relative overflow-hidden" style={{ background: 'rgba(20,20,20,0.8)' }}>
                                            <div className="timeline-line position-absolute top-50 start-0 w-100" style={{ height: '4px', background: 'rgba(255,255,255,0.05)', transform: 'translateY(-50%)', zIndex: 0 }}></div>
                                            <div className="timeline-line-active position-absolute top-50 start-0" style={{ height: '4px', width: '50%', background: 'linear-gradient(90deg, #ff8c00, #ff4500)', transform: 'translateY(-50%)', zIndex: 1, boxShadow: '0 0 15px rgba(255,140,0,0.5)' }}></div>

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
                                                <div className="glass-prize-card prize-gold text-center transition-all p-10 h-100 rounded-5" style={{ background: 'linear-gradient(180deg, rgba(255,140,0,0.1) 0%, rgba(20,20,20,0.8) 100%)', border: '1px solid rgba(255,140,0,0.3)', boxShadow: '0 10px 30px rgba(0,0,0,0.5), inset 0 0 20px rgba(255,140,0,0.05)' }}>
                                                    <div className="prize-visual mb-6 position-relative z-1">
                                                        <i className="ti ti-trophy fs-display-one text-orange-glow d-inline-block hover-float" style={{ filter: 'drop-shadow(0 0 20px rgba(255,140,0,0.6))' }}></i>
                                                    </div>
                                                    <h4 className="fw-extrabold mb-2 text-uppercase tracking-widest text-warning">{tournament.prizes?.[0]?.place || 'JUARA 1'}</h4>
                                                    <h2 className="display-five fw-extrabold text-orange-gradient mb-4">{tournament.prizes?.[0]?.amount || 'Rp 7.500.000'}</h2>
                                                    <p className="tcn-6 fs-md mb-0">{tournament.prizes?.[0]?.reward || 'Trofi Eksklusif & Sertifikat Nasional Gold'}</p>
                                                </div>
                                            </div>
                                            {/* Juara 2 */}
                                            <div className="col-xl-4 col-md-6 mt-xl-10">
                                                <div className="glass-prize-card prize-silver text-center transition-all p-10 h-100 rounded-5" style={{ background: 'linear-gradient(180deg, rgba(200,200,200,0.05) 0%, rgba(20,20,20,0.8) 100%)', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                                                    <div className="prize-visual mb-6 position-relative z-1">
                                                        <i className="ti ti-medal fs-display-two tcn-1 d-inline-block hover-float" style={{ filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.3))' }}></i>
                                                    </div>
                                                    <h4 className="tcn-1 fw-extrabold mb-2 text-uppercase tracking-widest text-secondary">{tournament.prizes?.[1]?.place || 'JUARA 2'}</h4>
                                                    <h2 className="display-six fw-extrabold tcn-1 mb-4">{tournament.prizes?.[1]?.amount || 'Rp 5.000.000'}</h2>
                                                    <p className="tcn-6 fs-md mb-0">{tournament.prizes?.[1]?.reward || 'Medali Perak & Sertifikat Nasional Silver'}</p>
                                                </div>
                                            </div>
                                            {/* Juara 3 */}
                                            <div className="col-xl-4 col-md-6 mt-xl-14">
                                                <div className="glass-prize-card prize-bronze text-center transition-all p-10 h-100 rounded-5" style={{ background: 'linear-gradient(180deg, rgba(205,127,50,0.05) 0%, rgba(20,20,20,0.8) 100%)', border: '1px solid rgba(205,127,50,0.2)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                                                    <div className="prize-visual mb-6 position-relative z-1">
                                                        <i className="ti ti-medal fs-display-two d-inline-block hover-float" style={{ color: '#cd7f32', filter: 'drop-shadow(0 0 20px rgba(205,127,50,0.3))' }}></i>
                                                    </div>
                                                    <h4 className="fw-extrabold mb-2 text-uppercase tracking-widest" style={{ color: '#cd7f32' }}>{tournament.prizes?.[2]?.place || 'JUARA 3'}</h4>
                                                    <h2 className="display-six fw-extrabold mb-4" style={{ color: '#e89e5a' }}>{tournament.prizes?.[2]?.amount || 'Rp 2.500.000'}</h2>
                                                    <p className="tcn-6 fs-md mb-0">{tournament.prizes?.[2]?.reward || 'Medali Perunggu & Sertifikat Nasional Bronze'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}

                        {!isTournament && (
                            <section className="game-details-premium position-relative w-100 pb-120" style={{ backgroundColor: '#0f0f0f', minHeight: '100vh', overflowX: 'hidden' }}>
                                {/* HERO SECTION (70vh, Epic Style - TRULY FULL WIDTH) */}
                                <div className="game-hero-premium position-relative animate-fade-in w-100 d-flex flex-column justify-content-end" style={{ minHeight: '75vh', width: '100vw', marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    {/* BLURRED BACKGROUND */}
                                    <div className="hero-bg-blur position-absolute w-100 h-100 top-0 start-0" style={{ zIndex: 0, overflow: 'hidden' }}>
                                        <img src={tournament.image} alt={tournament.title} className="w-100 h-100 object-fit-cover" style={{ filter: 'blur(8px) brightness(0.5)', transform: 'scale(1.05)' }} />
                                        <div className="overlay-gradient position-absolute inset-0 w-100 h-100" style={{ background: 'linear-gradient(to bottom, rgba(15,15,15,0.1) 0%, rgba(15,15,15,0.6) 50%, #0f0f0f 100%)' }}></div>
                                    </div>

                                    {/* HERO CONTENT */}
                                    <div className="container position-relative z-2 pb-15" style={{ maxWidth: '1200px' }}>
                                        <div className="position-absolute top-0 start-0 w-100 pt-8 z-2 d-none d-lg-block" style={{ marginTop: '-40vh' }}>
                                            <Breadcrumbs customCrumbs={[
                                                { href: '/games', label: 'Games', isLast: false },
                                                { href: `/competitions/${tournament.slug}`, label: tournament.title, isLast: true }
                                            ]} />
                                        </div>

                                        <div className="row pt-20">
                                            <div className="col-lg-8 animate-slide-up pb-lg-5">
                                                <div className="d-flex flex-wrap gap-3 mb-4">
                                                    <span className="badge-premium-tag px-3 py-1">FREE GAME</span>
                                                    <span className="badge-premium-tag px-3 py-1">{tournament.genre || 'RACING'}</span>
                                                </div>
                                                <h1 className="hero-title-massive fw-extrabold text-white mb-2 text-uppercase tracking-tighter" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: '1', textShadow: '0 10px 30px rgba(0,0,0,0.8)' }}>
                                                    {tournament.title}
                                                </h1>
                                                <p className="fs-three mb-8 text-light opacity-75 fw-medium tracking-widest text-uppercase" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
                                                    {tournament.subtitle || 'High Speed Challenge'}
                                                </p>

                                                <div className="d-flex flex-wrap gap-4 align-items-center mt-6">
                                                    <Link href={`/play/${tournament.slug}`} className="btn-premium-primary py-3 px-10 rounded-3 text-white fw-extrabold text-uppercase tracking-widest d-flex align-items-center justify-content-center gap-3 transition-all text-decoration-none shadow-glow">
                                                        <i className="ti ti-device-gamepad-2 fs-xl"></i> MAIN SEKARANG
                                                    </Link>
                                                    <button
                                                        onClick={() => setIsVideoModalOpen(true)}
                                                        className="btn-premium-secondary py-3 px-8 rounded-3 text-white fw-bold text-uppercase tracking-widest d-flex align-items-center justify-content-center gap-2 transition-all"
                                                    >
                                                        <i className="ti ti-player-play-filled"></i> TONTON TRAILER
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* MAIN CONTENT 2-COLUMN LAYOUT (Steam Style) */}
                                <div className="container mt-15" style={{ maxWidth: '1200px' }}>
                                    <div className="row g-8">

                                        {/* KOLOM KIRI (70%) */}
                                        <div className="col-lg-8">

                                            {/* VIDEO PREVIEW INLINE */}
                                            {tournament.videoUrl && (
                                                <div className="video-player-container mb-15 rounded-5 overflow-hidden animate-slide-up bg-black" style={{ border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.8)' }}>
                                                    <div className="ratio ratio-16x9">
                                                        <iframe
                                                            src={tournament.videoUrl}
                                                            title={`${tournament.title} Trailer`}
                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                            allowFullScreen
                                                            style={{ border: 'none' }}
                                                        ></iframe>
                                                    </div>
                                                </div>
                                            )}

                                            {/* TENTANG GAME */}
                                            <div className="about-game-section animate-slide-up" style={{ marginBottom: '80px', paddingTop: '20px' }}>
                                                <h3 className="text-uppercase fw-extrabold text-white mb-6 pb-4 border-bottom border-light border-opacity-10" style={{ letterSpacing: '2px' }}>
                                                    Tentang Game Ini
                                                </h3>
                                                <div className="fs-md text-light opacity-80 description-text description-highlighted" style={{ lineHeight: '1.8' }}>
                                                    {renderDescription(tournament.description)}
                                                </div>
                                            </div>

                                            {/* FITUR UTAMA CARD GRID */}
                                            {tournament.features && tournament.features.length > 0 && (
                                                <div className="features-section animate-slide-up" style={{ marginBottom: '80px' }}>
                                                    <h3 className="text-uppercase fw-extrabold text-white mb-8 pb-4 border-bottom border-light border-opacity-10" style={{ letterSpacing: '2px' }}>
                                                        Fitur Utama
                                                    </h3>
                                                    <div className="row g-6">
                                                        {tournament.features.map((feature, index) => (
                                                            <div key={index} className="col-md-4 col-sm-6">
                                                                <div className="premium-feature-card h-100 p-8 rounded-4 text-center transition-all bg-card-dark" style={{ background: '#1a1a1a', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                                                    <div className="feature-icon mb-5 d-inline-flex justify-content-center align-items-center text-orange-gradient transition-all">
                                                                        <i className={`${feature.icon} fs-one`}></i>
                                                                    </div>
                                                                    <h5 className="fw-bold text-white mb-4 tracking-wide">{feature.title}</h5>
                                                                    <p className="fs-sm text-light opacity-60 mb-0 line-height-comfortable" style={{ lineHeight: '1.6' }}>{feature.description}</p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* KOLOM KANAN (30%) */}
                                        <div className="col-lg-4">
                                            <div className="sticky-sidebar animate-slide-right" style={{ top: '100px', position: 'sticky' }}>

                                                {/* GAME SUMMARY CARD */}
                                                <div className="premium-summary-card p-6 rounded-4" style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', marginBottom: '80px' }}>

                                                    {/* GAME POSTER */}
                                                    <div className="rounded-3 overflow-hidden mb-6 position-relative shadow-glow-subtle border border-light border-opacity-10">
                                                        <img src={tournament.image} alt={tournament.title} className="w-100 d-block object-fit-cover" style={{ minHeight: '180px' }} />
                                                    </div>

                                                    {/* RATING */}
                                                    <div className="rating-container mb-8 pb-6 border-bottom border-light border-opacity-10">
                                                        <div className="d-flex justify-content-between align-items-end mb-4">
                                                            <div>
                                                                <h6 className="text-uppercase text-light opacity-50 fs-xs fw-extrabold tracking-widest mb-1">Rating Komunitas</h6>
                                                                <span className="text-success fw-bold fs-md">Sangat Positif</span>
                                                            </div>
                                                            <div className="text-end">
                                                                <span className="display-five fw-extrabold text-white" style={{ lineHeight: '1' }}>{tournament.rating || '4.8'}</span>
                                                                <span className="fs-sm text-light opacity-50 fw-bold"> / 5</span>
                                                            </div>
                                                        </div>
                                                        {/* Progress Bar Horizontal */}
                                                        <div className="progress rounded-pill bg-dark mb-2" style={{ height: '8px' }}>
                                                            <div className="progress-bar bg-orange-gradient rounded-pill transition-all" role="progressbar" style={{ width: `${(parseFloat(String(tournament.rating || 4.8)) / 5) * 100}%` }} aria-valuenow={parseFloat(String(tournament.rating || 4.8))} aria-valuemin={0} aria-valuemax={5}></div>
                                                        </div>
                                                        <div className="text-end mt-2"><span className="fs-xs text-light opacity-40">Berdasarkan ulasan pemain</span></div>
                                                    </div>

                                                    {/* GAME INFO */}
                                                    <div className="game-info-list mb-8 d-grid gap-4">
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <span className="text-light opacity-50 fs-sm fw-medium">Developer</span>
                                                            <span className="text-white fw-bold fs-sm">Gameforsmart</span>
                                                        </div>
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <span className="text-light opacity-50 fs-sm fw-medium">Publisher</span>
                                                            <span className="text-white fw-bold fs-sm">Gameforsmart</span>
                                                        </div>
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <span className="text-light opacity-50 fs-sm fw-medium">Genre</span>
                                                            <span className="text-white fw-bold fs-sm">{tournament.genre || 'Action, Arcade'}</span>
                                                        </div>
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <span className="text-light opacity-50 fs-sm fw-medium">Platform</span>
                                                            <span className="text-white fw-bold fs-sm">{tournament.platform || 'Mobile & Web'}</span>
                                                        </div>
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <span className="text-light opacity-50 fs-sm fw-medium">Release Date</span>
                                                            <span className="text-white fw-bold fs-sm">20 Feb 2026</span>
                                                        </div>
                                                    </div>

                                                    {/* MAIN GRATIS CTA */}
                                                    <Link href={`/play/${tournament.slug}`} className="btn-premium-cta w-100 py-3 rounded-2 text-white fw-extrabold text-uppercase tracking-widest d-center gap-2 transition-all text-decoration-none shadow-glow">
                                                        MAIN GRATIS <i className="ti ti-arrow-right"></i>
                                                    </Link>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}
                    </div>
                </article>
            </main>

            {/* VIDEO MODAL at true root level to escape all parent transforms */}
            {isVideoModalOpen && (
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
            )}

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

                .badge-premium-tag {
                    background: rgba(255, 255, 255, 0.08);
                    border: 1px solid rgba(255, 255, 255, 0.15);
                    border-radius: 4px;
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
                }
                .btn-premium-primary:hover, .btn-premium-cta:hover {
                    box-shadow: 0 0 25px rgba(255, 69, 0, 0.5), inset 0 0 10px rgba(255, 255, 255, 0.2);
                    transform: translateY(-2px);
                    color: #fff;
                }
                .btn-premium-secondary {
                    background: transparent;
                    border: 1px solid rgba(255, 255, 255, 0.4);
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
