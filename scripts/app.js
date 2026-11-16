/**
 * INTERACTIVE APPLICATION CONTROLLER — AMAN & ISHU ENGAGEMENT SUITE
 * Controls the 3D Linen Envelope & 24K Gold Wax Seal reveal, sunlit jasmine
 * blossom & gold-mote canvas, royal jharokha tilt sheen, live countdown to
 * 30 Nov 2026 11:00 AM IST, .ics calendar export, and Google Maps link copy.
 */
(function () {
  const cfg = window.ENGAGEMENT_CONFIG || {};

  /* ------------------------------------------------------------------------
     1. SUNLIT JASMINE BLOSSOMS & 24K GOLD LEAF MOTES CANVAS
     ------------------------------------------------------------------------ */
  const canvas = document.getElementById("jasmine-canvas");
  const ctx = canvas ? canvas.getContext("2d") : null;
  const particles = [];
  let sealBurstTriggered = false;

  function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticle(isBurst = false) {
    const w = window.innerWidth || 1024;
    const h = window.innerHeight || 768;
    const roll = Math.random();
    const kind = roll < 0.42 ? "gold" : roll < 0.78 ? "jasmine" : "hydrangea";

    return {
      x: isBurst ? w * 0.5 + (Math.random() - 0.5) * 190 : Math.random() * w,
      y: isBurst ? h * 0.48 + (Math.random() - 0.5) * 100 : -24 - Math.random() * h,
      vx: isBurst ? (Math.random() - 0.5) * 3.8 : (Math.random() - 0.5) * 0.45,
      vy: isBurst ? -2.2 - Math.random() * 2.5 : 0.38 + Math.random() * 0.65,
      gravity: isBurst ? 0.058 : 0,
      size: kind === "gold" ? 1.8 + Math.random() * 2.3 : 5.5 + Math.random() * 5.5,
      rot: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 0.022,
      alpha: kind === "gold" ? 0.48 + Math.random() * 0.36 : 0.34 + Math.random() * 0.3,
      kind
    };
  }

  function initParticles() {
    if (!ctx) return;
    resizeCanvas();
    const count = window.innerWidth < 640 ? 18 : 28;
    for (let i = 0; i < count; i += 1) {
      const p = createParticle(false);
      p.y = Math.random() * window.innerHeight;
      particles.push(p);
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    function renderFrame() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = particles.length - 1; i >= 0; i -= 1) {
        const p = particles[i];
        p.vy += p.gravity;
        p.x += p.vx + Math.sin(p.y * 0.011) * 0.25;
        p.y += p.vy;
        p.rot += p.vRot;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = p.alpha;

        if (p.kind === "gold") {
          // 4-point sunlit brass star / mote
          ctx.fillStyle = "#C89D46";
          ctx.beginPath();
          const s = p.size;
          ctx.moveTo(0, -s * 1.4);
          ctx.quadraticCurveTo(s * 0.25, -s * 0.25, s * 1.4, 0);
          ctx.quadraticCurveTo(s * 0.25, s * 0.25, 0, s * 1.4);
          ctx.quadraticCurveTo(-s * 0.25, s * 0.25, -s * 1.4, 0);
          ctx.quadraticCurveTo(-s * 0.25, -s * 0.25, 0, -s * 1.4);
          ctx.fill();
        } else if (p.kind === "jasmine") {
          // Delicate ivory-cream jasmine petal
          ctx.fillStyle = "#F4EFE2";
          ctx.strokeStyle = "rgba(194, 150, 61, 0.35)";
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.bezierCurveTo(p.size * 0.72, -p.size * 0.35, p.size * 0.62, p.size * 0.65, 0, p.size);
          ctx.bezierCurveTo(-p.size * 0.62, p.size * 0.65, -p.size * 0.72, -p.size * 0.35, 0, -p.size);
          ctx.fill();
          ctx.stroke();
        } else {
          // Soft porcelain-blue hydrangea floret petal
          ctx.fillStyle = "#CADCEB";
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 0.68, p.size * 0.52, 0, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();

        if (p.y > canvas.height + 32) {
          if (p.gravity > 0 && particles.length > 30) {
            particles.splice(i, 1);
          } else {
            p.y = -20;
            p.x = Math.random() * canvas.width;
            p.vy = 0.38 + Math.random() * 0.65;
            p.gravity = 0;
          }
        }
      }
      requestAnimationFrame(renderFrame);
    }

    requestAnimationFrame(renderFrame);
  }

  function triggerSealCelebration() {
    if (!ctx || sealBurstTriggered) return;
    sealBurstTriggered = true;
    for (let i = 0; i < 32; i += 1) {
      particles.push(createParticle(true));
    }
  }

  window.addEventListener("resize", resizeCanvas);
  initParticles();

  /* ------------------------------------------------------------------------
     2. 3D LINEN ENVELOPE & 24K GOLD WAX SEAL GATEKEEPER (#wax-seal-gate)
     ------------------------------------------------------------------------ */
  const gate = document.getElementById("wax-seal-gate");
  const envelopeStage = document.getElementById("envelope-stage");
  const openSealBtn = document.getElementById("break-seal-btn");
  const audioBtn = document.getElementById("audio-toggle-btn");
  const audioLabel = document.getElementById("audio-toggle-label");

  function syncAudioUi(playing) {
    if (!audioBtn || !audioLabel) return;
    audioBtn.classList.toggle("is-playing", Boolean(playing));
    audioBtn.setAttribute("aria-pressed", playing ? "true" : "false");
    audioLabel.textContent = playing ? "Melody On" : "Melody Off";
  }

  function revealAllSections() {
    document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
      el.classList.add("is-visible");
    });
  }

  const params = new URLSearchParams(window.location.search);
  if (params.get("skipGate") === "1" && gate) {
    gate.classList.add("is-gone");
    document.body.classList.remove("gate-locked");
    revealAllSections();
  }

  let envelopeOpened = false;
  function unsealEnvelope() {
    if (envelopeOpened || !gate) return;
    envelopeOpened = true;

    gate.classList.add("is-unsealing");
    triggerSealCelebration();

    if (window.morningAudio) {
      window.morningAudio.playSealBreakChime();
      window.setTimeout(() => {
        window.morningAudio.start();
        syncAudioUi(true);
      }, 420);
    }

    window.setTimeout(() => {
      gate.classList.add("is-fading");
      document.body.classList.remove("gate-locked");
    }, 1550);

    window.setTimeout(() => {
      gate.classList.add("is-gone");
    }, 2450);
  }

  if (envelopeStage) {
    envelopeStage.addEventListener("click", unsealEnvelope);
    envelopeStage.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        unsealEnvelope();
      }
    });
  }

  if (openSealBtn) {
    openSealBtn.addEventListener("click", unsealEnvelope);
  }

  if (audioBtn) {
    audioBtn.addEventListener("click", () => {
      if (!window.morningAudio) return;
      const playing = window.morningAudio.toggle();
      syncAudioUi(playing);
    });
  }

  /* ------------------------------------------------------------------------
     3. SUBTLE INTERACTIVE TILT ON ROYAL JHAROKHA PORTRAIT FRAME
     ------------------------------------------------------------------------ */
  const jharokhaFrame = document.getElementById("jharokha-stage");
  if (jharokhaFrame && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    jharokhaFrame.addEventListener("mousemove", (e) => {
      const rect = jharokhaFrame.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      jharokhaFrame.style.transform = `perspective(1100px) rotateY(${(nx * 5).toFixed(2)}deg) rotateX(${(-ny * 5).toFixed(2)}deg)`;
    });
    jharokhaFrame.addEventListener("mouseleave", () => {
      jharokhaFrame.style.transform = "perspective(1100px) rotateY(0deg) rotateX(0deg)";
    });
  }

  /* ------------------------------------------------------------------------
     4. SCROLL REVEAL OBSERVER
     ------------------------------------------------------------------------ */
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal-on-scroll").forEach((el) => observer.observe(el));
  } else {
    revealAllSections();
  }

  /* ------------------------------------------------------------------------
     5. LIVE HOROLOGY COUNTDOWN TO MONDAY, 30 NOV 2026 · 11:00 AM IST
     ------------------------------------------------------------------------ */
  const targetIso = (cfg.event && cfg.event.isoStart) || "2026-11-30T11:00:00+05:30";
  const targetMs = new Date(targetIso).getTime();

  const elDays = document.getElementById("cd-days");
  const elHours = document.getElementById("cd-hours");
  const elMinutes = document.getElementById("cd-minutes");
  const elSeconds = document.getElementById("cd-seconds");

  function pad2(n) {
    return String(Math.max(0, n)).padStart(2, "0");
  }

  function updateCountdown() {
    if (!elDays || !elHours || !elMinutes || !elSeconds) return;
    const diff = Math.max(0, targetMs - Date.now());
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    elDays.textContent = pad2(days);
    elHours.textContent = pad2(hours);
    elMinutes.textContent = pad2(minutes);
    elSeconds.textContent = pad2(seconds);
  }

  updateCountdown();
  window.setInterval(updateCountdown, 1000);

  /* ------------------------------------------------------------------------
     6. SAVE TO CALENDAR (.ICS) GENERATOR
     ------------------------------------------------------------------------ */
  const calBtn = document.getElementById("add-calendar-btn");
  if (calBtn) {
    calBtn.addEventListener("click", () => {
      const startUtc = (cfg.event && cfg.event.icsStartUtc) || "20261130T053000Z";
      const endUtc = (cfg.event && cfg.event.icsEndUtc) || "20261130T100000Z";
      const mapUrl = (cfg.venue && cfg.venue.mapUrl) || "https://maps.app.goo.gl/xLdzunZ6RtFFszkr5?g_st=aw";
      const siteUrl = (cfg.meta && cfg.meta.websiteUrl) || "https://aman-and-ishu.github.io/";

      const icsLines = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Aman & Ishu//Engagement Ceremony//EN",
        "CALSCALE:GREGORIAN",
        "METHOD:PUBLISH",
        "BEGIN:VEVENT",
        `UID:aman-ishu-engagement-20261130@aman-and-ishu.github.io`,
        `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
        `DTSTART:${startUtc}`,
        `DTEND:${endUtc}`,
        "SUMMARY:Aman & Ishu — Engagement Ceremony",
        `DESCRIPTION:Together with our families (the Singh & Gera families), we cordially invite you to our Engagement Ceremony at Paark Royal, Sector 21D, Faridabad. Google Maps: ${mapUrl} | Invitation: ${siteUrl} | RSVP: Manoj Singh (+91 82879 60420), Raj Singh (+91 85100 25521)`,
        `LOCATION:Paark Royal, G Block, Sanjay Gandhi Memorial Nagar, Sector 21D, Faridabad, Haryana 121012 (${mapUrl})`,
        `URL:${siteUrl}`,
        "STATUS:CONFIRMED",
        "END:VEVENT",
        "END:VCALENDAR"
      ];

      const blob = new Blob([icsLines.join("\r\n")], { type: "text/calendar;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Aman_and_Ishu_Engagement_Ceremony.ics";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1500);
    });
  }

  /* ------------------------------------------------------------------------
     7. COPY GOOGLE MAPS LINK BUTTON
     ------------------------------------------------------------------------ */
  const copyBtn = document.getElementById("copy-venue-link-btn");
  const copyFeedback = document.getElementById("copy-venue-feedback");
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      const mapUrl = (cfg.venue && cfg.venue.mapUrl) || "https://maps.app.goo.gl/xLdzunZ6RtFFszkr5?g_st=aw";
      try {
        await navigator.clipboard.writeText(mapUrl);
        if (copyFeedback) {
          copyFeedback.textContent = "Google Maps venue link copied to clipboard.";
        }
      } catch (_err) {
        if (copyFeedback) {
          copyFeedback.textContent = mapUrl;
        }
      }
    });
  }
})();
