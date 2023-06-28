let theme = "light";
const sheet = document.getElementById("esriStyle");
const checkbox = document.getElementById("checkbox")
checkbox.addEventListener("change", toggleEsriTheme)

function toggleEsriTheme() {
    document.body.classList.toggle("dark")
  if (theme === "light") {
    sheet.href = "https://js.arcgis.com/4.22/esri/themes/dark/main.css";
    theme = "dark";
  } else if (theme === "dark") {
    sheet.href = "https://js.arcgis.com/4.22/esri/themes/light/main.css";
    theme = "light";
  }
}



function toggleEsriThemebyTime() {
    var date = new Date();
    var hour = date.getHours();
    var body = document.body;

    if (hour >= 19 || hour < 6) {
        if(theme === "light") {
            toggleEsriTheme();
            checkbox.checked = true;
        
    } else {
        if(theme === "dark") {
            toggleEsriTheme();
            checkbox.checked = false;
    }
}}}

// Llama a la función setMode al cargar la página para establecer el modo inicial.
window.onload = toggleEsriThemebyTime;