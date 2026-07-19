import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sheetId, setSheetId] = useState('');
  const [data, setData] = useState([]);
  const [fullData, setFullData] = useState([]);
  const [loading] = useState(false); // 💡 Hapus 'setLoading' karena tidak pernah dipanggil
  const [modal, setModal] = useState({ show: false, message: '' });

  // Logika otomatis penutupan modal bawaan Anda tetap dipertahankan
  useEffect(() => {
    if (modal.show && (modal.message.includes('berhasil') || modal.message.includes('Gagal transfer'))) {
      const timer = setTimeout(() => {
        setModal({ show: false, message: '' });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [modal]);

  // Ambil data awal saat komponen mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const res = await axios.get('https://judol-detector-production.up.railway.app/data');
        const fetched = res.data.data.map((row, idx) => ({
          ...row,
          no: idx + 1,
          keterangan: 'Belum Terhubung',
        }));
        setFullData(fetched);
        setData(fetched);
      } catch (err) {
        setModal({ show: true, message: 'Gagal mengambil data awal: ' + err.message });
      }
    };
    fetchInitialData();
  }, []);

  // Filter pencarian reaktif bawaan Anda tetap dipertahankan
  useEffect(() => {
    const keyword = searchTerm.toLowerCase().trim();

    const filtered = fullData
      .filter((row) =>
        Object.values(row).some((val) =>
          val && val.toString().toLowerCase().includes(keyword)
        )
      )
      .map((row, idx) => ({ ...row, no: idx + 1 }));

    setData(filtered);
  }, [searchTerm, fullData]);

  const handleSheetIdSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!sheetId) return setModal({ show: true, message: 'Sheet ID tidak boleh kosong.' }); 

    try {
      const res = await axios.post('https://judol-detector-production.up.railway.app/check-transfer-data', {
        sheet_id: sheetId,
      });

      const existingUrls = res.data; 
      const updated = data.map((row, idx) => ({
        ...row,
        keterangan: existingUrls.includes(row.url) ? 'Sudah ada' : 'Belum ada',
        no: idx + 1,
      }));

      setData(updated);
      setFullData(updated);
    } catch (err) {
      setModal({ show: true, message: 'Gagal memeriksa sheet: ' + err.message });
    }
  };

  const handleTransferRow = async (row) => {
    try {
      await axios.post('https://judol-detector-production.up.railway.app/transfer-row', {
        sheet_id: sheetId,
        row: {
          url: row.url,
          nama_instansi: row.nama_instansi,
          tipe_insiden: row.tipe_insiden,
          status: row.status,
        },
      });
      setModal({ show: true, message: 'Baris berhasil ditransfer!' });
      await handleSheetIdSubmit(new Event('submit'));
    } catch (err) {
      setModal({ show: true, message: 'Gagal transfer baris: ' + err.message });
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Inter:wght@400;500&display=swap');
        
        body {
          margin: 0;
          background-color: #f8fafc;
          font-family: 'Inter', sans-serif;
          color: #334155;
        }
        .tagline-section {
          font-family: "Rajdhani", sans-serif;
          background: linear-gradient(rgba(15, 23, 42, 0.85), rgba(30, 41, 59, 0.9)), url('./background.jpeg') no-repeat center center;
          background-size: cover;
          height: 140px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: white;
          user-select: none;
        }
        .tagline-section h1 {
          margin: 0;
          font-size: 2.5rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .tagline-subtitle {
          font-size: 0.95rem;
          color: #94a3b8;
          margin-top: 0.25rem;
          font-weight: 400;
        }
        main {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem 4rem;
          user-select: none;
        }
        .form-wrapper {
          display: flex;
          gap: 1.5rem;
          justify-content: space-between;
          margin-top: -2.5rem;
          margin-bottom: 2rem;
          position: relative;
          z-index: 10;
        }
        .form-container-custom {
          flex: 1;
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 1rem;
          display: flex;
          align-items: center;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
        }
        .search-box-custom {
          border: 1px solid #cbd5e1;
          border-radius: 8px 0 0 8px;
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
          flex-grow: 1;
          outline: none;
          height: 42px;
          color: #334155;
          background-color: #fff;
          font-weight: 400;
          transition: border-color 0.2s;
        }
        .search-box-custom:focus {
          border-color: #6366f1;
        }
        .search-box-custom::placeholder {
          color: #94a3b8;
          font-weight: 400;
        }
        .button-icon-custom {
          background-color: #1e293b;
          border: 1px solid #1e293b;
          border-radius: 0 8px 8px 0;
          padding: 0 20px;
          cursor: pointer;
          color: white;
          font-size: 0.875rem;
          font-weight: 500;
          height: 42px;
          transition: background-color 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .button-icon-custom:hover {
          background-color: #0f172a;
          border-color: #0f172a;
        }
        .button-icon-custom svg {
          width: 16px;
          height: 16px;
          stroke: white;
          stroke-width: 2.5;
          stroke-linecap: round;
          stroke-linejoin: round;
          fill: none;
        }
        .data-box {
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          padding: 0;
          border-radius: 12px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          overflow: hidden;
        }
        .data-wrapper {
          width: 100%;
        }
        .data-header-panel {
          padding: 1.5rem 1.5rem 1rem 1.5rem;
          border-bottom: 1px solid #f1f5f9;
        }
        .data-title {
          font-size: 1.1rem;
          font-weight: 500;
          color: #1e293b;
          margin: 0 0 0.25rem 0;
        }
        .data-desc {
          font-size: 0.875rem;
          color: #64748b;
          margin: 0;
        }
        .table-scroll-container {
          max-height: 500px;
          overflow-y: auto;
          overflow-x: auto;
          width: 100%;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          table-layout: fixed;
        }
        .data-table thead th {
          position: sticky;
          top: 0;
          z-index: 10;
          background-color: #1e293b;
          color: #94a3b8;
          text-align: left;
          font-weight: 500;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 1rem;
          border-bottom: 1px solid #e2e8f0;
        }
        td {
          border-bottom: 1px solid #f1f5f9;
          padding: 1rem;
          text-align: left;
          word-wrap: break-word;
          font-weight: 400;
          font-size: 0.875rem;
          color: #334155;
        }
        .data-table tbody tr:hover td {
          background-color: #f8fafc;
        }
        .data-table td a {
          color: #2563eb;
          text-decoration: none;
          display: inline-block;
          max-width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .data-table td a:hover {
          text-decoration: underline;
        }
        
        /* Badge Status & Keterangan Tipis Elegan */
        .badge-pill-custom {
          padding: 0.25rem 0.6rem;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 400;
          display: inline-block;
        }
        .badge-sudah, .badge-ada {
          background: rgba(34, 197, 94, 0.1);
          color: #22c55e;
          border: 1px solid rgba(34, 197, 94, 0.15);
        }
        .badge-suspend, .badge-belum-ada {
          background: rgba(249, 115, 22, 0.1);
          color: #d97706;
          border: 1px solid rgba(249, 115, 22, 0.15);
        }
        .badge-belum {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          border: 1px solid rgba(239, 68, 68, 0.15);
        }
        
        .btn-input-custom {
          border-radius: 6px;
          border: 1px solid #cbd5e1;
          background-color: #fff;
          color: #334155;
          padding: 0.25rem 0.75rem;
          font-size: 0.813rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-input-custom:hover {
          background-color: #f1f5f9;
        }

        @media (max-width: 768px) {
          .form-wrapper {
            flex-direction: column;
            gap: 1rem;
            margin-top: -1.5rem;
          }
          .form-container-custom {
            max-width: 100%;
          }
        }
      `}</style>

      {/* Bagian Judul Utama Statis di Atas */}
      <section className="tagline-section">
        <h1>Transfer Ke Sheets</h1>
        <div className="tagline-subtitle"></div>
      </section>

      <main>
        {/* Panel Kontrol Input */}
        <div className="form-wrapper">
          <form className="form-container-custom" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              className="search-box-custom"
              placeholder="Cari repositori data lokal..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="button-icon-custom" type="button" aria-label="Search button">
              <svg viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="7" />
                <line x1="16.5" y1="16.5" x2="20" y2="20" />
              </svg>
            </button>
          </form>

          <form className="form-container-custom" onSubmit={handleSheetIdSubmit}>
            <input
              type="text"
              className="search-box-custom"
              placeholder="Masukkan Google Sheet ID target..."
              value={sheetId}
              onChange={(e) => setSheetId(e.target.value)}
            />
            <button className="button-icon-custom" type="submit">
              <svg viewBox="0 0 24 24">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </form>
        </div>

        {/* Notifikasi Modal Bawaan */}
        {modal.show && (
          <div className="modal show fade" style={{ display: 'block', backgroundColor: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)', zIndex: 1050 }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '12px', overflow: 'hidden' }}>
                <div className="modal-header bg-light border-0 py-3">
                  <h5 className="modal-title fw-medium text-dark" style={{ fontSize: '1.05rem' }}>Pemberitahuan Sistem</h5>
                  <button type="button" className="btn-close" onClick={() => setModal({ show: false, message: '' })}></button>
                </div>
                <div className="modal-body py-4">
                  <p className="mb-0 text-secondary">{modal.message}</p>
                </div>
                <div className="modal-footer border-0 pt-0">
                  <button className="btn-input-custom" style={{ padding: '0.5rem 1.25rem' }} onClick={() => setModal({ show: false, message: '' })}>
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tabel Data Rekaman */}
        <div className="data-box">
          <div className="data-header-panel">
            <h5 className="data-title">Daftar Antrean Migrasi</h5>
            <p className="data-desc">Kelola dan salin entri log siber terpilih ke dalam Google Spreadsheet eksternal</p>
          </div>
          <div className="data-wrapper">
            <div className="table-scroll-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th style={{ width: '60px' }}>No</th>
                    <th style={{ width: '22%' }}>Nama Instansi</th>
                    <th style={{ width: '28%' }}>Tautan Dokumen URL</th>
                    <th style={{ width: '15%' }}>Tipe Insiden</th>
                    <th style={{ width: '12%' }}>Status Aksi</th>
                    <th style={{ width: '13%' }}>Keterangan Sheets</th>
                    <th style={{ width: '80px', textAlign: 'center' }}>Migrasi</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="7" style={{ textAlign: 'center', color: '#64748b', padding: '3rem 0' }}>
                        <div className="spinner-border spinner-border-sm text-primary me-2" role="status"></div>
                        Sinkronisasi basis data, mohon tunggu...
                      </td>
                    </tr>
                  ) : data.length === 0 ? (
                    <tr>
                      <td colSpan="7" style={{ textAlign: 'center', color: '#64748b', padding: '3rem 0' }}>
                        Tidak ada kecocokan riwayat log data yang ditemukan.
                      </td>
                    </tr>
                  ) : (
                    data.map((row, idx) => (
                      <tr key={idx}>
                        <td style={{ color: '#64748b' }}>{row.no}</td>
                        <td style={{ color: '#1e293b' }}>{row.nama_instansi}</td>
                        <td>
                          <a href={row.url} target="_blank" rel="noreferrer" title={row.url}>
                            {row.url}
                          </a>
                        </td>
                        <td style={{ color: '#475569' }}>{row.tipe_insiden || '-'}</td>
                        <td>
                          <span className={`badge-pill-custom ${
                            row.status === 'Sudah' ? 'badge-sudah' : row.status === 'Suspend' ? 'badge-suspend' : 'badge-belum'
                          }`}>
                            {row.status || 'Belum'}
                          </span>                    
                        </td>
                        <td>
                          <span className={`badge-pill-custom ${
                            row.keterangan === 'Sudah ada' ? 'badge-ada' : 'badge-belum-ada'
                          }`}>
                            {row.keterangan}
                          </span>  
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <button
                            className="btn-input-custom"
                            onClick={() => handleTransferRow(row)}
                          >
                            Input
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;