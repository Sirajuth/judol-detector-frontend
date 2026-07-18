import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransferPage = () => {
  const [filename, setFilename] = useState('');
  const [sheetId, setSheetId] = useState('');
  const [rows, setRows] = useState([]);
  const [fileOptions, setFileOptions] = useState([]);
  const [tipeOptions, setTipeOptions] = useState([]);
  const [loading, setLoading] = useState(false); // 🔄 untuk loading indikator

  useEffect(() => {
    const fetchFileList = async () => {
      try {
        const res = await axios.get('http://localhost:5000/list-json-files');
        setFileOptions(res.data);
      } catch (err) {
        console.error('Gagal mengambil daftar file:', err.message);
      }
    };

    const fetchTipeInsidenOptions = async () => {
      try {
        const res = await axios.get('http://localhost:5000/tipe-insiden-options');
        setTipeOptions(res.data);
      } catch (err) {
        console.error('Gagal mengambil opsi tipe insiden:', err.message);
      }
    };

    fetchFileList();
    fetchTipeInsidenOptions();
  }, []);

  const handleCheckData = async () => {
    if (!filename || !sheetId) {
      alert('Mohon pilih file dan isi Spreadsheet ID terlebih dahulu.');
      return;
    }

    setLoading(true); // ⏳ Mulai loading

    try {
      const res = await axios.post('http://localhost:5000/check-transfer-data', {
        filename,
        sheet_id: sheetId,
      });

      const rowsWithTipe = res.data.map((row) => ({
        ...row,
        tipe_insiden: tipeOptions[0] || '',
      }));

      setRows(rowsWithTipe);
    } catch (err) {
      alert('Gagal memeriksa data: ' + err.message);
    } finally {
      setLoading(false); // ✅ Selesai loading
    }
  };

  const handleTipeChange = (index, value) => {
    const updatedRows = [...rows];
    updatedRows[index].tipe_insiden = value;
    setRows(updatedRows);
  };

  const handleTransferRow = async (row) => {
    try {
      await axios.post('http://localhost:5000/transfer-row', {
        sheet_id: sheetId,
        row: {
          url: row.url,
          nama_instansi: row.nama_instansi,
          tipe_insiden: row.tipe_insiden, // ⬅️ dikirimkan ke backend
        },
      });
      alert('Baris berhasil ditransfer!');
    } catch (err) {
      alert('Gagal transfer baris: ' + err.message);
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Transfer Data dari File JSON ke Google Sheets</h2>

      <div className="row g-3 mb-4">
        <div className="col-md-5">
          <select
            className="form-select"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
          >
            <option value="">Pilih file JSON</option>
            {Array.isArray(fileOptions) &&
              fileOptions.map((file, index) => (
                <option key={index} value={file.filename}>
                  {file.filename}
                </option>
              ))}
          </select>
        </div>

        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="Spreadsheet ID"
            value={sheetId}
            onChange={(e) => setSheetId(e.target.value)}
          />
        </div>

        <div className="col-md-2">
          <button className="btn btn-secondary w-100" onClick={handleCheckData} disabled={loading}>
            {loading ? 'Memuat...' : 'Periksa & Tampilkan'}
          </button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-striped align-middle">
          <thead className="table-light">
            <tr>
              <th>No</th>
              <th>Instansi</th>
              <th>URL</th>
              <th>Domain</th>
              <th>Tipe Insiden</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" className="text-center">
                  <em>Loading data...</em>
                </td>
              </tr>
            ) : rows.length > 0 ? (
              rows.map((row, idx) => (
                <tr key={idx}>
                  <td style={{ width: '30px' }}>{row.no}</td>
                  <td style={{ width: '150px' }}>{row.nama_instansi}</td>
                  <td style={{ width: '700px' }}>
                    <a href={row.url} target="_blank" rel="noreferrer">
                      {row.url}
                    </a>
                  </td>
                  <td style={{ width: '120px' }}>{row.domain_utama}</td>
                  <td style={{ width: '110px' }}>
                    <select
                      className="form-select"
                      value={row.tipe_insiden}
                      onChange={(e) => handleTipeChange(idx, e.target.value)}
                    >
                      {tipeOptions.map((tipe, i) => (
                        <option key={i} value={tipe}>
                          {tipe}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td style={{ width: '100px' }}>
                    <span
                      className={
                        row.status === 'sudah_ada'
                          ? 'badge bg-success'
                          : 'badge bg-warning text-dark'
                      }
                    >
                      {row.status}
                    </span>
                  </td>
                  <td style={{ width: '70px' }}>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleTransferRow(row)}
                    >
                      Input
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center text-muted">
                  Belum ada data ditampilkan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransferPage;
