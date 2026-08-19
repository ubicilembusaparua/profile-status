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

  // Response headers
  res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  const fontStack = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

  if (isSleeping) {
    // ----------------- SLEEP MODE SVG (22:00 - 06:00) -----------------
    const sleepSvg = `<svg width="490" height="130" viewBox="0 0 490 130" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background Gradient -->
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
    <linearGradient id="moonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="100%" stop-color="#facc15"/>
    </linearGradient>

    <style>
      @keyframes floatZ1 {
        0% { transform: translate(0, 0) scale(0.6); opacity: 0; }
        35% { opacity: 0.95; }
        100% { transform: translate(14px, -26px) scale(1.1); opacity: 0; }
      }
      @keyframes floatZ2 {
        0% { transform: translate(0, 0) scale(0.6); opacity: 0; }
        35% { opacity: 0.95; }
        100% { transform: translate(18px, -30px) scale(1.25); opacity: 0; }
      }
      @keyframes floatZ3 {
        0% { transform: translate(0, 0) scale(0.5); opacity: 0; }
        35% { opacity: 0.85; }
        100% { transform: translate(22px, -35px) scale(1.4); opacity: 0; }
      }
      @keyframes starTwinkle {
        0%, 100% { opacity: 0.2; transform: scale(0.7); }
        50% { opacity: 1; transform: scale(1.25); }
      }
      @keyframes moonBreathe {
        0%, 100% { transform: scale(1); filter: drop-shadow(0 0 4px #facc15); }
        50% { transform: scale(1.05); filter: drop-shadow(0 0 12px #fde047); }
      }
      .z1 { animation: floatZ1 3s infinite ease-in-out; animation-delay: 0s; }
      .z2 { animation: floatZ2 3s infinite ease-in-out; animation-delay: 1s; }
      .z3 { animation: floatZ3 3s infinite ease-in-out; animation-delay: 2s; }
      .star1 { animation: starTwinkle 2s infinite ease-in-out; transform-origin: 440px 25px; }
      .star2 { animation: starTwinkle 2.6s infinite ease-in-out 0.8s; transform-origin: 460px 48px; }
      .star3 { animation: starTwinkle 1.9s infinite ease-in-out 1.3s; transform-origin: 410px 70px; }
      .moon-breathe { animation: moonBreathe 4s infinite ease-in-out; transform-origin: 46px 46px; }
      .text-time { font-family: ${fontStack}; font-weight: 700; font-size: 21px; fill: #e0e7ff; }
      .text-sub { font-family: ${fontStack}; font-weight: 400; font-size: 12.5px; fill: #94a3b8; }
      .badge-text { font-family: ${fontStack}; font-weight: 700; font-size: 11px; fill: #e9d5ff; }
    </style>
  </defs>

  <!-- Card Background -->
  <rect x="1" y="1" width="488" height="128" rx="16" fill="url(#bgGrad)" stroke="url(#borderGrad)" stroke-width="1.5"/>

  <!-- Left Visual Avatar: Glowing Crescent Moon with Cute Sleeping Face -->
  <g transform="translate(18, 19)">
    <circle cx="46" cy="46" r="44" fill="url(#moonAura)"/>
    <circle cx="46" cy="46" r="36" fill="#1e1b4b" stroke="#4338ca" stroke-width="1.5"/>

    <!-- Vector Moon -->
    <g class="moon-breathe">
      <path d="M42 22C32 22 24 30 24 42C24 54 34 64 46 64C51 64 56 62 60 59C53 58 48 52 48 45C48 38 53 32 60 31C55 25 49 22 42 22Z" fill="url(#moonGrad)"/>
      <!-- Sleeping Closed Eye -->
      <path d="M33 43C34.5 45.5 37.5 45.5 39 43" stroke="#854d0e" stroke-width="1.8" stroke-linecap="round"/>
      <!-- Rosy Cheek -->
      <circle cx="32" cy="48" r="3" fill="#f43f5e" opacity="0.65"/>
    </g>

    <!-- Floating Vector Zzz -->
    <text x="62" y="28" class="z1" font-family="'Segoe UI', sans-serif" font-weight="900" font-size="14" fill="#a5b4fc">z</text>
    <text x="70" y="18" class="z2" font-family="'Segoe UI', sans-serif" font-weight="900" font-size="17" fill="#c084fc">Z</text>
    <text x="78" y="8" class="z3" font-family="'Segoe UI', sans-serif" font-weight="900" font-size="20" fill="#e0e7ff">Z</text>
  </g>

  <!-- Twinkling Vector Stars in Night Sky -->
  <g fill="#fde047">
    <path class="star1" d="M440 20L441.5 23.5L445 25L441.5 26.5L440 30L438.5 26.5L435 25L438.5 23.5Z"/>
    <path class="star2" d="M460 43L461.2 45.8L464 47L461.2 48.2L460 51L448.8 48.2L446 47L448.8 45.8Z"/>
    <path class="star3" d="M410 65L411 67.5L413.5 68.5L411 69.5L410 72L409 69.5L406.5 68.5L409 67.5Z"/>
  </g>

  <!-- Info & Clock Section -->
  <g transform="translate(130, 22)">
    <!-- Row 1: Status Badge with Vector Moon Icon -->
    <rect x="0" y="0" width="168" height="24" rx="12" fill="#3b0764" stroke="#6b21a8" stroke-width="1"/>
    <!-- Mini Vector Moon in Badge -->
    <path d="M14 6C11 6 9 8 9 11C9 14 11 16 14 16C15.5 16 16.8 15.5 17.6 14.6C15.6 14.4 14.2 12.8 14.2 11C14.2 9.2 15.6 7.6 17.6 7.4C16.6 6.5 15.3 6 14 6Z" fill="#facc15"/>
    <text x="26" y="16.5" class="badge-text">SLEEPING TIME</text>
    <text x="128" y="16.5" font-family="'Segoe UI', sans-serif" font-weight="900" font-size="12" fill="#c084fc">Zzz</text>

    <!-- Row 2: Time with Vector Clock Icon -->
    <g transform="translate(0, 52)">
      <!-- Vector Clock -->
      <g transform="translate(0, -14)">
        <circle cx="8.5" cy="8.5" r="7.5" fill="#312e81" stroke="#818cf8" stroke-width="1.6"/>
        <path d="M8.5 4.5V8.5L11.5 10.5" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      <text x="24" y="-1" class="text-time">${timeString} <tspan font-size="13" font-weight="400" fill="#818cf8">(${tzLabel})</tspan></text>
    </g>

    <!-- Row 3: Status with Vector Bed Icon -->
    <g transform="translate(0, 78)">
      <!-- Vector Bed -->
      <g transform="translate(0, -11)">
        <path d="M1 10V2M1 6H15V10M15 10V4M4 4H7C7.55 4 8 4.45 8 5V6H3V5C3 4.45 3.45 4 4 4Z" stroke="#a5b4fc" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      <text x="20" y="-1" class="text-sub">Asleep &amp; recharging · DND active (Offline)</text>
    </g>
  </g>
</svg>`;
    return res.status(200).send(sleepSvg);
  }

  // ----------------- WORK / ACTIVE MODE (06:00 - 22:00) -----------------
  const workSvg = `<svg width="490" height="130" viewBox="0 0 490 130" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background Gradient -->
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
    <linearGradient id="screenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0284c7"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>

    <style>
      @keyframes pulseRing {
        0% { transform: scale(0.9); opacity: 0.8; }
        70% { transform: scale(1.7); opacity: 0; }
        100% { transform: scale(0.9); opacity: 0; }
      }
      @keyframes devBounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-3px); }
      }
      @keyframes steamRise {
        0% { transform: translateY(0) scaleX(0.8); opacity: 0; }
        40% { opacity: 0.85; }
        100% { transform: translateY(-12px) scaleX(1.3); opacity: 0; }
      }
      @keyframes blinkCursor {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
      }
      .pulse-ring { animation: pulseRing 2s infinite ease-out; transform-origin: 10px 12px; }
      .dev-bounce { animation: devBounce 2.5s infinite ease-in-out; }
      .steam-1 { animation: steamRise 2.2s infinite ease-out; }
      .steam-2 { animation: steamRise 2.2s infinite ease-out 0.8s; }
      .cursor-blink { animation: blinkCursor 1s infinite steps(2); }
      .text-time { font-family: ${fontStack}; font-weight: 700; font-size: 21px; fill: #e0f2fe; }
      .text-sub { font-family: ${fontStack}; font-weight: 400; font-size: 12.5px; fill: #94a3b8; }
      .badge-text { font-family: ${fontStack}; font-weight: 700; font-size: 11px; fill: #86efac; }
    </style>
  </defs>

  <!-- Card Background -->
  <rect x="1" y="1" width="488" height="128" rx="16" fill="url(#bgGrad)" stroke="url(#borderGrad)" stroke-width="1.5"/>

  <!-- Left Visual Avatar: Glowing Laptop Workstation & Coffee -->
  <g transform="translate(18, 19)" class="dev-bounce">
    <circle cx="46" cy="46" r="44" fill="url(#sunAura)"/>
    <circle cx="46" cy="46" r="36" fill="#082f49" stroke="#0284c7" stroke-width="1.5"/>

    <!-- Vector Laptop Screen -->
    <rect x="25" y="27" width="42" height="27" rx="3" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5"/>
    <!-- Glowing Code Lines -->
    <path d="M30 33H48M30 38H42M30 43H54M30 48H38" stroke="#4ade80" stroke-width="1.6" stroke-linecap="round"/>
    <!-- Code Brackets on Screen -->
    <path d="M54 36L57 39L54 42" stroke="#38bdf8" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
    
    <!-- Laptop Base / Keyboard -->
    <path d="M19 55L24 55L68 55L73 55C74 55 75 56 74 57L71 61C70.5 61.5 69.5 62 68.5 62H23.5C22.5 62 21.5 61.5 21 61L18 57C17 56 18 55 19 55Z" fill="#1e293b" stroke="#38bdf8" stroke-width="1.2"/>
    <!-- Trackpad -->
    <rect x="40" y="56" width="12" height="3" rx="1" fill="#475569"/>

    <!-- Steaming Coffee Cup -->
    <g transform="translate(62, 42)">
      <rect x="0" y="6" width="10" height="11" rx="2" fill="#78350f" stroke="#d97706" stroke-width="1"/>
      <path d="M10 9C12 9 13 10 13 11.5C13 13 12 14 10 14" stroke="#d97706" stroke-width="1"/>
      <!-- Steam Waves -->
      <path d="M3 3C3 1 5 1 5 -1" stroke="#fde68a" stroke-width="1" stroke-linecap="round" class="steam-1"/>
      <path d="M7 3C7 1 9 1 9 -1" stroke="#fde68a" stroke-width="1" stroke-linecap="round" class="steam-2"/>
    </g>
  </g>

  <!-- Info & Clock Section -->
  <g transform="translate(130, 22)">
    <!-- Row 1: Status Badge with Pulsing Live Emerald Beacon -->
    <rect x="0" y="0" width="168" height="24" rx="12" fill="#052e16" stroke="#15803d" stroke-width="1"/>
    <circle cx="12" cy="12" r="5" fill="#22c55e" class="pulse-ring"/>
    <circle cx="12" cy="12" r="3.5" fill="#4ade80"/>
    <text x="24" y="16.5" class="badge-text">WORKING TIME</text>
    
    <!-- Mini Terminal Icon inside badge -->
    <g transform="translate(126, 4)">
      <rect x="0" y="0" width="28" height="15" rx="3" fill="#0f172a" stroke="#22c55e" stroke-width="0.8"/>
      <path d="M4 5L7 7.5L4 10" stroke="#4ade80" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="9" y1="10" x2="13" y2="10" stroke="#4ade80" stroke-width="1" stroke-linecap="round"/>
    </g>

    <!-- Row 2: Time with Vector Clock Icon -->
    <g transform="translate(0, 52)">
      <!-- Vector Clock -->
      <g transform="translate(0, -14)">
        <circle cx="8.5" cy="8.5" r="7.5" fill="#0369a1" stroke="#38bdf8" stroke-width="1.6"/>
        <path d="M8.5 4.5V8.5L11.5 10.5" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      <text x="24" y="-1" class="text-time">${timeString} <tspan font-size="13" font-weight="400" fill="#38bdf8">(${tzLabel})</tspan></text>
    </g>

    <!-- Row 3: Status with Vector Rocket Icon -->
    <g transform="translate(0, 78)">
      <!-- Vector Rocket -->
      <g transform="translate(0, -12)">
        <path d="M8 1.5C5 2.5 3 6 3 9.5C3 11 3.5 12.5 4 13.5L2 15.5H6L7 16.5L8.5 15C10 15 11.5 14.5 12.5 13.5C13.5 11.5 13.5 8 13.5 8C13.5 8 10 8 8 1.5Z" fill="#38bdf8"/>
        <circle cx="8" cy="8" r="1.8" fill="#082f49"/>
        <path d="M3 14L1 16L3 17L4 15" fill="#f97316"/>
      </g>
      <text x="20" y="-1" class="text-sub">Online &amp; active · Coding &amp; building <tspan class="cursor-blink" fill="#38bdf8">|</tspan></text>
    </g>
  </g>
</svg>`;
  return res.status(200).send(workSvg);
}
