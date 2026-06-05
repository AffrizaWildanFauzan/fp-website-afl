// ========== JAVASCRIPT ==========

// Data pengguna saat ini
let currentUser = {
  name: "Kamu",
  points: 110,
  id: "user1"
};

// Riwayat transaksi
let transactionHistory = [
  { itemName: "Botol Plastik", quantity: 2, earnedPoints: 50 },
  { itemName: "Kardus Bekas", quantity: 1.5, earnedPoints: 60 }
];

// Data leaderboard
let leaderboardUsers = [
  { name: "Chang Xue", points: 250 },
  { name: "Ahmed Ali", points: 220 },
  { name: "Thereskhova", points: 210 },
  { name: "Thesen Wang", points: 195 },
  { name: "Fadhillah", points: 120 },
  { name: "Jason Lee", points: 108 },
  { name: "Kamu", points: 110 },
  { name: "Al Huseyn", points: 90 },
  { name: "Fatimah", points: 88 },
  { name: "Eri Zahra", points: 65 }
];

// Daftar voucher
const vouchers = [
  { name: "Voucher Supermarket Rp10.000", cost: 150 },
  { name: "Voucher Belanja Rp25.000", cost: 350 },
  { name: "Voucher E-Wallet 5K", cost: 80 },
  { name: "Paket Sembako Hijau", cost: 500 }
];

// Fungsi untuk render semua UI
function renderAll() {
  // Update tampilan poin
  document.getElementById("userPointsDisplay").innerText = currentUser.points;
  document.getElementById("voucherUserPoints").innerText = currentUser.points;

  // Render riwayat penukaran
  let historyHtml = "";
  if (transactionHistory.length === 0) {
    historyHtml = "<div style='color:#aaa;padding:16px;text-align:center'>Belum ada barang ditukar</div>";
  } else {
    historyHtml = transactionHistory.slice().reverse().map(t => `
      <div class="history-item">
        <span class="item-name">${escapeHtml(t.itemName)} (${t.quantity})</span>
        <span class="item-points">+${t.earnedPoints} poin</span>
      </div>
    `).join("");
  }
  document.getElementById("historyList").innerHTML = historyHtml;

  // Render leaderboard
  let sorted = [...leaderboardUsers].sort((a, b) => b.points - a.points);
  let leaderHtml = "";
  sorted.forEach((u, idx) => {
    let medal = "";
    if (idx === 0) medal = "🥇 ";
    else if (idx === 1) medal = "🥈 ";
    else if (idx === 2) medal = "🥉 ";
    else medal = (idx + 1) + ". ";
    
    let nameDisplay = u.name === "Kamu" ? `<strong>${escapeHtml(u.name)} (Anda)</strong>` : escapeHtml(u.name);
    leaderHtml += `
      <div class="leader-row">
        <div class="rank">${medal}</div>
        <div class="user-name">${nameDisplay}</div>
        <div class="user-points">${u.points} pts</div>
      </div>
    `;
  });
  document.getElementById("leaderboardRows").innerHTML = leaderHtml;

  // Render daftar voucher
  let voucherHtml = "";
  vouchers.forEach(v => {
    voucherHtml += `
      <div class="voucher-item">
        <div><strong>${escapeHtml(v.name)}</strong></div>
        <div>
          <span class="voucher-cost">${v.cost} poin</span>
          <button class="btn-voucher" data-cost="${v.cost}" data-name="${escapeHtml(v.name)}">Tukar</button>
        </div>
      </div>
    `;
  });
  document.getElementById("voucherContainer").innerHTML = voucherHtml;

  // Pasang event listener untuk tombol voucher
  document.querySelectorAll('.btn-voucher').forEach(btn => {
    btn.removeEventListener('click', handleVoucher);
    btn.addEventListener('click', handleVoucher);
  });
}

// Fungsi untuk handle penukaran voucher
function handleVoucher(e) {
  let cost = parseInt(e.currentTarget.getAttribute("data-cost"));
  let name = e.currentTarget.getAttribute("data-name");
  
  if (currentUser.points >= cost) {
    if (confirm(`Tukar ${name} seharga ${cost} poin?`)) {
      currentUser.points -= cost;
      transactionHistory.push({
        itemName: `🎫 ${name}`,
        quantity: 1,
        earnedPoints: 0
      });
      
      // Update juga di leaderboard
      const userInLeaderboard = leaderboardUsers.find(u => u.name === "Kamu");
      if (userInLeaderboard) {
        userInLeaderboard.points = currentUser.points;
      }
      
      renderAll();
      alert(`Berhasil menukar ${name}!`);
    }
  } else {
    alert(`Poin tidak cukup! Punya ${currentUser.points} poin, butuh ${cost} poin.`);
  }
}

// Fungsi untuk menambah item/sampah
function addItem() {
  let name = document.getElementById("itemName").value.trim();
  let qty = parseFloat(document.getElementById("itemQuantity").value);
  let pointsPerUnit = parseInt(document.getElementById("itemCategory").value);
  
  if (!name) {
    alert("Masukkan nama barang");
    return;
  }
  if (isNaN(qty) || qty <= 0) {
    alert("Jumlah tidak valid");
    return;
  }
  
  let earned = Math.floor(pointsPerUnit * qty);
  currentUser.points += earned;
  
  transactionHistory.push({
    itemName: name,
    quantity: qty,
    earnedPoints: earned
  });
  
  // Update juga di leaderboard
  const userInLeaderboard = leaderboardUsers.find(u => u.name === "Kamu");
  if (userInLeaderboard) {
    userInLeaderboard.points = currentUser.points;
  }
  
  // Reset form
  document.getElementById("itemName").value = "";
  document.getElementById("itemQuantity").value = "1";
  
  renderAll();
  alert(`+${earned} poin! Terima kasih telah mendaur ulang.`);
}

// Fungsi escape HTML untuk keamanan
function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>]/g, function(m) {
    if (m === '&') return '&amp;';
    if (m === '<') return '&lt;';
    if (m === '>') return '&gt;';
    return m;
  });
}

// Inisialisasi tab switching (Beranda, Penukaran, Leaderboard)
function initTabs() {
  const tabs = document.querySelectorAll('.tab-btn');
  const panels = {
    beranda: document.getElementById('berandaPanel'),
    penukaran: document.getElementById('penukaranPanel'),
    leaderboard: document.getElementById('leaderboardPanel')
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabId = tab.getAttribute('data-tab');
      
      // Update active style pada tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Sembunyikan semua panel
      Object.values(panels).forEach(p => p.classList.remove('active-panel'));
      
      // Tampilkan panel yang dipilih
      if (tabId === 'beranda') panels.beranda.classList.add('active-panel');
      if (tabId === 'penukaran') panels.penukaran.classList.add('active-panel');
      if (tabId === 'leaderboard') panels.leaderboard.classList.add('active-panel');
    });
  });
}

// Event listener untuk tombol tambah barang
document.getElementById("addItemBtn").addEventListener("click", addItem);

// Jalankan inisialisasi saat halaman dimuat
initTabs();
renderAll();