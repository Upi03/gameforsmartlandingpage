"use client";

import React, { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import ModernGameCard from '@/components/ModernGameCard';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import { allItemsData } from '@/data/allItemsData';

export default function GamesView() {
    const [activeTab, setActiveTab] = useState('All');
    const [visibleGames, setVisibleGames] = useState(8);

    const handleLoadMore = () => {
        setVisibleGames(prev => prev + 8);
    };

    const games = allItemsData.filter(item => item.type === 'game');

    const filteredGames = activeTab === 'All'
        ? games
        : games.filter(game => game.status === activeTab || game.genre === activeTab);

    return (
        <>
            <Header />
            <main className="main-container container-fluid d-flex pt-20 px-0 position-relative bg-black min-h-screen" style={{ overflowX: 'hidden' }}>
                {/* Background Glows */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                    <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#22c55e]/5 blur-[120px] rounded-full"></div>
                    <div className="absolute top-[40%] right-[-10%] w-[40%] h-[40%] bg-[#22c55e]/5 blur-[120px] rounded-full"></div>
                </div>

                <Sidebar />
                <article className="main-content mt-10 w-100 z-10">
                    <section className="tournament-section game-section pb-24">
                        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-15 py-10">
                            
                            {/* Header & Filters */}
                            <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
                                <div className="text-center md:text-left">
                                    <h2 className="text-white text-5xl md:text-6xl font-black uppercase tracking-tighter mb-2 animate-slide-up">
                                        Explore <span className="text-[#22c55e]">Games</span>
                                    </h2>
                                    <p className="text-slate-400 font-medium tracking-wide">Discover your next favorite adventure</p>
                                </div>
                                
                                <div className="flex-shrink-0 animate-fade-in">
                                    <div className="flex flex-wrap items-center justify-center gap-3 bg-white/5 p-2 rounded-full border border-white/10 backdrop-blur-md">
                                        {['All', 'Action', 'Racing', 'Puzzle', 'Trivia', 'Coming Soon'].map((tab) => (
                                            <button
                                                key={tab}
                                                style={{ borderRadius: '9999px' }}
                                                className={`py-2.5 px-6 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300 ${
                                                    activeTab === tab 
                                                    ? 'bg-[#22c55e] text-white shadow-[0_0_20px_rgba(34,197,94,0.4)]' 
                                                    : 'text-slate-400 hover:text-white hover:bg-white/10'
                                                }`}
                                                onClick={() => {
                                                    setActiveTab(tab);
                                                    setVisibleGames(8); // Reset on filter
                                                }}
                                            >
                                                {tab}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Game Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                                {filteredGames.slice(0, visibleGames).map((game, index) => (
                                    <div 
                                        key={game.id} 
                                        className="animate-slide-up"
                                        style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }}
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
                                <div className="text-center mt-12 animate-fade-in">
                                    <button 
                                        onClick={handleLoadMore}
                                        className="bg-transparent border-2 border-white/10 hover:border-[#22c55e] text-white hover:text-[#22c55e] px-12 py-4 rounded-full font-black uppercase tracking-[0.2em] transition-all duration-300 hover:bg-[#22c55e]/10 group flex items-center gap-3 mx-auto"
                                    >
                                        Load More Experiences
                                        <i className="ti ti-arrow-down group-hover:translate-y-1 transition-transform"></i>
                                    </button>
                                </div>
                            )}

                            {filteredGames.length === 0 && (
                                <div className="text-center py-20 text-slate-500">
                                    <i className="ti ti-mood-empty text-6xl mb-4 text-white/20"></i>
                                    <h3 className="text-2xl font-bold uppercase tracking-widest text-white/40">No games found</h3>
                                </div>
                            )}

                        </div>
                    </section>
                    <CTA />
                    <Footer />
                </article>

                <style jsx>{`
                    .animate-slide-up { animation: fadeInUp 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) forwards; opacity: 0; }
                    .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; opacity: 0; }
                    
                    @keyframes fadeInUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
                    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                `}</style>
            </main>
        </>
    );
}
