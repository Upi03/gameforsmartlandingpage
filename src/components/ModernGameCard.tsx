"use client";
import Link from 'next/link';

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
        <div className="modern-game-card group relative flex flex-col h-full bg-[#111319] rounded-[20px] overflow-hidden border border-white/5 transition-all duration-500 hover:scale-[1.03] hover:border-[#f26c0d]/30 shadow-xl hover:shadow-[0_10px_40px_rgba(242,108,13,0.15)] animate-slide-up">
            
            {/* Poster Image (Full/Utuh) */}
            <div className="relative aspect-[10/14] overflow-hidden">
                <img 
                    src={image} 
                    alt={title} 
                    className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${isComingSoon ? 'blur-md opacity-40' : ''}`}
                />
                
                {/* Coming Soon Overlay */}
                {isComingSoon && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black/40 backdrop-blur-sm">
                        <i className="ti ti-lock-filled text-white/50 text-2xl mb-2"></i>
                        <span className="text-white/60 font-black uppercase tracking-[0.2em] text-[10px]">Coming Soon</span>
                    </div>
                )}

                {/* Badge Category (Atas Card) */}
                <div className="absolute top-4 left-4 z-20">
                    <span className="bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/30 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-[0_0_10px_rgba(34,197,94,0.2)]">
                        {type}
                    </span>
                </div>

                {/* Play Now Interaction (Overlay on Hover) */}
                {!isComingSoon && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-30 bg-black/50 backdrop-blur-[2px]">
                        <Link 
                            href={playDirectUrl}
                            target={playUrl ? "_blank" : "_self"}
                            className="play-now-btn bg-orange-gradient px-8 py-3 rounded-full text-white font-black uppercase tracking-widest flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:scale-110 no-underline shadow-[0_0_25px_rgba(242,108,13,0.5)]"
                        >
                            <i className="ti ti-player-play-filled"></i>
                            <span>Play Now</span>
                        </Link>
                    </div>
                )}
            </div>

            {/* Information Section */}
            <div className="p-5 flex flex-col flex-grow relative">
                <h3 className="text-white font-bold text-lg mb-3 tracking-tight group-hover:text-[#f26c0d] transition-colors line-clamp-1">
                    {title}
                </h3>
                
                {/* Bottom Bar: Rating & Platform */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 text-slate-400">
                             <i className={`ti ${platform.toLowerCase().includes('mob') ? 'ti-device-mobile' : 'ti-world'} text-sm`}></i>
                             <span className="text-[10px] uppercase font-bold tracking-widest">{platform}</span>
                        </div>
                        <div className="w-[1px] h-3 bg-white/10"></div>
                        <div className="flex items-center gap-1.5">
                            <i className="ti ti-star-filled text-[#ffcc00] text-xs"></i>
                            <span className="text-white text-[11px] font-bold">{rating}</span>
                        </div>
                    </div>
                </div>

                {/* Footer Interaction: Played Stats & Details Button */}
                <div className="mt-auto flex items-center justify-between">
                    <Link 
                        href={playDirectUrl}
                        target={playUrl ? "_blank" : "_self"}
                        className="flex items-center gap-2 py-2 px-6 rounded-full no-underline transition-all hover:scale-105 active:scale-95" 
                        style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', border: '1px solid #22c55e', color: '#22c55e', fontWeight: 'bold' }}
                    >
                        <i className="ti ti-player-play-filled text-[10px]"></i>
                        <span className="text-[11px] font-black uppercase tracking-widest">
                            Play Now
                        </span>
                    </Link>

                    <Link 
                        href={detailUrl}
                        className="details-btn flex items-center gap-1 text-white/50 hover:text-[#f26c0d] transition-colors no-underline text-[10px] font-black uppercase tracking-widest"
                    >
                        <span>Details</span>
                        <i className="ti ti-arrow-right text-sm"></i>
                    </Link>
                </div>
            </div>

            <style jsx>{`
                .bg-orange-gradient {
                    background: linear-gradient(135deg, #f26c0d 0%, #F6471C 100%);
                }
                .play-now-btn:hover {
                    box-shadow: 0 0 40px rgba(242, 108, 13, 0.7);
                }
                .details-btn:hover i {
                    transform: translateX(3px);
                }
                .details-btn i {
                    transition: transform 0.3s ease;
                }
            `}</style>
        </div>
    );
}
