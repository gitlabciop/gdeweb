# Sistema de Internacionalización (i18n)

## Cómo funciona

Este sitio usa un sistema i18n simple basado en un diccionario JSON que permite traducir toda la página entre idiomas (actualmente ES e EN).

### Archivos principales

- **`i18n/translations.json`** — Diccionario con todas las traducciones organizadas en objetos anidados. Una clave por idioma (es, en)
- **`i18n/i18n.js`** — Script que gestiona las traducciones y la interfaz

### Estructura del diccionario

```json
{
  "es": {
    "nav": { "logo": "GDE · CIOp / CONICET", ... },
    "hero": { "title": "...", ... },
    ...
  },
  "en": {
    "nav": { "logo": "EDG · CIOp / CONICET", ... },
    "hero": { "title": "...", ... },
    ...
  }
}
```

Cada sección del sitio (nav, hero, capacidades, etc.) tiene su propia rama en el JSON, siguiendo la estructura de claves separadas por puntos: `nav.logo`, `hero.title`, etc.

## Cómo usar en el HTML

### 1. Texto simple

Para traducir un elemento de texto, usa el atributo `data-i18n`:

```html
<h1 data-i18n="hero.title">Transferencia tecnológica...</h1>
```

El script reemplaza automáticamente el contenido con la traducción del idioma activo.

### 2. Contenido con HTML

Si la traducción incluye etiquetas HTML (como `<br>` o `<em>`), usa `data-i18n-html`:

```html
<h1 data-i18n-html="hero.title">Transferencia tecnológica <br> e <em>ingeniería</em> aplicada.</h1>
```

### 3. Atributos (alt, placeholder, aria-label)

Para traducir atributos, usa `data-i18n-attr` con el formato `attrName:claveTraduccion`:

```html
<img src="image.jpg" data-i18n-attr="alt:image.altText, title:image.title" />
<input placeholder="Buscar" data-i18n-attr="placeholder:search.placeholder" />
```

### 4. Listas (arrays)

Para traducir listas de elementos, usa `data-i18n-list` (generará `<li>` items):

```html
<ul data-i18n-list="capacidades.cards.electronica.items"></ul>
```

Generará:
```html
<ul>
  <li>Diseño analógico y digital</li>
  <li>Diseño de PCB</li>
  ...
</ul>
```

## Cambiar idioma

### Opción 1: Botones de idioma

Agregá botones con el atributo `data-lang`:

```html
<button data-lang="es" class="nav-lang-btn">ES</button>
<button data-lang="en" class="nav-lang-btn">EN</button>
```

El script detecta automáticamente estos botones y agrega event listeners.

### Opción 2: Programáticamente

```javascript
// Cambiar idioma
i18n.setLanguage('en');

// Obtener idioma actual
const currentLang = i18n.getLanguage();
```

## Obtener una traducción en JavaScript

Si necesitás traducir algo dinámicamente en código:

```javascript
const title = i18n.t('hero.title');  // Devuelve la traducción en el idioma activo
const title_en = i18n.t('hero.title', 'en');  // Devuelve la traducción en EN (ignora el idioma activo)
```

## Agregar nuevas traducciones

1. Abrí `i18n/translations.json`
2. Agregá la nueva clave en ambos idiomas (es e en):

```json
{
  "es": {
    "nav": {
      "logo": "GDE · CIOp / CONICET",
      "nueva_clave": "Mi nuevo texto en español"
    },
    ...
  },
  "en": {
    "nav": {
      "logo": "EDG · CIOp / CONICET",
      "nueva_clave": "My new text in English"
    },
    ...
  }
}
```

3. En el HTML, usá el atributo correspondiente:

```html
<p data-i18n="nav.nueva_clave">Mi nuevo texto en español</p>
```

## Persistencia

El idioma activo se guarda automáticamente en `localStorage` con la clave `language`. Al recargar la página, se mantiene el idioma seleccionado.

## Eventos

Cuando se cambia el idioma, el script dispara un evento personalizado:

```javascript
window.addEventListener('i18n-changed', (event) => {
  const newLanguage = event.detail.language;
  console.log('Idioma cambiado a:', newLanguage);
});
```

Esto es útil si tenés código que necesita reaccionar al cambio de idioma (por ejemplo, recargar una tabla).

## Notas

- El idioma por defecto es **español (es)**
- El script maneja claves no encontradas mostrando un warning en la consola y devolviendo la clave como fallback
- Las traducciones se cargan desde `./i18n/translations.json` (ruta relativa a la raíz del sitio)
- El script necesita que el HTML tenga los atributos `data-i18n` ya presentes al cargar (o que se agreguen antes de llamar a `i18n.render()`)
