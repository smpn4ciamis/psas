const jadwalPerKelas = {
  "7": [
    {hari:"Senin", tanggal:"01 Des 2025", jam:"1", waktu:"07.30–09.00", mapel:"Pendidikan Agama Islam", link:""},
    {hari:"Senin", tanggal:"01 Des 2025", jam:"2", waktu:"09.45–11.15", mapel:"Bahasa Indonesia", link:""},
    {hari:"Selasa", tanggal:"02 Des 2025", jam:"1", waktu:"07.30–09.00", mapel:"Bahasa Inggris (A, B, C)", link:"https://script.google.com/macros/s/AKfycbwga55pV_cLSpwZdTheYNEVrsyVKX7J8ZGD4UNSGWt6FtNYQ77LI9sHaf-bZDlNTHw3FA/exec"},
    {hari:"Selasa", tanggal:"02 Des 2025", jam:"1", waktu:"07.30–09.00", mapel:"Bahasa Inggris (D, E, F, G)", link:"https://script.google.com/macros/s/AKfycbxXa_rIO_fHmqmVx03EuAsLJqxJdllLCiW3d4naJRLFXPk2LbJ3t-Vlqg9eMu3UqJvP/exec"},
    {hari:"Selasa", tanggal:"02 Des 2025", jam:"2", waktu:"09.45–11.15", mapel:"Pendidikan Pancasila", link:"https://script.google.com/macros/s/AKfycbxLiU1jBWDInLhPAdi0ROYj0rgziy7rt-UWXKUCIgWMitcI-W8UXQyGQcu1lPcDHoHK/exec"},
    // tambahkan sesuai kebutuhan
    // tambahkan sesuai kebutuhan
  ],
  "8": [ /* isi jadwal kelas 8 */ 
        {hari:"Senin", tanggal:"01 Des 2025", jam:"1", waktu:"07.30–09.00", mapel:"Pendidikan Agama Islam", link:""},
    {hari:"Senin", tanggal:"01 Des 2025", jam:"2", waktu:"09.45–11.15", mapel:"Bahasa Indonesia", link:""},
    {hari:"Selasa", tanggal:"02 Des 2025", jam:"1", waktu:"07.30–09.00", mapel:"Bahasa Inggris (A, B)", link:"https://script.google.com/macros/s/AKfycbwgkIyqiG-Ys14Wwn7GJkuNmABg2-Jf8ov-SNUCIUvpPmpvIwfCB4hpgFVUlh6A9eUx/exec"},
    {hari:"Selasa", tanggal:"02 Des 2025", jam:"1", waktu:"07.30–09.00", mapel:"Bahasa Inggris (C, D, E, F, G)", link:""},
    {hari:"Selasa", tanggal:"02 Des 2025", jam:"2", waktu:"09.45–11.15", mapel:"Pendidikan Pancasila (A, B, C, D)", link:"https://script.google.com/macros/s/AKfycbx8KtYPu4rPPtkG3SexLty8wfUh9vPv8AMG73ckfjUEnBq6LSItvjBZ0E4TGVtlWPqT/exec"},
        {hari:"Selasa", tanggal:"02 Des 2025", jam:"2", waktu:"09.45–11.15", mapel:"Pendidikan Pancasila (E, F, G)", link:"https://docs.google.com/forms/d/15og6G6V1bhawZWlwLb5QFaSE71BksreraA6RTjG9xdY/viewform?edit_requested=true"},
  ],
  "9": [ /* isi jadwal kelas 9 */ 
    {hari:"Senin", tanggal:"01 Des 2025", jam:"1", waktu:"07.30–09.00", mapel:"Pendidikan Agama Islam", link:""},
    {hari:"Senin", tanggal:"01 Des 2025", jam:"2", waktu:"09.45–11.15", mapel:"Bahasa Indonesia", link:""},
    {hari:"Selasa", tanggal:"02 Des 2025", jam:"1", waktu:"07.30–09.00", mapel:"Bahasa Inggris", link:""},
    {hari:"Selasa", tanggal:"02 Des 2025", jam:"2", waktu:"09.45–11.15", mapel:"Pendidikan Pancasila", link:"https://docs.google.com/forms/d/1falVelOLKFsECZeWz5cinxBE01s6i5x1nYVB8lzXt8Q/viewform?edit_requested=true"},
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
