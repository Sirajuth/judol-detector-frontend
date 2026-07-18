import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

// Komponen Tick Kustom bawaan Anda tetap dipertahankan
const CustomizedAxisTick = ({ x, y, payload }) => {
  const lines = payload.value.split(' '); 
  return (
    <g transform={`translate(${x},${y + 10})`}>
      {lines.map((line, index) => (
        <text
          key={index}
          x={0}
          y={index * 12}
          dy={0}
          textAnchor="middle"
          fill="#64748b" 
          fontSize={11}
        >
          {line}
        </text>
      ))}
    </g>
  );
};

// Grafik SVG Utama - 100% Logika Internal Dipertahankan & Estetika Diperhalus
const BarChart = ({ title, data }) => {
  const maxY = Math.max(...data.map(d => d.val), 20);
  const barSpacing = 90; 
  const barWidth = 40; 
  const leftMargin = 50; 
  const chartHeight = 400;
  const barAreaHeight = 270;

  const chartWidth = data.length * barSpacing + leftMargin + 40;

  return (
    <div className="bar-chart-container" style={{ overflowX: 'auto', width: '100%' }}>
      <svg width={chartWidth} height={chartHeight} role="img" aria-label={`${title} bar chart`}>
        {/* Garis Grid Horizontal */}
        {[...Array(5)].map((_, i) => {
          const y = 50 + i * (barAreaHeight / 4);
          const labelVal = Math.round(maxY - (i * maxY / 4));
          return (
            <g key={`line-${i}`}>
              <line
                x1={leftMargin}
                x2={chartWidth - 20}
                y1={y}
                y2={y}
                stroke="#f1f5f9" 
                strokeWidth="1.5"
              />
              <text
                x={leftMargin - 15}
                y={y + 4}
                fontSize="11"
                fill="#94a3b8" 
                textAnchor="end"
                fontWeight="400"
              >
                {labelVal}
              </text>
            </g>
          );
        })}

        {/* Bar Grafik */}
        {data.map((d, i) => {
          const barHeight = (d.val / maxY) * barAreaHeight;
          const x = leftMargin + i * barSpacing;
          const y = 50 + (barAreaHeight - barHeight);

          return (
            <g key={`bar-group-${i}`}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={d.color || "#6366f1"}
                rx="4" 
              />

              {/* Angka jumlah di atas bar */}
              <text
                x={x + barWidth / 2}
                y={y - 8}
                fontSize="11"
                fill="#475569"
                textAnchor="middle"
                fontWeight="500"
              >
                {d.val}
              </text>

              {/* Label nama instansi di bawah bar */}
              <text
                x={x + barWidth / 2}
                y={barAreaHeight + 75}
                fontSize="11"
                fill="#64748b"
                textAnchor="middle"
                fontWeight="400" 
              >
                {(() => {
                  const words = d.item.split(" ");
                  const lines = [];
                  let currentLine = "";
                  const maxCharsPerLine = Math.floor(barWidth / 6); 

                  for (let i = 0; i < words.length; i++) {
                    const testLine = currentLine ? currentLine + " " + words[i] : words[i];
                    if (testLine.length <= maxCharsPerLine) {
                      currentLine = testLine;
                    } else {
                      if (currentLine) lines.push(currentLine);
                      currentLine = words[i];
                    }
                  }
                  if (currentLine) lines.push(currentLine);

                  return lines.map((line, idx) => (
                    <tspan
                      key={idx}
                      x={x + barWidth / 2}
                      dy={idx === 0 ? 0 : 14}
                    >
                      {line}
                    </tspan>
                  ));
                })()}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default function App() {
  const [statData, setStatData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/statistik")
      .then(res => {
        const colors = ["#6366f1", "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#14b8a6", "#f97316", "#64748b"];
        const dataWithColors = res.data.map((item, idx) => ({
          ...item,
          color: colors[idx % colors.length],
        }));
        setStatData(dataWithColors);
      })
      .catch(err => {
        console.error("Gagal mengambil data statistik:", err);
      });
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Inter:wght@400;500&display=swap');

        body {
          background-color: #f8fafc;
          font-family: 'Inter', sans-serif;
          color: #334155;
          margin: 0;
        }

        /* 💡 Diubah fungsinya menjadi struktur Tagline Section seperti halaman utama */
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

        .page-container {
          min-height: calc(100vh - 140px);
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 1.5rem 4rem;
        }

        /* 💡 Card digeser naik menutupi sebagian header agar estetik (Margin minus sama seperti halaman sebelumnya) */
        .chart-container {
          margin-top: -2.5rem;
          background-color: #ffffff;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          width: 100%;
          max-width: 1140px;
          padding: 2.5rem 1.5rem;
          box-sizing: border-box;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          position: relative;
          z-index: 10;
        }

        .chart-header {
          width: 100%;
          text-align: left;
          margin-bottom: 2rem;
          padding-left: 1.5rem;
        }

        .chart-title {
          font-size: 1.1rem;
          font-weight: 500;
          color: #1e293b;
          margin: 0 0 0.25rem 0;
        }

        .chart-desc {
          font-size: 0.875rem;
          color: #64748b;
          margin: 0;
        }

        .loading-text {
          color: #64748b;
          font-size: 0.875rem;
          font-weight: 400;
        }
      `}</style>

      {/* 💡 Sesuai instruksi: Bagian Judul dipindah ke atas dan dibungkus di area mandiri */}
      <section className="tagline-section">
        <h1>Statistik Analisis</h1>
        <div className="tagline-subtitle"></div>
      </section>

      <div className="page-container">
        <div className="chart-container">
          <div className="chart-header">
            <h5 className="chart-title">Metrik Distribusi Kasus Judi Online</h5>
            <p className="chart-desc">10 Besar Entitas Instansi Terinfeksi Berdasarkan Volume Insiden Tertinggi</p>
          </div>

          {statData.length > 0 ? (
            <BarChart title="Statistik Instansi" data={statData} />
          ) : (
            <div style={{ padding: '3rem 0', textAlign: 'center' }}>
              <div className="spinner-border text-primary spinner-border-sm mb-2" role="status"></div>
              <p className="loading-text">Sinkronisasi repositori statistik, mohon tunggu...</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}