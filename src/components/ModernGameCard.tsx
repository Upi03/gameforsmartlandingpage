"use client";
import Link from 'next/link';
import React from 'react';

interface ModernGameCardProps {
    id: number;
    title: string;
    type: string;
    image: string;
    status: string;
    rating: string;
    platform: string;
    players: string;
    slug?: string;
    playUrl?: string;
}

export default function ModernGameCard({
    id,
    title,
    type,
    image,
    status,
    rating,
    platform,
    players,
    slug,
    playUrl
}: ModernGameCardProps) {
    const isComingSoon = status === 'Coming Soon';
    const detailUrl = `/games/${slug || id}`;
    const playDirectUrl = playUrl || `/play/${slug || id}`;

    return (
        <div className="modern-game-card bgn-4 position-relative overflow-hidden flex-column d-flex h-100">
            {/* Poster Area */}
            <div className="poster-container position-relative overflow-hidden aspect-poster">
                <img 
                    src={image} 
                    alt={title} 
                    className="poster-img w-100 h-100 object-fit-cover transition-all"
                />
                
                {/* Badge Overlay (Glass Morphism) */}
                <div className="badge-overlay position-absolute top-0 start-0 p-4 w-100 d-flex flex-column gap-2 align-items-start z-1">
                    <span className="genre-badge glass-morphism py-1 px-3 rounded-pill fw-bold fs-xs tcn-1 uppercase tracking-widest">
                        {type}
                    </span>
                    {isComingSoon && (
                        <span className="status-badge py-1 px-3 rounded-pill fw-bold fs-xs text-uppercase d-flex align-items-center gap-2 bg-black/40 border border-white/20 text-white/60">
                            <i className="ti ti-lock-filled fs-xs"></i>
                            Locked
                        </span>
                    )}
                </div>

                {/* Hover Overlay with Sliding Button */}
                <div className="hover-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center z-2">
                    {!isComingSoon ? (
                        <Link 
                            href={playDirectUrl}
                            target={playUrl ? "_blank" : "_self"}
                            className="play-now-btn px-6 py-2 rounded-pill fw-bold d-flex align-items-center gap-2 transition-all no-underline"
                        >
                            <span className="fs-six">Play Now</span>
                            <i className="ti ti-player-play-filled fs-five"></i>
                        </Link>
                    ) : (
                        <span className="locked-msg glass-morphism px-6 py-2 rounded-pill fw-bold tcn-1 opacity-50">Coming Soon</span>
                    )}
                </div>
            </div>

            {/* Content Area (Synchronized with Competition Grid) */}
            <div className="content-area p-5 flex-grow-1 d-flex flex-column">
                <Link href={detailUrl} className="no-underline">
                    <h4 className="game-title tcn-1 mb-3 transition-all line-clamp-1">
                        {title}
                    </h4>
                </Link>
                
                {/* Middle Info: Platform & Rating */}
                <div className="flex items-center gap-4 mb-4">
                    <div className="d-flex align-items-center gap-2 tcn-6 fs-xs">
                         <i className={`ti ${platform.toLowerCase().includes('mob') ? 'ti-device-mobile' : 'ti-device-desktop'} opacity-50`}></i>
                         <span className="uppercase tracking-wider">{platform}</span>
                    </div>
                    <div className="d-flex align-items-center gap-1.5 tcn-1 fs-xs border-l border-white/10 pl-4">
                        <i className="ti ti-star-filled text-[#ffcc00]"></i>
                        <span className="fw-bold">{rating}</span>
                    </div>
                </div>

                {/* Footer Link */}
                <div className="mt-auto pt-3 d-flex justify-content-between align-items-center">
                    <div className="tcn-6 fs-xs opacity-50">
                        {players || '10k+'} Players
                    </div>
                    <Link href={detailUrl} className="details-link tcn-1 fs-sm fw-bold d-flex align-items-center gap-1 transition-all no-underline">
                        Details
                        <i className="ti ti-chevron-right"></i>
                    </Link>
                </div>
            </div>

            <style jsx>{`
                .modern-game-card {
                    border-radius: 20px;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                }
                .modern-game-card:hover {
                    transform: translateY(-8px);
                    border-color: rgba(34, 197, 94, 0.4);
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(34, 197, 94, 0.15);
                }

                .aspect-poster {
                    aspect-ratio: 4 / 5;
                }

                .poster-img {
                    transform: scale(1.01);
                }
                .modern-game-card:hover .poster-img {
                    transform: scale(1.1);
                    filter: brightness(0.6);
                }

                .glass-morphism {
                    background: rgba(0, 0, 0, 0.4);
                    backdrop-filter: blur(8px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }

                .hover-overlay {
                    opacity: 0;
                    background: rgba(0, 0, 0, 0.2);
                    transition: all 0.4s ease;
                }
                .modern-game-card:hover .hover-overlay {
                    opacity: 1;
                }

                .play-now-btn {
                    background: linear-gradient(90deg, #22c55e 0%, #16a34a 100%);
                    color: white;
                    transform: translateY(20px);
                    box-shadow: 0 4px 15px rgba(34, 197, 94, 0.4);
                }
                .modern-game-card:hover .play-now-btn {
                    transform: translateY(0);
                }
                .play-now-btn:hover {
                    box-shadow: 0 6px 25px rgba(34, 197, 94, 0.6);
                    transform: scale(1.05);
                }

                .game-title {
                    font-weight: 800;
                    line-height: 1.3;
                    margin: 0;
                }
                .modern-game-card:hover .game-title {
                    color: #22c55e;
                }

                .details-link:hover {
                    color: #22c55e;
                    gap: 4px;
                }
            `}</style>
        </div>
    );
}
