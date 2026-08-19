// api/status.js
export default function handler(req, res) {
  // Configurable timezone via query param (Default: Asia/Jakarta - WIB UTC+7)
  const timeZone = req.query.timezone || 'Asia/Jakarta';
  const tzLabel = req.query.tz_label || 'WIB';

  const now = new Date();
  
  // Format current time HH:MM
  const timeString = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour12: false,
    hour: '2-digit',
    minute: '2-digit'
  }).format(now);

  const hour = parseInt(
    new Intl.DateTimeFormat('en-US', { timeZone, hour12: false, hour: 'numeric' }).format(now),
    10
  );

  // Sleep time: 22:00 (10 PM) to 06:00 (6 AM)
  const isSleeping = hour >= 22 || hour < 6;

  // Set response headers
  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  if (isSleeping) {
    // ----------------- SLEEP / NIGHT MODE (22:00 - 06:00) -----------------
    const sleepSvg = `<svg width="480" height="126" viewBox="0 0 480 126" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0c0e1a"/>
      <stop offset="50%" stop-color="#121629"/>
      <stop offset="100%" stop-color="#181c33"/>
    </linearGradient>
    <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4f46e5"/>
      <stop offset="50%" stop-color="#7c3aed"/>
      <stop offset="100%" stop-color="#1e1b4b"/>
    </linearGradient>
    <radialGradient id="moonAura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#818cf8" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#818cf8" stop-opacity="0"/>
    </radialGradient>
    <style>
      @keyframes floatZ1 {
        0% { transform: translate(0, 0) scale(0.6); opacity: 0; }
        35% { opacity: 0.9; }
        100% { transform: translate(14px, -26px) scale(1.1); opacity: 0; }
      }
      @keyframes floatZ2 {
        0% { transform: translate(0, 0) scale(0.6); opacity: 0; }
        35% { opacity: 0.9; }
        100% { transform: translate(18px, -30px) scale(1.2); opacity: 0; }
      }
      @keyframes floatZ3 {
        0% { transform: translate(0, 0) scale(0.5); opacity: 0; }
        35% { opacity: 0.8; }
        100% { transform: translate(22px, -34px) scale(1.35); opacity: 0; }
      }
      @keyframes starTwinkle {
        0%, 100% { opacity: 0.2; transform: scale(0.7); }
        50% { opacity: 1; transform: scale(1.25); }
      }
      @keyframes moonBreathe {
        0%, 100% { transform: scale(1); filter: drop-shadow(0 0 6px #818cf8); }
        50% { transform: scale(1.05); filter: drop-shadow(0 0 14px #c084fc); }
      }
      .z1 { animation: floatZ1 3s infinite ease-in-out; animation-delay: 0s; }
      .z2 { animation: floatZ2 3s infinite ease-in-out; animation-delay: 1s; }
      .z3 { animation: floatZ3 3s infinite ease-in-out; animation-delay: 2s; }
      .star1 { animation: starTwinkle 2s infinite ease-in-out; transform-origin: 430px 25px; }
      .star2 { animation: starTwinkle 2.6s infinite ease-in-out 0.8s; transform-origin: 450px 48px; }
      .star3 { animation: starTwinkle 1.9s infinite ease-in-out 1.3s; transform-origin: 400px 70px; }
      .moon-glow { animation: moonBreathe 4s infinite ease-in-out; transform-origin: 48px 63px; }
      .text-time { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-weight: 700; font-size: 22px; fill: #e0e7ff; }
      .text-sub { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-weight: 400; font-size: 12px; fill: #94a3b8; }
      .badge-text { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-weight: 700; font-size: 11px; fill: #e9d5ff; }
    </style>
  </defs>

  <!-- Card Background -->
  <rect x="1" y="1" width="478" height="124" rx="16" fill="url(#bgGrad)" stroke="url(#borderGrad)" stroke-width="1.5"/>

  <!-- Left Visual Picture / Emoji Scene -->
  <g transform="translate(16, 17)">
    <circle cx="46" cy="46" r="44" fill="url(#moonAura)"/>
    <circle cx="46" cy="46" r="36" fill="#1e1b4b" stroke="#4338ca" stroke-width="1.5"/>
    <text x="46" y="56" font-size="34" text-anchor="middle" class="moon-glow">😴</text>
    
    <!-- Floating Zzz -->
    <text x="64" y="28" class="z1" font-family="'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="14" fill="#a5b4fc">z</text>
    <text x="72" y="18" class="z2" font-family="'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="17" fill="#c084fc">Z</text>
    <text x="80" y="8" class="z3" font-family="'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="20" fill="#e0e7ff">Z</text>
  </g>

  <!-- Twinkling Stars in Night Sky -->
  <g fill="#e0e7ff">
    <path class="star1" d="M430 20L431.5 23.5L435 25L431.5 26.5L430 30L428.5 26.5L425 25L428.5 23.5Z"/>
    <path class="star2" d="M450 43L451.2 45.8L454 47L451.2 48.2L450 51L448.8 48.2L446 47L448.8 45.8Z"/>
    <path class="star3" d="M400 65L401 67.5L403.5 68.5L401 69.5L400 72L399 69.5L396.5 68.5L399 67.5Z"/>
  </g>

  <!-- Top Right Night Scene Emojis -->
  <g transform="translate(390, 20)">
    <text x="0" y="0" font-size="18" opacity="0.85">🌙 🛌 ✨</text>
  </g>

  <!-- Info & Clock Section -->
  <g transform="translate(126, 22)">
    <!-- Pill Badge -->
    <rect x="0" y="0" width="168" height="23" rx="11.5" fill="#3b0764" stroke="#6b21a8" stroke-width="1"/>
    <circle cx="11" cy="11.5" r="4" fill="#c084fc"/>
    <text x="22" y="16" class="badge-text">🌙 SLEEPING TIME 💤</text>

    <!-- Clock Time -->
    <text x="0" y="50" class="text-time">${timeString} <tspan font-size="13" font-weight="400" fill="#818cf8">(${tzLabel})</tspan></text>

    <!-- Description -->
    <text x="0" y="72" class="text-sub">Asleep &amp; recharging 🛌 · DND active 🔕</text>
  </g>
</svg>`;
    return res.status(200).send(sleepSvg);
  }

  // ----------------- WORK / ACTIVE MODE (06:00 - 22:00) -----------------
  const workSvg = `<svg width="480" height="126" viewBox="0 0 480 126" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#081018"/>
      <stop offset="50%" stop-color="#0d1b2a"/>
      <stop offset="100%" stop-color="#13263c"/>
    </linearGradient>
    <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0284c7"/>
      <stop offset="50%" stop-color="#10b981"/>
      <stop offset="100%" stop-color="#064e3b"/>
    </linearGradient>
    <radialGradient id="sunAura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#0284c7" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#0284c7" stop-opacity="0"/>
    </radialGradient>
    <style>
      @keyframes pulseRing {
        0% { transform: scale(0.9); opacity: 0.8; }
        70% { transform: scale(1.7); opacity: 0; }
        100% { transform: scale(0.9); opacity: 0; }
      }
      @keyframes workBounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-4px); }
      }
      @keyframes blinkCursor {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
      }
      .pulse-ring { animation: pulseRing 2s infinite ease-out; transform-origin: 11px 11.5px; }
      .work-icon { animation: workBounce 2.5s infinite ease-in-out; }
      .cursor-blink { animation: blinkCursor 1s infinite steps(2); }
      .text-time { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-weight: 700; font-size: 22px; fill: #e0f2fe; }
      .text-sub { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-weight: 400; font-size: 12px; fill: #94a3b8; }
      .badge-text { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-weight: 700; font-size: 11px; fill: #86efac; }
    </style>
  </defs>

  <!-- Card Background -->
  <rect x="1" y="1" width="478" height="124" rx="16" fill="url(#bgGrad)" stroke="url(#borderGrad)" stroke-width="1.5"/>

  <!-- Left Visual Picture / Emoji Scene -->
  <g transform="translate(16, 17)">
    <circle cx="46" cy="46" r="44" fill="url(#sunAura)"/>
    <circle cx="46" cy="46" r="36" fill="#082f49" stroke="#0284c7" stroke-width="1.5"/>
    <text x="46" y="56" font-size="34" text-anchor="middle" class="work-icon">👨‍💻</text>
  </g>

  <!-- Top Right Work Scene Emojis -->
  <g transform="translate(385, 20)">
    <text x="0" y="0" font-size="18" opacity="0.85">💻 ⚡ ☕ 🚀</text>
  </g>

  <!-- Info & Clock Section -->
  <g transform="translate(126, 22)">
    <!-- Pill Badge -->
    <rect x="0" y="0" width="168" height="23" rx="11.5" fill="#052e16" stroke="#15803d" stroke-width="1"/>
    <circle cx="11" cy="11.5" r="5" fill="#22c55e" class="pulse-ring"/>
    <circle cx="11" cy="11.5" r="3.5" fill="#4ade80"/>
    <text x="22" y="16" class="badge-text">🟢 WORKING TIME 💻</text>

    <!-- Clock Time -->
    <text x="0" y="50" class="text-time">${timeString} <tspan font-size="13" font-weight="400" fill="#38bdf8">(${tzLabel})</tspan></text>

    <!-- Description -->
    <text x="0" y="72" class="text-sub">Online &amp; active · Coding, building &amp; shipping <tspan class="cursor-blink" fill="#38bdf8">|</tspan></text>
  </g>
</svg>`;
  return res.status(200).send(workSvg);
}
