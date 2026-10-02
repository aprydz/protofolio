// Theme Toggle (Dark / Light Mode)
const toggle = document.getElementById("themeToggle");

if (toggle) {
    toggle.onclick = () => {
        document.body.classList.toggle("light");
        if (document.body.classList.contains("light")) {
            toggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
        } else {
            toggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
        }
    };
}

// Typing Text Animation
const jobs = [
    "Full Stack Developer",
    "Web Developer",
    "AI Enthusiast",
    "UI Designer"
];

let i = 0;
let j = 0;
let erase = false;
const typing = document.getElementById("typing");

if (typing) {
    setInterval(() => {
        if (!erase) {
            typing.textContent = jobs[i].substring(0, j++);
            if (j > jobs[i].length) {
                erase = true;
            }
        } else {
            typing.textContent = jobs[i].substring(0, j--);
            if (j < 0) {
                erase = false;
                i = (i + 1) % jobs.length;
            }
        }
    }, 90);
}

// Page Loader
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

// Scroll Progress Bar
window.addEventListener("scroll", () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progressBar = document.getElementById("progress-bar");
    if (progressBar && height > 0) {
        progressBar.style.width = (winScroll / height) * 100 + "%";
    }
});

// Reveal On Scroll Animation
const reveals = document.querySelectorAll(".reveal");
const revealTitles = document.querySelectorAll(".reveal-title");
const timelineItems = document.querySelectorAll(".timeline-item");

const revealTimelineItems = () => {
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
};

window.addEventListener("scroll", () => {
    reveals.forEach((item) => {
        const top = item.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
            item.classList.add("active");
        }
    });
    revealTimelineItems();
});

window.addEventListener("load", revealTimelineItems);
revealTimelineItems();

// Counter Animation for Stats
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

// Cursor Glow Effect
const glow = document.querySelector(".cursor-glow");

if (glow) {
    document.addEventListener("mousemove", (e) => {
        glow.style.left = e.clientX + "px";
        glow.style.top = e.clientY + "px";
    });
}

// Active Nav Link on Scroll
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-menu a");

window.addEventListener("scroll", () => {
    let current = "";
    const scrollPos = window.scrollY || window.pageYOffset;

    sections.forEach((section) => {
        const top = section.offsetTop - 150;
        if (scrollPos >= top) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

// Back To Top Button
const topBtn = document.getElementById("topBtn");

if (topBtn) {
    window.addEventListener("scroll", () => {
        topBtn.style.display = window.scrollY > 400 ? "block" : "none";
    });

    topBtn.onclick = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };
}

// Skill Percentage Click Interaction
const techCards = document.querySelectorAll(".tech");

techCards.forEach((card) => {
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-expanded", "false");

    const toggleSkill = () => {
        const isActive = card.classList.contains("active");
        const progressBar = card.querySelector(".skill-progress");
        const percentText = card.querySelector(".skill-percent-text");
        const targetPercent = parseInt(card.getAttribute("data-percent")) || 50;

        if (!isActive) {
            card.classList.add("active");
            card.setAttribute("aria-expanded", "true");

            // Animate progress bar fill
            setTimeout(() => {
                if (progressBar) {
                    progressBar.style.width = targetPercent + "%";
                }
            }, 50);

            // Smooth number count-up animation
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
            if (progressBar) {
                progressBar.style.width = "0%";
            }
            if (percentText) {
                percentText.textContent = "0%";
            }
        }
    };

    card.addEventListener("click", toggleSkill);

    // Keyboard navigation (Enter / Space)
    card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleSkill();
        }
    });
});

// Contact Form Submission (FormSubmit AJAX)
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const submitBtn = document.getElementById("submitBtn");

if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const submitBtnText = submitBtn ? submitBtn.querySelector("span") : null;
        const submitBtnIcon = submitBtn ? submitBtn.querySelector("i") : null;
        const originalText = submitBtnText ? submitBtnText.textContent : "Kirim Pesan";

        // Ubah tampilan tombol saat proses pengiriman
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
                headers: {
                    'Accept': 'application/json'
                },
                body: formData
            });

            if (response.ok) {
                if (formStatus) {
                    formStatus.textContent = "✅ Pesan berhasil dikirim ke apridzfirmansyah@gmail.com! Terima kasih telah menghubungi.";
                    formStatus.className = "form-status success";
                }
                contactForm.reset();
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