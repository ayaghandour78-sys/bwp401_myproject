
const defaultEvents = [
    { id: 1, title: "مؤتمر الذكاء الاصطناعي", date: "2026-05-15", time: " 10:00 صباحاً - 4:00 مساءً", location: "المركز الثقافي", category: "تكنولوجيا", image: "assets/img/ai_conf.jpg", desc: "مؤتمر حول أحدث تقنيات الذكاء الاصطناعي" },
    { id: 2, title: "حفل فرقة الموسيقى العربية", date: "2026-05-18", time: " 8:00 مساءً - 11:00 مساءً", location: "مسرح الجامعة", category: "موسيقى", image: "assets/img/music_event3.jpg", desc: "أمسية موسيقية رائعة" },
    { id: 3, title: "بطولة كرة السلة", date: "2026-05-20", time: "  2:00 مساءً - 6:00 مساءً", location: "الصالة الرياضية", category: "رياضة", image: "assets/img/basketball.jpg", desc: "بطولة بين كليات الجامعة" },
    { id: 4, title: "معرض الفنون التشكيلية", date: "2026-05-22", time: "8:00 صباحاً - 11:00 مساءً", location: "قاعة المعارض", category: "ثقافة", image: "assets/img/art_exhibition.jpg", desc: "معرض فني يضم أعمال الطلاب في الرسم والنحت" },
    { id: 5, title: "يوم العائلة", date: "2026-05-25", time: "10:00 صباحاً - 5:00 مساءً", location: "حديقة الجامعة", category: "عائلي", image: "assets/img/family_day.jpg", desc: "فعاليات ترفيهية للعائلة" },
    { id: 6, title: "هاكاثون البرمجة", date: "2026-05-28", time: " 9:00 صباحاً (لمدة 24 ساعة)", location: "مركز الابتكار", category: "تكنولوجيا", image: "assets/img/hackathon.jpg", desc: "مسابقة برمجة لمدة 24 ساعة" }
];
if (!localStorage.getItem('eventsData') || JSON.parse(localStorage.getItem('eventsData'))[0].time === undefined) {
    localStorage.setItem('eventsData', JSON.stringify(defaultEvents));
}

let events = JSON.parse(localStorage.getItem('eventsData')) || [];

function getCategoryColor(cat) {
    const colors = { 'تكنولوجيا':'primary', 'موسيقى':'success', 'رياضة':'danger', 'ثقافة':'warning', 'عائلي':'info' };
    return colors[cat] || 'secondary';
}


function initIndexPage() {
    const featuredDiv = document.getElementById('featuredEvents');
    if (featuredDiv) {
        featuredDiv.innerHTML = defaultEvents.slice(0,4).map(e => `
            <div class="scroll-card"><img src="${e.image}"><div class="card-body"><h5>${e.title}</h5><p class="text-muted"><i class="far fa-calendar"></i> ${e.date}</p><span class="badge bg-${getCategoryColor(e.category)}">${e.category}</span></div></div>
        `).join('');
    }
    const badgesDiv = document.getElementById('categoryBadges');
    if (badgesDiv) {
        const cats = ['الكل','ثقافة','رياضة','موسيقى','عائلي','تكنولوجيا'];
        badgesDiv.innerHTML = cats.map(c => `<span class="badge-btn" data-category="${c === 'الكل' ? 'all' : c}">${c === 'الكل' ? '📌' : c === 'ثقافة' ? '📚' : c === 'رياضة' ? '⚽' : c === 'موسيقى' ? '🎵' : c === 'عائلي' ? '👨‍👩‍👧' : '💻'} ${c}</span>`).join('');
        document.querySelectorAll('.badge-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const cat = this.getAttribute('data-category');
                document.querySelectorAll('#latestEventsGrid .event-card').forEach(card => {
                    card.style.display = (cat === 'all' || card.getAttribute('data-category') === cat) ? 'block' : 'none';
                });
            });
        });
    }
    const latestGrid = document.getElementById('latestEventsGrid');
    if (latestGrid) {
        latestGrid.innerHTML = defaultEvents.map(e => `
            <div class="event-card" data-category="${e.category}"><img src="${e.image}"><div class="p-3"><span class="event-category bg-${getCategoryColor(e.category)} text-white">${e.category}</span><h5 class="mt-2">${e.title}</h5><p class="text-muted small"><i class="far fa-calendar"></i> ${e.date} <i class="fas fa-map-marker-alt"></i> ${e.location}</p><p class="small">${e.desc.substring(0,60)}...</p><a href="event.html?id=${e.id}" class="btn btn-sm btn-outline-primary">التفاصيل</a></div></div>
        `).join('');
    }
}


function displayEvents() {
    const events = JSON.parse(localStorage.getItem('eventsData')) || [];
    const search = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const category = document.getElementById('categoryFilter')?.value || 'all';
    const location = document.getElementById('locationFilter')?.value || 'all';
    const date = document.getElementById('dateFilter')?.value || '';

    const filtered = events.filter(e => {
        return (search === '' || e.title.toLowerCase().includes(search) || e.desc.toLowerCase().includes(search)) &&
               (category === 'all' || e.category === category) &&
               (location === 'all' || e.location.trim() === location.trim()) &&
               (date === '' || e.date === date);
    });

    const countDiv = document.getElementById('resultsCount');
    if (countDiv) countDiv.innerHTML = `📊 تم العثور على ${filtered.length} فعالية من أصل ${events.length}`;

    const grid = document.getElementById('eventsGrid');
    if (!grid) return;
    if (filtered.length === 0) {
        grid.innerHTML = `<div class="no-results"><i class="fas fa-calendar-times fa-4x mb-3"></i><h5>لا توجد فعاليات</h5><button class="btn btn-primary" onclick="resetFilters()">إعادة ضبط</button></div>`;
        return;
    }
    grid.innerHTML = filtered.map(e => `
        <div class="event-card">
            <img src="${e.image}"><div class="p-3">
            <span class="event-category bg-${getCategoryColor(e.category)} text-white">${e.category}</span>
            <h5 class="mt-2">${e.title}</h5>
            <p class="text-muted small"><i class="far fa-calendar"></i> ${e.date}</p>
            <p class="text-muted small"><i class="fas fa-map-marker-alt"></i> ${e.location}</p>
            <p class="small">${e.desc.substring(0, 80)}...</p>
            <a href="event.html?id=${e.id}" class="btn btn-sm btn-outline-primary mt-2">التفاصيل</a>
            </div>
        </div>
    `).join('');
}

function resetFilters() {
    if (document.getElementById('searchInput')) document.getElementById('searchInput').value = '';
    if (document.getElementById('categoryFilter')) document.getElementById('categoryFilter').value = 'all';
    if (document.getElementById('locationFilter')) document.getElementById('locationFilter').value = 'all';
    if (document.getElementById('dateFilter')) document.getElementById('dateFilter').value = '';
    displayEvents();
}

function bindEventsPageEvents() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const locationFilter = document.getElementById('locationFilter');
    const dateFilter = document.getElementById('dateFilter');
    if (searchInput) searchInput.addEventListener('keyup', displayEvents);
    if (categoryFilter) categoryFilter.addEventListener('change', displayEvents);
    if (locationFilter) locationFilter.addEventListener('change', displayEvents);
    if (dateFilter) dateFilter.addEventListener('change', displayEvents);
    displayEvents();
}


if (document.getElementById('featuredEvents')) initIndexPage();
if (document.getElementById('searchInput')) bindEventsPageEvents();
