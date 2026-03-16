"use client";

import React, { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import ModernGameCard from '@/components/ModernGameCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import { allItemsData } from '@/data/allItemsData';

export default function GamesView() {
    const [activeTab, setActiveTab] = useState('All');
    const [visibleGames, setVisibleGames] = useState(8);

    const handleLoadMore = () => {
        setVisibleGames(prev => prev + 12);
    };

    const games = allItemsData.filter(item => item.type === 'game');

    const filteredGames = activeTab === 'All'
        ? games
        : games.filter(game => game.status === activeTab || game.genre === activeTab);

    return (
        <>
            <Header />
            <main className="main-container container-fluid d-flex pt-sm-20 pt-15 px-0 position-relative">
                <Sidebar />
                <article className="main-content mt-lg-10 w-100">
                    {/* Hero/Banner Section - Synchronized with Competitions */}
                    <section className="game-banner mb-lg-15 mb-sm-10 mb-4 pb-lg-10 pb-sm-6">
                        <div className="container-fluid px-lg-15 px-md-10 px-6">
                            <div className="parallax-banner-area parallax-container rounded-5 overflow-hidden position-relative" style={{ height: '300px' }}>
                                <img 
                                    className="w-100 h-100 object-fit-cover parallax-img" 
                                    src="/assets/img/game-banner.png" 
                                    alt="games banner" 
                                    onError={(e) => { e.currentTarget.src = "/assets/img/tournament-banner.png"; }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent d-flex align-items-end p-8">
                                    <div className="banner-content">
                                        <h1 className="display-four tcn-1 fw-black text-uppercase mb-2">
                                            Ultimate <span className="text-green-gradient">Experiences</span>
                                        </h1>
                                        <p className="tcn-6 fs-lg max-w-600 m-0">
                                            Jelajahi perpustakaan game terbaik kami. Temukan petualangan favoritmu dan mainkan secara instan sekarang juga!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="tournaments-section pb-120">
                        <div className="tournament-wrapper alt">
                            <div className="container-fluid px-lg-15 px-md-10 px-6">
                                <Breadcrumbs />
                                
                                <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-6 mb-12">
                                    <div className="title-area">
                                        <h2 className="fs-two tcn-1 fw-black text-uppercase m-0 d-flex align-items-center gap-3">
                                            <div className="accent-bar h-10 w-2 bg-green-gradient rounded-pill"></div>
                                            Explore Games
                                        </h2>
                                    </div>

                                    {/* Modern Pill Filters - Synchronized with Competitions */}
                                    <div className="filter-pill-wrapper d-flex flex-wrap gap-2">
                                        {['All', 'Action', 'Racing', 'Puzzle', 'Trivia', 'Coming Soon'].map((tab) => (
                                            <button
                                                key={tab}
                                                className={`filter-pill py-2 px-6 rounded-pill border-0 transition-all font-bold ${
                                                    activeTab === tab ? 'active' : ''
                                                }`}
                                                onClick={() => {
                                                    setActiveTab(tab);
                                                    setVisibleGames(8);
                                                }}
                                            >
                                                {tab}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Professional Game Grid - Synchronized with Competitions Grid */}
                                <div className="row g-8 row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xxl-4">
                                    {filteredGames.slice(0, visibleGames).map((game, index) => (
                                        <div 
                                            key={game.id} 
                                            className="col mb-4 fade-in-up"
                                            style={{ animationDelay: `${index * 0.1}s` }}
                                        >
                                            <ModernGameCard
                                                id={game.id}
                                                title={game.title}
                                                type={game.genre}
                                                image={game.image}
                                                status={game.status}
                                                platform={game.platform}
                                                rating={game.rating}
                                                players={game.players}
                                                slug={game.slug}
                                                playUrl={game.playUrl}
                                            />
                                        </div>
                                    ))}
                                </div>

                                {/* Load More Action */}
                                {visibleGames < filteredGames.length && (
                                    <div className="text-center mt-20 fade-in">
                                        <button 
                                            onClick={handleLoadMore}
                                            className="load-more-btn px-12 py-4 rounded-pill font-black uppercase tracking-[0.2em] text-[11px] tcn-1 border border-white/10 transition-all duration-300 hover:border-[#22c55e] group"
                                        >
                                            Load More Experiences
                                            <i className="ti ti-chevron-down ms-2 group-hover:translate-y-1 transition-transform"></i>
                                        </button>
                                    </div>
                                )}

                                {/* Empty State */}
                                {filteredGames.length === 0 && (
                                    <div className="col-12 text-center py-20 fade-in">
                                        <div className="bgn-4 p-10 rounded-4 border border-white/5 shadow-2xl mx-auto" style={{ maxWidth: '500px' }}>
                                            <i className="ti ti-device-gamepad-off fs-1 text-green-gradient mb-4 d-block opacity-50"></i>
                                            <h4 className="tcn-1 mb-2">No Games Found</h4>
                                            <p className="tcn-6 mb-0">Belum ada game untuk kategori "{activeTab}" saat ini. Coba filter lain!</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>

                    <CTA />
                    <Footer />
                </article>
            </main>

            <style jsx>{`
                .text-green-gradient {
                    background: linear-gradient(90deg, #22c55e, #16a34a);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .bg-green-gradient {
                    background: linear-gradient(90deg, #22c55e, #16a34a);
                }

                .filter-pill {
                    background: rgba(255, 255, 255, 0.05);
                    color: #a0aec0;
                    cursor: pointer;
                    font-size: 13px;
                }
                .filter-pill:hover {
                    background: rgba(255, 255, 255, 0.1);
                    color: #fff;
                    transform: translateY(-2px);
                }
                .filter-pill.active {
                    background: linear-gradient(90deg, #22c55e 0%, #16a34a 100%);
                    color: #fff;
                    box-shadow: 0 4px 15px rgba(34, 197, 94, 0.4);
                }

                .fade-in-up {
                    animation: fadeInUp 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
                    opacity: 0;
                    transform: translateY(30px);
                }
                @keyframes fadeInUp {
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .fade-in {
                    animation: fadeIn 0.5s ease-out forwards;
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                .parallax-img {
                    transition: transform 0.5s ease-out;
                }
                .parallax-container:hover .parallax-img {
                    transform: scale(1.05);
                }

                .load-more-btn {
                    background: rgba(255, 255, 255, 0.03);
                }
                .load-more-btn:hover {
                    background: rgba(34, 197, 94, 0.1);
                    color: #22c55e;
                }
            `}</style>
        </>
    );
}
