const generatorBtn = document.getElementById('generator-btn');
const toggleThemeBtn = document.getElementById('toggle-theme-btn');
const resultsContainer = document.getElementById('results-container');
const body = document.body;

// 로또 공 색상 결정 함수 (한국 로또 기준)
function getBallColor(number) {
    if (number <= 10) return '#fbc400'; // 노랑
    if (number <= 20) return '#69c8f2'; // 파랑
    if (number <= 30) return '#ff7272'; // 빨강
    if (number <= 40) return '#aaa';    // 회색
    return '#b0d840';                   // 초록
}

toggleThemeBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
});

generatorBtn.addEventListener('click', () => {
    // 기존 결과 지우기
    resultsContainer.innerHTML = '';
    
    // 5게임 생성
    for (let i = 0; i < 5; i++) {
        createLottoRow(i);
    }
});

function createLottoRow(delayIndex) {
    // 1~45 사이의 중복 없는 숫자 6개 뽑기
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }

    // 오름차순 정렬
    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

    // 행(Row) 요소 생성
    const rowEl = document.createElement('div');
    rowEl.classList.add('lotto-row');
    // 애니메이션 딜레이 설정 (각 줄이 순차적으로 나타남)
    rowEl.style.animationDelay = `${delayIndex * 0.1}s`; 

    // 번호 공 생성 및 추가
    sortedNumbers.forEach(number => {
        const numberEl = document.createElement('div');
        numberEl.classList.add('result-number');
        numberEl.textContent = number;
        numberEl.style.backgroundColor = getBallColor(number);
        rowEl.appendChild(numberEl);
    });

    resultsContainer.appendChild(rowEl);
}