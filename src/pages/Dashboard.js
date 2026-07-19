import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Tagline = () => (
  <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Inter:wght@400;500&display=swap');
      
      body {
        background-color: #f8fafc;
        font-family: 'Inter', sans-serif;
        color: #334155;
        margin: 0;
      }
      .tagline-section {
        font-family: "Rajdhani", sans-serif;
        background: linear-gradient(rgba(15, 23, 42, 0.85), rgba(30, 41, 59, 0.9)), url('./dashboard.jpg') no-repeat center center;
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
      .info-section {
        display: flex;
        justify-content: center;
        gap: 1.5rem;
        margin: -2.5rem 1rem 2rem 1rem;
        flex-wrap: wrap;
        user-select: none;
        position: relative;
        z-index: 10;
      }
      .info-box {
        background-color: #ffffff;
        border-radius: 12px;
        border: 1px solid #e2e8f0;
        padding: 1.25rem 1.5rem;
        width: 320px;
        height: 130px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;      /* 💡 Diubah dari flex-start ke center agar konten berada di tengah */
        text-align: center;       /* 💡 Memastikan teks multi-baris tetap rata tengah */
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
        color: #334155;
        cursor: default;
        transition: transform 0.2s ease;
      }
      .info-box:hover {
        transform: translateY(-2px);
      }
      .info-title {
        margin: 0 0 0.5rem 0;
        font-weight: 500;
        font-size: 0.875rem;
        color: #64748b;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      .info-number {
        font-size: 2.25rem;
        font-weight: 500;
        line-height: 1;
        margin: 0;
        user-select: text;
        color: #1e293b;
        font-family: 'Rajdhani', sans-serif;
      }
      .graph-box {
        cursor: default;
        align-items: center;
        padding: 0.75rem 1rem;
      }
      .table-section {
        max-width: 1200px;
        margin: 2rem auto 4rem;
        padding: 0 1.5rem;
        font-size: 14px;
      }
      .form-select-custom {
        font-size: 0.875rem;
        padding: 0.375rem 1.75rem 0.375rem 0.75rem;
        border-radius: 6px;
        border: 1px solid #cbd5e1;
        background-color: #fff;
        color: #334155;
        outline: none;
      }
      .form-select-custom:focus {
        border-color: #6366f1;
      }
      .data-box {
        background-color: #ffffff;
        border: 1px solid #e2e8f0;
        padding: 0;
        border-radius: 12px;
        max-width: 100%;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        overflow: hidden;
      }
      .table-wrapper {
        overflow-x: auto;
        width: 100%;
      }
      .table-wrapper table {
        width: 100%;
        border-collapse: collapse;
        table-layout: fixed;
      }
      .table-wrapper thead th {
        position: sticky;
        top: 0;
        background-color: #1e293b;
        color: #94a3b8;
        font-weight: 500;
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        z-index: 1;
        border-bottom: 1px solid #e2e8f0;
      }
      .table-wrapper td, 
      .table-wrapper th {
        padding: 1rem;
        text-align: left;
        word-wrap: break-word;
      }
      .table-wrapper tbody td {
        background-color: white;
        color: #334155;
        border-bottom: 1px solid #f1f5f9;
        font-weight: 400;
      }
      .table-wrapper tbody tr:hover td {
        background-color: #f8fafc;
      }
      .search-form-custom {
        border-radius: 8px;
        border: 1px solid #cbd5e1;
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
        outline: none;
        background-color: #fff;
        color: #334155;
        transition: all 0.2s;
      }
      .search-form-custom:focus {
        border-color: #6366f1;
        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
      }
      .search-form-custom::placeholder {
        color: #94a3b8;
        font-weight: 400;
      }
      .btn-action-custom {
        border-radius: 8px;
        border: 1px solid #cbd5e1;
        background-color: #fff;
        color: #334155;
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
      }
      .btn-action-custom:hover {
        background-color: #f1f5f9;
      }
      .table-wrapper td a {
        color: #2563eb;
        text-decoration: none;
        display: inline-block;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .table-wrapper td a:hover {
        text-decoration: underline;
      }
      
      /* Status Select Styling */
      .status-select {
        font-weight: 400;
        border: 1px solid transparent;
      }
      .status-belum {
        background-color: #fee2e2 !important;
        color: #ef4444 !important;
      }
      .status-suspend {
        background-color: #fef3c7 !important;
        color: #d97706 !important;
      }
      .status-sudah {
        background-color: #dcfce7 !important;
        color: #22c55e !important;
      }
    `}</style>

    <section className="tagline-section">
      <h1>Panel Kendali Utama</h1>
      <div className="tagline-subtitle"></div>
    </section>
  </>
);

const GrafikBar = ({ data }) => {
  if (!data || data.length === 0) return null;

  const maxVal = Math.max(...data.map(d => d.count), 1);
  const chartWidth = 280;
  const chartHeight = 70;
  const padding = 15;
  const barGap = 6;
  const barWidth = (chartWidth - padding * 2 - (data.length - 1) * barGap) / data.length;

  return (
    <svg width={chartWidth} height={chartHeight}>
      {data.map((item, i) => {
        const barHeight = (item.count / maxVal) * (chartHeight - 30);
        const x = padding + i * (barWidth + barGap);
        const y = chartHeight - barHeight - 18;

        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              fill="#6366f1"
              rx="3"
            />
            <text
              x={x + barWidth / 2}
              y={chartHeight - 4}
              fontSize="9"
              textAnchor="middle"
              fill="#94a3b8"
              fontWeight="400"
            >
              {item.day}
            </text>
            <text
              x={x + barWidth / 2}
              y={y - 4}
              fontSize="9"
              textAnchor="middle"
              fill="#475569"
              fontWeight="500"
            >
              {item.count}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

const InfoBoxes = ({ total, fixed, grafikData }) => (
  <section className="info-section">
    <div className="info-box">
      <p className="info-title">Total Rekaman Insiden</p>
      <p className="info-number">{total ?? 0}</p>
    </div>
    <div className="info-box">
      <p className="info-title">Insiden Selesai Dimigrasi</p>
      <p className="info-number">{fixed ?? 0}</p>
    </div>
    <div className="info-box graph-box">
      <p className="info-title" style={{ marginBottom: '0.25rem' }}>Aktivitas Pekan Ini</p>
      <GrafikBar data={grafikData} />
    </div>
  </section>
);

const DataTable = ({ data, tipeInsidenList, refresh, triggerDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortAsc, setSortAsc] = useState(true);

  const handleChange = async (id, field, value) => {
    try {
      await axios.put(`https://judol-detector-production.up.railway.app/update`, { id, field, value });
      refresh();
    } catch {
      alert("Gagal memperbarui data.");
    }
  };

  const handleDelete = (id) => {
    triggerDelete(id);
  };

  const filteredData = data.filter((row) => {
    const term = searchTerm.toLowerCase();
    return (
      row.nama_instansi?.toLowerCase().includes(term) ||
      row.url?.toLowerCase().includes(term) ||
      row.status?.toLowerCase().includes(term) ||
      row.timestamp?.toLowerCase().includes(term)
    );
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortField) return 0;
    const valA = a[sortField]?.toLowerCase() || '';
    const valB = b[sortField]?.toLowerCase() || '';
    return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
  });

  return (
    <section className="table-section">
      {/* Top Controls Area */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
        <input 
          className='search-form-custom'
          type="text"
          placeholder="Cari nama instansi, status, tautan..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '35%', minWidth: '250px' }}
        />
        <div style={{ display: 'flex', gap: '0.75rem', width: '60%', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
          <select
            className="form-select-custom"
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
            style={{ width: '200px' }}
          >
            <option value="">Urutkan Berdasarkan</option>
            <option value="nama_instansi">Nama Instansi</option>
            <option value="status">Status Lapangan</option>
            <option value="timestamp">Waktu Pindai</option>
          </select>
          <button 
            className="btn-action-custom"
            onClick={() => setSortAsc(!sortAsc)}
          >
            {sortAsc ? '⬆ Ascending' : '⬇ Descending'}
          </button>
        </div>
      </div>
      
      {/* Main Table Container */}
      <div className="data-box">
        <div className="table-wrapper">
          <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th style={{ width: '60px' }}>No</th>
                  <th style={{ width: '22%' }}>Nama Instansi</th>
                  <th style={{ width: '30%' }}>Tautan Akses URL</th>
                  <th style={{ width: '15%' }}>Kategori Insiden</th>
                  <th style={{ width: '12%' }}>Status Aksi</th>
                  <th style={{ width: '15%' }}>Waktu Deteksi</th>
                  <th style={{ width: '90px', textAlign: 'center' }}>Opsi</th>
                </tr>
              </thead>
              <tbody>
                {sortedData.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', color: '#64748b', padding: '3rem 0' }}>
                      Belum ada data riwayat insiden yang terdata di sistem.
                    </td>
                  </tr>
                ) : (
                  sortedData.map((row, index) => (
                    <tr key={row.id}>
                      <td style={{ color: '#64748b' }}>{index + 1}</td>
                      <td style={{ color: '#1e293b' }}>{row.nama_instansi}</td>
                      <td>
                        <a href={row.url} target="_blank" rel="noreferrer" title={row.url}>
                          {row.url}
                        </a>
                      </td>
                      <td>
                        <select
                          className="form-select-custom"
                          style={{ width: '100%', padding: '0.25rem 0.5rem' }}
                          value={row.tipe_insiden || ''}
                          onChange={(e) => handleChange(row.id, 'tipe_insiden', e.target.value)}
                        >
                          <option value="">-</option>
                          {tipeInsidenList.map((tipe) => (
                            <option key={tipe} value={tipe}>{tipe}</option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <select
                          className={`form-select-custom status-select ${
                            row.status === 'Belum'
                              ? 'status-belum'
                              : row.status === 'Suspend'
                              ? 'status-suspend'
                              : row.status === 'Sudah'
                              ? 'status-sudah'
                              : ''
                          }`}
                          style={{ width: '100%', padding: '0.25rem 0.5rem' }}
                          value={row.status || 'Belum'}
                          onChange={(e) => handleChange(row.id, 'status', e.target.value)}
                        >
                          {['Belum', 'Sudah', 'Suspend'].map((status) => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                      </td>
                      <td style={{ color: '#64748b' }}>
                        {row.timestamp ? new Date(row.timestamp).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }) : '-'}
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <button
                          className="btn-action-custom"
                          style={{ padding: '0.25rem 0.5rem', color: '#ef4444', borderColor: '#fee2e2' }}
                          onClick={() => handleDelete(row.id)}
                        >
                          Hapus
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
    </section>
  );
};

const App = () => {
  const [data, setData] = useState([]);
  const [tipeList, setTipeList] = useState([]);
  const [total, setTotal] = useState(0);
  const [fixed, setFixed] = useState(0);
  const [grafikData, setGrafikData] = useState([]);
  const [modalData, setModalData] = useState({ show: false, id: null });

  const fetchData = async () => {
    try {
      const res = await axios.get('https://judol-detector-production.up.railway.app/data');
      const result = res.data.data || [];
      setData(result);
      setTipeList(res.data.tipe_insiden || []);
      setTotal(result.length);
      setFixed(result.filter(d => d.status === 'Sudah').length);
    } catch (err) {
      setData([]);
      setTipeList([]);
    }
  };

  const fetchGrafik = async () => {
    try {
      const res = await axios.get('https://judol-detector-production.up.railway.app/grafik');
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - i));
        return {
          day: date.toLocaleDateString('id-ID', { weekday: 'short' }),
          dateKey: date.toISOString().slice(0, 10),
        };
      });

      const resultMap = new Map(res.data.map(item => [item.date, item.val]));
      const finalData = last7Days.map(({ day, dateKey }) => ({
        day,
        count: resultMap.get(dateKey) || 0,
      }));

      setGrafikData(finalData);
    } catch (err) {
      console.error("Gagal ambil grafik:", err);
      setGrafikData([]);
    }
  };

  useEffect(() => {
    fetchData();
    fetchGrafik();
  }, []);

  return (
    <>
      {modalData.show && (
        <div className="modal show fade" style={{ display: 'block', backgroundColor: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)', zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '12px', overflow: 'hidden' }}>
              <div className="modal-header bg-light border-0 py-3">
                <h5 className="modal-title fw-medium text-dark" style={{ fontSize: '1.05rem' }}>Konfirmasi Penghapusan</h5>
                <button type="button" className="btn-close" onClick={() => setModalData({ show: false, id: null })}></button>
              </div>
              <div className="modal-body py-4">
                <p className="mb-0 text-secondary" style={{ fontDrop: 'none' }}>Apakah Anda sepenuhnya yakin ingin menghapus data insiden ini secara permanen?</p>
              </div>
              <div className="modal-footer border-0 pt-0">
                <button className="btn-action-custom" style={{ padding: '0.5rem 1.25rem' }} onClick={() => setModalData({ show: false, id: null })}>Batal</button>
                <button
                  className="btn btn-danger px-4"
                  style={{ borderRadius: '8px', fontWeight: '500', backgroundColor: '#ef4444', border: 'none' }}
                  onClick={async () => {
                    try {
                      await axios.delete(`https://judol-detector-production.up.railway.app/delete/${modalData.id}`);
                      fetchData();
                      setModalData({ show: false, id: null });
                    } catch {
                      alert("Gagal menghapus data.");
                    }
                  }}
                >
                  Ya, Hapus
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Tagline />
      <InfoBoxes total={total} fixed={fixed} grafikData={grafikData} />
      <DataTable
        data={data}
        tipeInsidenList={tipeList}
        refresh={fetchData}
        triggerDelete={(id) => setModalData({ show: true, id })}
      />
    </>
  );
};

export default App;