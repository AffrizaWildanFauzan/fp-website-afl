// ========== JAVASCRIPT (WITH VENDING MACHINES IN BAKU, AZERBAIJAN) ==========

// Current user data
let currentUser = {
  name: "Lee Kwuan Yu",
  email: "leekwannnsg@gmail.com",
  bio: "Cao nima",
  points: 110,
  id: "user1",
  totalWaste: 3.5,
  totalPointsEarned: 110,
  itemsRecycled: 2,
  activeDays: 1
};

// 3 Vending Machine Locations in Baku, Azerbaijan
const vendingMachines = [
  {
    id: 1,
    name: "Green Loop Vending - Fountain Square",
    address: "Fountain Square, Nizami Street, Baku",
    distance: "0.8 km",
    icon: "fas fa-store",
    status: "active"
  },
  {
    id: 2,
    name: "Green Loop Vending - Port Baku Mall",
    address: "Port Baku Mall, Neftchilar Avenue, Baku",
    distance: "1.5 km",
    icon: "fas fa-building",
    status: "active"
  },
  {
    id: 3,
    name: "Green Loop Vending - Baku Boulevard",
    address: "Seaside Boulevard, Baku, Near Flag Square",
    distance: "2.3 km",
    icon: "fas fa-tree",
    status: "active"
  }
];

// Transaction history
let transactionHistory = [
  { itemName: "Plastic Bottle", quantity: 2, earnedPoints: 50 },
  { itemName: "Cardboard Box", quantity: 1.5, earnedPoints: 60 }
];

// Leaderboard data
let leaderboardUsers = [
  { name: "Chang Xue", points: 250 },
  { name: "Ahmed Ali", points: 220 },
  { name: "Thereskhova", points: 210 },
  { name: "Thesen Wang", points: 195 },
  { name: "Fadhillah", points: 120 },
  { name: "Jason Lee", points: 108 },
  { name: "Lee Kwuan Yu", points: 110 },
  { name: "Al Huseyn", points: 90 },
  { name: "Fatimah", points: 88 },
  { name: "Eri Zahra", points: 65 }
];

// Vouchers list
const vouchers = [
  { name: "Supermarket Voucher AZN 5", cost: 150 },
  { name: "Shopping Voucher AZN 10", cost: 350 },
  { name: "E-Wallet Credit 5 AZN", cost: 80 },
  { name: "Eco Grocery Package", cost: 500 }
];

// Escape HTML function
function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>]/g, function(m) {
    if (m === '&') return '&amp;';
    if (m === '<') return '&lt;';
    if (m === '>') return '&gt;';
    return m;
  });
}

// Render Vending Machines
function renderVendingMachines() {
  const container = document.getElementById("vendingList");
  if (!container) return;
  
  let vendingHtml = "";
  vendingMachines.forEach(vm => {
    vendingHtml += `
      <div class="vending-item">
        <div class="vending-icon">
          <i class="${vm.icon}"></i>
        </div>
        <div class="vending-info">
          <div class="vending-name">${escapeHtml(vm.name)}</div>
          <div class="vending-address">
            <i class="fas fa-location-dot"></i> ${escapeHtml(vm.address)}
          </div>
        </div>
        <div class="vending-distance">
          <i class="fas fa-walking"></i> ${vm.distance}
        </div>
      </div>
    `;
  });
  container.innerHTML = vendingHtml;
}

// Render all UI
function renderAll() {
  // Update points display
  document.getElementById("userPointsDisplay").innerText = currentUser.points;
  document.getElementById("voucherUserPoints").innerText = currentUser.points;

  // Render Vending Machines
  renderVendingMachines();

  // Update Profile
  const profileNameElem = document.querySelector(".profile-name");
  const profileEmailElem = document.querySelector(".profile-email");
  const profileBioElem = document.querySelector(".profile-bio");
  if (profileNameElem) profileNameElem.innerText = currentUser.name;
  if (profileEmailElem) profileEmailElem.innerText = currentUser.email;
  if (profileBioElem) profileBioElem.innerText = currentUser.bio;

  // Update Activity Summary
  const wasteElem = document.getElementById("totalWaste");
  const pointsElem = document.getElementById("totalPointsEarned");
  const recycledElem = document.getElementById("itemsRecycled");
  const daysElem = document.getElementById("activeDays");
  
  if (wasteElem) wasteElem.innerText = currentUser.totalWaste.toFixed(1);
  if (pointsElem) pointsElem.innerText = currentUser.totalPointsEarned;
  if (recycledElem) recycledElem.innerText = currentUser.itemsRecycled;
  if (daysElem) daysElem.innerText = currentUser.activeDays;

  // Render transaction history
  let historyHtml = "";
  if (transactionHistory.length === 0) {
    historyHtml = "<div style='color:#aaa;padding:16px;text-align:center'>No items exchanged yet</div>";
  } else {
    historyHtml = transactionHistory.slice().reverse().map(t => `
      <div class="history-item">
        <span class="item-name">${escapeHtml(t.itemName)} (${t.quantity} kg)</span>
        <span class="item-points">+${t.earnedPoints} pts</span>
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
    
    let nameDisplay = u.name === currentUser.name ? `<strong>${escapeHtml(u.name)} (You)</strong>` : escapeHtml(u.name);
    leaderHtml += `
      <div class="leader-row">
        <div class="rank">${medal}</div>
        <div class="user-name">${nameDisplay}</div>
        <div class="user-points">${u.points} pts</div>
      </div>
    `;
  });
  document.getElementById("leaderboardRows").innerHTML = leaderHtml;

  // Render vouchers
  let voucherHtml = "";
  vouchers.forEach(v => {
    voucherHtml += `
      <div class="voucher-item">
        <div><strong>${escapeHtml(v.name)}</strong></div>
        <div>
          <span class="voucher-cost">${v.cost} pts</span>
          <button class="btn-voucher" data-cost="${v.cost}" data-name="${escapeHtml(v.name)}">Exchange</button>
        </div>
      </div>
    `;
  });
  document.getElementById("voucherContainer").innerHTML = voucherHtml;

  // Attach event listeners for voucher buttons
  document.querySelectorAll('.btn-voucher').forEach(btn => {
    btn.removeEventListener('click', handleVoucher);
    btn.addEventListener('click', handleVoucher);
  });
}

// Handle voucher exchange
function handleVoucher(e) {
  let cost = parseInt(e.currentTarget.getAttribute("data-cost"));
  let name = e.currentTarget.getAttribute("data-name");
  
  if (currentUser.points >= cost) {
    if (confirm(`Exchange ${name} for ${cost} points?`)) {
      currentUser.points -= cost;
      transactionHistory.push({
        itemName: `🎫 ${name}`,
        quantity: 1,
        earnedPoints: 0
      });
      
      const userInLeaderboard = leaderboardUsers.find(u => u.name === currentUser.name);
      if (userInLeaderboard) {
        userInLeaderboard.points = currentUser.points;
      }
      
      renderAll();
      alert(`Successfully exchanged ${name}!`);
    }
  } else {
    alert(`Insufficient points! You have ${currentUser.points} points, need ${cost} points.`);
  }
}

// Add item / waste
function addItem() {
  let name = document.getElementById("itemName").value.trim();
  let qty = parseFloat(document.getElementById("itemQuantity").value);
  let pointsPerUnit = parseInt(document.getElementById("itemCategory").value);
  
  if (!name) {
    alert("Please enter item name");
    return;
  }
  if (isNaN(qty) || qty <= 0) {
    alert("Invalid quantity");
    return;
  }
  
  let earned = Math.floor(pointsPerUnit * qty);
  currentUser.points += earned;
  
  currentUser.totalWaste += qty;
  currentUser.totalPointsEarned += earned;
  currentUser.itemsRecycled += 1;
  currentUser.activeDays = Math.min(currentUser.activeDays + 0.5, 30);
  
  transactionHistory.push({
    itemName: name,
    quantity: qty,
    earnedPoints: earned
  });
  
  const userInLeaderboard = leaderboardUsers.find(u => u.name === currentUser.name);
  if (userInLeaderboard) {
    userInLeaderboard.points = currentUser.points;
  }
  
  document.getElementById("itemName").value = "";
  document.getElementById("itemQuantity").value = "1";
  
  renderAll();
  alert(`+${earned} points! Thank you for recycling.`);
}

// Edit Profile function
function editProfile() {
  let newName = prompt("Enter new name:", currentUser.name);
  let newEmail = prompt("Enter new email:", currentUser.email);
  let newBio = prompt("Enter new bio:", currentUser.bio);
  
  if (newName && newName.trim() !== "") {
    currentUser.name = newName.trim();
  }
  if (newEmail && newEmail.trim() !== "") {
    currentUser.email = newEmail.trim();
  }
  if (newBio && newBio.trim() !== "") {
    currentUser.bio = newBio.trim();
  }
  
  const userInLeaderboard = leaderboardUsers.find(u => u.name === "Lee Kwuan Yu");
  if (userInLeaderboard) {
    userInLeaderboard.name = currentUser.name;
  }
  
  renderAll();
  alert("Profile updated successfully!");
}

// Initialize Bottom Navigation (4 Menus)
function initBottomNav() {
  const navItems = document.querySelectorAll('.nav-item');
  const panels = {
    home: document.getElementById('homePanel'),
    exchange: document.getElementById('exchangePanel'),
    leaderboard: document.getElementById('leaderboardPanel'),
    profile: document.getElementById('profilePanel')
  };

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const tabId = item.getAttribute('data-tab');
      
      navItems.forEach(nav => nav.classList.remove('active'));
      item.classList.add('active');
      
      Object.values(panels).forEach(p => p.classList.remove('active-panel'));
      
      if (tabId === 'home') panels.home.classList.add('active-panel');
      if (tabId === 'exchange') panels.exchange.classList.add('active-panel');
      if (tabId === 'leaderboard') panels.leaderboard.classList.add('active-panel');
      if (tabId === 'profile') panels.profile.classList.add('active-panel');
    });
  });
}

// Event listeners
document.getElementById("addItemBtn").addEventListener("click", addItem);

const editBtn = document.getElementById("editProfileBtn");
if (editBtn) {
  editBtn.addEventListener("click", editProfile);
}

// Initialize
initBottomNav();
renderAll();