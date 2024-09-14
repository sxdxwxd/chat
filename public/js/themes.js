function switchTheme(theme) {
    document.body.className = theme;
}

document.addEventListener('DOMContentLoaded', () => {
    const themeSelector = document.getElementById('themeSelector');
    if (themeSelector) {
        themeSelector.addEventListener('change', function() {
            switchTheme(this.value);
        });
    } else {
        console.error("Theme selector not found.");
    }
});