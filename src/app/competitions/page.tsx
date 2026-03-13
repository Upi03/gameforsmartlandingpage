"use client";

import React, { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import ModernCompetitionCard from '@/components/ModernCompetitionCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import { tournamentsData } from '@/data/tournamentsData';

export default function TournamentsPage() {
    const [activeFilter, setActiveFilter] = useState('All');

    const filters = ['All', 'Active', 'Upcoming', 'Finished'];

    const filteredTournaments = tournamentsData.filter(t => {
        if (activeFilter === 'All') return true;
        return t.status.toLowerCase() === activeFilter.toLowerCase();
    });

    return (
        <>
            <Header />
            <main className="main-container container-fluid d-flex pt-sm-20 pt-15 px-0 position-relative">
                <Sidebar />
                <article className="main-content mt-lg-10">
                    {/* Hero/Banner Section */}
                    <section className="tournament-banner mb-lg-15 mb-sm-10 mb-4 pb-lg-10 pb-sm-6">
                        <div className="container-fluid px-lg-15 px-md-10 px-6">
                            <div className="parallax-banner-area parallax-container rounded-5 overflow-hidden position-relative" style={{ height: '300px' }}>
                                <img 
                                    className="w-100 h-100 object-fit-cover parallax-img" 
                                    src="/assets/img/tournament-banner.png" 
                                    alt="tournament banner" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent d-flex align-items-end p-8">
                                    <div className="banner-content">
                                        <h1 className="display-four tcn-1 fw-black text-uppercase mb-2">
                                            Elite <span className="text-orange-gradient">Competitions</span>
                                        </h1>
                                        <p className="tcn-6 fs-lg max-w-600 m-0">
                                            Tantang dirimu dalam ajang kompetisi bergengsi. Buktikan kecerdasanmu dan menangkan hadiah utama!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="tournament-section pb-120">
                        <div className="tournament-wrapper alt">
                            <div className="container-fluid px-lg-15 px-md-10 px-6">
                                <Breadcrumbs />
                                
                                <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-6 mb-12">
                                    <div className="title-area">
                                        <h2 className="fs-two tcn-1 fw-black text-uppercase m-0 d-flex align-items-center gap-3">
                                            <div className="accent-bar h-10 w-2 bg-orange-gradient rounded-pill"></div>
                                            Competitions
                                        </h2>
                                    </div>

                                    {/* Modern Pill Filters */}
                                    <div className="filter-pill-wrapper d-flex flex-wrap gap-2">
                                        {filters.map((filter) => (
                                            <button
                                                key={filter}
                                                className={`filter-pill py-2 px-6 rounded-pill border-0 transition-all font-bold ${
                                                    activeFilter === filter ? 'active' : ''
                                                }`}
                                                onClick={() => setActiveFilter(filter)}
                                            >
                                                {filter}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="row g-8 row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xxl-4">
                                    {filteredTournaments.length > 0 ? (
                                        filteredTournaments.map((tournament, index) => (
                                            <div 
                                                key={tournament.id} 
                                                className="col mb-4 fade-in-up"
                                                style={{ animationDelay: `${index * 0.1}s` }}
                                            >
                                                <ModernCompetitionCard 
                                                    id={tournament.id}
                                                    title={tournament.title}
                                                    type={tournament.type}
                                                    image={tournament.image}
                                                    status={tournament.status}
                                                    description={tournament.description}
                                                    slug={tournament.slug}
                                                />
                                            </div>
                                        ))
                                    ) : (
                                        <div className="col-12 text-center py-20 animate-fade-in">
                                            <div className="bgn-4 p-10 rounded-4 border border-white/5 shadow-2xl mx-auto" style={{ maxWidth: '500px' }}>
                                                <i className="ti ti-calendar-off fs-1 text-orange-gradient mb-4 d-block opacity-50"></i>
                                                <h4 className="tcn-1 mb-2">Oops! Tidak ada kompetisi</h4>
                                                <p className="tcn-6 mb-0">Belum ada kompetisi dengan status "{activeFilter}" saat ini. Coba filter lain!</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>
                    <Footer />
                </article>
            </main>

            <style jsx>{`
                .text-orange-gradient {
                    background: linear-gradient(90deg, #F6471C, #ff7300);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .bg-orange-gradient {
                    background: linear-gradient(90deg, #F6471C, #ff7300);
                }

                .filter-pill {
                    background: rgba(255, 255, 255, 0.05);
                    color: #a0aec0;
                    cursor: pointer;
                }
                .filter-pill:hover {
                    background: rgba(255, 255, 255, 0.1);
                    color: #fff;
                    transform: translateY(-2px);
                }
                .filter-pill.active {
                    background: linear-gradient(90deg, #F6471C 0%, #ff7300 100%);
                    color: #fff;
                    box-shadow: 0 4px 15px rgba(246, 71, 28, 0.4);
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
                .animate-fade-in {
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
            `}</style>
        </>
    );
}

const metadata = {
    title: 'Competition | GameForSmart 2026',
    description: 'Ikuti berbagai kompetisi cerdas cermat dan game edukatif dengan hadiah menarik.',
};
