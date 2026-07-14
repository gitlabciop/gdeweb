# Sistema i18n Implementado ✅

## Resumen

Se ha implementado un sistema completo de internacionalización (i18n) para el sitio web con:
- ✅ Diccionario JSON con traducciones ES/EN
- ✅ Script i18n.js que maneja cambios de idioma
- ✅ Botones ES/EN en la navbar
- ✅ Atributos data-i18n en todos los textos principales
- ✅ Persistencia de idioma en localStorage
- ✅ Estilos CSS para los controles de idioma

---

## 📁 Estructura de Archivos

```
gdeweb/
├── i18n/
│   ├── translations.json      ← Diccionario de traducciones
│   ├── i18n.js                ← Script del sistema i18n
│   ├── README.md              ← Documentación detallada
│   └── demo.html              ← Demo interactivo del sistema
├── index.html                 ← HTML modificado con data-i18n
├── styles.css                 ← CSS actualizado con estilos de idioma
└── ...otros archivos
```

---

## 🚀 Cómo Ejecutar Localmente

### Opción 1: Python (Recomendado)
```bash
cd c:\Users\juanpablo\repos\gdeweb
python -m http.server 8000
```
Luego abre: **http://localhost:8000**

### Opción 2: Node.js (si tienes instalado)
```bash
npx http-server
```
Luego abre: **http://localhost:8080**

### Opción 3: PHP
```bash
php -S localhost:8000
```

**Importante:** No abras el archivo con `file://` porque las restricciones CORS impedirán cargar el JSON.

---

## 🎯 Características Implementadas

### 1. Botones de Cambio de Idioma
En la navbar hay dos botones (ES/EN) que:
- Permiten cambiar entre español e inglés
- Se actualiza automáticamente el botón activo
- Guardan la preferencia en localStorage

### 2. Traducción Automática del DOM
El sistema detecta y traduce automáticamente:
- Textos simples: `<p data-i18n="key">...</p>`
- HTML con etiquetas: `<h1 data-i18n-html="key">...</h1>`
- Atributos: `data-i18n-attr="alt:key1, title:key2"`
- Listas dinámicas: `<ul data-i18n-list="key"></ul>`

### 3. Diccionario Estructura
```json
{
  "es": {
    "nav": { "logo": "GDE · CIOp / CONICET", ... },
    "hero": { "title": "...", "subtitle": "..." },
    "capacidades": { ... },
    ...
  },
  "en": {
    "nav": { "logo": "EDG · CIOp / CONICET", ... },
    "hero": { "title": "...", "subtitle": "..." },
    ...
  }
}
```

### 4. Eventos
Se dispara un evento `i18n-changed` cuando se cambia de idioma:
```javascript
window.addEventListener('i18n-changed', (e) => {
  console.log('Nuevo idioma:', e.detail.language);
});
```

---

## 📝 Traducciones Actuales

El sistema incluye traducciones completas de:
- **Navbar**: Logo, links, CTA button
- **Hero**: Eyebrow, title, subtitle, buttons
- **Capacidades**: Título, descripción
- **Proyectos**: Título, descripción
- **Proceso**: Título, descripción
- **Resultados**: Título, descripción
- **Contacto**: Título, descripción, tarjetas, botón
- **Footer**: Créditos, links

---

## 🔧 Agregar Nuevas Traducciones

1. Abre `i18n/translations.json`
2. Busca la sección correspondiente (ej: "nav", "contacto")
3. Agrega la nueva clave en ambos idiomas:

```json
{
  "es": {
    "contacto": {
      "nueva_seccion": "Mi texto en español"
    }
  },
  "en": {
    "contacto": {
      "nueva_seccion": "My text in English"
    }
  }
}
```

4. En el HTML, usa el atributo:
```html
<p data-i18n="contacto.nueva_seccion">Mi texto en español</p>
```

---

## 💻 API de JavaScript

### Cambiar idioma programáticamente
```javascript
i18n.setLanguage('en');  // Cambia a inglés
i18n.setLanguage('es');  // Cambia a español
```

### Obtener traducción
```javascript
const texto = i18n.t('nav.logo');           // Idioma actual
const textoEN = i18n.t('nav.logo', 'en');   // EN específicamente
```

### Obtener idioma actual
```javascript
const lang = i18n.getLanguage();  // Devuelve 'es' o 'en'
```

### Renderizar manualmente
```javascript
i18n.render();  // Vuelve a renderizar todas las traducciones
```

---

## 🎨 Estilos de los Botones de Idioma

Los botones en la navbar tienen estilos custom:
- **Botón inactivo**: Gris semitransparente
- **Botón activo**: Cyan (#00D4FF) con texto oscuro
- **Hover**: Cambio de color suave

Se puede personalizar editando `.nav-lang-btn` en `styles.css`

---

## 📱 Responsiveness

Los controles de idioma se adaptan a todos los tamaños de pantalla:
- Desktop: Visible en la navbar
- Móvil: Se comprime pero permanece accesible

---

## ⚡ Performance

- Las traducciones se cargan una sola vez al inicializar
- El cambio de idioma es instantáneo (DOM manipulation nativo)
- No hay re-renders innecesarios
- localStorage elimina necesidad de recargar traducciones

---

## 🐛 Solución de Problemas

### "Las traducciones no cargan"
- Asegúrate de servir los archivos con HTTP (no file://)
- Verifica que `i18n/translations.json` exista
- Abre la consola del navegador y busca errores

### "Los botones de idioma no funcionan"
- Asegúrate que los botones tienen `data-lang="es"` y `data-lang="en"`
- Verifica que el script i18n.js se cargó (F12 → Network tab)

### "No se ve la traducción"
- Verifica que el elemento tiene `data-i18n="clave.correcta"`
- Verifica que la clave existe en `translations.json` en ambos idiomas
- Abre la consola para ver warnings

---

## 📚 Documentación Adicional

Para más detalles, ver:
- [i18n/README.md](./i18n/README.md) - Documentación completa
- [i18n/demo.html](./i18n/demo.html) - Demo interactivo

---

## ✨ Próximos Pasos (Opcional)

1. **Agregar más idiomas**: Simplemente agrega nuevas ramas en `translations.json` y new buttons
2. **Backend**: Guardar preferencia de idioma en la base de datos
3. **Lazy loading**: Cargar traducciones bajo demanda
4. **i18n library**: Migrar a una librería como i18next o vue-i18n si crece mucho

---

## 📞 Soporte

Si necesitas agregar nuevas traducciones o modificar el sistema, los archivos principales son:
- `i18n/translations.json` - Las traducciones
- `i18n/i18n.js` - La lógica
- `index.html` - Los atributos data-i18n
- `styles.css` - Los estilos

¡El sistema está listo para usar! 🚀
