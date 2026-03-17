"use client";
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

interface TournamentCardProps {
    id: number;
    title: string;
    type: string;
    image: string;
    status: string;
    rating: string;
    platform: string;
    players: string;
    prizeMoney?: string;
    ticketFee?: string;
    date?: string;
    teams?: string;
    description?: string;
    slug?: string;
    practiceAttempts?: number;
    competitionAttempts?: number;
    isDetailed?: boolean;
    playUrl?: string;
}

export default function TournamentCard({
    id,
    title,
    type,
    image,
    status,
    rating,
    platform,
    players,
    prizeMoney = "$49.97",
    ticketFee = "Free Entry",
    date = "07 OCT, 5:10 AM",
    teams = "12/12",
    description,
    slug,
    practiceAttempts,
    competitionAttempts,
    isDetailed = false,
    link,
    playUrl
}: {
    id: number;
    title: string;
    type: string;
    image: string;
    status: string;
    rating: string;
    platform: string;
    players: string;
    prizeMoney?: string;
    ticketFee?: string;
    date?: string;
    teams?: string;
    description?: string;
    slug?: string;
    practiceAttempts?: number;
    competitionAttempts?: number;
    isDetailed?: boolean;
    link?: string;
    playUrl?: string;
}) {
    const [showTooltip, setShowTooltip] = useState(false);
    const [isTruncated, setIsTruncated] = useState(false);
    const textRef = useRef<HTMLParagraphElement>(null);

    const fullDescription = description || "Kompetisi menguji kemampuan siswa dalam menyelesaikan tantangan yang tersedia sebagai latihan.";

    useEffect(() => {
        if (textRef.current) {
            const element = textRef.current;
            setIsTruncated(element.scrollHeight > element.clientHeight);
        }
    }, [fullDescription]);

    return (
        <div className="tournament-card p-xl-4 p-3 pb-xl-8 bgn-4">
            <div className="tournament-img mb-8 position-relative">
                <Link href={link || `/competitions/${slug || id}`} className="img-area d-block overflow-hidden position-relative h-100">
                    <img className="w-100 h-100 object-fit-cover transition-all duration-500 hover-scale" src={image} alt="tournament" style={status === 'Coming Soon' ? { filter: 'blur(4px) brightness(0.4)' } : {}} />
                    {status === 'Coming Soon' && (
                        <div className="position-absolute top-50 start-50 translate-middle text-center w-100">
                            <i className="ti ti-lock display-four tcn-1 mb-2"></i>
                            <h5 className="tcn-1 text-uppercase fw-bold">Coming Soon</h5>
                        </div>
                    )}
                </Link>
                {status === 'Popular' ? (
                    <span className="card-status position-absolute top-0 end-0 py-1 px-4 tcn-1 fs-sm fw-bold shadow-sm" style={{ backgroundColor: '#ff4d4d', borderRadius: '0 0 0 20px', zIndex: 2 }}>
                        Popular
                    </span>
                ) : status === 'New' && (
                    <span className="card-status position-absolute top-0 end-0 py-1 px-4 bgn-1 tcn-1 fs-sm fw-bold shadow-sm" style={{ borderRadius: '0 0 0 20px', zIndex: 2 }}>
                        New
                    </span>
                )}
            </div>
            <div className="tournament-content px-xxl-4">
                <div className="tournament-info mb-5">
                    <div className="d-flex align-items-center justify-content-between gap-2 flex-wrap mb-1">
                        <Link href={link || `/competitions/${slug || id}`} className="d-block no-underline">
                            <h4 className="tournament-title tcn-1 mb-0 fs-five transition-all hover:text-[#f26c0d]">
                                {title}
                            </h4>
                        </Link>
                        {status !== 'Popular' && status !== 'New' && (
                            status === 'Coming Soon' ? (
                                <span className="py-2 px-3 tcn-1 d-flex align-items-center gap-2" style={{ backgroundColor: 'rgba(246, 71, 28, 0.1)', border: '1.5px solid #F6471C', borderRadius: '20px', boxShadow: '0 0 15px rgba(246, 71, 28, 0.3)' }}>
                                    <span style={{ width: '8px', height: '8px', backgroundColor: '#F6471C', borderRadius: '50%', boxShadow: '0 0 5px #F6471C' }}></span>
                                    <span className="fw-bold fs-sm text-nowrap">Coming Soon</span>
                                </span>
                            ) : (
                                <span className="py-2 px-3 tcn-1 d-flex align-items-center gap-2" style={{ backgroundColor: 'rgba(242, 108, 13, 0.1)', border: '1px solid #f26c0d', borderRadius: '20px' }}>
                                    <span style={{ width: '8px', height: '8px', backgroundColor: '#f26c0d', borderRadius: '50%' }}></span>
                                    <span className="fs-sm text-nowrap">{status || 'Playing'}</span>
                                </span>
                            )
                        )}
                    </div>
                    <span className="tcn-6 fs-sm">{type}</span>
                </div>
                <div className="hr-line line3"></div>
                {isDetailed ? (
                    <div
                        className="card-info d-flex flex-column gap-2 my-5 position-relative"
                        onMouseEnter={() => isTruncated && setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                    >
                        <p
                            ref={textRef}
                            className="tcn-6 fs-sm mb-0 line-clamp-2"
                        >
                            {fullDescription}
                        </p>
                        {showTooltip && isTruncated && (
                            <div className="custom-tooltip-box rounded-3 p-3 bgn-3 tcn-1 shadow-lg">
                                {fullDescription}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="card-info d-flex align-items-center gap-3 flex-wrap my-5">
                        <div className="platform-info bgn-3 d-flex align-items-center gap-3 py-2 px-3 h-100" style={{ border: '1px solid rgba(242, 108, 13, 0.4)', borderRadius: '12px', boxShadow: '0 0 10px rgba(242, 108, 13, 0.2)' }}>
                            <div className="d-flex align-items-center gap-2">
                                <i className="ti ti-device-gamepad-2 fs-base tcn-1"></i>
                                <span className="tcn-1 fs-sm">{platform}</span>
                            </div>
                        </div>
                        <div className="rating-info bgn-3 d-flex align-items-center gap-1 py-2 px-3 h-100" style={{ border: '1px solid rgba(255, 193, 7, 0.4)', borderRadius: '12px', boxShadow: '0 0 10px rgba(255, 193, 7, 0.2)' }}>
                            <i className="ti ti-star-filled fs-base text-warning"></i>
                            <span className="tcn-1 fs-sm">{rating}</span>
                        </div>
                    </div>
                )}
                <div className="hr-line line3"></div>
                <div className="card-more-info d-between align-items-center mt-6">
                    {isDetailed ? (
                        <Link 
                            href={link || `/competitions/${slug || id}`} 
                            className="daftar-btn d-flex align-items-center justify-content-center py-2 px-6 rounded-pill no-underline" 
                            style={{ 
                                backgroundColor: 'rgba(255, 255, 255, 0.05)', 
                                color: '#ffffff', 
                                border: '1.5px solid #f26c0d', 
                                fontWeight: 'bold',
                                boxShadow: '0 0 15px rgba(242, 108, 13, 0.3)',
                                minWidth: '120px'
                            }}
                        >
                            <span className="fs-six">Daftar</span>
                        </Link>
                    ) : (
                        <Link 
                            href={playUrl || link || `/competitions/${slug || id}`} 
                            target={playUrl ? "_blank" : "_self"}
                            className="play-btn d-flex align-items-center gap-2 py-2 px-6 rounded-pill no-underline" 
                            style={{ 
                                backgroundColor: 'rgba(255, 255, 255, 0.05)', 
                                border: '1px solid rgba(242, 108, 13, 0.5)', 
                                color: '#ffffff', 
                                fontWeight: 'bold',
                                boxShadow: '0 0 15px rgba(242, 108, 13, 0.2)' 
                            }}
                        >
                            <i className="ti ti-player-play-filled fs-six"></i>
                            <span className="fs-six text-nowrap uppercase tracking-widest">Play</span>
                        </Link>
                    )}
                    <Link href={link || `/competitions/${slug || id}`} className="btn-detail d-flex align-items-center justify-content-center rounded-circle" style={{ width: '44px', height: '44px', border: '1px solid rgba(242, 108, 13, 0.5)', color: '#ffffff', boxShadow: '0 0 10px rgba(242, 108, 13, 0.1)' }} title="Lihat Deskripsi">
                        <i className="ti ti-arrow-right fs-2xl"></i>
                    </Link>
                </div>
            </div>
            <style jsx>{`
                .custom-tooltip-box {
                    position: absolute;
                    bottom: 100%;
                    left: 0;
                    width: 100%;
                    max-width: 300px;
                    background: #090b10;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    z-index: 100;
                    margin-bottom: 10px;
                    font-size: 14px;
                    line-height: 1.5;
                    pointer-events: none;
                    animation: tooltipFadeIn 0.3s ease-in-out;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.4);
                }
                .play-btn {
                    transition: all 0.3s ease;
                }
                .play-btn:hover, .daftar-btn:hover {
                    background-color: #ffffff !important;
                    color: #000000 !important;
                    box-shadow: 0 0 25px rgba(242, 108, 13, 0.6) !important;
                    border-color: #f26c0d !important;
                    transform: translateY(-2px);
                }
                .btn-detail {
                    transition: all 0.3s ease;
                }
                .btn-detail:hover {
                    background-color: #ffffff !important;
                    color: #000000 !important;
                    box-shadow: 0 0 25px rgba(242, 108, 13, 0.6) !important;
                    border-color: #f26c0d !important;
                }
                @keyframes tooltipFadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @media (max-width: 575px) {
                    .tournament-card {
                        padding: 15px !important;
                    }
                    .tournament-title {
                        font-size: 1rem !important;
                    }
                }
            `}</style>
        </div>
    );
}

