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
        <div className="modern-game-card group relative flex flex-col h-full bg-[#111319] rounded-[16px] overflow-hidden border border-white/5 transition-all duration-500 hover:scale-[1.03] hover:border-[#22c55e]/30 shadow-xl hover:shadow-[0_10px_40px_rgba(34,197,94,0.15)] animate-slide-up">
            
            {/* Poster Image (Full/Utuh) */}
            <div className="relative aspect-[4/5] overflow-hidden">
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
                    <span className={`bg-transparent border ${type.toLowerCase() === 'action' ? 'border-[#ef4444] text-[#ef4444]' : type.toLowerCase() === 'arcade' ? 'border-[#f26c0d] text-[#f26c0d]' : type.toLowerCase() === 'educational' ? 'border-[#3b82f6] text-[#3b82f6]' : 'border-[#22c55e] text-[#22c55e]'} px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest backdrop-blur-md bg-black/40`}>
                        {type}
                    </span>
                </div>

                {/* Play Now Interaction (Overlay on Hover) */}
                {!isComingSoon && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-30 bg-black/50 backdrop-blur-[2px]">
                        <Link 
                            href={playDirectUrl}
                            target={playUrl ? "_blank" : "_self"}
                            className="play-now-btn bg-[#22c55e] px-8 py-3 rounded-full text-white font-black uppercase tracking-[0.15em] text-[11px] flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:scale-110 no-underline shadow-[0_0_30px_rgba(34,197,94,0.6)]"
                        >
                            <i className="ti ti-player-play-filled text-sm"></i>
                            <span>Play Now</span>
                        </Link>
                    </div>
                )}
            </div>

            {/* Information Section */}
            <div className="p-4 flex flex-col flex-grow relative bg-[#111319]">
                <h3 className="text-white font-bold text-xl mb-1 tracking-tight group-hover:text-[#22c55e] transition-colors line-clamp-1">
                    {title}
                </h3>
                
                {/* Bottom Bar: Rating & Platform */}
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 text-slate-400">
                             <i className={`ti ${platform.toLowerCase().includes('mob') ? 'ti-device-mobile' : 'ti-device-desktop'} text-[12px]`}></i>
                             <span className="text-[9px] uppercase font-bold tracking-[0.15em]">{platform}</span>
                        </div>
                        <div className="flex items-center gap-1.5 pl-3 border-l border-white/10">
                            <i className="ti ti-star-filled text-[#ffcc00] text-[10px]"></i>
                            <span className="text-white text-[11px] font-bold">{rating}</span>
                        </div>
                    </div>
                </div>

                {/* Footer Interaction: Played Stats & Details Button */}
                <div className="mt-auto flex items-center justify-between gap-3 pt-1">
                    <Link 
                        href={playDirectUrl}
                        target={playUrl ? "_blank" : "_self"}
                        className="flex-1 flex justify-center items-center gap-2 py-2.5 px-4 rounded-full no-underline transition-all hover:scale-[1.02] active:scale-95 bg-[#22c55e]/10 border border-[#22c55e]/30 hover:border-[#22c55e] text-[#22c55e] hover:bg-[#22c55e] hover:text-white group/btn" 
                    >
                        <i className="ti ti-player-play-filled text-[10px] group-hover/btn:scale-110 transition-transform"></i>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                            Play Now
                        </span>
                    </Link>

                    <Link 
                        href={detailUrl}
                        className="details-btn flex items-center gap-1.5 text-white/70 hover:text-white transition-colors no-underline text-[10px] font-bold uppercase tracking-widest shrink-0"
                    >
                        <span>Details</span>
                        <i className="ti ti-arrow-right text-[12px]"></i>
                    </Link>
                </div>
            </div>

            <style jsx>{`
                .play-now-btn:hover {
                    box-shadow: 0 0 40px rgba(34, 197, 94, 0.7);
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
