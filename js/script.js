async function fetchExchangeRate() {
    try {
        const response = await fetch('https://pydolarve.org/api/v2/tipo-cambio?currency=usd&format_date=iso&rounded_price=true');
        const data = await response.json();
        
        document.getElementById('exchangeRate').textContent = `Bs/USD ${data.price}`;
        
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

// Función para detectar y mostrar el tamaño de pantalla
function updateScreenSize() {
    const width = window.innerWidth;
    let size = '';
    const currencyImage = document.getElementById('currencyImage');
    
    if (width < 576) {
        size = 'xs';
        currencyImage.style.display = 'none';
    } else if (width < 768) {
        size = 'sm';
        currencyImage.style.display = 'none';
    } else if (width < 992) {
        size = 'md';
        currencyImage.style.display = 'none';
    } else if (width < 1200) {
        size = 'lg';
        currencyImage.style.display = 'block';
        currencyImage.style.maxWidth = '250px';
    } else if (width < 1400) {
        size = 'xl';
        currencyImage.style.display = 'block';
        currencyImage.style.maxWidth = '250px';
    } else {
        size = 'xxl';
        currencyImage.style.display = 'block';
        currencyImage.style.maxWidth = '250px';
    }
    
}

// Actualizar al cargar y al redimensionar
window.addEventListener('load', updateScreenSize);
window.addEventListener('resize', updateScreenSize);

// Función para mantener la pantalla encendida
async function keepScreenAwake() {
    try {
        // Verificar si el navegador soporta wakeLock
        if ('wakeLock' in navigator) {
            // Solicitar wakeLock
            const wakeLock = await navigator.wakeLock.request('screen');
            
            // Manejar cuando el usuario sale de la página
            document.addEventListener('visibilitychange', async () => {
                if (document.visibilityState === 'visible') {
                    try {
                        await wakeLock.request();
                    } catch (err) {
                        console.log('No se pudo reactivar wakeLock:', err);
                    }
                }
            });
        }
    } catch (err) {
        console.log('No se pudo activar wakeLock:', err);
    }
}

// Activar wakeLock al cargar la página
window.addEventListener('load', keepScreenAwake);
