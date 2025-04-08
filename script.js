// Particles.js
particlesJS("particles-js", {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: false },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
        move: { enable: true, speed: 6, direction: "none", random: false }
    },
    interactivity: {
        detect_on: "canvas",
        events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" } },
        modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
    }
});

// AOS
AOS.init();

// Darkmode.js
new Darkmode().showWidget();

// FlipClock.js
const clock = new FlipClock(document.querySelector('.clock'), {
    clockFace: 'TwentyFourHourClock',
    showSeconds: true
});

// 시간 관련 명언 (하드코딩)
const timeQuotes = [
    "Time is what we want most, but what we use worst. — William Penn",
    "Lost time is never found again. — Benjamin Franklin",
    "Time is the most valuable thing a man can spend. — Theophrastus",
    "You may delay, but time will not. — Benjamin Franklin",
    "The life of man is of no greater duration than the breath of his nostrils. — Plato",
    "Time is a created thing. To say 'I don’t have time' is to say 'I don’t want to.' — Lao Tzu",
    "Time flies over us, but leaves its shadow behind. — Nathaniel Hawthorne",
    "We must use time as a tool, not as a couch. — John F. Kennedy",
    "Time is the wisest counselor of all. — Pericles",
    "The future is something which everyone reaches at the rate of sixty minutes an hour. — C.S. Lewis"
];

// Typed.js로 시간 명언 랜덤 재생
function displayTimeQuote() {
    const randomQuote = timeQuotes[Math.floor(Math.random() * timeQuotes.length)];
    const typed = new Typed('#time-quote', {
        strings: [randomQuote],
        typeSpeed: 50,
        backSpeed: 50,
        fadeOut: true,
        loop: false
    });
}
displayTimeQuote();
setInterval(displayTimeQuote, 5000);

// 오늘의 명언
document.getElementById('today-quote-btn').addEventListener('click', () => {
    fetch('https://api.quotable.io/random?maxLength=45')
        .then(response => response.json())
        .then(data => {
            const quoteElement = document.getElementById('today-quote');
            const authorElement = document.getElementById('today-author');
            quoteElement.textContent = `"${data.content}"`;
            authorElement.textContent = `— ${data.author}`;
            anime({
                targets: quoteElement,
                opacity: [0, 1],
                duration: 1000,
                easing: 'easeInOutQuad'
            });
            anime({
                targets: authorElement,
                opacity: [0, 1],
                duration: 1000,
                easing: 'easeInOutQuad'
            });
        })
        .catch(error => {
            document.getElementById('today-quote').textContent = 'Failed to load quote.';
            console.error(error);
        });
});

// 지난 명언 슬라이드
const swiper = new Swiper('.swiper-container', {
    direction: 'vertical',
    loop: true,
    autoplay: {
        delay: 20000,
        disableOnInteraction: false
    },
    slidesPerView: 1,
    spaceBetween: 20
});

for (let i = 0; i < 5; i++) {
    fetch('https://api.quotable.io/random?maxLength=45')
        .then(response => response.json())
        .then(data => {
            const slide = document.createElement('div');
            slide.classList.add('swiper-slide');
            slide.innerHTML = `
                <p class="text-xl">"${data.content}"</p>
                <p class="text-gray-600 italic">— ${data.author}</p>
                <div class="sharethis-inline-share-buttons mt-4"></div>
            `;
            document.getElementById('past-quotes').appendChild(slide);
            swiper.update();
        })
        .catch(error => console.error(error));
}

// 랜덤 명언
let randomCount = 0;
const maxFreeQuotes = 5;
let selectedCategory = 'all';

document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('bg-blue-500', 'text-white'));
        btn.classList.add('bg-blue-500', 'text-white');
        selectedCategory = btn.dataset.category;
    });
});

document.getElementById('random-quote-btn').addEventListener('click', () => {
    if (randomCount >= maxFreeQuotes) {
        document.getElementById('random-limit-message').classList.remove('hidden');
        document.getElementById('unlimited-btn').classList.remove('hidden');
        return;
    }

    randomCount++;
    document.getElementById('random-limit-message').classList.add('hidden');
    document.getElementById('unlimited-btn').classList.add('hidden');
    document.getElementById('random-quote-box').classList.remove('hidden');

    const url = selectedCategory === 'all' ? 'https://api.quotable.io/random?maxLength=45' : `https://api.quotable.io/random?maxLength=45&tags=${selectedCategory}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const quoteElement = document.getElementById('random-quote');
            const authorElement = document.getElementById('random-author');
            quoteElement.textContent = `"${data.content}"`;
            authorElement.textContent = `— ${data.author}`;
            anime({
                targets: quoteElement,
                opacity: [0, 1],
                duration: 1000,
                easing: 'easeInOutQuad'
            });
            anime({
                targets: authorElement,
                opacity: [0, 1],
                duration: 1000,
                easing: 'easeInOutQuad'
            });
        })
        .catch(error => {
            document.getElementById('random-quote').textContent = 'Failed to load quote.';
            console.error(error);
        });
});

// 프리미엄 기능 링크
document.getElementById('save-quote-btn').addEventListener('click', () => {
    window.open('https://gumroad.com/l/premium-access', '_blank');
});

document.getElementById('download-image-btn').addEventListener('click', () => {
    window.open('https://gumroad.com/l/quote-image', '_blank');
});

document.getElementById('unlimited-btn').addEventListener('click', () => {
    window.open('https://gumroad.com/l/premium-access', '_blank');
});

// 테마 변경 (프리미엄)
document.getElementById('theme-select').addEventListener('change', (e) => {
    const value = e.target.value;
    if (value !== 'default') {
        alert('Premium feature! Subscribe for $1.98/mo.');
        window.open('https://gumroad.com/l/premium-access', '_blank');
        e.target.value = 'default';
    }
});

// EmailJS
emailjs.init("your-emailjs-user-id");

document.getElementById('feedback-form').addEventListener('submit', (e) => {
    e.preventDefault();
    emailjs.sendForm('your-service-id', 'your-template-id', e.target)
        .then(() => alert('Feedback sent successfully!'))
        .catch(error => alert('Failed to send feedback. Please try again.'));
});
