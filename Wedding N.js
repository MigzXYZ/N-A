// Existing variables and functions remain

// Initialize Intersection Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});

document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

// Lightbox functionality
document.querySelectorAll('.gallery-grid img').forEach(img => {
  img.addEventListener('click', () => {
    document.getElementById('lightbox-img').src = img.src;
    document.getElementById('lightbox').style.display = 'block';
  });
});

document.querySelector('.close').addEventListener('click', () => {
  document.getElementById('lightbox').style.display = 'none';
});

// RSVP Form Handling
document.getElementById('rsvpForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const attendance = document.getElementById('attendance').value;
  
  alert(isArabic ? 
    `شكراً ${name}! تم تسجيل حضورك بنجاح` : 
    `Thank you ${name}! Your response has been recorded`);
  
  this.reset();
});

// Weather Widget
async function getWeather() {
  try {
    const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=30.05&longitude=31.23&daily=weathercode,temperature_2m_max&timezone=Africa%2FCairo&start_date=2025-04-18&end_date=2025-04-18');
    const data = await response.json();
    const temp = data.daily.temperature_2m_max[0];
    document.getElementById('weather-info').textContent = 
      isArabic ? `درجة الحرارة المتوقعة: ${temp}°C` : `Expected Temperature: ${temp}°C`;
  } catch (error) {
    console.error('Error fetching weather:', error);
    document.getElementById('weather-info').textContent = 
      isArabic ? 'معلومات الطقس غير متوفرة حالياً' : 'Weather information unavailable';
  }
}

// Social Sharing
function shareOnFacebook() {
  const url = encodeURIComponent(window.location.href);
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
}

function shareOnWhatsApp() {
  const text = encodeURIComponent(isArabic ? 
    "دعوة زفاف أحمد ونورهان" : 
    "Wedding invitation for Ahmed & Nourhan");
  window.open(`https://wa.me/?text=${text}%20${window.location.href}`);
}

// Loader
window.addEventListener('load', () => {
  document.querySelector('.loader').style.opacity = '0';
  setTimeout(() => {
    document.querySelector('.loader').style.display = 'none';
  }, 500);
});

// Initialize Floating Animation
document.getElementById('names').classList.add('floating-element');
document.querySelector('.floral-design img').classList.add('floating-element');

// Update content for new elements in language switch
function updateContent() {
  // Existing translations remain
  
  // New translations
  const elements = {
    arabic: {
      // Existing translations...
      rsvpTitle: 'سجل حضورك',
      galleryTitle: 'لحظاتنا',
      timelineTitle: 'قصة حبنا',
      weatherTitle: 'حالة الطقس في يوم الزفاف',
      attendingOptions: ['حاضر بفرح', 'للأسف لا أستطيع الحضور'],
      shareText: 'مشاركة على'
    },
    english: {
      // Existing translations...
      rsvpTitle: 'RSVP Here',
      galleryTitle: 'Our Moments',
      timelineTitle: 'Our Love Story',
      weatherTitle: 'Wedding Day Weather',
      attendingOptions: ['Attending with Joy', 'Regretfully Can\'t Attend'],
      shareText: 'Share on'
    }
  };

  const content = isArabic ? elements.arabic : elements.english;
  
  // Update new elements
  document.getElementById('rsvp-title').textContent = content.rsvpTitle;
  document.getElementById('gallery-title').textContent = content.galleryTitle;
  document.getElementById('timeline-title').textContent = content.timelineTitle;
  document.getElementById('weather-title').textContent = content.weatherTitle;
  
  // Update select options
  const attendanceSelect = document.getElementById('attendance');
  attendanceSelect.options[0].text = content.attendingOptions[0];
  attendanceSelect.options[1].text = content.attendingOptions[1];
  
  // Update share buttons
  document.querySelectorAll('.share-button').forEach((btn, index) => {
    btn.textContent = content.shareText + ' ' + (isArabic ? 
      ['فيسبوك', 'واتساب'][index] : 
      ['Facebook', 'WhatsApp'][index]);
  });
  
  getWeather(); // Refresh weather info with correct language
}

// Initial calls
document.addEventListener('DOMContentLoaded', function() {
  initializeCalendarLink();
  updateCountdown();
  setInterval(updateCountdown, 1000);
  getWeather();
});