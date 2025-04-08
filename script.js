// AOS
AOS.init();

// 커스텀 시계
function updateClock() {
    const now = new Date();
    const hours = now.getHours() % 12 || 12;
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ampm = now.getHours() >= 12 ? 'PM' : 'AM';

    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
    document.getElementById('ampm').textContent = ampm;
}
updateClock();
setInterval(updateClock, 1000);

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

// 시간 명언 표시
const timeQuotesContainer = document.getElementById('time-quotes');
timeQuotes.forEach((quote, index) => {
    const quoteItem = document.createElement('div');
    quoteItem.classList.add('quote-item');
    quoteItem.textContent = quote;
    quoteItem.style.animationDelay = `${index * 5}s`;
    timeQuotesContainer.appendChild(quoteItem);
});

// 오늘의 명언 (ZenQuotes API)
function loadTodayQuote() {
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem('quoteDate');
    const storedQuote = localStorage.getItem('todayQuote');
    const storedAuthor = localStorage.getItem('todayAuthor');

    if (storedDate === today && storedQuote && storedAuthor) {
        document.getElementById('today-quote').textContent = `"${storedQuote}"`;
        document.getElementById('today-author').textContent = `— ${storedAuthor}`;
        return;
    }

    fetch('https://zenquotes.io/api/today')
        .then(response => response.json())
        .then(data => {
            const quote = data[0].q;
            const author = data[0].a;
            document.getElementById('today-quote').textContent = `"${quote}"`;
            document.getElementById('today-author').textContent = `— ${author}`;
            localStorage.setItem('quoteDate', today);
            localStorage.setItem('todayQuote', quote);
            localStorage.setItem('todayAuthor', author);
        })
        .catch(error => {
            document.getElementById('today-quote').textContent = 'Failed to load quote.';
            console.error(error);
        });
}
loadTodayQuote();

// 랜덤 명언
let randomCount = 0;
const maxFreeQuotes = 5;

document.getElementById('random-quote-btn').addEventListener('click', () => {
    if (randomCount >= maxFreeQuotes) {
        document.getElementById('random-limit-message').classList.remove('hidden');
        return;
    }

    randomCount++;
    document.getElementById('random-limit-message').classList.add('hidden');
    document.getElementById('random-quote-box').classList.remove('hidden');

    fetch('https://zenquotes.io/api/random')
        .then(response => response.json())
        .then(data => {
            const quote = data[0].q;
            const author = data[0].a;
            document.getElementById('random-quote').textContent = `"${quote}"`;
            document.getElementById('random-author').textContent = `— ${author}`;
            anime({
                targets: '#random-quote, #random-author',
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

// 지난 명언 (하드코딩)
const pastQuotes = [
    "Life is what happens when you're busy making other plans. — John Lennon",
    "The only way to do great work is to love what you do. — Steve Jobs",
    "In the middle of difficulty lies opportunity. — Albert Einstein",
    "Be the change that you wish to see in the world. — Mahatma Gandhi",
    "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment. — Ralph Waldo Emerson",
    "The best way to predict the future is to create it. — Peter Drucker",
    "Success is not final, failure is not fatal: It is the courage to continue that counts. — Winston Churchill",
    "It does not matter how slowly you go as long as you do not stop. — Confucius",
    "The only limit to our realization of tomorrow will be our doubts of today. — Franklin D. Roosevelt",
    "You miss 100% of the shots you don’t take. — Wayne Gretzky",
    "I have not failed. I've just found 10,000 ways that won't work. — Thomas Edison",
    "The greatest glory in living lies not in never falling, but in rising every time we fall. — Nelson Mandela",
    "Do what you can, with what you have, where you are. — Theodore Roosevelt",
    "Everything you’ve ever wanted is on the other side of fear. — George Addair",
    "It is never too late to be what you might have been. — George Eliot",
    "What we think, we become. — Buddha",
    "Happiness is not something ready-made. It comes from your own actions. — Dalai Lama",
    "The journey of a thousand miles begins with one step. — Lao Tzu",
    "You must be the change you wish to see in the world. — Mahatma Gandhi",
    "Life is either a daring adventure or nothing at all. — Helen Keller"
];

const pastQuotesContainer = document.getElementById('past-quotes');
pastQuotes.forEach(quote => {
    const quoteCard = document.createElement('div');
    quoteCard.classList.add('bg-gray-200', 'text-gray-800', 'font-semibold', 'py-4', 'px-6', 'rounded-lg');
    quoteCard.textContent = quote;
    pastQuotesContainer.appendChild(quoteCard);
});

// 테마 변경
document.getElementById('theme-select').addEventListener('change', (e) => {
    document.body.className = `min-h-screen text-gray-800 ${e.target.value}`;
});

// EmailJS
emailjs.init("your-emailjs-user-id");

document.getElementById('feedback-form').addEventListener('submit', (e) => {
    e.preventDefault();
    emailjs.sendForm('your-service-id', 'your-template-id', e.target)
        .then(() => alert('Feedback sent successfully!'))
        .catch(error => alert('Failed to send feedback. Please try again.'));
});