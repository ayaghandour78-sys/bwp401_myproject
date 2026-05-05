// فعاليات الجامعة 
var defaultEvents = [
    { id: 1, title: "مؤتمر الذكاء الاصطناعي", date: "2026-05-15", time: "  صباحاً - 4:00 مساءً 10:00    ", location: "المركز الثقافي", category: "تكنولوجيا", image: "assets/img/ai_conf.jpg", desc: "مؤتمر حول أحدث تقنيات الذكاء الاصطناعي" },
    { id: 2, title: "حفل فرقة الموسيقى العربية", date: "2026-05-18", time: "  مساءً - 11:00 مساءً  8:00 ", location: "مسرح الجامعة", category: "موسيقى", image: "assets/img/music_event3.jpg", desc: "أمسية موسيقية رائعة" },
    { id: 3, title: "بطولة كرة السلة", date: "2026-05-20", time:  "   مساءً - 6:00 مساءً  2:00", location: "الصالة الرياضية", category: "رياضة", image: "assets/img/basketball.jpg", desc: "بطولة بين كليات الجامعة" },
    { id: 4, title: "معرض الفنون التشكيلية", date: "2026-05-22", time: "  صباحاً - 11:00 مساءً 8:00", location: "قاعة المعارض", category: "ثقافة", image: "assets/img/art_exhibition.jpg", desc: "معرض فني يضم أعمال الطلاب في الرسم والنحت" },
    { id: 5, title: "يوم العائلة", date: "2026-05-25", time: "   صباحاً - 5:00 مساءً 10:00", location: "حديقة الجامعة", category: "عائلي", image: "assets/img/family_day.jpg", desc: "فعاليات ترفيهية للعائلة" },
    { id: 6, title: "هاكاثون البرمجة", date: "2026-05-28", time: "   صباحاً (لمدة 24 ساعة)  9:00", location: "مركز الابتكار", category: "تكنولوجيا", image: "assets/img/hackathon.jpg", desc: "مسابقة برمجة لمدة 24 ساعة" }
];

if (!localStorage.getItem('eventsData') || JSON.parse(localStorage.getItem('eventsData'))[0].time === undefined) {
    localStorage.setItem('eventsData', JSON.stringify(defaultEvents));
}

var events = JSON.parse(localStorage.getItem('eventsData')) || [];


function getCategoryColor(cat) {
    if (cat == 'تكنولوجيا') return 'primary';
    if (cat == 'موسيقى') return 'success';
    if (cat == 'رياضة') return 'danger';
    if (cat == 'ثقافة') return 'warning';
    if (cat == 'عائلي') return 'info';
    return 'secondary';
}

// الصفحة الرئيسية
function initIndexPage() {
    // فعاليات بارزة
    var featuredDiv = document.getElementById('featuredEvents');
    if (featuredDiv) {
        var htmlFeatured = '';
        for (var i = 0; i < 4; i++) {
            var e = defaultEvents[i];
            htmlFeatured += '<div class="scroll-card">' +
                '<img src="' + e.image + '">' +
                '<div class="card-body">' +
                '<h5>' + e.title + '</h5>' +
                '<p class="text-muted"><i class="far fa-calendar"></i> ' + e.date + '</p>' +
                '<span class="badge bg-' + getCategoryColor(e.category) + '">' + e.category + '</span>' +
                '</div></div>';
        }
        featuredDiv.innerHTML = htmlFeatured;
    }
    // أزرار التصنيفات السريعة 
    var badgesDiv = document.getElementById('categoryBadges');
    if (badgesDiv) {
        var catsArray = ['الكل', 'ثقافة', 'رياضة', 'موسيقى', 'عائلي', 'تكنولوجيا'];
        var badgesHtml = '';
        for (var j = 0; j < catsArray.length; j++) {
            var catName = catsArray[j];
            var dataCat = (catName == 'الكل') ? 'all' : catName;
            var emoji = '';
            if (catName == 'الكل') emoji = '📌';
            else if (catName == 'ثقافة') emoji = '📚';
            else if (catName == 'رياضة') emoji = '⚽';
            else if (catName == 'موسيقى') emoji = '🎵';
            else if (catName == 'عائلي') emoji = '👨‍👩‍👧';
            else if (catName == 'تكنولوجيا') emoji = '💻';
            badgesHtml += '<span class="badge-btn" data-category="' + dataCat + '">' + emoji + ' ' + catName + '</span>';
        }
        badgesDiv.innerHTML = badgesHtml;
        // الضغط لكل زر
       var allBtns = document.querySelectorAll('.badge-btn');
        for (var k = 0; k < allBtns.length; k++) {
            allBtns[k].addEventListener('click', function() {
                var selectedCat = this.getAttribute('data-category');
                var cards = document.querySelectorAll('#latestEventsGrid .event-card');
                for (var c = 0; c < cards.length; c++) {
                    if (selectedCat == 'all' || cards[c].getAttribute('data-category') == selectedCat) {
                        cards[c].style.display = 'block';
                    } else {
                        cards[c].style.display = 'none';
                    }
                }
            });
        }
    }
// أحدث الفعاليات
    var latestGrid = document.getElementById('latestEventsGrid');
    if (latestGrid) {
        var latestHtml = '';
        for (var m = 0; m < defaultEvents.length; m++) {
            var ev = defaultEvents[m];
            latestHtml += '<div class="event-card" data-category="' + ev.category + '">' +
                '<img src="' + ev.image + '">' +
                '<div class="p-3">' +
                '<span class="event-category bg-' + getCategoryColor(ev.category) + ' text-white">' + ev.category + '</span>' +
                '<h5 class="mt-2">' + ev.title + '</h5>' +
                '<p class="text-muted small"><i class="far fa-calendar"></i> ' + ev.date + ' <i class="fas fa-map-marker-alt"></i> ' + ev.location + '</p>' +
                '<p class="small">' + ev.desc.substring(0,60) + '...</p>' +
                '<a href="event.html?id=' + ev.id + '" class="btn btn-sm btn-outline-primary">التفاصيل</a>' +
                '</div></div>';
        }
        latestGrid.innerHTML = latestHtml;
    }
}


// فلترة الفعاليات 
function displayEvents() {
    var eventsArr = JSON.parse(localStorage.getItem('eventsData')) || [];
    var searchText = document.getElementById('searchInput') ? document.getElementById('searchInput').value.toLowerCase() : '';
    var catFilter = document.getElementById('categoryFilter') ? document.getElementById('categoryFilter').value : 'all';
    var locFilter = document.getElementById('locationFilter') ? document.getElementById('locationFilter').value : 'all';
    var dateFilter = document.getElementById('dateFilter') ? document.getElementById('dateFilter').value : '';

    var filteredEvents = [];
    for (var i = 0; i < eventsArr.length; i++) {
        var ev = eventsArr[i];
        var match = true;
        if (searchText != '') {
            if (ev.title.toLowerCase().indexOf(searchText) == -1 && ev.desc.toLowerCase().indexOf(searchText) == -1) {
                match = false;
            }
        }
        if (catFilter != 'all' && ev.category != catFilter) match = false;
        if (locFilter != 'all' && ev.location != locFilter) match = false;
        if (dateFilter != '' && ev.date != dateFilter) match = false;
        if (match) filteredEvents.push(ev);
    }

    var countDiv = document.getElementById('resultsCount');
    if (countDiv) {
        countDiv.innerHTML = '📊 تم العثور على ' + filteredEvents.length + ' فعالية من أصل ' + eventsArr.length;
    }

    var grid = document.getElementById('eventsGrid');
    if (!grid) return;
    if (filteredEvents.length == 0) {
        grid.innerHTML = '<div class="no-results"><i class="fas fa-calendar-times fa-4x mb-3"></i><h5>لا توجد فعاليات</h5><button class="btn btn-primary" onclick="resetFilters()">إعادة ضبط</button></div>';
        return;
    }

    var gridHtml = '';
    for (var j = 0; j < filteredEvents.length; j++) {
        var evj = filteredEvents[j];
        gridHtml += '<div class="event-card">' +
            '<img src="' + evj.image + '"><div class="p-3">' +
            '<span class="event-category bg-' + getCategoryColor(evj.category) + ' text-white">' + evj.category + '</span>' +
            '<h5 class="mt-2">' + evj.title + '</h5>' +
            '<p class="text-muted small"><i class="far fa-calendar"></i> ' + evj.date + '</p>' +
            '<p class="text-muted small"><i class="fas fa-map-marker-alt"></i> ' + evj.location + '</p>' +
            '<p class="small">' + evj.desc.substring(0,80) + '...</p>' +
            '<a href="event.html?id=' + evj.id + '" class="btn btn-sm btn-outline-primary mt-2">التفاصيل</a>' +
            '</div></div>';
    }
    grid.innerHTML = gridHtml;
}

function resetFilters() {
    var searchInput = document.getElementById('searchInput');
    var catFilter = document.getElementById('categoryFilter');
    var locFilter = document.getElementById('locationFilter');
    var dateFilter = document.getElementById('dateFilter');
    if (searchInput) searchInput.value = '';
    if (catFilter) catFilter.value = 'all';
    if (locFilter) locFilter.value = 'all';
    if (dateFilter) dateFilter.value = '';
    displayEvents();
}

function bindEventsPageEvents() {
    var searchInput = document.getElementById('searchInput');
    var catFilter = document.getElementById('categoryFilter');
    var locFilter = document.getElementById('locationFilter');
    var dateFilter = document.getElementById('dateFilter');
    if (searchInput) searchInput.addEventListener('keyup', displayEvents);
    if (catFilter) catFilter.addEventListener('change', displayEvents);
    if (locFilter) locFilter.addEventListener('change', displayEvents);
    if (dateFilter) dateFilter.addEventListener('change', displayEvents);
    displayEvents();
}


// التشغيل حسب الصفحة 
if (document.getElementById('featuredEvents')) initIndexPage();
if (document.getElementById('searchInput')) bindEventsPageEvents();