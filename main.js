const generatorBtn = document.getElementById('generator-btn');
const toggleThemeBtn = document.getElementById('toggle-theme-btn');
const resultsContainer = document.getElementById('results-container');
const body = document.body;

// 로또 공 색상 결정 함수 (한국 로또 기준 색상 참고)
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
    
    // 1~45 사이의 중복 없는 숫자 6개 뽑기
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }

    // 오름차순 정렬
    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

    // 화면에 표시 (딜레이 효과 추가)
    sortedNumbers.forEach((number, index) => {
        setTimeout(() => {
            const numberEl = document.createElement('div');
            numberEl.classList.add('result-number');
            numberEl.textContent = number;
            numberEl.style.backgroundColor = getBallColor(number);
            resultsContainer.appendChild(numberEl);
        }, index * 200); // 0.2초 간격으로 하나씩 나타나게 함
    });
});
