"use client";
import Link from 'next/link';

interface ModernCompetitionCardProps {
    id: number;
    title: string;
    type: string; // Used for Level/Target
    image: string;
    status: string;
    description: string;
    slug: string;
    players?: string;
    rating?: string;
    platform?: string;
}

export default function ModernCompetitionCard({
    id,
    title,
    type,
    image,
    status,
    description,
    slug,
}: ModernCompetitionCardProps) {
    const linkUrl = `/competitions/${slug || id}`;
    
    // Determine status color/badge
    const getStatusStyles = (status: string) => {
        switch (status.toLowerCase()) {
            case 'active':
            case 'playing':
                return { bg: 'rgba(242, 108, 13, 0.1)', border: '#f26c0d', color: '#f26c0d', label: 'Active' };
            case 'upcoming':
                return { bg: 'rgba(255, 122, 0, 0.1)', border: '#ff7a00', color: '#ff7a00', label: 'Upcoming' };
            case 'finished':
                return { bg: 'rgba(255, 255, 255, 0.05)', border: 'rgba(255,255,255,0.4)', color: '#a0aec0', label: 'Finished' };
            default:
                return { bg: 'rgba(242, 108, 13, 0.1)', border: '#f26c0d', color: '#f26c0d', label: status };
        }
    };

    const styles = getStatusStyles(status);

    return (
        <div className="modern-competition-card bgn-4 position-relative overflow-hidden flex-column d-flex h-100">
            {/* Poster Area */}
            <div className="poster-container position-relative overflow-hidden aspect-poster">
                <img 
                    src={image} 
                    alt={title} 
                    className="poster-img w-100 h-100 object-fit-cover transition-all"
                />
                
                {/* Status & Level Badge Overlay */}
                <div className="badge-overlay position-absolute top-0 start-0 p-4 w-100 d-flex flex-column gap-2 align-items-start z-1">
                    <span 
                        className="status-badge py-1 px-3 rounded-pill fw-bold fs-xs text-uppercase d-flex align-items-center gap-2"
                        style={{ backgroundColor: styles.bg, border: `1px solid ${styles.border}`, color: styles.color }}
                    >
                        <span className="dot" style={{ backgroundColor: styles.color }}></span>
                        {styles.label}
                    </span>
                    <span className="level-badge glass-morphism py-1 px-3 rounded-pill fw-bold fs-xs tcn-1">
                        {type}
                    </span>
                </div>

                {/* Hover Overlay with Button */}
                <div className="hover-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center z-2">
                    <Link 
                        href={linkUrl} 
                        className="register-btn px-6 py-2 rounded-pill fw-bold d-flex align-items-center gap-2 transition-all no-underline"
                    >
                        <span className="fs-six">Detail</span>
                        <i className="ti ti-arrow-right fs-five"></i>
                    </Link>
                </div>
            </div>

            {/* Content Area */}
            <div className="content-area p-5 flex-grow-1 d-flex flex-column">
                <Link href={linkUrl} className="no-underline">
                    <h4 className="competition-title tcn-1 mb-3 transition-all">
                        {title}
                    </h4>
                </Link>
                <p className="competition-summary tcn-6 fs-sm mb-0">
                    {description.length > 100 ? description.substring(0, 100) + '...' : description}
                </p>
                
                <div className="mt-auto pt-5 d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-2 tcn-6 fs-xs">
                        <i className="ti ti-world opacity-50"></i>
                        <span>Online Competition</span>
                    </div>
                    <Link href={linkUrl} className="details-link tcn-1 fs-sm fw-bold d-flex align-items-center gap-1 transition-all no-underline">
                        Details
                        <i className="ti ti-chevron-right"></i>
                    </Link>
                </div>
            </div>

            <style jsx>{`
                .modern-competition-card {
                    border-radius: 20px;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                }
                .modern-competition-card:hover {
                    transform: translateY(-8px);
                    border-color: rgba(255, 122, 0, 0.4);
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(255, 122, 0, 0.15);
                }

                .aspect-poster {
                    aspect-ratio: 4 / 5;
                }

                .poster-img {
                    transform: scale(1.01);
                }
                .modern-competition-card:hover .poster-img {
                    transform: scale(1.1);
                    filter: brightness(0.6);
                }

                .dot {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    box-shadow: 0 0 8px currentColor;
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
                .modern-competition-card:hover .hover-overlay {
                    opacity: 1;
                }

                .register-btn {
                    background: linear-gradient(90deg, #F6471C 0%, #ff7300 100%);
                    color: white;
                    transform: translateY(20px);
                    box-shadow: 0 4px 15px rgba(246, 71, 28, 0.4);
                }
                .modern-competition-card:hover .register-btn {
                    transform: translateY(0);
                }
                .register-btn:hover {
                    box-shadow: 0 6px 25px rgba(246, 71, 28, 0.6);
                    transform: scale(1.05);
                }

                .competition-title {
                    font-weight: 800;
                    line-height: 1.3;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                .modern-competition-card:hover .competition-title {
                    color: #F6471C;
                }

                .competition-summary {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    line-height: 1.6;
                    opacity: 0.8;
                }

                .details-link:hover {
                    color: #F6471C;
                    gap: 4px;
                }
            `}</style>
        </div>
    );
}
