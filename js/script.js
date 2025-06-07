async function fetchExchangeRate() {
    try {
        const response = await fetch('https://pydolarve.org/api/v2/tipo-cambio?currency=usd&format_date=iso&rounded_price=true');
        const data = await response.json();
        
        document.getElementById('exchangeRate').textContent = `Bs. ${data.price}`;
        //document.getElementById('currencyImage').src = data.image;
        
        // Configurar el cambio
        const changeElement = document.getElementById('change');
        changeElement.textContent = `${data.symbol} ${data.change}`;
        changeElement.className = `badge ${data.color === 'green' ? 'bg-success' : 'bg-danger'} text-white`;
        
        // Configurar el porcentaje
        const percentElement = document.getElementById('percent');
        percentElement.textContent = `${data.percent}%`;
        percentElement.className = `badge ${data.color === 'green' ? 'bg-success' : 'bg-danger'} text-white`;
        
        const lastUpdate = new Date(data.last_update);
        document.getElementById('lastUpdate').textContent = `Última actualización: ${lastUpdate.toLocaleString()}`;
    } catch (error) {
        console.error('Error al obtener la tasa de cambio:', error);
        document.getElementById('exchangeRate').textContent = 'Error al cargar';
    }
}

// Cargar la tasa de cambio al iniciar
fetchExchangeRate();

// Actualizar cada 5 minutos
setInterval(fetchExchangeRate, 300000);

// Scroll automático a la sección main al cargar la página
window.addEventListener('load', function() {
    document.getElementById('bcv').scrollIntoView({ behavior: 'smooth' });
});
