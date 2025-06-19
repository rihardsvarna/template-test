
const toggleSwitch = document.querySelector('input[type="checkbox"]');
const nav = document.getElementById('nav');
const toggleIcon = document.getElementById('toggle-icon');
const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
const image3 = document.getElementById('image3');
const textBox = document.getElementById('text-box');

// Capitalize the first letter of a string
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

// Dark or Light Images
function imageMode(color) {
    image1.src = `img/custom/pasta_${color}.svg`;
    image2.src = `img/custom/card_${color}.svg`;
    image3.src = `img/custom/dog_${color}.svg`;
}

// Theme Switcher
function themeSwitcher(theme, faClass) {
    toggleIcon.children[0].textContent = `${capitalize(theme)} Mode`;
    toggleIcon.children[1].setAttribute('class', '');
    toggleIcon.children[1].classList.add(`fa-solid`, faClass);
    imageMode(theme);
}

// Switch Theme Dynamically
function switchTheme(event) {
    if (event.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeSwitcher('dark', 'fa-moon');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        themeSwitcher('light', 'fa-sun');
    }
}

// Event Listener
toggleSwitch.addEventListener('change', switchTheme);

// Check Local Storage For Theme
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme == 'dark') {
        toggleSwitch.checked = true;
        themeSwitcher('dark', 'fa-moon');
    } else if (currentTheme == 'light') {
        toggleSwitch.checked = false;
        themeSwitcher('light', 'fa-sun');
    }
}