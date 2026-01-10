const generatorBtn = document.getElementById('generator-btn');
const toggleThemeBtn = document.getElementById('toggle-theme-btn');
const toggleLangBtn = document.getElementById('toggle-lang-btn');
const recommendationContainer = document.getElementById('recommendation-container');
const body = document.body;

let currentLang = 'ko'; // 'ko' or 'en'
let lastRecommendedMenu = null;

// Translations Object
const translations = {
    ko: {
        title: "🍚 오늘 뭐 먹지? 🍚",
        subtitle: "버튼을 눌러 메뉴를 추천받아 보세요!",
        recommend_btn: "메뉴 추천받기",
        placeholder: "오늘 점심, 무엇을 먹을까요?",
        contact_title: "🤝 제휴 문의",
        label_name: "이름",
        placeholder_name: "홍길동",
        label_email: "이메일",
        label_message: "문의 내용",
        placeholder_message: "문의하실 내용을 적어주세요.",
        submit_btn: "문의하기",
        lang_btn: "EN",
        animal_title: "🐶 동물상 확인",
        upload_btn: "이미지 업로드"
    },
    en: {
        title: "🍚 What to Eat Today? 🍚",
        subtitle: "Click the button to get a lunch recommendation!",
        recommend_btn: "Get Recommendation",
        placeholder: "What should I eat for lunch today?",
        contact_title: "🤝 Partnership Inquiry",
        label_name: "Name",
        placeholder_name: "John Doe",
        label_email: "Email",
        label_message: "Message",
        placeholder_message: "Please write your message here.",
        submit_btn: "Send Message",
        lang_btn: "KO",
        animal_title: "🐶 Check Animal Face",
        upload_btn: "Upload Image"
    }
};

// 20 representative lunch menus
const menuList = [
    { name: '김치찌개', eng: 'Kimchi Stew', image: 'https://placehold.co/600x400/e74c3c/ffffff?text=Kimchi+Jjigae' },
    { name: '된장찌개', eng: 'Soybean Paste Stew', image: 'https://placehold.co/600x400/d35400/ffffff?text=Doenjang+Jjigae' },
    { name: '제육볶음', eng: 'Spicy Stir-fried Pork', image: 'https://placehold.co/600x400/c0392b/ffffff?text=Jeyuk+Bokkeum' },
    { name: '칼국수', eng: 'Kalguksu', image: 'https://placehold.co/600x400/bdc3c7/2c3e50?text=Kalguksu' },
    { name: '순두부찌개', eng: 'Soft Tofu Stew', image: 'https://placehold.co/600x400/e67e22/ffffff?text=Sundubu+Jjigae' },
    { name: '자장면', eng: 'Jajangmyeon', image: 'https://placehold.co/600x400/2c3e50/ffffff?text=Jajangmyeon' },
    { name: '짬뽕', eng: 'Jjamppong', image: 'https://placehold.co/600x400/c0392b/ffffff?text=Jjamppong' },
    { name: '비빔밥', eng: 'Bibimbap', image: 'https://placehold.co/600x400/2ecc71/ffffff?text=Bibimbap' },
    { name: '돈까스', eng: 'Pork Cutlet', image: 'https://placehold.co/600x400/f1c40f/2c3e50?text=Tonkatsu' },
    { name: '김밥', eng: 'Gimbap', image: 'https://placehold.co/600x400/34495e/ffffff?text=Gimbap' },
    { name: '부대찌개', eng: 'Budae Jjigae', image: 'https://placehold.co/600x400/e74c3c/ffffff?text=Budae+Jjigae' },
    { name: '설렁탕', eng: 'Seolleongtang', image: 'https://placehold.co/600x400/ecf0f1/2c3e50?text=Seolleongtang' },
    { name: '뼈해장국', eng: 'Pork Bone Hangover Soup', image: 'https://placehold.co/600x400/c0392b/ffffff?text=Haejangguk' },
    { name: '갈비탕', eng: 'Galbitang', image: 'https://placehold.co/600x400/bdc3c7/2c3e50?text=Galbitang' },
    { name: '떡볶이', eng: 'Tteokbokki', image: 'https://placehold.co/600x400/e74c3c/ffffff?text=Tteokbokki' },
    { name: '라면', eng: 'Ramen', image: 'https://placehold.co/600x400/f39c12/ffffff?text=Ramen' },
    { name: '볶음밥', eng: 'Fried Rice', image: 'https://placehold.co/600x400/f1c40f/2c3e50?text=Fried+Rice' },
    { name: '만두국', eng: 'Dumpling Soup', image: 'https://placehold.co/600x400/ecf0f1/2c3e50?text=Mandu+Guk' },
    { name: '냉면', eng: 'Naengmyeon', image: 'https://placehold.co/600x400/3498db/ffffff?text=Naengmyeon' },
    { name: '뚝배기 불고기', eng: 'Clay Pot Bulgogi', image: 'https://placehold.co/600x400/8e44ad/ffffff?text=Bulgogi' }
];

// Modal & Teachable Machine Elements
const animalCheckBtn = document.getElementById('animal-check-btn');
const animalModal = document.getElementById('animal-modal');
const closeModalBtn = document.getElementById('close-modal');
const uploadBtn = document.getElementById('upload-btn');
const imageInput = document.getElementById('image-upload');
const imagePreview = document.getElementById('image-preview');
const labelContainer = document.getElementById('label-container');
const loadingMsg = document.getElementById('loading-msg');

// Teachable Machine Config
const URL_TM = "https://teachablemachine.withgoogle.com/models/FcLIrlUBe/";
let model, maxPredictions;
let isModelLoading = false;

// Initialize
updateLanguage(currentLang);

toggleThemeBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    toggleThemeBtn.textContent = body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

toggleLangBtn.addEventListener('click', () => {
    currentLang = currentLang === 'ko' ? 'en' : 'ko';
    updateLanguage(currentLang);
    
    // If a menu is already recommended, update its text
    if (lastRecommendedMenu) {
        renderMenuCard(lastRecommendedMenu);
    }
});

generatorBtn.addEventListener('click', () => {
    recommendMenu();
});

// Modal Interactions
animalCheckBtn.addEventListener('click', async () => {
    animalModal.classList.remove('hidden');
    if (!model && !isModelLoading) {
        await initModel();
    }
});

closeModalBtn.addEventListener('click', () => {
    animalModal.classList.add('hidden');
});

window.addEventListener('click', (e) => {
    if (e.target === animalModal) {
        animalModal.classList.add('hidden');
    }
});

// Image Upload Logic
uploadBtn.addEventListener('click', () => {
    imageInput.click();
});

imageInput.addEventListener('change', function() {
    if (this.files && this.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            imagePreview.classList.remove('hidden');
            // Wait for image to load before predicting
            imagePreview.onload = function() {
                predict();
            }
        }
        reader.readAsDataURL(this.files[0]);
    }
});

// Teachable Machine Logic
async function initModel() {
    isModelLoading = true;
    loadingMsg.classList.remove('hidden');
    const modelURL = URL_TM + "model.json";
    const metadataURL = URL_TM + "metadata.json";

    try {
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();
        loadingMsg.classList.add('hidden');
        console.log("Model Loaded");
    } catch (error) {
        console.error("Error loading model:", error);
        loadingMsg.classList.remove('hidden');
        loadingMsg.innerHTML = "모델을 불러오는데 실패했습니다.<br>네트워크 연결을 확인하거나 나중에 다시 시도해주세요.<br><br>Failed to load model. Please check your network connection.";
        loadingMsg.style.color = "#ff6b6b";
    } finally {
        isModelLoading = false;
    }
}

async function predict() {
    if (!model) {
        console.warn("Model not loaded yet");
        return;
    }
    
    const prediction = await model.predict(imagePreview);
    labelContainer.innerHTML = "";
    
    for (let i = 0; i < maxPredictions; i++) {
        const probability = (prediction[i].probability * 100).toFixed(1);
        const className = prediction[i].className;
        
        const div = document.createElement("div");
        div.innerHTML = `<span>${className}</span>: <span style="font-weight:bold">${probability}%</span>`;
        
        // Simple visual bar
        const bar = document.createElement("div");
        bar.style.height = "5px";
        bar.style.backgroundColor = "#ff6b6b";
        bar.style.width = `${probability}%`;
        bar.style.marginTop = "5px";
        bar.style.borderRadius = "2px";
        
        div.appendChild(bar);
        labelContainer.appendChild(div);
    }
}

function updateLanguage(lang) {
    const t = translations[lang];
    document.documentElement.lang = lang;
    
    // Update simple text elements
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (t[key]) {
            element.textContent = t[key];
        }
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (t[key]) {
            element.placeholder = t[key];
        }
    });

    // Update Lang Button Text
    toggleLangBtn.textContent = t.lang_btn;
}

function recommendMenu() {
    const randomIndex = Math.floor(Math.random() * menuList.length);
    lastRecommendedMenu = menuList[randomIndex];
    renderMenuCard(lastRecommendedMenu);
}

function renderMenuCard(menu) {
    recommendationContainer.innerHTML = '';

    const card = document.createElement('div');
    card.classList.add('menu-card');

    const img = document.createElement('img');
    img.src = menu.image;
    img.alt = currentLang === 'ko' ? menu.name : menu.eng;
    img.classList.add('menu-image');

    const content = document.createElement('div');
    content.classList.add('menu-content');

    const title = document.createElement('h3');
    // Display Primary Language based on currentLang
    title.textContent = currentLang === 'ko' ? menu.name : menu.eng;
    title.classList.add('menu-title');

    const subTitle = document.createElement('p');
    // Display Secondary Language as subtitle
    subTitle.textContent = currentLang === 'ko' ? menu.eng : menu.name;
    subTitle.classList.add('menu-subtitle');

    content.appendChild(title);
    content.appendChild(subTitle);
    
    card.appendChild(img);
    card.appendChild(content);

    recommendationContainer.appendChild(card);
}