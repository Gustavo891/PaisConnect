
document.addEventListener("DOMContentLoaded", function() {
    const tooltip = document.getElementById("tooltip");
    const flagImg = tooltip.querySelector(".flag");
    const countryNameSpan = tooltip.querySelector("#countryName");
  
    const map = document.getElementById("map");
    let activeCountry = null;
    const countryCache = {};
    
    map.addEventListener("mousemove", function(event) {
      const path = event.target.closest("path");
      if (!path) {
        // Se não houver um elemento <path> sob o cursor do mouse, oculta a tooltip
        tooltip.style.display = "none";
        return;
      }
      
      const countryName = path.getAttribute("name");
  
      if (activeCountry === countryName && countryCache[countryName]) {
        // Se o país estiver ativo e os dados estiverem em cache, use-os
        updateTooltip(countryCache[countryName], event);
      } else {
        // Caso contrário, faça uma solicitação para buscar os dados do país
        fetchCountryData(countryName)
          .then(data => {
            // Armazene os dados em cache
            countryCache[countryName] = data;
            // Atualize a tooltip com os dados do país
            updateTooltip(data, event);
            // Atualiza o país ativo
            activeCountry = countryName;
          })
          .catch(error => {
            flagImg.src = "";
            flagImg.alt = "";
            tooltip.style.display = "block";
            tooltip.style.left = event.pageX + 15 + "px";
            tooltip.style.top = event.pageY + 15 + "px";
            countryNameSpan.innerText = countryName;
            console.error("Error fetching country data:", error);
          });
      }
    });
  
    map.addEventListener("mouseleave", function() {
      tooltip.style.display = "none";
    });
  
    function fetchCountryData(countryName) {
      return fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
        .then(response => {
          if (!response.ok) {
            throw new Error("Country data not found");
          }
          return response.json();
        })
        .then(data => {
          return data[0];
        });
    }

    function updateTooltip(countryData, event) {
      flagImg.src = countryData.flags.png;
      flagImg.alt = `Flag of ${countryData.name.common}`;
      tooltip.style.display = "block";
      tooltip.style.left = event.pageX + 15 + "px";
      tooltip.style.top = event.pageY + 15 + "px";
      countryNameSpan.innerText = countryData.name.common;
    }
  });
