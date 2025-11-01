async function cargarAutos() {
  try {
    const respuesta = await fetch("autos.json");
    const autos = await respuesta.json();

    const contenedor = document.getElementById("autos-container");
    contenedor.innerHTML = "";

    autos.forEach(auto => {
      const card = document.createElement("article");
      card.classList.add("auto");

      card.innerHTML = `
        <img src="${auto.imagen}" alt="${auto.modelo}">
        <h3>${auto.modelo}</h3>
        <p>${auto.marca}</p>
        <p>Kilometraje: ${auto.kilometraje} km</p>
        <p class="precio">$${auto.precio.toLocaleString('es-AR')}</p>
      `;

      contenedor.appendChild(card);
    });
  } catch (error) {
    console.error("Error al cargar los autos:", error);
  }
}

cargarAutos();
