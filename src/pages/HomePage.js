import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const [keyword, setKeyword] = useState("");
  const [searched, setSearched] = useState(false);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalError, setModalError] = useState({ show: false, message: '' });

  // Fungsi internal bawaan Anda tetap dipertahankan 100% tanpa ubahan logika
  const onSearch = async () => {
    if (!keyword.trim()) return;

    setLoading(true);
    try {
      const res = await axios.post("https://judol-detector-production.up.railway.app/search", { keyword });
      if (res.data && res.data.data) {
        setResults(res.data.data); 
        setSearched(true);
      } else {
        setResults([]);
        setSearched(true);
      }
    } catch (error) {
      setModalError({
        show: true,
        message: "Gagal melakukan pencarian. Pastikan server backend aktif dan input valid."
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
<style>{`
        * {
            box-sizing: border-box;
        }
        /* 💡 Ambil font teknologi elegan dari Google Fonts */
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Inter:wght@400;500&display=swap');

        body, html, #root {
            height: 100%;
            margin: 0;
            /* 💡 Latar belakang asli gelap-transparan dan gambar lama dipertahankan penuh */
            background: linear-gradient(rgba(15, 23, 42, 0.85), rgba(30, 41, 59, 0.9)), url("./homepage.jpg") no-repeat center center fixed;
            background-size: cover;
            color: #f8fafc;
            font-family: 'Inter', sans-serif;
        }
        main {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 9rem 1rem 4rem 1rem;
            user-select: none;
            text-align: center;
            min-height: 100vh;
            width: 100%;
        }

        /* ⚡ JUDUL DIGITAL ELEGAN RAJDHANI (Serasi dengan halaman lain, tanpa glow berlebih) */
        .hero-title {
            font-family: 'Rajdhani', sans-serif;
            font-weight: 600;                      /* Tidak terlalu tebal agar elegan */
            font-size: 3.8rem;
            margin: 0 0 0.5rem 0;
            letter-spacing: 0.08em;                /* Renggang digital proporsional */
            text-transform: uppercase;             /* Kapital penuh agar serasi */
            color: #ffffff;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
        }

        .hero-subtitle {
            color: #94a3b8;
            font-size: 1.05rem;
            margin-bottom: 2.5rem;
            max-width: 550px;
            font-weight: 400;                      /* Teks penjelasan biasa/tidak bold */
        }

        /* Modern Search Bar */
        .search-container {
            display: inline-flex;
            align-items: center;
            background: rgba(255, 255, 255, 0.06);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.12);
            border-radius: 50px;
            padding: 0.35rem 0.5rem 0.35rem 1.5rem;
            width: 100%;
            max-width: 500px;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
            margin: 0 auto;
            transition: all 0.3s ease;
        }
        .search-container:focus-within {
            border-color: rgba(99, 102, 241, 0.5);
            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
        }
        .search-container input {
            border: none;
            background: transparent;
            outline: none;
            flex-grow: 1;
            font-size: 1.05rem;
            color: #ffffff;
            padding: 0.5rem;
            font-weight: 400;
        }
        .search-container input::placeholder {
            color: #64748b;
        }
        .search-container button {
            background: #4f46e5;
            border: none;
            cursor: pointer;
            padding: 0.7rem 1.25rem;
            border-radius: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ffffff;
            transition: background 0.2s ease;
        }
        .search-container button:hover {
            background: #4338ca;
        }

        /* Glassmorphism Result Container */
        .result-box {
            margin-top: 3.5rem;
            background: rgba(15, 23, 42, 0.6);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.06);
            border-radius: 16px;
            padding: 1.5rem;
            max-width: 1140px;
            width: 100%;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
            color: #cbd5e1;
            text-align: left;
        }
        .result-box-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.25rem;
        }
        .result-box-header h5 {
            font-weight: 500;
            color: #ffffff;
        }
        .result-count {
            border-radius: 30px;
            padding: 0.35rem 0.85rem;
            background-color: rgba(255, 255, 255, 0.08);
            font-weight: 500;
            font-size: 0.85rem;
            color: #94a3b8;
        }
        .table-wrapper {
            overflow-x: auto;
            max-height: 400px;
            border-radius: 8px;
            border: 1px solid rgba(255, 255, 255, 0.06);
            width: 100%;
        }
        table {
            width: 100%;
            min-width: 850px;
            border-collapse: collapse;
        }
        thead tr {
            background-color: #1e293b;
            color: #94a3b8;
            font-weight: 500;
            position: sticky;
            top: 0;
            z-index: 2;
        }
        th, td {
            border-bottom: 1px solid rgba(255, 255, 255, 0.04);
            text-align: left;
            padding: 0.85rem 1.25rem;
            font-size: 0.875rem;
            font-weight: 400;
        }
        th {
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            font-weight: 500;
        }
        tbody tr:hover {
            background-color: rgba(255, 255, 255, 0.02);
        }
        .url-link {
            color: #38bdf8 !important;
            text-decoration: none;
            display: inline-block;
            max-width: 250px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .url-link:hover {
            text-decoration: underline;
        }

        .badge-status-new, .badge-status-exist {
            padding: 0.2rem 0.6rem;
            border-radius: 4px;
            font-size: 0.75rem;
            font-weight: 400;
        }
        .badge-status-new {
            background: rgba(34, 197, 94, 0.1);
            color: #4ade80;
            border: 1px solid rgba(34, 197, 94, 0.15);
        }
        .badge-status-exist {
            background: rgba(249, 115, 22, 0.1);
            color: #fb923c;
            border: 1px solid rgba(249, 115, 22, 0.15);
        }
                    
        .loading-backdrop {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(15, 23, 42, 0.3);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
        }

        @media (max-width: 768px) {
            .hero-title { font-size: 2.5rem; }
            .result-box { padding: 1rem; }
            th, td { padding: 0.75rem 0.8rem; }
        }
      `}</style>

      {/* Loading Ring */}
      {loading && (
        <div className="loading-backdrop">
          <div className="spinner-border text-primary" role="status" style={{ width: '3.5rem', height: '3.5rem', borderWidth: '0.25em' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      <main role="main">
        {/* Konten Hero Header */}
        <h1 className="hero-title">Judol Detector</h1>
        <p className="hero-subtitle">
          Pelacak web defacement judi online pada infrastruktur web publik.
        </p>

        {/* Input Pencarian */}
        <div className="search-container" role="search" aria-label="Keyword search form">
          <input
            type="search"
            aria-label="Masukkan Keyword"
            placeholder="Masukkan kata kunci indikasi..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") onSearch(); }}
          />
          <button
            onClick={onSearch}
            aria-label="Search"
            title="Search"
          >
            <svg
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
              width="18"
              height="18"
              aria-hidden="true"
              focusable="false"
            >
              <circle cx="11" cy="11" r="7"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>

        {/* Box Hasil & Tabel Rekaman Data */}
        {searched && (
          <section
            className="result-box"
            aria-live="polite"
            aria-label="Search results and summary"
          >
            <div className="result-box-header">
              <div>
                <h5 className="fw-bold mb-0 text-white" style={{ fontSize: '1.1rem' }}>Log Analisis URL</h5>
              </div>
              <div className="result-count" role="status">
                Ditemukan: {results.length} Insiden
              </div>
            </div>

            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th style={{ width: '60px' }}>No</th>
                    <th>Instansi</th>
                    <th>Tautan Eksternal URL</th>
                    <th>Domain Utama</th>
                    <th>Pemicu Kata Kunci</th>
                    <th>Waktu Pindai</th>
                    <th>Status Record</th>
                  </tr>
                </thead>

                <tbody>
                  {results.length > 0 ? results.map((item, idx) => (
                    <tr key={idx}>
                      <td style={{ color: '#94a3b8', fontWeight: 500 }}>{idx + 1}</td>
                      <td className="fw-semibold text-white">{item.nama_instansi}</td>
                      <td>
                        <a href={item.url} target="_blank" rel="noreferrer" className="url-link font-monospace" title={item.url}>
                          {item.url}
                        </a>
                      </td>
                      <td style={{ color: '#cbd5e1' }}>{item.domain_utama}</td>
                      <td>
                        <span style={{ color: '#a5b4fc', background: 'rgba(79, 70, 229, 0.15)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem' }}>
                          {item.keyword}
                        </span>
                      </td>
                      <td style={{ color: '#94a3b8' }}>
                        {new Date(item.timestamp).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                      </td>
                      <td>
                        {/* Mempertahankan warna asli logika Anda namun dikemas dalam Badge Kapsul Modern */}
                        {item.status === 'terupdate' ? (
                          <span className="badge-status-exist">Sudah Ada</span>
                        ) : (
                          <span className="badge-status-new">Baru</span>
                        )}
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="7" className="text-center text-muted py-5">
                        ⚠️ Tidak ada rekam jejak ancaman yang cocok dengan kata kunci tersebut.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>
    </>
  );
}