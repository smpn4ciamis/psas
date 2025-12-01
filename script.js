// JADWAL RESMI – PERSIS SESUAI GAMBAR
const jadwalSAS = [
  {hari: "Senin", tanggal: "01 Desember 2025", jam: "1", waktu: "07.30 – 09.00", mapel: "Pendidikan Agama Islam", icon: "fas fa-pray"},
  {hari: "Senin", tanggal: "01 Desember 2025", jam: "2", waktu: "09.45 – 11.15", mapel: "Bahasa Indonesia", icon: "fas fa-book-open"},
  
  {hari: "Selasa", tanggal: "02 Desember 2025", jam: "1", waktu: "07.30 – 09.00", mapel: "Bahasa Inggris", icon: "fas fa-language"},
  {hari: "Selasa", tanggal: "02 Desember 2025", jam: "2", waktu: "09.45 – 11.15", mapel: "Pendidikan Pancasila", icon: "fas fa-flag"},
  
  {hari: "Rabu", tanggal: "03 Desember 2025", jam: "1", waktu: "07.30 – 09.00", mapel: "IPA", icon: "fas fa-flask"},
  {hari: "Rabu", tanggal: "03 Desember 2025", jam: "2", waktu: "09.45 – 11.15", mapel: "Bahasa Sunda", icon: "fas fa-comments"},
  
  {hari: "Kamis", tanggal: "04 Desember 2025", jam: "1", waktu: "07.30 – 09.00", mapel: "Ilmu Pengetahuan Sosial", icon: "fas fa-globe-asia"},
  {hari: "Kamis", tanggal: "04 Desember 2025", jam: "2", waktu: "09.45 – 10.45", mapel: "Informatika", icon: "fas fa-laptop-code"},
  {hari: "Kamis", tanggal: "04 Desember 2025", jam: "3", waktu: "11.00 – 12.00", mapel: "PJOK", icon: "fas fa-running"},
  
  {hari: "Jum'at", tanggal: "05 Desember 2025", jam: "1", waktu: "07.30 – 09.30", mapel: "Matematika", icon: "fas fa-calculator"},
  {hari: "Jum'at", tanggal: "05 Desember 2025", jam: "2", waktu: "10.10 – 11.10", mapel: "Seni Budaya", icon: "fas fa-palette"}
];

// Kelompokkan per hari
function groupByHari(arr) {
  return arr.reduce((acc, cur) => {
    (acc[cur.hari] = acc[cur.hari] || []).push(cur);
    return acc;
  }, {});
}

// Share ke WhatsApp
function shareWA() {
  const kelas = document.getElementById('namaKelas').textContent;
  const text = `Jadwal SAS Kelas ${kelas} SMP Harapan Bangsa\n1–5 Desember 2025\n\nSenin, 1 Des: PAI & B. Indonesia\nSelasa, 2 Des: B. Inggris & PPKn\nRabu, 3 Des: IPA & B. Sunda\nKamis, 4 Des: IPS, Informatika, PJOK\nJum'at, 5 Des: Matematika & Seni Budaya\n\nDetail: ${window.location.href}`;
  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
}

// Klik kelas (jadwal sama untuk semua kelas)
document.querySelectorAll('.kelas-card').forEach(card => {
  card.addEventListener('click', function() {
    const kelas = this.querySelector('h3').textContent;
    document.getElementById('namaKelas').textContent = kelas.replace('Kelas ', '');

    const grouped = groupByHari(jadwalSAS);
    const container = document.getElementById('jadwalContainer');
    container.innerHTML = '';

    Object.keys(grouped).forEach(hari => {
      const section = document.createElement('div');
      section.className = 'hari-section';
      section.innerHTML = `<h3>${hari} — ${grouped[hari][0].tanggal}</h3><div class="timeline"></div>`;

      grouped[hari].forEach(item => {
        const div = document.createElement('div');
        div.className = 'timeline-item';
        div.innerHTML = `
          <div class="time">Jam ke-${item.jam} | ${item.waktu}</div>
          <div class="mapel"><i class="${item.icon}"></i> ${item.mapel}</div>
        `;
        section.querySelector('.timeline').appendChild(div);
      });
      container.appendChild(section);
    });

    document.getElementById('pilihKelas').classList.remove('active');
    document.getElementById('jadwalUjian').classList.add('active');
  });
});

// Tombol kembali
document.getElementById('btnKembali').addEventListener('click', () => {
  document.getElementById('jadwalUjian').classList.remove('active');
  document.getElementById('pilihKelas').classList.add('active');
});