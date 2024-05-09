document.addEventListener("DOMContentLoaded", function() {
    const map = document.getElementById("map");
    
    map.addEventListener("click", function(event) {
        const path = event.target.closest("path");
        if (!path) return;
        
        const countryName = path.getAttribute("name");
        window.location.href = `informacoes_pais.html?pais=${countryName}`;
    });
});
