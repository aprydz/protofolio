/**
 * Portfolio JavaScript - Apriyadi Firmansyah
 * Unified & Optimized Script
 *
 * Modules:
 * 1. Web Audio API Sound Effects Synthesizer & Toast Notification
 * 2. Theme Toggle (Dark / Light Mode)
 * 3. Hero Typing Text Animation
 * 4. Page Loader & Scroll Progress Bar
 * 5. Reveal on Scroll Animation
 * 6. Stats Counter Animation
 * 7. Cursor Glow Effect & Back to Top Button
 * 8. Certificate Gallery Dialog Modal
 * 9. Interactive Neural Network Particles Canvas
 * 10. 3D Card Tilt & Dynamic Spotlight Hover
 * 11. Interactive Hero Mini Terminal ("AF Console")
 * 12. Command Palette (Ctrl + K / Cmd + K)
 * 13. ApriBot AI Virtual Assistant
 * 14. Project Category Filters & Device Mockup Preview Modal
 * 15. Skill Percentage & Project Highlighting Interaction
 * 16. Contact Form Submission (FormSubmit AJAX + Confetti & SFX)
 * 17. Easter Eggs (Konami Code & 5x Logo Click)
 */

(function () {
    "use strict";

    /* ==========================================================================
       1. Web Audio API Sound Effects Synthesizer & Toast System
       ========================================================================== */
    class SoundEngine {
        constructor() {
            this.ctx = null;
            this.enabled = localStorage.getItem("portfolio_sfx") !== "disabled";
        }

        initContext() {
            if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
                const AudioCtx = window.AudioContext || window.webkitAudioContext;
                this.ctx = new AudioCtx();
            }
            if (this.ctx && this.ctx.state === "suspended") {
                this.ctx.resume();
            }
        }

        toggle() {
            this.enabled = !this.enabled;
            localStorage.setItem("portfolio_sfx", this.enabled ? "enabled" : "disabled");
            if (this.enabled) {
                this.initContext();
                this.playChime();
            }
            return this.enabled;
        }

        playClick() {
            if (!this.enabled) return;
            try {
                this.initContext();
                if (!this.ctx) return;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = "sine";
                osc.frequency.setValueAtTime(600, this.ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.04);
                gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start();
                osc.stop(this.ctx.currentTime + 0.04);
            } catch (e) { }
        }

        playPop() {
            if (!this.enabled) return;
            try {
                this.initContext();
                if (!this.ctx) return;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = "triangle";
                osc.frequency.setValueAtTime(450, this.ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.06);
                gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.06);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start();
                osc.stop(this.ctx.currentTime + 0.06);
            } catch (e) { }
        }

        playChime() {
            if (!this.enabled) return;
            try {
                this.initContext();
                if (!this.ctx) return;
                const now = this.ctx.currentTime;
                const notes = [523.25, 659.25, 783.99, 1046.50];
                notes.forEach((freq, idx) => {
                    const osc = this.ctx.createOscillator();
                    const gain = this.ctx.createGain();
                    osc.type = "sine";
                    osc.frequency.setValueAtTime(freq, now + idx * 0.07);
                    gain.gain.setValueAtTime(0.08, now + idx * 0.07);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.35);
                    osc.connect(gain);
                    gain.connect(this.ctx.destination);
                    osc.start(now + idx * 0.07);
                    osc.stop(now + idx * 0.07 + 0.35);
                });
            } catch (e) { }
        }

        playSuccess() {
            if (!this.enabled) return;
            try {
                this.initContext();
                if (!this.ctx) return;
                const now = this.ctx.currentTime;
                const notes = [440, 554.37, 659.25, 880];
                notes.forEach((freq, idx) => {
                    const osc = this.ctx.createOscillator();
                    const gain = this.ctx.createGain();
                    osc.type = "sine";
                    osc.frequency.setValueAtTime(freq, now + idx * 0.08);
                    gain.gain.setValueAtTime(0.12, now + idx * 0.08);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.4);
                    osc.connect(gain);
                    gain.connect(this.ctx.destination);
                    osc.start(now + idx * 0.08);
                    osc.stop(now + idx * 0.08 + 0.4);
                });
            } catch (e) { }
        }
    }

    const sound = new SoundEngine();
    window.soundEngine = sound;

    function showToast(message, icon = "fa-circle-info") {
        let container = document.getElementById("toastContainer");
        if (!container) {
            container = document.createElement("div");
            container.id = "toastContainer";
            container.className = "toast-container";
            document.body.appendChild(container);
        }

        const toast = document.createElement("div");
        toast.className = "toast-item";
        toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
        container.appendChild(toast);

        setTimeout(() => {
            toast.classList.add("hide");
            setTimeout(() => toast.remove(), 350);
        }, 3200);
    }
    window.showToast = showToast;

    /* ==========================================================================
       2. Theme Toggle (Dark / Light Mode)
       ========================================================================== */
    const themeToggle = document.getElementById("themeToggle");
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            document.body.classList.toggle("light");
            const isLight = document.body.classList.contains("light");
            themeToggle.innerHTML = isLight
                ? '<i class="fa-solid fa-sun"></i>'
                : '<i class="fa-solid fa-moon"></i>';
            sound.playPop();
        });
    }

    /* ==========================================================================
       3. Hero Typing Text Animation (Cleanly Scoped)
       ========================================================================== */
    const typingEl = document.getElementById("typingText");
    if (typingEl) {
        const jobs = [
            "Full Stack Developer",
            "Web Developer",
            "AI Enthusiast",
            "UI Designer"
        ];
        let jobIdx = 0;
        let charIdx = 0;
        let isErasing = false;

        setInterval(() => {
            if (!isErasing) {
                typingEl.textContent = jobs[jobIdx].substring(0, charIdx++);
                if (charIdx > jobs[jobIdx].length) {
                    isErasing = true;
                }
            } else {
                typingEl.textContent = jobs[jobIdx].substring(0, charIdx--);
                if (charIdx < 0) {
                    isErasing = false;
                    jobIdx = (jobIdx + 1) % jobs.length;
                }
            }
        }, 90);
    }

    /* ==========================================================================
       4. Page Loader & Scroll Progress Bar
       ========================================================================== */
    window.addEventListener("load", () => {
        setTimeout(() => {
            const loader = document.getElementById("loader");
            if (loader) {
                loader.style.opacity = "0";
                setTimeout(() => {
                    loader.style.display = "none";
                }, 800);
            }
        }, 1800);
    });

    window.addEventListener("scroll", () => {
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progressBar = document.getElementById("progress-bar");
        if (progressBar && height > 0) {
            progressBar.style.width = (winScroll / height) * 100 + "%";
        }
    });

    /* ==========================================================================
       5. Reveal on Scroll Animation
       ========================================================================== */
    const reveals = document.querySelectorAll(".reveal");
    const revealTitles = document.querySelectorAll(".reveal-title");
    const timelineItems = document.querySelectorAll(".timeline-item");

    const revealElements = () => {
        timelineItems.forEach((item) => {
            const top = item.getBoundingClientRect().top;
            if (top < window.innerHeight - 70) {
                item.classList.add("active");
            }
        });
        revealTitles.forEach((el) => {
            const top = el.getBoundingClientRect().top;
            if (top < window.innerHeight - 80) {
                el.classList.add("active");
            }
        });
        reveals.forEach((item) => {
            const top = item.getBoundingClientRect().top;
            if (top < window.innerHeight - 100) {
                item.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", revealElements);
    window.addEventListener("load", revealElements);
    revealElements();

    /* ==========================================================================
       6. Stats Counter Animation
       ========================================================================== */
    const counters = document.querySelectorAll(".counter");
    counters.forEach((counter) => {
        const update = () => {
            const target = +counter.dataset.target;
            const current = +counter.innerText.replace("+", "");
            const inc = target / 80;

            if (current < target) {
                counter.innerText = Math.ceil(current + inc);
                setTimeout(update, 20);
            } else {
                counter.innerText = target + "+";
            }
        };
        update();
    });

    /* ==========================================================================
       7. Cursor Glow Effect & Back to Top Button
       ========================================================================== */
    const glow = document.querySelector(".cursor-glow");
    if (glow) {
        document.addEventListener("mousemove", (e) => {
            glow.style.left = e.clientX + "px";
            glow.style.top = e.clientY + "px";
        });
    }

    const topBtn = document.getElementById("topBtn");
    if (topBtn) {
        window.addEventListener("scroll", () => {
            topBtn.style.display = window.scrollY > 400 ? "block" : "none";
        });

        topBtn.addEventListener("click", () => {
            sound.playClick();
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    /* ==========================================================================
       8. Certificate Gallery Dialog Modal
       ========================================================================== */
    const certificateTrigger = document.getElementById("openCertificates");
    const certificateDialog = document.getElementById("certificateDialog");

    if (certificateTrigger && certificateDialog) {
        const certificates = [
            {
                src: "assets/sertif.png",
                alt: "Certificate of Appreciation for participating in I-FEST 8.0",
                caption: "Certificate of Appreciation"
            },
            {
                src: "assets/sertif2.jpeg",
                alt: "Microsoft Office certification",
                caption: "Microsoft Office Certification"
            }
        ];
        const certificateImage = document.getElementById("certificateImage");
        const certificateTitle = document.getElementById("certificateDialogTitle");
        const certificateCaption = document.getElementById("certificateCaption");
        const certificateCount = document.getElementById("certificateCount");
        const certificateDots = certificateDialog.querySelectorAll("[data-certificate-index]");
        const certificateClose = certificateDialog.querySelector(".certificate-close");
        let activeCertificate = 0;

        const renderCertificate = (animate = true) => {
            const cert = certificates[activeCertificate];
            certificateImage.src = cert.src;
            certificateImage.alt = cert.alt;
            certificateTitle.textContent = `Certificate ${activeCertificate + 1} of ${certificates.length}`;
            certificateCaption.textContent = cert.caption;
            certificateCount.textContent = `${activeCertificate + 1} / ${certificates.length}`;

            certificateDots.forEach((dot, index) => {
                dot.setAttribute("aria-pressed", String(index === activeCertificate));
            });

            if (animate) {
                certificateImage.classList.remove("is-visible");
                requestAnimationFrame(() => certificateImage.classList.add("is-visible"));
            }
        };

        const moveCertificate = (step) => {
            activeCertificate = (activeCertificate + step + certificates.length) % certificates.length;
            renderCertificate();
            sound.playPop();
        };

        certificateTrigger.addEventListener("click", () => {
            sound.playChime();
            renderCertificate(false);
            certificateDialog.showModal();
        });

        if (certificateClose) {
            certificateClose.addEventListener("click", () => certificateDialog.close());
        }

        certificateDialog.querySelectorAll("[data-certificate-step]").forEach((button) => {
            button.addEventListener("click", () => {
                moveCertificate(Number(button.dataset.certificateStep));
            });
        });

        certificateDots.forEach((dot, index) => {
            dot.addEventListener("click", () => {
                activeCertificate = index;
                renderCertificate();
                sound.playPop();
            });
        });

        certificateDialog.addEventListener("click", (event) => {
            if (event.target === certificateDialog) certificateDialog.close();
        });

        document.addEventListener("keydown", (event) => {
            if (!certificateDialog.open) return;
            if (event.key === "Escape") {
                event.preventDefault();
                certificateDialog.close();
            } else if (event.key === "ArrowLeft") {
                event.preventDefault();
                moveCertificate(-1);
            } else if (event.key === "ArrowRight") {
                event.preventDefault();
                moveCertificate(1);
            }
        });
    }

    /* ==========================================================================
       8b. Resume / CV PDF Preview Modal System
       ========================================================================== */
    const resumeDialog = document.getElementById("resumeDialog");
    const resumeCloseBtn = document.getElementById("resumeCloseBtn");
    const resumeNavBtn = document.getElementById("resumeNavBtn");
    const heroResumeBtn = document.getElementById("heroResumeBtn");

    const openResumeModal = () => {
        if (!resumeDialog) return;
        sound.playChime();
        resumeDialog.showModal();
        showToast("Menampilkan preview CV Apriyadi...", "fa-file-pdf");
    };
    window.openResumeModal = openResumeModal;

    const closeResumeModal = () => {
        if (!resumeDialog) return;
        sound.playPop();
        resumeDialog.close();
    };
    window.closeResumeModal = closeResumeModal;

    if (resumeNavBtn) {
        resumeNavBtn.addEventListener("click", (e) => {
            e.preventDefault();
            openResumeModal();
        });
    }

    if (heroResumeBtn) {
        heroResumeBtn.addEventListener("click", (e) => {
            e.preventDefault();
            openResumeModal();
        });
    }

    document.querySelectorAll(".open-resume-trigger").forEach((el) => {
        if (el !== resumeNavBtn && el !== heroResumeBtn) {
            el.addEventListener("click", (e) => {
                e.preventDefault();
                openResumeModal();
            });
        }
    });

    if (resumeCloseBtn) {
        resumeCloseBtn.addEventListener("click", () => closeResumeModal());
    }

    if (resumeDialog) {
        resumeDialog.addEventListener("click", (e) => {
            if (e.target === resumeDialog) closeResumeModal();
        });
    }

    /* ==========================================================================
       9. Interactive Neural Network Particles Canvas
       ========================================================================== */
    const canvas = document.getElementById("particlesCanvas");
    if (canvas) {
        const ctx = canvas.getContext("2d");
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const isMobile = window.innerWidth < 768;
        const particleCount = isMobile ? 35 : 75;
        const maxDist = isMobile ? 90 : 130;
        const mouseRadius = 150;

        const mouse = { x: null, y: null };
        window.addEventListener("mousemove", (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        window.addEventListener("mouseleave", () => {
            mouse.x = null;
            mouse.y = null;
        });

        window.addEventListener("resize", () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.8;
                this.vy = (Math.random() - 0.5) * 0.8;
                this.radius = Math.random() * 2 + 1;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;

                if (mouse.x !== null && mouse.y !== null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const dist = Math.hypot(dx, dy);
                    if (dist < mouseRadius) {
                        const force = (mouseRadius - dist) / mouseRadius;
                        const angle = Math.atan2(dy, dx);
                        this.x -= Math.cos(angle) * force * 1.5;
                        this.y -= Math.sin(angle) * force * 1.5;
                    }
                }
            }

            draw() {
                const isLight = document.body.classList.contains("light");
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = isLight ? "rgba(37, 99, 235, 0.45)" : "rgba(56, 189, 248, 0.65)";
                ctx.fill();
            }
        }

        const particles = Array.from({ length: particleCount }, () => new Particle());
        let animationFrameId;

        const animateParticles = () => {
            ctx.clearRect(0, 0, width, height);

            const isLight = document.body.classList.contains("light");
            const lineColor = isLight ? "37, 99, 235" : "56, 189, 248";

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.hypot(dx, dy);

                    if (dist < maxDist) {
                        const alpha = (1 - dist / maxDist) * 0.3;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(${lineColor}, ${alpha})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }

                if (mouse.x !== null && mouse.y !== null) {
                    const dx = particles[i].x - mouse.x;
                    const dy = particles[i].y - mouse.y;
                    const dist = Math.hypot(dx, dy);
                    if (dist < mouseRadius) {
                        const alpha = (1 - dist / mouseRadius) * 0.45;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.strokeStyle = `rgba(${lineColor}, ${alpha})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(animateParticles);
        };

        document.addEventListener("visibilitychange", () => {
            if (document.hidden) {
                cancelAnimationFrame(animationFrameId);
            } else {
                animateParticles();
            }
        });

        animateParticles();
    }

    /* ==========================================================================
       10. 3D Tilt & Dynamic Spotlight Hover
       ========================================================================== */
    const photoCard = document.getElementById("heroPhotoCard");
    if (photoCard) {
        photoCard.addEventListener("mousemove", (e) => {
            const rect = photoCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -12;
            const rotateY = ((x - centerX) / centerX) * 12;

            photoCard.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.03, 1.03, 1.03)`;
            photoCard.style.setProperty("--mouse-x", `${x}px`);
            photoCard.style.setProperty("--mouse-y", `${y}px`);
        });

        photoCard.addEventListener("mouseleave", () => {
            photoCard.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
        });
    }

    const projectCards = document.querySelectorAll(".project-card");
    projectCards.forEach((card) => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
        });
    });

    /* ==========================================================================
       11. Interactive Hero Mini Terminal ("AF Console")
       ========================================================================== */
    const terminalBody = document.getElementById("terminalBody");
    const termOutput = document.getElementById("termOutput");
    const termInput = document.getElementById("terminalInput");
    const termForm = document.getElementById("terminalForm");
    const termClearBtn = document.getElementById("termClearBtn");
    const termCopyBtn = document.getElementById("termCopyBtn");
    const quickChips = document.getElementById("termQuickChips");

    if (terminalBody && termInput && termForm && termOutput) {
        const history = [];
        let historyIndex = -1;

        const commands = {
            help: () => `Perintah yang tersedia:
  • help       : Menampilkan daftar perintah
  • about/bio  : Profil singkat & latar belakang
  • skills     : Ringkasan keahlian teknis
  • projects   : Daftar proyek unggulan & link
  • cv/resume  : Tampilkan isi CV / Resume PDF
  • contact    : Info kontak & sosial media
  • sudo hire  : Rekrut Apriyadi (Fast Track)
  • date       : Waktu & status saat ini
  • theme      : Ganti tema (Dark / Light)
  • clear      : Bersihkan layar terminal`,

            cv: () => {
                openResumeModal();
                return `📄 Menampilkan Curriculum Vitae (CV) / Resume PDF di layar...`;
            },

            resume: () => commands.cv(),

            about: () => `[PROFIL] Apriyadi Firmansyah
• Mahasiswa Informatika Universitas Muhammadiyah Prof. DR. HAMKA (UHAMKA).
• Fokus: Full Stack Web Development & Artificial Intelligence (AI).
• Sedang meneliti kualitas kode buatan manusia vs kode AI.
• Siap untuk kesempatan magang (Internship) & kolaborasi proyek.`,

            bio: () => commands.about(),

            skills: () => `[TECH STACK]
• Frontend : HTML5, CSS3, JavaScript (ES6+), React JS, TypeScript, Tailwind CSS
• Backend  : PHP, Laravel, Node.js, RESTful API
• Database : MySQL
• AI & ML  : Python, Data Analysis, Prompt Engineering
• Tools    : Git, GitHub, VS Code, Railway, Docker, Caddy`,

            projects: () => `[FEATURED PROJECTS]
1. Piscok Shop
   - Deskripsi: Web aplikasi manajemen jual beli snack kekinian.
   - Stack    : JavaScript, TypeScript, Responsive UI
   - Link     : https://piscokshopapi-production-acdd.up.railway.app/

2. Jual Beli Pakaian Online (Market Fashion)
   - Deskripsi: E-commerce web app manajemen pakaian & celana lengkap dengan database.
   - Stack    : PHP, Laravel, MySQL
   - Link     : https://marketfashion-production.up.railway.app/`,

            contact: () => `[KONTAK & SOSIAL MEDIA]
• Email    : apridzfirmansyah@gmail.com
• LinkedIn : https://www.linkedin.com/in/apriyadi-firmansyah-61b79a204/
• GitHub   : https://github.com/aprydz
• Instagram: https://www.instagram.com/dzyy16/
• Lokasi   : Banten, Indonesia`,

            "sudo hire": () => {
                sound.playSuccess();
                if (window.confetti) {
                    window.confetti({ particleCount: 80, spread: 60, origin: { y: 0.7 } });
                }
                return `🚀 [ACCESS GRANTED]: Selamat datang!
Apriyadi saat ini SANGAT TERSEDIA untuk kesempatan Internship / Junior Web Developer.
Silakan kirim tawaran langsung ke: apridzfirmansyah@gmail.com
Pesan telah disalin dan siap dikirim! 🤝`;
            },

            hire: () => commands["sudo hire"](),

            date: () => `Waktu Server: ${new Date().toLocaleString("id-ID")}
Status: Available for Web Dev & AI Internship 🌟`,

            theme: () => {
                const toggle = document.getElementById("themeToggle");
                if (toggle) toggle.click();
                return `Tema berhasil diubah!`;
            },

            matrix: () => {
                runMatrixRain();
                return "Initializing Matrix Digital Rain...";
            },

            clear: () => {
                termOutput.innerHTML = "";
                return "";
            }
        };

        const executeCommand = (rawCmd) => {
            const cmd = rawCmd.trim().toLowerCase();
            if (!cmd) return;

            history.push(rawCmd);
            historyIndex = history.length;
            sound.playClick();

            if (cmd === "clear") {
                commands.clear();
                return;
            }

            const entry = document.createElement("div");
            entry.className = "term-history-entry";

            const cmdSpan = document.createElement("div");
            cmdSpan.className = "term-history-cmd";
            cmdSpan.textContent = `guest@portfolio:~$ ${rawCmd}`;
            entry.appendChild(cmdSpan);

            const outSpan = document.createElement("div");
            outSpan.className = "term-history-output";

            if (commands[cmd]) {
                outSpan.textContent = commands[cmd]();
            } else {
                outSpan.textContent = `Perintah tidak dikenal: '${rawCmd}'. Ketik 'help' untuk daftar perintah.`;
            }

            entry.appendChild(outSpan);
            termOutput.appendChild(entry);
            terminalBody.scrollTop = terminalBody.scrollHeight;
        };

        termForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const val = termInput.value;
            termInput.value = "";
            executeCommand(val);
        });

        if (quickChips) {
            quickChips.addEventListener("click", (e) => {
                const btn = e.target.closest("button");
                if (btn && btn.dataset.cmd) {
                    executeCommand(btn.dataset.cmd);
                }
            });
        }

        termInput.addEventListener("keydown", (e) => {
            if (e.key === "ArrowUp") {
                e.preventDefault();
                if (history.length > 0 && historyIndex > 0) {
                    historyIndex--;
                    termInput.value = history[historyIndex];
                }
            } else if (e.key === "ArrowDown") {
                e.preventDefault();
                if (historyIndex < history.length - 1) {
                    historyIndex++;
                    termInput.value = history[historyIndex];
                } else {
                    historyIndex = history.length;
                    termInput.value = "";
                }
            }
        });

        if (termClearBtn) {
            termClearBtn.addEventListener("click", () => {
                sound.playClick();
                commands.clear();
            });
        }

        if (termCopyBtn) {
            termCopyBtn.addEventListener("click", () => {
                const text = termOutput.innerText || "AF Console";
                navigator.clipboard.writeText(text).then(() => {
                    sound.playPop();
                    showToast("Output terminal berhasil disalin!", "fa-copy");
                });
            });
        }
    }

    /* ==========================================================================
       12. Command Palette (Ctrl + K / Cmd + K)
       ========================================================================== */
    const cmdDialog = document.getElementById("commandPalette");
    const cmdInput = document.getElementById("cmdSearchInput");
    const cmdList = document.getElementById("cmdList");
    const cmdCloseBtn = document.getElementById("cmdCloseBtn");
    const cmdPaletteBtn = document.getElementById("cmdPaletteBtn");

    if (cmdDialog && cmdInput && cmdList) {
        const scrollToSection = (selector) => {
            const target = document.querySelector(selector);
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
                sound.playClick();
            }
        };

        const paletteItems = [
            { title: "Buka Beranda (Home)", desc: "Jump to Hero Section", icon: "fa-house", action: () => scrollToSection("#home") },
            { title: "Tentang Saya (About Me)", desc: "Latar Belakang & Pendidikan", icon: "fa-user", action: () => scrollToSection("#about") },
            { title: "Keahlian (Skills & Tech Stack)", desc: "Teknologi yang dikuasai", icon: "fa-code", action: () => scrollToSection("#skills") },
            { title: "Proyek Unggulan (Projects)", desc: "Portfolio web apps", icon: "fa-laptop-code", action: () => scrollToSection("#projects") },
            { title: "Pengalaman (Experience)", desc: "Timeline perjalanan belajar", icon: "fa-timeline", action: () => scrollToSection("#experience") },
            { title: "Kontak (Contact Me)", desc: "Kirim pesan langsung", icon: "fa-envelope", action: () => scrollToSection("#contact") },
            { title: "Ganti Tema (Dark / Light)", desc: "Switch tampilan mode", icon: "fa-circle-half-stroke", action: () => {
                const t = document.getElementById("themeToggle");
                if (t) t.click();
            }},
            { title: "Lihat CV / Resume (PDF)", desc: "Tampilkan file PDF CV Apriyadi langsung", icon: "fa-file-pdf", action: () => {
                openResumeModal();
            }},
            { title: "Salin Email ke Clipboard", desc: "apridzfirmansyah@gmail.com", icon: "fa-copy", action: () => {
                navigator.clipboard.writeText("apridzfirmansyah@gmail.com").then(() => {
                    sound.playPop();
                    showToast("Email apridzfirmansyah@gmail.com disalin ke clipboard!", "fa-copy");
                });
            }},
            { title: "Tanya ApriBot AI", desc: "Buka Virtual Assistant", icon: "fa-robot", action: () => {
                const trigger = document.getElementById("aiTriggerBtn");
                const chatWin = document.getElementById("aiChatWindow");
                if (chatWin && !chatWin.classList.contains("open") && trigger) {
                    trigger.click();
                }
            }},
            { title: "Lihat Sertifikat", desc: "Modal Galeri Sertifikat", icon: "fa-award", action: () => {
                const btn = document.getElementById("openCertificates");
                if (btn) btn.click();
            }},
            { title: "Toggle Sound Effects", desc: "Nyalakan / Matikan SFX", icon: "fa-volume-high", action: () => {
                const state = sound.toggle();
                showToast(`Sound Effects: ${state ? "AKTIF 🔊" : "NONAKTIF 🔇"}`);
                updateSoundIcon();
            }},
            { title: "Rahasia: Matrix Digital Rain", desc: "Easter Egg visual", icon: "fa-terminal", action: () => runMatrixRain() }
        ];

        let activeIdx = 0;
        let filteredItems = [...paletteItems];

        const renderList = () => {
            cmdList.innerHTML = "";
            if (filteredItems.length === 0) {
                cmdList.innerHTML = `<div style="padding: 20px; text-align: center; color: #94a3b8;">Tidak ada hasil untuk pencarian ini.</div>`;
                return;
            }

            filteredItems.forEach((item, idx) => {
                const el = document.createElement("div");
                el.className = `cmd-palette-item ${idx === activeIdx ? "active" : ""}`;
                el.innerHTML = `
                    <div class="cmd-item-left">
                        <i class="fa-solid ${item.icon}"></i>
                        <div>
                            <div style="font-weight: 500;">${item.title}</div>
                            <div style="font-size: 12px; color: #94a3b8;">${item.desc}</div>
                        </div>
                    </div>
                    <span class="cmd-item-badge">↵ Jump</span>
                `;
                el.addEventListener("click", () => {
                    cmdDialog.close();
                    item.action();
                });
                cmdList.appendChild(el);
            });
        };

        const openPalette = () => {
            sound.playChime();
            cmdInput.value = "";
            filteredItems = [...paletteItems];
            activeIdx = 0;
            renderList();
            cmdDialog.showModal();
            setTimeout(() => cmdInput.focus(), 50);
        };

        if (cmdPaletteBtn) {
            cmdPaletteBtn.addEventListener("click", openPalette);
        }

        if (cmdCloseBtn) {
            cmdCloseBtn.addEventListener("click", () => cmdDialog.close());
        }

        cmdDialog.addEventListener("click", (e) => {
            if (e.target === cmdDialog) cmdDialog.close();
        });

        window.addEventListener("keydown", (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                if (cmdDialog.open) {
                    cmdDialog.close();
                } else {
                    openPalette();
                }
            }
        });

        cmdInput.addEventListener("input", () => {
            const query = cmdInput.value.toLowerCase().trim();
            filteredItems = paletteItems.filter(
                (item) => item.title.toLowerCase().includes(query) || item.desc.toLowerCase().includes(query)
            );
            activeIdx = 0;
            renderList();
        });

        cmdDialog.addEventListener("keydown", (e) => {
            if (e.key === "ArrowDown") {
                e.preventDefault();
                if (filteredItems.length > 0) {
                    activeIdx = (activeIdx + 1) % filteredItems.length;
                    renderList();
                }
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                if (filteredItems.length > 0) {
                    activeIdx = (activeIdx - 1 + filteredItems.length) % filteredItems.length;
                    renderList();
                }
            } else if (e.key === "Enter") {
                e.preventDefault();
                if (filteredItems[activeIdx]) {
                    cmdDialog.close();
                    filteredItems[activeIdx].action();
                }
            }
        });
    }

    /* Sound Button Helper */
    function updateSoundIcon() {
        const soundBtn = document.getElementById("soundToggle");
        if (soundBtn) {
            soundBtn.innerHTML = sound.enabled
                ? '<i class="fa-solid fa-volume-high"></i>'
                : '<i class="fa-solid fa-volume-xmark"></i>';
            soundBtn.title = sound.enabled ? "Sound: ON" : "Sound: MUTED";
        }
    }

    const soundBtn = document.getElementById("soundToggle");
    if (soundBtn) {
        updateSoundIcon();
        soundBtn.addEventListener("click", () => {
            const state = sound.toggle();
            updateSoundIcon();
            showToast(`Sound Effects: ${state ? "AKTIF 🔊" : "NONAKTIF 🔇"}`);
        });
    }

    /* ==========================================================================
       13. ApriBot AI Assistant (Conversational Virtual Bot)
       ========================================================================== */
    const aiTriggerBtn = document.getElementById("aiTriggerBtn");
    const aiChatWindow = document.getElementById("aiChatWindow");
    const aiCloseBtn = document.getElementById("aiCloseBtn");
    const aiResetBtn = document.getElementById("aiResetBtn");
    const aiChatForm = document.getElementById("aiChatForm");
    const aiChatInput = document.getElementById("aiChatInput");
    const aiMessages = document.getElementById("aiChatMessages");
    const aiQuickPills = document.getElementById("aiQuickPills");

    if (aiTriggerBtn && aiChatWindow && aiChatForm && aiMessages) {
        aiTriggerBtn.addEventListener("click", () => {
            const isOpen = aiChatWindow.classList.toggle("open");
            if (isOpen) {
                sound.playChime();
                aiChatInput.focus();
            } else {
                sound.playClick();
            }
        });

        if (aiCloseBtn) {
            aiCloseBtn.addEventListener("click", () => {
                aiChatWindow.classList.remove("open");
                sound.playClick();
            });
        }

        if (aiResetBtn) {
            aiResetBtn.addEventListener("click", () => {
                aiMessages.innerHTML = `
                    <div class="chat-msg bot-msg">
                        <div class="msg-bubble">
                            Halo kembali! 👋 Ada pertanyaan lain seputar skill, project, atau pengalaman Apriyadi?
                        </div>
                    </div>
                `;
                sound.playPop();
            });
        }

        const addMessage = (text, isUser = false) => {
            const msgEl = document.createElement("div");
            msgEl.className = `chat-msg ${isUser ? "user-msg" : "bot-msg"}`;
            msgEl.innerHTML = `<div class="msg-bubble">${text}</div>`;
            aiMessages.appendChild(msgEl);
            aiMessages.scrollTop = aiMessages.scrollHeight;
        };

        const showTypingIndicator = () => {
            const typingEl = document.createElement("div");
            typingEl.className = "chat-msg bot-msg typing-msg";
            typingEl.innerHTML = `
                <div class="msg-bubble">
                    <div class="typing-dots"><span></span><span></span><span></span></div>
                </div>
            `;
            aiMessages.appendChild(typingEl);
            aiMessages.scrollTop = aiMessages.scrollHeight;
            return typingEl;
        };

        const generateBotReply = (prompt) => {
            const p = prompt.toLowerCase();

            if (p.includes("cv") || p.includes("resume") || p.includes("unduh") || p.includes("download cv") || p.includes("curriculum")) {
                return `📄 <strong>Curriculum Vitae (CV) / Resume Apriyadi Firmansyah:</strong><br>
Anda dapat melihat langsung isi CV dalam format PDF tanpa perlu mengunduhnya:<br>
<div style="margin-top:10px; display:flex; flex-wrap:wrap; gap:8px;">
    <button type="button" class="chat-resume-btn" onclick="window.openResumeModal &amp;&amp; window.openResumeModal()" style="display:inline-flex; align-items:center; gap:6px; padding:7px 14px; background:linear-gradient(135deg, #0ea5e9, #38bdf8); color:#ffffff; border:none; border-radius:6px; font-weight:600; cursor:pointer; font-size:13px; font-family:inherit;"><i class="fa-solid fa-file-pdf"></i> Tampilkan CV (PDF)</button>
    <a href="assets/CV_Apriyadi_Firmansyah.pdf" target="_blank" rel="noopener noreferrer" style="display:inline-flex; align-items:center; gap:6px; padding:6px 12px; background:rgba(255,255,255,0.08); color:inherit; border:1px solid rgba(255,255,255,0.2); border-radius:6px; font-weight:500; text-decoration:none; font-size:13px;"><i class="fa-solid fa-arrow-up-right-from-square"></i> Buka di Tab Baru</a>
</div>`;
            }

            if (p.includes("tech") || p.includes("skill") || p.includes("keahlian") || p.includes("bahasa") || p.includes("stack")) {
                return `💻 <strong>Tech Stack Utama Apriyadi:</strong><br>
• <strong>Frontend:</strong> HTML5, CSS3, JavaScript, React JS, TypeScript, Tailwind CSS.<br>
• <strong>Backend:</strong> PHP, Laravel, Node.js (REST API).<br>
• <strong>Database:</strong> MySQL.<br>
• <strong>AI & Data:</strong> Python, Analisis Kualitas Kode AI vs Manusia.<br>
• <strong>Tools:</strong> Git, GitHub, Docker, Railway.`;
            }

            if (p.includes("project") || p.includes("proyek") || p.includes("piscok") || p.includes("fashion") || p.includes("portofolio")) {
                return `🚀 <strong>Featured Projects Apriyadi:</strong><br>
1. <strong>Piscok Shop:</strong> Web application jual beli snack berbasis JavaScript & TypeScript yang responsif.<br>
2. <strong>Jual Beli Pakaian Online:</strong> Web e-commerce fashion berbasis Laravel & MySQL.<br><br>
Kamu bisa mencoba fitur <em>Quick Preview</em> di bagian Projects untuk melihat tampilan langsungnya!`;
            }

            if (p.includes("pendidikan") || p.includes("kuliah") || p.includes("uhamka") || p.includes("background") || p.includes("profil") || p.includes("siapa")) {
                return `🎓 <strong>Latar Belakang Apriyadi:</strong><br>
Apriyadi Firmansyah adalah mahasiswa Teknik Informatika di <strong>Universitas Muhammadiyah Prof. DR. HAMKA (UHAMKA)</strong> (Angkatan 2022).<br>
Ia aktif mendalami Web Development dan riset Artificial Intelligence.`;
            }

            if (p.includes("magang") || p.includes("internship") || p.includes("kerja") || p.includes("hire") || p.includes("tersedia") || p.includes("available")) {
                return `✨ <strong>Status Ketersediaan:</strong><br>
Ya, Apriyadi <strong>sangat terbuka untuk kesempatan Internship / Magang</strong> sebagai Full Stack Web Developer atau AI Developer.<br>
Silakan hubungi melalui email: <a href="mailto:apridzfirmansyah@gmail.com" style="color:#38bdf8; text-decoration:underline;">apridzfirmansyah@gmail.com</a>.`;
            }

            if (p.includes("kontak") || p.includes("email") || p.includes("hubungi") || p.includes("wa") || p.includes("linkedin")) {
                return `📬 <strong>Kontak Apriyadi:</strong><br>
• Email: apridzfirmansyah@gmail.com<br>
• LinkedIn: linkedin.com/in/apriyadi-firmansyah-61b79a204<br>
• GitHub: github.com/aprydz<br>
• Lokasi: Banten, Indonesia.`;
            }

            if (p.includes("sertifikat") || p.includes("certificate")) {
                return `🏆 Apriyadi memiliki sertifikasi resmi, termasuk Certificate of Appreciation I-FEST 8.0 dan Sertifikasi Microsoft Office. Kamu bisa klik counter sertifikat di bagian About untuk membukanya!`;
            }

            if (p.includes("halo") || p.includes("hai") || p.includes("p") || p.includes("hello")) {
                return `Halo! 👋 Ada yang bisa saya bantu jelaskan tentang Apriyadi? Coba tanyakan seputar skill, project, atau status internship!`;
            }

            return `Terima kasih pertanyaannya! Apriyadi adalah pengembang web & peminat AI yang berfokus membangun solusi digital modern. Ingin tahu lebih detail mengenai <strong>Tech Stack</strong>, <strong>Project</strong>, atau <strong>Kontak Langsung</strong>?`;
        };

        const handleSend = (text) => {
            if (!text.trim()) return;

            addMessage(text, true);
            sound.playClick();

            const typingIndicator = showTypingIndicator();

            setTimeout(() => {
                typingIndicator.remove();
                const reply = generateBotReply(text);
                addMessage(reply, false);
                sound.playPop();
            }, 600 + Math.random() * 400);
        };

        aiChatForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const val = aiChatInput.value;
            aiChatInput.value = "";
            handleSend(val);
        });

        if (aiQuickPills) {
            aiQuickPills.addEventListener("click", (e) => {
                const btn = e.target.closest("button");
                if (btn && btn.dataset.aiAsk) {
                    handleSend(btn.dataset.aiAsk);
                }
            });
        }
    }

    /* ==========================================================================
       14. Project Category Filters & Device Mockup Preview Modal
       ========================================================================== */
    const filterBtns = document.querySelectorAll(".filter-btn");
    const projCards = document.querySelectorAll(".project-card");
    const previewDialog = document.getElementById("projectPreviewDialog");

    filterBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            filterBtns.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
            sound.playClick();

            const filter = btn.dataset.filter;
            projCards.forEach((card) => {
                const categories = (card.dataset.category || "").split(" ");
                if (filter === "all" || categories.includes(filter)) {
                    card.style.display = "block";
                    card.style.animation = "fadeIn 0.4s ease forwards";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    if (previewDialog) {
        const projectsData = {
            piscok: {
                title: "Piscok Shop - Online Snack Store",
                desc: "Aplikasi web interaktif untuk pengelolaan dan transaksi jual beli snack kekinian. Dibangun dengan fokus pada kecepatan antarmuka, mobile-first responsive design, dan manipulasi data dinamis.",
                img: "assets/project.png",
                tags: ["JavaScript", "TypeScript", "Responsive UI", "REST API", "Railway"],
                link: "https://piscokshopapi-production-acdd.up.railway.app/"
            },
            marketfashion: {
                title: "Jual Beli Pakaian Online (Market Fashion)",
                desc: "Sistem aplikasi web e-commerce komprehensif untuk katalog, manajemen stok, dan transaksi pakaian online dengan integrasi database terstruktur.",
                img: "assets/project1.png",
                tags: ["PHP", "Laravel", "MySQL", "Authentication", "Cloud Deploy"],
                link: "https://marketfashion-production.up.railway.app/"
            }
        };

        const modalTitle = document.getElementById("previewModalTitle");
        const modalImg = document.getElementById("previewModalImg");
        const modalDesc = document.getElementById("previewModalDesc");
        const modalTags = document.getElementById("previewModalTags");
        const modalLiveLink = document.getElementById("previewModalLiveLink");
        const deviceFrame = document.getElementById("previewDeviceFrame");
        const deviceBtns = document.querySelectorAll(".device-btn");
        const closeBtn = document.getElementById("previewCloseBtn");

        document.querySelectorAll(".quick-preview-btn").forEach((btn) => {
            btn.addEventListener("click", () => {
                const key = btn.dataset.project;
                const data = projectsData[key];
                if (!data) return;

                sound.playChime();

                if (modalTitle) modalTitle.textContent = data.title;
                if (modalImg) {
                    modalImg.src = data.img;
                    modalImg.alt = data.title;
                }
                if (modalDesc) modalDesc.textContent = data.desc;
                if (modalLiveLink) modalLiveLink.href = data.link;

                if (modalTags) {
                    modalTags.innerHTML = data.tags.map((t) => `<span>${t}</span>`).join("");
                }

                if (deviceFrame) {
                    deviceFrame.classList.remove("mobile-view");
                }
                deviceBtns.forEach((b) => b.classList.toggle("active", b.dataset.device === "desktop"));

                previewDialog.showModal();
            });
        });

        deviceBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
                deviceBtns.forEach((b) => b.classList.remove("active"));
                btn.classList.add("active");
                sound.playPop();

                if (deviceFrame) {
                    if (btn.dataset.device === "mobile") {
                        deviceFrame.classList.add("mobile-view");
                    } else {
                        deviceFrame.classList.remove("mobile-view");
                    }
                }
            });
        });

        if (closeBtn) {
            closeBtn.addEventListener("click", () => previewDialog.close());
        }

        previewDialog.addEventListener("click", (e) => {
            if (e.target === previewDialog) previewDialog.close();
        });
    }

    /* ==========================================================================
       15. Skill Percentage & Project Highlighting Interaction
       ========================================================================== */
    const techCards = document.querySelectorAll(".tech");
    const skillToProjectMap = {
        html: ["piscok", "marketfashion"],
        css: ["piscok", "marketfashion"],
        javascript: ["piscok"],
        react: ["piscok"],
        php: ["marketfashion"],
        laravel: ["marketfashion"],
        mysql: ["marketfashion"],
        git: ["piscok", "marketfashion"],
        typescript: ["piscok"],
        node: ["piscok"],
        tailwind: ["piscok"]
    };

    techCards.forEach((card) => {
        card.setAttribute("role", "button");
        card.setAttribute("tabindex", "0");
        card.setAttribute("aria-expanded", "false");

        const toggleSkill = () => {
            sound.playPop();
            const isActive = card.classList.contains("active");
            const progressBar = card.querySelector(".skill-progress");
            const percentText = card.querySelector(".skill-percent-text");
            const targetPercent = parseInt(card.getAttribute("data-percent")) || 50;

            if (!isActive) {
                card.classList.add("active");
                card.setAttribute("aria-expanded", "true");

                setTimeout(() => {
                    if (progressBar) progressBar.style.width = targetPercent + "%";
                }, 50);

                if (percentText) {
                    let current = 0;
                    const duration = 500;
                    const stepTime = 16;
                    const totalSteps = duration / stepTime;
                    const increment = targetPercent / totalSteps;

                    clearInterval(card._counterInterval);
                    card._counterInterval = setInterval(() => {
                        current += increment;
                        if (current >= targetPercent) {
                            current = targetPercent;
                            clearInterval(card._counterInterval);
                        }
                        percentText.textContent = Math.round(current) + "%";
                    }, stepTime);
                }
            } else {
                card.classList.remove("active");
                card.setAttribute("aria-expanded", "false");

                clearInterval(card._counterInterval);
                if (progressBar) progressBar.style.width = "0%";
                if (percentText) percentText.textContent = "0%";
            }

            // Also highlight matching projects
            const title = card.querySelector("h4")?.textContent?.toLowerCase().trim() || "";
            let matchFound = false;

            Object.keys(skillToProjectMap).forEach((key) => {
                if (title.includes(key)) {
                    const targetProjects = skillToProjectMap[key];
                    projCards.forEach((pCard) => {
                        const pKey = pCard.dataset.projectKey;
                        if (targetProjects.includes(pKey)) {
                            matchFound = true;
                            pCard.classList.remove("highlighted");
                            void pCard.offsetWidth;
                            pCard.classList.add("highlighted");
                            setTimeout(() => pCard.classList.remove("highlighted"), 3200);
                        }
                    });
                }
            });

            if (matchFound) {
                showToast(`Menampilkan project yang menggunakan ${card.querySelector("h4").textContent}!`, "fa-lightbulb");
            }
        };

        card.addEventListener("click", toggleSkill);
        card.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleSkill();
            }
        });
    });

    /* ==========================================================================
       16. Contact Form Submission (FormSubmit AJAX + Confetti & SFX)
       ========================================================================== */
    const contactForm = document.getElementById("contactForm");
    const formStatus = document.getElementById("formStatus");
    const submitBtn = document.getElementById("submitBtn");

    const triggerConfetti = () => {
        sound.playSuccess();
        if (window.confetti) {
            window.confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
            setTimeout(() => {
                window.confetti({ particleCount: 60, angle: 60, spread: 55, origin: { x: 0 } });
                window.confetti({ particleCount: 60, angle: 120, spread: 55, origin: { x: 1 } });
            }, 300);
        }
    };
    window.triggerConfetti = triggerConfetti;

    if (contactForm) {
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const submitBtnText = submitBtn ? submitBtn.querySelector("span") : null;
            const submitBtnIcon = submitBtn ? submitBtn.querySelector("i") : null;
            const originalText = submitBtnText ? submitBtnText.textContent : "Kirim Pesan";

            if (submitBtnText) submitBtnText.textContent = "Mengirim...";
            if (submitBtnIcon) submitBtnIcon.className = "fa-solid fa-spinner fa-spin";
            if (submitBtn) submitBtn.disabled = true;

            if (formStatus) {
                formStatus.className = "form-status";
                formStatus.style.display = "none";
            }

            const formData = new FormData(contactForm);

            try {
                const response = await fetch("https://formsubmit.co/ajax/apridzfirmansyah@gmail.com", {
                    method: "POST",
                    headers: { 'Accept': 'application/json' },
                    body: formData
                });

                if (response.ok) {
                    if (formStatus) {
                        formStatus.textContent = "✅ Pesan berhasil dikirim ke apridzfirmansyah@gmail.com! Terima kasih telah menghubungi.";
                        formStatus.className = "form-status success";
                    }
                    contactForm.reset();
                    triggerConfetti();
                } else {
                    throw new Error("Gagal mengirim pesan");
                }
            } catch (error) {
                if (formStatus) {
                    formStatus.textContent = "❌ Maaf, pengiriman otomatis gagal. Silakan hubungi langsung ke apridzfirmansyah@gmail.com.";
                    formStatus.className = "form-status error";
                }
            } finally {
                if (submitBtnText) submitBtnText.textContent = originalText;
                if (submitBtnIcon) submitBtnIcon.className = "fa-solid fa-paper-plane";
                if (submitBtn) submitBtn.disabled = false;
            }
        });
    }

    /* ==========================================================================
       17. Easter Eggs (Konami Code & 5x Logo Click)
       ========================================================================== */
    function runMatrixRain() {
        let matrixCanvas = document.getElementById("matrixCanvas");
        if (!matrixCanvas) {
            matrixCanvas = document.createElement("canvas");
            matrixCanvas.id = "matrixCanvas";
            document.body.appendChild(matrixCanvas);
        }

        matrixCanvas.style.display = "block";
        const ctx = matrixCanvas.getContext("2d");
        matrixCanvas.width = window.innerWidth;
        matrixCanvas.height = window.innerHeight;

        const letters = "01APRIYADI0101CODEAI</>";
        const fontSize = 16;
        const columns = Math.floor(matrixCanvas.width / fontSize);
        const drops = Array(columns).fill(1);

        sound.playChime();
        showToast("Matrix Digital Rain Activated! Tekan Esc untuk keluar.", "fa-terminal");

        const matrixInterval = setInterval(() => {
            ctx.fillStyle = "rgba(0, 0, 0, 0.06)";
            ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

            ctx.fillStyle = "#00ff66";
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = letters.charAt(Math.floor(Math.random() * letters.length));
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }, 33);

        const stopMatrix = (e) => {
            if (e.key === "Escape" || e.type === "click") {
                clearInterval(matrixInterval);
                matrixCanvas.style.display = "none";
                window.removeEventListener("keydown", stopMatrix);
                matrixCanvas.removeEventListener("click", stopMatrix);
            }
        };

        window.addEventListener("keydown", stopMatrix);
        matrixCanvas.addEventListener("click", stopMatrix);

        setTimeout(() => {
            clearInterval(matrixInterval);
            matrixCanvas.style.display = "none";
        }, 12000);
    }
    window.runMatrixRain = runMatrixRain;

    // Konami Sequence: ↑ ↑ ↓ ↓ ← → ← → B A
    const konamiSequence = [
        "ArrowUp", "ArrowUp",
        "ArrowDown", "ArrowDown",
        "ArrowLeft", "ArrowRight",
        "ArrowLeft", "ArrowRight",
        "b", "a"
    ];
    let konamiIndex = 0;

    window.addEventListener("keydown", (e) => {
        if (e.key.toLowerCase() === konamiSequence[konamiIndex].toLowerCase()) {
            konamiIndex++;
            if (konamiIndex === konamiSequence.length) {
                konamiIndex = 0;
                runMatrixRain();
            }
        } else {
            konamiIndex = 0;
        }
    });

    // 5x Logo Click Easter Egg
    const logo = document.querySelector(".logo");
    if (logo) {
        let clickCount = 0;
        let logoTimer = null;
        logo.addEventListener("click", (e) => {
            e.preventDefault();
            clickCount++;
            clearTimeout(logoTimer);
            if (clickCount >= 5) {
                clickCount = 0;
                triggerConfetti();
                showToast("🎉 You found the Secret Developer Easter Egg!", "fa-wand-magic-sparkles");
            } else {
                logoTimer = setTimeout(() => { clickCount = 0; }, 1500);
            }
        });
    }

})();