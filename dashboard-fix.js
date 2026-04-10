<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>FindBack Command Portal</title>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{
  --bg:#F7F8FA;
  --white:#FFFFFF;
  --sidebar:#1C2340;
  --sidebar-hover:#252D4A;
  --accent:#2F6FED;
  --accent-lt:#EEF4FF;
  --green:#12B76A;
  --green-lt:#ECFDF3;
  --red:#F04438;
  --red-lt:#FEF3F2;
  --amber:#F79009;
  --amber-lt:#FFFAEB;
  --purple:#7C3AED;
  --purple-lt:#F5F3FF;
  --border:#EAECF0;
  --text:#101828;
  --muted:#667085;
  --muted2:#98A2B3;
  --card-shadow:0 1px 3px rgba(16,24,40,.1),0 1px 2px rgba(16,24,40,.06);
  --sb-width:240px;
}
body{font-family:'Plus Jakarta Sans',sans-serif;background:var(--bg);color:var(--text);display:flex;min-height:100vh;font-size:14px;}

/* ── SIDEBAR ── */
.sidebar{width:var(--sb-width);background:var(--sidebar);display:flex;flex-direction:column;position:fixed;top:0;left:0;bottom:0;z-index:100;overflow-y:auto;}
.sb-header{padding:20px 16px 16px;border-bottom:1px solid rgba(255,255,255,.07);}
.sb-brand{display:flex;align-items:center;gap:10px;margin-bottom:16px;}
.sb-logo{width:36px;height:36px;background:var(--accent);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;}
.sb-brand-name{font-size:15px;font-weight:800;color:#fff;letter-spacing:-.3px;}
.sb-brand-name span{color:#60A5FA;}
.sb-badge{display:inline-flex;align-items:center;gap:5px;background:rgba(47,111,237,.2);border:1px solid rgba(47,111,237,.3);border-radius:20px;padding:3px 10px;font-size:10px;font-weight:700;color:#93C5FD;}
.sb-badge-dot{width:6px;height:6px;background:#4ADE80;border-radius:50%;animation:blink 2s infinite;}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.3}}

.sb-profile{display:flex;align-items:center;gap:10px;padding:12px;background:rgba(255,255,255,.05);border-radius:10px;}
.sb-avatar{width:38px;height:38px;border-radius:10px;background:linear-gradient(135deg,#2F6FED,#7C3AED);display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:800;color:#fff;flex-shrink:0;}
.sb-profile-name{font-size:13px;font-weight:700;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.sb-profile-role{font-size:10px;color:rgba(255,255,255,.4);margin-top:1px;}

.sb-nav{padding:12px 8px;flex:1;}
.sb-section{font-size:9px;font-weight:700;letter-spacing:1.2px;color:rgba(255,255,255,.25);text-transform:uppercase;padding:12px 8px 6px;}
.sb-item{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:8px;font-size:13px;font-weight:500;color:rgba(255,255,255,.55);cursor:pointer;transition:all .15s;position:relative;border:none;background:transparent;width:100%;text-align:left;font-family:inherit;}
.sb-item:hover{background:var(--sidebar-hover);color:#fff;}
.sb-item.active{background:var(--accent);color:#fff;font-weight:700;}
.sb-item.active .sb-icon{background:rgba(255,255,255,.2);}
.sb-icon{width:28px;height:28px;border-radius:7px;background:rgba(255,255,255,.07);display:flex;align-items:center;justify-content:center;font-size:13px;flex-shrink:0;}
.sb-badge-count{margin-left:auto;background:#F04438;color:#fff;font-size:9px;font-weight:800;padding:1px 6px;border-radius:10px;min-width:18px;text-align:center;}
.sb-item.active .sb-badge-count{background:rgba(255,255,255,.25);}

.sb-footer{padding:12px 8px;border-top:1px solid rgba(255,255,255,.07);}
.sb-footer-btn{display:flex;align-items:center;gap:8px;padding:9px 12px;border-radius:8px;font-size:12px;font-weight:600;color:rgba(255,255,255,.5);cursor:pointer;width:100%;background:transparent;border:none;font-family:inherit;transition:all .15s;}
.sb-footer-btn:hover{background:rgba(255,255,255,.06);color:#fff;}
.sb-loc{margin:8px;padding:10px 12px;background:rgba(18,183,106,.1);border:1px solid rgba(18,183,106,.2);border-radius:8px;}
.sb-loc-label{font-size:9px;font-weight:700;color:rgba(255,255,255,.3);letter-spacing:.8px;text-transform:uppercase;margin-bottom:3px;}
.sb-loc-value{font-size:12px;font-weight:700;color:#4ADE80;display:flex;align-items:center;gap:5px;}

/* ── MAIN ── */
.main{margin-left:var(--sb-width);flex:1;display:flex;flex-direction:column;min-height:100vh;}

/* TOPBAR */
.topbar{background:var(--white);border-bottom:1px solid var(--border);padding:0 24px;height:64px;display:flex;align-items:center;gap:16px;position:sticky;top:0;z-index:50;box-shadow:0 1px 0 var(--border);}
.topbar-left{display:flex;align-items:center;gap:12px;flex:1;}
.topbar-page{font-size:16px;font-weight:800;color:var(--text);}
.topbar-breadcrumb{font-size:12px;color:var(--muted);display:flex;align-items:center;gap:6px;}
.topbar-search{position:relative;width:280px;}
.topbar-search input{width:100%;padding:8px 14px 8px 36px;background:#F9FAFB;border:1.5px solid var(--border);border-radius:8px;font-size:13px;font-family:inherit;outline:none;color:var(--text);transition:border-color .15s;}
.topbar-search input:focus{border-color:var(--accent);background:#fff;}
.topbar-search .si{position:absolute;left:11px;top:50%;transform:translateY(-50%);font-size:14px;color:var(--muted2);}
.topbar-actions{display:flex;align-items:center;gap:8px;}
.icon-btn{width:38px;height:38px;border-radius:9px;border:1.5px solid var(--border);background:var(--white);display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:16px;position:relative;transition:all .15s;}
.icon-btn:hover{border-color:#C7D7FE;background:#F5F8FF;}
.icon-btn .dot{position:absolute;top:7px;right:7px;width:7px;height:7px;background:#F04438;border-radius:50%;border:2px solid #fff;}
.topbar-user{display:flex;align-items:center;gap:8px;padding:6px 10px;border-radius:9px;cursor:pointer;border:1.5px solid var(--border);transition:all .15s;}
.topbar-user:hover{border-color:#C7D7FE;background:#F5F8FF;}
.topbar-av{width:28px;height:28px;border-radius:7px;background:linear-gradient(135deg,#2F6FED,#7C3AED);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;color:#fff;}
.topbar-uname{font-size:12px;font-weight:700;color:var(--text);}

/* CONTENT */
.content{padding:24px;flex:1;}

/* PAGE HEADER */
.page-header{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:24px;}
.page-title{font-size:22px;font-weight:800;color:var(--text);margin-bottom:4px;}
.page-sub{font-size:13px;color:var(--muted);}
.header-actions{display:flex;gap:10px;align-items:center;}
.btn{display:inline-flex;align-items:center;gap:6px;padding:9px 16px;border-radius:8px;font-size:13px;font-weight:700;cursor:pointer;border:none;font-family:inherit;transition:all .15s;}
.btn-primary{background:var(--accent);color:#fff;box-shadow:0 1px 2px rgba(47,111,237,.3);}
.btn-primary:hover{background:#2460D0;}
.btn-outline{background:#fff;color:var(--text);border:1.5px solid var(--border);}
.btn-outline:hover{border-color:#C7D7FE;background:#F5F8FF;}
.live-pill{display:flex;align-items:center;gap:6px;background:var(--green-lt);border:1px solid #A6F4C5;border-radius:20px;padding:5px 12px;font-size:12px;font-weight:700;color:#027A48;}
.live-dot{width:6px;height:6px;background:var(--green);border-radius:50%;animation:blink 1.5s infinite;}

/* STAT CARDS */
.stat-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:24px;}
.stat-card{background:var(--white);border-radius:14px;padding:20px;border:1px solid var(--border);box-shadow:var(--card-shadow);position:relative;overflow:hidden;cursor:default;transition:transform .15s,box-shadow .15s;}
.stat-card:hover{transform:translateY(-2px);box-shadow:0 4px 16px rgba(16,24,40,.1);}
.stat-card-top{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:16px;}
.stat-icon{width:44px;height:44px;border-radius:11px;display:flex;align-items:center;justify-content:center;font-size:20px;}
.stat-icon.blue{background:var(--accent-lt);}
.stat-icon.green{background:var(--green-lt);}
.stat-icon.amber{background:var(--amber-lt);}
.stat-icon.purple{background:var(--purple-lt);}
.stat-trend{display:flex;align-items:center;gap:4px;font-size:11px;font-weight:700;padding:3px 8px;border-radius:20px;}
.stat-trend.up{background:#ECFDF3;color:#027A48;}
.stat-trend.down{background:#FEF3F2;color:#B42318;}
.stat-value{font-size:32px;font-weight:800;color:var(--text);line-height:1;margin-bottom:4px;font-family:'Plus Jakarta Sans',sans-serif;}
.stat-label{font-size:13px;color:var(--muted);font-weight:500;}
.stat-bar{position:absolute;bottom:0;left:0;right:0;height:3px;border-radius:0 0 14px 14px;}
.stat-bar.blue{background:linear-gradient(90deg,var(--accent),#60A5FA);}
.stat-bar.green{background:linear-gradient(90deg,var(--green),#34D399);}
.stat-bar.amber{background:linear-gradient(90deg,var(--amber),#FBD047);}
.stat-bar.purple{background:linear-gradient(90deg,var(--purple),#A78BFA);}

/* TWO COLUMN */
.two-col{display:grid;grid-template-columns:1fr 320px;gap:20px;margin-bottom:24px;}

/* CARD */
.card{background:var(--white);border-radius:14px;border:1px solid var(--border);box-shadow:var(--card-shadow);overflow:hidden;}
.card-header{padding:16px 20px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;}
.card-title{font-size:14px;font-weight:800;color:var(--text);}
.card-sub{font-size:12px;color:var(--muted);margin-top:1px;}
.card-action{font-size:12px;font-weight:700;color:var(--accent);cursor:pointer;display:flex;align-items:center;gap:4px;}
.card-action:hover{text-decoration:underline;}

/* TABLE */
table{width:100%;border-collapse:collapse;}
thead tr{background:#F9FAFB;}
th{padding:10px 16px;text-align:left;font-size:11px;font-weight:700;color:var(--muted);letter-spacing:.3px;text-transform:uppercase;border-bottom:1px solid var(--border);}
td{padding:13px 16px;border-bottom:1px solid #F2F4F7;font-size:13px;color:#344054;vertical-align:middle;}
tr:last-child td{border-bottom:none;}
tbody tr{transition:background .1s;}
tbody tr:hover{background:#F9FAFB;cursor:pointer;}
td strong{color:var(--text);font-weight:700;}

/* PILLS */
.pill{display:inline-flex;align-items:center;gap:5px;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;}
.pill::before{content:'';width:5px;height:5px;border-radius:50%;flex-shrink:0;}
.pill-lost{background:#FEF3F2;color:#B42318;}.pill-lost::before{background:#F04438;}
.pill-found{background:#ECFDF3;color:#027A48;}.pill-found::before{background:#12B76A;}
.pill-missing{background:#FFFAEB;color:#B54708;}.pill-missing::before{background:#F79009;}
.pill-pending{background:#F9FAFB;color:#344054;border:1px solid #EAECF0;}.pill-pending::before{background:#98A2B3;}
.pill-accepted{background:#ECFDF3;color:#027A48;border:1px solid #A6F4C5;}.pill-accepted::before{background:#12B76A;}
.pill-rejected{background:#FEF3F2;color:#B42318;border:1px solid #FEA3A3;}.pill-rejected::before{background:#F04438;}

/* PROGRESS BAR */
.progress-wrap{display:flex;align-items:center;gap:10px;}
.progress-bar{flex:1;height:6px;background:#F2F4F7;border-radius:3px;overflow:hidden;}
.progress-fill{height:100%;border-radius:3px;}
.progress-pct{font-size:11px;font-weight:700;color:var(--muted);width:32px;text-align:right;}

/* RIGHT PANEL */
.info-row{padding:14px 20px;display:flex;align-items:center;gap:12px;border-bottom:1px solid #F2F4F7;}
.info-row:last-child{border-bottom:none;}
.info-icon{width:36px;height:36px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0;}
.info-val{font-size:18px;font-weight:800;color:var(--text);font-family:'Plus Jakarta Sans',sans-serif;}
.info-lbl{font-size:11px;color:var(--muted);margin-top:1px;}

/* ALERT LIST */
.alert-row{padding:14px 20px;display:flex;gap:12px;align-items:flex-start;border-bottom:1px solid #F2F4F7;}
.alert-row:last-child{border-bottom:none;}
.alert-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0;margin-top:4px;}
.alert-dot.red{background:#F04438;}
.alert-dot.amber{background:#F79009;}
.alert-dot.green{background:#12B76A;}
.alert-title{font-size:12px;font-weight:700;color:var(--text);}
.alert-sub{font-size:11px;color:var(--muted);margin-top:2px;}
.alert-time{font-size:10px;color:var(--muted2);margin-top:4px;}

/* THIRD ROW */
.three-col{display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px;}

/* MINI CHART BARS */
.mini-chart{display:flex;align-items:flex-end;gap:4px;height:48px;padding:0 20px 16px;}
.mini-bar{flex:1;border-radius:4px 4px 0 0;transition:opacity .2s;}
.mini-bar:hover{opacity:.7;}

/* OFFICER CARD */
.officer-item{display:flex;align-items:center;gap:12px;padding:12px 20px;border-bottom:1px solid #F2F4F7;transition:background .1s;}
.officer-item:last-child{border-bottom:none;}
.officer-item:hover{background:#F9FAFB;}
.officer-av{width:36px;height:36px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#fff;flex-shrink:0;}
.officer-name{font-size:13px;font-weight:700;color:var(--text);}
.officer-role{font-size:11px;color:var(--muted);}
.officer-status{margin-left:auto;display:flex;align-items:center;gap:4px;font-size:11px;font-weight:600;}
.officer-status.online{color:var(--green);}
.officer-status.away{color:var(--amber);}

/* FIR ID */
.fir-id{font-family:'JetBrains Mono',monospace;font-size:11px;background:var(--accent-lt);color:var(--accent);padding:3px 8px;border-radius:5px;font-weight:500;}

/* TABS */
.tab-row{display:flex;gap:2px;padding:4px;background:#F2F4F7;border-radius:9px;margin-bottom:16px;}
.tab{flex:1;padding:7px;border-radius:7px;font-size:12px;font-weight:600;cursor:pointer;text-align:center;border:none;background:transparent;font-family:inherit;color:var(--muted);transition:all .15s;}
.tab.active{background:#fff;color:var(--text);box-shadow:0 1px 3px rgba(16,24,40,.1);}

/* SCROLLBAR */
::-webkit-scrollbar{width:5px;height:5px;}
::-webkit-scrollbar-thumb{background:#E4E7EC;border-radius:3px;}

/* RESPONSIVE */
@media(max-width:1100px){
  .three-col{grid-template-columns:1fr 1fr;}
  .stat-grid{grid-template-columns:repeat(2,1fr);}
}
@media(max-width:800px){
  .sidebar{width:60px;}
  .sb-brand-name,.sb-profile-name,.sb-profile-role,.sb-section,.sb-item span,.sb-badge,.sb-loc,.sb-footer-btn span{display:none;}
  .sb-item{justify-content:center;padding:10px;}
  .main{margin-left:60px;}
  .two-col{grid-template-columns:1fr;}
  .three-col{grid-template-columns:1fr;}
  .stat-grid{grid-template-columns:1fr 1fr;}
  .topbar-search{width:160px;}
}
</style>
</head>
<body>

<!-- SIDEBAR -->
<aside class="sidebar">
  <div class="sb-header">
    <div class="sb-brand">
      <div class="sb-logo">🔍</div>
      <div class="sb-brand-name">Find<span>Back</span></div>
    </div>
    <div class="sb-badge"><div class="sb-badge-dot"></div> Command Portal</div>
  </div>

  <div style="padding:10px 8px 4px;">
    <div class="sb-profile">
      <div class="sb-avatar">SP</div>
      <div>
        <div class="sb-profile-name">Station Police</div>
        <div class="sb-profile-role">🚔 Gomati, Tripura</div>
      </div>
    </div>
  </div>

  <nav class="sb-nav">
    <div class="sb-section">Overview</div>
    <button class="sb-item active" onclick="switchTab(this,'dashboard')">
      <div class="sb-icon">🏠</div><span>Dashboard</span>
    </button>

    <div class="sb-section">Case Management</div>
    <button class="sb-item" onclick="switchTab(this,'fir')">
      <div class="sb-icon">📋</div><span>FIR Management</span>
      <div class="sb-badge-count">3</div>
    </button>
    <button class="sb-item" onclick="switchTab(this,'missing')">
      <div class="sb-icon">🚨</div><span>Missing Reports</span>
      <div class="sb-badge-count">1</div>
    </button>
    <button class="sb-item" onclick="switchTab(this,'cases')">
      <div class="sb-icon">📂</div><span>All Cases</span>
    </button>
    <button class="sb-item" onclick="switchTab(this,'resolved')">
      <div class="sb-icon">✅</div><span>Resolved</span>
    </button>

    <div class="sb-section">Operations</div>
    <button class="sb-item" onclick="switchTab(this,'alerts')">
      <div class="sb-icon">🔔</div><span>Alerts</span>
      <div class="sb-badge-count">2</div>
    </button>
    <button class="sb-item" onclick="switchTab(this,'analytics')">
      <div class="sb-icon">📊</div><span>Analytics</span>
    </button>
    <button class="sb-item" onclick="switchTab(this,'fraud')">
      <div class="sb-icon">⚠️</div><span>Fraud Monitor</span>
    </button>
    <button class="sb-item" onclick="switchTab(this,'collab')">
      <div class="sb-icon">🤝</div><span>Collaboration</span>
    </button>
    <button class="sb-item" onclick="switchTab(this,'export')">
      <div class="sb-icon">📤</div><span>Export</span>
    </button>
  </nav>

  <div class="sb-loc">
    <div class="sb-loc-label">Active District</div>
    <div class="sb-loc-value">📍 Gomati, Tripura</div>
  </div>

  <div class="sb-footer">
    <button class="sb-footer-btn">⚙️ <span>Settings</span></button>
    <button class="sb-footer-btn" style="color:#FDA29B;">🚪 <span>Logout</span></button>
  </div>
</aside>

<!-- MAIN -->
<div class="main">

  <!-- TOPBAR -->
  <header class="topbar">
    <div class="topbar-left">
      <div>
        <div class="topbar-page">Dashboard</div>
        <div class="topbar-breadcrumb">FindBack Command Portal</div>
      </div>
    </div>
    <div class="topbar-search">
      <span class="si">🔍</span>
      <input type="text" placeholder="Search cases, FIR, location...">
    </div>
    <div class="topbar-actions">
      <div class="icon-btn">🔔<div class="dot"></div></div>
      <div class="icon-btn">📢</div>
      <div class="topbar-user">
        <div class="topbar-av">SP</div>
        <div class="topbar-uname">Station Police</div>
      </div>
    </div>
  </header>

  <!-- CONTENT -->
  <div class="content">

    <!-- PAGE HEADER -->
    <div class="page-header">
      <div>
        <div class="page-title">Case Overview</div>
        <div class="page-sub">Gomati District · All cases at a glance</div>
      </div>
      <div class="header-actions">
        <div class="live-pill"><div class="live-dot"></div> Live</div>
        <button class="btn btn-outline">📤 Export</button>
        <button class="btn btn-primary">➕ New Case</button>
      </div>
    </div>

    <!-- STAT CARDS -->
    <div class="stat-grid">
      <div class="stat-card">
        <div class="stat-card-top">
          <div class="stat-icon blue">🔍</div>
          <div class="stat-trend up">↑ 12%</div>
        </div>
        <div class="stat-value" id="s-lost">24</div>
        <div class="stat-label">Lost Cases</div>
        <div class="stat-bar blue"></div>
      </div>
      <div class="stat-card">
        <div class="stat-card-top">
          <div class="stat-icon green">🎉</div>
          <div class="stat-trend up">↑ 8%</div>
        </div>
        <div class="stat-value" id="s-found">11</div>
        <div class="stat-label">Items Found</div>
        <div class="stat-bar green"></div>
      </div>
      <div class="stat-card">
        <div class="stat-card-top">
          <div class="stat-icon amber">👤</div>
          <div class="stat-trend down">↓ 2%</div>
        </div>
        <div class="stat-value" id="s-missing">5</div>
        <div class="stat-label">Missing Persons</div>
        <div class="stat-bar amber"></div>
      </div>
      <div class="stat-card">
        <div class="stat-card-top">
          <div class="stat-icon purple">🏅</div>
          <div class="stat-trend up">↑ 20%</div>
        </div>
        <div class="stat-value" id="s-solved">8</div>
        <div class="stat-label">Cases Solved</div>
        <div class="stat-bar purple"></div>
      </div>
    </div>

    <!-- TABLE + RIGHT -->
    <div class="two-col">

      <!-- RECENT CASES TABLE -->
      <div class="card">
        <div class="card-header">
          <div>
            <div class="card-title">Recent Cases</div>
            <div class="card-sub">Latest 6 cases in your district</div>
          </div>
          <div class="card-action">View all →</div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Case</th>
              <th>Type</th>
              <th>Location</th>
              <th>Date</th>
              <th>Status</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody id="cases-tbody">
            <tr>
              <td><strong>Samsung Galaxy A54</strong><br><span class="fir-id">FB-TRP-2026-0041</span></td>
              <td><span class="pill pill-lost">Lost</span></td>
              <td>Udaipur, Gomati</td>
              <td>08 Apr</td>
              <td><span class="pill pill-pending">Pending</span></td>
              <td><div class="progress-wrap"><div class="progress-bar"><div class="progress-fill" style="width:30%;background:#2F6FED;"></div></div><div class="progress-pct">30%</div></div></td>
            </tr>
            <tr>
              <td><strong>Black Leather Wallet</strong><br><span class="fir-id">FB-TRP-2026-0040</span></td>
              <td><span class="pill pill-found">Found</span></td>
              <td>Amarpur, Gomati</td>
              <td>07 Apr</td>
              <td><span class="pill pill-accepted">Accepted</span></td>
              <td><div class="progress-wrap"><div class="progress-bar"><div class="progress-fill" style="width:75%;background:#12B76A;"></div></div><div class="progress-pct">75%</div></div></td>
            </tr>
            <tr>
              <td><strong>Ravi Das (14 yrs)</strong><br><span class="fir-id">FB-TRP-2026-0039</span></td>
              <td><span class="pill pill-missing">Missing</span></td>
              <td>Karbook, Gomati</td>
              <td>06 Apr</td>
              <td><span class="pill pill-pending">Pending</span></td>
              <td><div class="progress-wrap"><div class="progress-bar"><div class="progress-fill" style="width:20%;background:#F79009;"></div></div><div class="progress-pct">20%</div></div></td>
            </tr>
            <tr>
              <td><strong>Honda Activa Key</strong><br><span class="fir-id">FB-TRP-2026-0038</span></td>
              <td><span class="pill pill-lost">Lost</span></td>
              <td>Sonamura, Gomati</td>
              <td>05 Apr</td>
              <td><span class="pill pill-accepted" style="background:#ECFDF3;color:#027A48;">✅ Resolved</span></td>
              <td><div class="progress-wrap"><div class="progress-bar"><div class="progress-fill" style="width:100%;background:#12B76A;"></div></div><div class="progress-pct">100%</div></div></td>
            </tr>
            <tr>
              <td><strong>Aadhaar Card</strong><br><span class="fir-id">FB-TRP-2026-0037</span></td>
              <td><span class="pill pill-found">Found</span></td>
              <td>Udaipur, Gomati</td>
              <td>04 Apr</td>
              <td><span class="pill pill-pending">Pending</span></td>
              <td><div class="progress-wrap"><div class="progress-bar"><div class="progress-fill" style="width:45%;background:#7C3AED;"></div></div><div class="progress-pct">45%</div></div></td>
            </tr>
            <tr>
              <td><strong>Blue School Bag</strong><br><span class="fir-id">FB-TRP-2026-0036</span></td>
              <td><span class="pill pill-lost">Lost</span></td>
              <td>Matabari, Gomati</td>
              <td>03 Apr</td>
              <td><span class="pill pill-rejected">Rejected</span></td>
              <td><div class="progress-wrap"><div class="progress-bar"><div class="progress-fill" style="width:10%;background:#F04438;"></div></div><div class="progress-pct">10%</div></div></td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- RIGHT COLUMN -->
      <div style="display:flex;flex-direction:column;gap:16px;">

        <!-- QUICK STATS -->
        <div class="card">
          <div class="card-header">
            <div class="card-title">District Summary</div>
          </div>
          <div class="info-row">
            <div class="info-icon" style="background:#EEF4FF;">🔍</div>
            <div><div class="info-val">24</div><div class="info-lbl">Total Lost</div></div>
          </div>
          <div class="info-row">
            <div class="info-icon" style="background:#ECFDF3;">🎉</div>
            <div><div class="info-val">11</div><div class="info-lbl">Total Found</div></div>
          </div>
          <div class="info-row">
            <div class="info-icon" style="background:#FFFAEB;">👤</div>
            <div><div class="info-val">5</div><div class="info-lbl">Missing Active</div></div>
          </div>
          <div class="info-row">
            <div class="info-icon" style="background:#F5F3FF;">🏅</div>
            <div><div class="info-val">8</div><div class="info-lbl">Solved This Month</div></div>
          </div>
        </div>

        <!-- ALERTS -->
        <div class="card">
          <div class="card-header">
            <div class="card-title">Recent Alerts</div>
            <div class="card-action">View all</div>
          </div>
          <div class="alert-row">
            <div class="alert-dot red"></div>
            <div>
              <div class="alert-title">New FIR — FB-0041</div>
              <div class="alert-sub">Samsung Galaxy Lost · Udaipur</div>
              <div class="alert-time">2 hours ago</div>
            </div>
          </div>
          <div class="alert-row">
            <div class="alert-dot amber"></div>
            <div>
              <div class="alert-title">Missing — No update 48hrs</div>
              <div class="alert-sub">Ravi Das · Karbook</div>
              <div class="alert-time">Yesterday</div>
            </div>
          </div>
          <div class="alert-row">
            <div class="alert-dot red"></div>
            <div>
              <div class="alert-title">Fraud Flag — Post #0035</div>
              <div class="alert-sub">Suspicious activity detected</div>
              <div class="alert-time">2 days ago</div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- THIRD ROW -->
    <div class="three-col">

      <!-- WEEKLY TREND -->
      <div class="card">
        <div class="card-header">
          <div>
            <div class="card-title">Weekly Trend</div>
            <div class="card-sub">Cases this week</div>
          </div>
        </div>
        <div style="padding:16px 20px 8px;display:flex;gap:16px;">
          <div style="display:flex;align-items:center;gap:6px;font-size:11px;font-weight:600;color:var(--muted);"><div style="width:10px;height:10px;border-radius:3px;background:#2F6FED;"></div>Lost</div>
          <div style="display:flex;align-items:center;gap:6px;font-size:11px;font-weight:600;color:var(--muted);"><div style="width:10px;height:10px;border-radius:3px;background:#12B76A;"></div>Found</div>
          <div style="display:flex;align-items:center;gap:6px;font-size:11px;font-weight:600;color:var(--muted);"><div style="width:10px;height:10px;border-radius:3px;background:#F79009;"></div>Missing</div>
        </div>
        <div style="display:flex;gap:6px;padding:8px 20px 16px;align-items:flex-end;height:100px;">
          <div style="flex:1;display:flex;flex-direction:column;gap:3px;align-items:center;">
            <div style="width:100%;background:#2F6FED;border-radius:4px 4px 0 0;height:40px;opacity:.8;"></div>
            <div style="width:100%;background:#12B76A;border-radius:0;height:20px;opacity:.8;"></div>
            <div style="width:100%;background:#F79009;border-radius:0 0 4px 4px;height:10px;opacity:.8;"></div>
            <div style="font-size:9px;color:var(--muted2);margin-top:4px;">Mon</div>
          </div>
          <div style="flex:1;display:flex;flex-direction:column;gap:3px;align-items:center;">
            <div style="width:100%;background:#2F6FED;border-radius:4px 4px 0 0;height:55px;opacity:.8;"></div>
            <div style="width:100%;background:#12B76A;border-radius:0;height:25px;opacity:.8;"></div>
            <div style="width:100%;background:#F79009;border-radius:0 0 4px 4px;height:5px;opacity:.8;"></div>
            <div style="font-size:9px;color:var(--muted2);margin-top:4px;">Tue</div>
          </div>
          <div style="flex:1;display:flex;flex-direction:column;gap:3px;align-items:center;">
            <div style="width:100%;background:#2F6FED;border-radius:4px 4px 0 0;height:30px;opacity:.8;"></div>
            <div style="width:100%;background:#12B76A;border-radius:0;height:35px;opacity:.8;"></div>
            <div style="width:100%;background:#F79009;border-radius:0 0 4px 4px;height:10px;opacity:.8;"></div>
            <div style="font-size:9px;color:var(--muted2);margin-top:4px;">Wed</div>
          </div>
          <div style="flex:1;display:flex;flex-direction:column;gap:3px;align-items:center;">
            <div style="width:100%;background:#2F6FED;border-radius:4px 4px 0 0;height:45px;opacity:.8;"></div>
            <div style="width:100%;background:#12B76A;border-radius:0;height:20px;opacity:.8;"></div>
            <div style="width:100%;background:#F79009;border-radius:0 0 4px 4px;height:8px;opacity:.8;"></div>
            <div style="font-size:9px;color:var(--muted2);margin-top:4px;">Thu</div>
          </div>
          <div style="flex:1;display:flex;flex-direction:column;gap:3px;align-items:center;">
            <div style="width:100%;background:#2F6FED;border-radius:4px 4px 0 0;height:60px;opacity:.8;"></div>
            <div style="width:100%;background:#12B76A;border-radius:0;height:30px;opacity:.8;"></div>
            <div style="width:100%;background:#F79009;border-radius:0 0 4px 4px;height:15px;opacity:.8;"></div>
            <div style="font-size:9px;color:var(--muted2);margin-top:4px;">Fri</div>
          </div>
          <div style="flex:1;display:flex;flex-direction:column;gap:3px;align-items:center;">
            <div style="width:100%;background:#2F6FED;border-radius:4px 4px 0 0;height:35px;opacity:.7;"></div>
            <div style="width:100%;background:#12B76A;border-radius:0;height:15px;opacity:.7;"></div>
            <div style="width:100%;background:#F79009;border-radius:0 0 4px 4px;height:5px;opacity:.7;"></div>
            <div style="font-size:9px;color:var(--muted2);margin-top:4px;">Sat</div>
          </div>
          <div style="flex:1;display:flex;flex-direction:column;gap:3px;align-items:center;">
            <div style="width:100%;background:#2F6FED;border-radius:4px 4px 0 0;height:20px;opacity:.5;"></div>
            <div style="width:100%;background:#12B76A;border-radius:0;height:10px;opacity:.5;"></div>
            <div style="width:100%;background:#F79009;border-radius:0 0 4px 4px;height:3px;opacity:.5;"></div>
            <div style="font-size:9px;color:var(--muted2);margin-top:4px;">Sun</div>
          </div>
        </div>
      </div>

      <!-- CATEGORY BREAKDOWN -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">Top Categories</div>
        </div>
        <div style="padding:16px 20px;display:flex;flex-direction:column;gap:12px;">
          <div>
            <div style="display:flex;justify-content:space-between;margin-bottom:5px;"><span style="font-size:12px;font-weight:600;">📱 Phone</span><span style="font-size:11px;color:var(--muted);">8 cases</span></div>
            <div class="progress-bar" style="height:7px;"><div class="progress-fill" style="width:72%;background:#2F6FED;"></div></div>
          </div>
          <div>
            <div style="display:flex;justify-content:space-between;margin-bottom:5px;"><span style="font-size:12px;font-weight:600;">👛 Wallet</span><span style="font-size:11px;color:var(--muted);">6 cases</span></div>
            <div class="progress-bar" style="height:7px;"><div class="progress-fill" style="width:54%;background:#7C3AED;"></div></div>
          </div>
          <div>
            <div style="display:flex;justify-content:space-between;margin-bottom:5px;"><span style="font-size:12px;font-weight:600;">📄 Documents</span><span style="font-size:11px;color:var(--muted);">5 cases</span></div>
            <div class="progress-bar" style="height:7px;"><div class="progress-fill" style="width:45%;background:#F79009;"></div></div>
          </div>
          <div>
            <div style="display:flex;justify-content:space-between;margin-bottom:5px;"><span style="font-size:12px;font-weight:600;">🔑 Keys</span><span style="font-size:11px;color:var(--muted);">3 cases</span></div>
            <div class="progress-bar" style="height:7px;"><div class="progress-fill" style="width:27%;background:#12B76A;"></div></div>
          </div>
          <div>
            <div style="display:flex;justify-content:space-between;margin-bottom:5px;"><span style="font-size:12px;font-weight:600;">💻 Laptop</span><span style="font-size:11px;color:var(--muted);">2 cases</span></div>
            <div class="progress-bar" style="height:7px;"><div class="progress-fill" style="width:18%;background:#F04438;"></div></div>
          </div>
        </div>
      </div>

      <!-- OFFICERS ONLINE -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">Officers Online</div>
          <div class="card-action">Manage</div>
        </div>
        <div class="officer-item">
          <div class="officer-av" style="background:linear-gradient(135deg,#2F6FED,#60A5FA);">RK</div>
          <div><div class="officer-name">Raju Kumar</div><div class="officer-role">Inspector · Udaipur PS</div></div>
          <div class="officer-status online">● Online</div>
        </div>
        <div class="officer-item">
          <div class="officer-av" style="background:linear-gradient(135deg,#059669,#34D399);">SD</div>
          <div><div class="officer-name">Sunita Devi</div><div class="officer-role">SI · Amarpur PS</div></div>
          <div class="officer-status online">● Online</div>
        </div>
        <div class="officer-item">
          <div class="officer-av" style="background:linear-gradient(135deg,#7C3AED,#A78BFA);">MB</div>
          <div><div class="officer-name">Manik Banik</div><div class="officer-role">Constable · Karbook</div></div>
          <div class="officer-status away">● Away</div>
        </div>
        <div class="officer-item">
          <div class="officer-av" style="background:linear-gradient(135deg,#D97706,#FBD047);">PT</div>
          <div><div class="officer-name">Priya Tripura</div><div class="officer-role">SI · Sonamura PS</div></div>
          <div class="officer-status online">● Online</div>
        </div>
      </div>

    </div>

  </div>
</div>

<script>
function switchTab(btn, tab) {
  document.querySelectorAll('.sb-item').forEach(function(b){ b.classList.remove('active'); });
  btn.classList.add('active');
  document.querySelector('.topbar-page').textContent =
    tab==='dashboard'?'Dashboard':tab==='fir'?'FIR Management':tab==='missing'?'Missing Reports':
    tab==='cases'?'All Cases':tab==='resolved'?'Resolved Cases':tab==='alerts'?'Alerts':
    tab==='analytics'?'Analytics':tab==='fraud'?'Fraud Monitor':tab==='collab'?'Collaboration':'Export';
}

// Connect to Firebase if available
window.addEventListener('load', function() {
  var check = setInterval(function() {
    if(window._allPosts) {
      clearInterval(check);
      var posts = window._allPosts;
      var local = window._getLocalPosts ? window._getLocalPosts() : posts;
      var lost    = local.filter(function(p){ return p.type==='lost'; }).length;
      var found   = local.filter(function(p){ return p.type==='found'; }).length;
      var missing = local.filter(function(p){ return p.type==='missing'; }).length;
      var solved  = local.filter(function(p){ return p.status==='resolved'; }).length;
      var el = function(id){ return document.getElementById(id); };
      if(el('s-lost'))    el('s-lost').textContent    = lost;
      if(el('s-found'))   el('s-found').textContent   = found;
      if(el('s-missing')) el('s-missing').textContent = missing;
      if(el('s-solved'))  el('s-solved').textContent  = solved;
    }
  }, 1000);
});
</script>

</body>
</html>
