"use client";

import React from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import ZoomableElement from '@/components/ZoomableElement';
import Footer from '@/components/Footer';

export default function ZoomDemoPage() {
  return (
    <>
      <Header />
      <main className="main-container container-fluid d-flex pt-20 px-0 position-relative">
        <Sidebar />
        <article className="main-content mt-10 p-6 flex-grow-1">
          <div className="container-fluid px-lg-15">
            <h1 className="display-five fw-bold text-uppercase mb-4">Smooth Zoom Demo</h1>
            <p className="text-slate-400 mb-8">
              Contoh implementasi fitur zoom in dan zoom out yang lancar, responsif, dan smooth.
            </p>

            <div className="row g-8">
              <div className="col-lg-8">
                <div className="bg-[#1a1c23] p-6 rounded-4 border border-white/5 shadow-lg">
                  <h3 className="fs-5 fw-bold mb-4">Responsive Image Zoom</h3>
                  <ZoomableElement>
                    <img 
                      src="/assets/img/malang-raya-banner-v2.png" 
                      alt="Demo" 
                      className="w-100 h-auto rounded-3"
                    />
                  </ZoomableElement>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="bg-[#1a1c23] p-6 rounded-4 border border-white/5 shadow-lg h-100">
                  <h3 className="fs-5 fw-bold mb-4">Fitur Utama</h3>
                  <ul className="list-unstyled space-y-4">
                    <li className="d-flex gap-3">
                      <i className="ti ti-circle-check text-success fs-5"></i>
                      <span>Smooth CSS Transitions</span>
                    </li>
                    <li className="d-flex gap-3">
                      <i className="ti ti-circle-check text-success fs-5"></i>
                      <span>Centered Scale Logic</span>
                    </li>
                    <li className="d-flex gap-3">
                      <i className="ti ti-circle-check text-success fs-5"></i>
                      <span>Responsive Container</span>
                    </li>
                    <li className="d-flex gap-3">
                      <i className="ti ti-circle-check text-success fs-5"></i>
                      <span>Limit Max/Min Zoom</span>
                    </li>
                  </ul>
                  
                  <div className="mt-8 p-4 bg-black/20 rounded-3 border border-white/5">
                    <p className="text-sm text-slate-400 m-0">
                      <strong>Tip:</strong> Anda dapat membungkus elemen apapun (gambar, chart, atau div) dengan <code>&lt;ZoomableElement&gt;</code> untuk memberikan fitur zoom.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </article>
      </main>
    </>
  );
}
