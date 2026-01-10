const generatorBtn = document.getElementById('generator-btn');
const toggleThemeBtn = document.getElementById('toggle-theme-btn');
const recommendationContainer = document.getElementById('recommendation-container');
const body = document.body;

// 20 representative lunch menus for Korean office workers
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

toggleThemeBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
});

generatorBtn.addEventListener('click', () => {
    recommendMenu();
});

function recommendMenu() {
    // Random selection
    const randomIndex = Math.floor(Math.random() * menuList.length);
    const selectedMenu = menuList[randomIndex];

    // Clear previous result
    recommendationContainer.innerHTML = '';

    // Create card element
    const card = document.createElement('div');
    card.classList.add('menu-card');

    // Image
    const img = document.createElement('img');
    img.src = selectedMenu.image;
    img.alt = selectedMenu.name;
    img.classList.add('menu-image');

    // Text Content
    const content = document.createElement('div');
    content.classList.add('menu-content');

    const title = document.createElement('h3');
    title.textContent = selectedMenu.name;
    title.classList.add('menu-title');

    const subTitle = document.createElement('p');
    subTitle.textContent = selectedMenu.eng;
    subTitle.classList.add('menu-subtitle');

    content.appendChild(title);
    content.appendChild(subTitle);
    
    card.appendChild(img);
    card.appendChild(content);

    recommendationContainer.appendChild(card);
}
