const jadwalPerKelas = {
  "7": [
    {hari:"Senin", tanggal:"01 Des 2025", jam:"1", waktu:"07.30–09.00", mapel:"Pendidikan Agama Islam", link:""},
    {hari:"Senin", tanggal:"01 Des 2025", jam:"2", waktu:"09.45–11.15", mapel:"Bahasa Indonesia", link:""},
    {hari:"Selasa", tanggal:"02 Des 2025", jam:"1", waktu:"07.30–09.00", mapel:"Bahasa Inggris (A, B, C)", link:"https://script.google.com/macros/s/AKfycbwZ8gP71Sri_CyZlJ6aH0epMOefJ6ddl5sQkx63mo7mLKpvhPIWsKB5eCkfIOtDOE7r/exec"},
    {hari:"Selasa", tanggal:"02 Des 2025", jam:"1", waktu:"07.30–09.00", mapel:"Bahasa Inggris (D, E, F, G)", link:"https://script.google.com/macros/s/AKfycbyMI3pq0ogVJwE22xead_pzTm4Abk-FCzmY23VoXPHvvUXNRSwgNEZLbriGdrwC5h2e/exec"},
    {hari:"Selasa", tanggal:"02 Des 2025", jam:"2", waktu:"09.45–11.15", mapel:"Pendidikan Pancasila", link:"https://script.google.com/macros/s/AKfycbz7lLABl1G4GJb3dK-qCCGjewlO_K2XFJUR7asgTqnXZiTvhX-DtfGnXUW--OrVfQ4/exec"},
    // tambahkan sesuai kebutuhan
    // tambahkan sesuai kebutuhan
  ],
  "8": [ /* isi jadwal kelas 8 */ 
        {hari:"Senin", tanggal:"01 Des 2025", jam:"1", waktu:"07.30–09.00", mapel:"Pendidikan Agama Islam", link:""},
    {hari:"Senin", tanggal:"01 Des 2025", jam:"2", waktu:"09.45–11.15", mapel:"Bahasa Indonesia", link:""},
    {hari:"Selasa", tanggal:"02 Des 2025", jam:"1", waktu:"07.30–09.00", mapel:"Bahasa Inggris (A, B)", link:"https://script.google.com/macros/s/AKfycbzzQxH4Y1bIhwzHuaY10pJ29Mmv3ZrLPixF7sOvVkMR7TSlgrV7L-Uf12Wx9yJ8GlMf/exec"},
    {hari:"Selasa", tanggal:"02 Des 2025", jam:"1", waktu:"07.30–09.00", mapel:"Bahasa Inggris (C, D, E, F, G)", link:"https://script.google.com/macros/s/AKfycbydTmCDa28GS2_M3nBNfSwz0uALkEa_KkgWxnZaWrluPkix3hkMzxBcc6FFvqN7b25Gbg/exec"},
    {hari:"Selasa", tanggal:"02 Des 2025", jam:"2", waktu:"09.45–11.15", mapel:"Pendidikan Pancasila (A, B, C, D)", link:"https://script.google.com/macros/s/AKfycbwBMjDhHeuZSpLyFuuAQR0yTObr6xFIgadAC9n9PygtAN-K_2Q3KDwtjTm4YgT7NuR9/exec"},
        {hari:"Selasa", tanggal:"02 Des 2025", jam:"2", waktu:"09.45–11.15", mapel:"Pendidikan Pancasila (E, F, G)", link:"https://docs.google.com/forms/d/e/1FAIpQLSfceQEI5jugFVRFaWwtGj5JAHOcjdgY-b04vtRTsE7G_cyQVw/viewform?usp=dialog"},
  ],
  "9": [ /* isi jadwal kelas 9 */ 
    {hari:"Senin", tanggal:"01 Des 2025", jam:"1", waktu:"07.30–09.00", mapel:"Pendidikan Agama Islam", link:""},
    {hari:"Senin", tanggal:"01 Des 2025", jam:"2", waktu:"09.45–11.15", mapel:"Bahasa Indonesia", link:""},
    {hari:"Selasa", tanggal:"02 Des 2025", jam:"1", waktu:"07.30–09.00", mapel:"Bahasa Inggris", link:"https://script.google.com/macros/s/AKfycbyQ-jbXFd2-7xQGZXW4f6EKz_JaYU9FhMomSey4ObMVg6IknAjYRzuPiYWAtxm_rdmeEw/exec"},
    {hari:"Selasa", tanggal:"02 Des 2025", jam:"2", waktu:"09.45–11.15", mapel:"Pendidikan Pancasila", link:"https://script.google.com/macros/s/AKfycbx5mayxJWL6MPHOAu6Jm-jOa3Fluv4wCiN0UcdvQhDtQjnpyv77XFek4V8paDDXbZcLgw/exec"},
  ]
};

function groupByHari(arr) {
  return arr.reduce((acc, cur) => (acc[cur.hari] = acc[cur.hari] || []).push(cur) && acc, {});
}

function shareWA() {
  const kelas = document.getElementById('namaKelas').textContent;
  const text = `Jadwal SAS Kelas ${kelas} SMPN 4 Ciamis\n1–5 Desember 2025\nDetail: ${location.href}`;
  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
}

document.querySelectorAll('.kelas-card').forEach(card => {
  card.addEventListener('click', function() {
    const kelas = this.getAttribute('data-kelas');
    document.getElementById('namaKelas').textContent = kelas;

    const data = jadwalPerKelas[kelas] || [{hari:"Info", mapel:"Jadwal belum tersedia", link:"#"}];
    const grouped = groupByHari(data);
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
          <div class="time">Jam ke-${item.jam} │ ${item.waktu}</div>
          <div class="clickable-mapel" onclick="window.open('${item.link}','_blank')">
            ${item.mapel}
          </div>
        `;
        section.querySelector('.timeline').appendChild(div);
      });
      container.appendChild(section);
    });

    document.getElementById('pilihKelas').classList.remove('active');
    document.getElementById('jadwalUjian').classList.add('active');
  });
});

document.getElementById('btnKembali').addEventListener('click', () => {
  document.getElementById('jadwalUjian').classList.remove('active');
  document.getElementById('pilihKelas').classList.add('active');
});








