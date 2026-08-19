// api/status.js
export default function handler(req, res) {
  // Set your local timezone (Default: Asia/Jakarta - WIB UTC+7)
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

  // Sleep time between 22:00 (10 PM) and 06:00 (6 AM)
  const isSleeping = hour >= 22 || hour < 6;

  // Prevent aggressive caching so visitors see real-time updates
  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0');

  if (isSleeping) {
    // ----------------- SLEEP MODE SVG (22:00 - 06:00) -----------------
    const sleepSvg = `<svg width="460" height="120" viewBox="0 0 460 120" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0c101d"/>
      <stop offset="100%" stop-color="#151928"/>
    </linearGradient>
    <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3b3363"/>
      <stop offset="100%" stop-color="#1e2238"/>
    </linearGradient>
    <style>
      @keyframes floatZ1 {
        0% { transform: translate(0, 0) scale(0.6); opacity: 0; }
        40% { opacity: 0.9; }
        100% { transform: translate(12px, -24px) scale(1.1); opacity: 0; }
      }
      @keyframes floatZ2 {
        0% { transform: translate(0, 0) scale(0.6); opacity: 0; }
        40% { opacity: 0.9; }
        100% { transform: translate(16px, -28px) scale(1.2); opacity: 0; }
      }
      @keyframes floatZ3 {
        0% { transform: translate(0, 0) scale(0.5); opacity: 0; }
        40% { opacity: 0.8; }
        100% { transform: translate(20px, -32px) scale(1.3); opacity: 0; }
      }
      @keyframes starTwinkle {
        0%, 100% { opacity: 0.2; transform: scale(0.8); }
        50% { opacity: 1; transform: scale(1.2); }
      }
      .z1 { animation: floatZ1 3s infinite ease-in-out; animation-delay: 0s; }
      .z2 { animation: floatZ2 3s infinite ease-in-out; animation-delay: 1s; }
      .z3 { animation: floatZ3 3s infinite ease-in-out; animation-delay: 2s; }
      .star1 { animation: starTwinkle 2s infinite ease-in-out; transform-origin: 400px 25px; }
      .star2 { animation: starTwinkle 2.5s infinite ease-in-out 0.7s; transform-origin: 425px 45px; }
      .star3 { animation: starTwinkle 1.8s infinite ease-in-out 1.2s; transform-origin: 375px 65px; }
      .text-time { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-weight: 700; font-size: 22px; fill: #c7d2fe; }
      .text-sub { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-weight: 400; font-size: 12px; fill: #94a3b8; }
      .badge-text { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-weight: 600; font-size: 11px; fill: #d8b4fe; }
    </style>
  </defs>

  <rect x="1" y="1" width="458" height="118" rx="14" fill="url(#bgGrad)" stroke="url(#borderGrad)" stroke-width="1.5"/>

  <!-- Sleeping Icon & Floating Zzz -->
  <g transform="translate(24, 22)">
    <circle cx="36" cy="36" r="32" fill="#1e1b4b" stroke="#4338ca" stroke-width="1.5"/>
    <text x="36" y="45" font-size="28" text-anchor="middle">😴</text>
    <text x="50" y="24" class="z1" font-family="sans-serif" font-weight="900" font-size="14" fill="#a5b4fc">z</text>
    <text x="56" y="16" class="z2" font-family="sans-serif" font-weight="900" font-size="16" fill="#c084fc">Z</text>
    <text x="62" y="8" class="z3" font-family="sans-serif" font-weight="900" font-size="18" fill="#e0e7ff">Z</text>
  </g>

  <!-- Twinkling Stars -->
  <g fill="#e0e7ff">
    <path class="star1" d="M400 20L401.2 22.8L404 24L401.2 25.2L400 28L398.8 25.2L396 24L398.8 22.8Z"/>
    <path class="star2" d="M425 40L426 42.5L428.5 43.5L426 44.5L425 47L424 44.5L421.5 43.5L424 42.5Z"/>
    <path class="star3" d="M375 60L375.8 62L378 63L375.8 64L375 66L374.2 64L372 63L374.2 62Z"/>
  </g>

  <!-- Info -->
  <g transform="translate(108, 20)">
    <rect x="0" y="0" width="132" height="22" rx="11" fill="#2e1065" stroke="#581c87" stroke-width="1"/>
    <circle cx="10" cy="11" r="3.5" fill="#a855f7"/>
    <text x="20" y="15" class="badge-text">🌙 SLEEPING TIME</text>
    <text x="0" y="48" class="text-time">${timeString} <tspan font-size="13" font-weight="400" fill="#64748b">(${tzLabel})</tspan></text>
    <text x="0" y="68" class="text-sub">AFK &amp; resting · Currently offline 💤</text>
  </g>
</svg>`;
    return res.status(200).send(sleepSvg);
  }

  // ----------------- WORK MODE SVG (06:00 - 22:00) -----------------
  const workSvg = `<svg width="460" height="120" viewBox="0 0 460 120" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0b1320"/>
      <stop offset="100%" stop-color="#111d2e"/>
    </linearGradient>
    <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e3a5f"/>
      <stop offset="100%" stop-color="#162a45"/>
    </linearGradient>
    <style>
      @keyframes pulseRing {
        0% { transform: scale(0.9); opacity: 0.8; }
        70% { transform: scale(1.6); opacity: 0; }
        100% { transform: scale(0.9); opacity: 0; }
      }
      @keyframes workBounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-3px); }
      }
      @keyframes blinkCursor {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
      }
      .pulse-ring { animation: pulseRing 2s infinite ease-out; transform-origin: 10px 11px; }
      .work-icon { animation: workBounce 2.5s infinite ease-in-out; }
      .cursor-blink { animation: blinkCursor 1s infinite steps(2); }
      .text-time { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-weight: 700; font-size: 22px; fill: #38bdf8; }
      .text-sub { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-weight: 400; font-size: 12px; fill: #94a3b8; }
      .badge-text { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-weight: 600; font-size: 11px; fill: #86efac; }
    </style>
  </defs>

  <rect x="1" y="1" width="458" height="118" rx="14" fill="url(#bgGrad)" stroke="url(#borderGrad)" stroke-width="1.5"/>

  <!-- Work Icon -->
  <g transform="translate(24, 22)">
    <circle cx="36" cy="36" r="32" fill="#0c2d48" stroke="#0284c7" stroke-width="1.5"/>
    <text x="36" y="45" font-size="28" text-anchor="middle" class="work-icon">👨‍💻</text>
  </g>

  <!-- Info -->
  <g transform="translate(108, 20)">
    <rect x="0" y="0" width="128" height="22" rx="11" fill="#052e16" stroke="#166534" stroke-width="1"/>
    <circle cx="10" cy="11" r="4.5" fill="#22c55e" class="pulse-ring"/>
    <circle cx="10" cy="11" r="3.5" fill="#4ade80"/>
    <text x="20" y="15" class="badge-text">🟢 WORKING TIME</text>
    <text x="0" y="48" class="text-time">${timeString} <tspan font-size="13" font-weight="400" fill="#64748b">(${tzLabel})</tspan></text>
    <text x="0" y="68" class="text-sub">Online &amp; active · Building &amp; coding <tspan class="cursor-blink" fill="#38bdf8">|</tspan></text>
  </g>
</svg>`;
  return res.status(200).send(workSvg);
}
