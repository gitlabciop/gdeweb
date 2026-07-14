// Sistema de internacionalización i18n
class I18n {
  constructor(defaultLanguage = 'es') {
    this.currentLanguage = localStorage.getItem('language') || defaultLanguage;
    this.translations = {};
    this.initialized = false;
  }

  // Cargar traducciones desde el archivo JSON
  async load(jsonPath) {
    try {
      // Intentar cargar el archivo JSON
      const response = await fetch(jsonPath, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      this.translations = await response.json();
      this.initialized = true;
      console.log('[i18n] Translations loaded successfully');
    } catch (error) {
      console.error('[i18n] Error loading translations:', error);
      console.warn('[i18n] Attempting to load translations from inline data...');
      
      // Fallback: Si no se puede cargar del archivo, intentar cargar desde window.i18nData
      if (window.i18nData) {
        this.translations = window.i18nData;
        this.initialized = true;
        console.log('[i18n] Translations loaded from inline data');
      } else {
        console.error('[i18n] No translations available. Please define window.i18nData or check the path to translations.json');
      }
    }
  }

  // Obtener traducción por clave
  t(key, language = null) {
    const lang = language || this.currentLanguage;
    const keys = key.split('.');
    let value = this.translations[lang];

    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        console.warn(`[i18n] Translation key not found: ${key} (${lang})`);
        return key; // Retorna la clave si no encuentra la traducción
      }
    }

    return value || key;
  }

  // Cambiar idioma
  setLanguage(language) {
    if (!this.translations[language]) {
      console.warn(`[i18n] Language "${language}" not available`);
      return;
    }
    this.currentLanguage = language;
    localStorage.setItem('language', language);
    this.render();
  }

  // Obtener idioma actual
  getLanguage() {
    return this.currentLanguage;
  }

  // Renderizar todas las traducciones en la página
  render() {
    // Traducciones simples (texto o HTML)
    document.querySelectorAll('[data-i18n], [data-i18n-html]').forEach((element) => {
      const key = element.getAttribute('data-i18n') || element.getAttribute('data-i18n-html');
      const value = this.t(key);

      // Si el elemento tiene data-i18n-html, usa innerHTML (para textos con HTML)
      if (element.hasAttribute('data-i18n-html')) {
        element.innerHTML = value;
      } else {
        element.textContent = value;
      }
    });

    // Traducciones de atributos (placeholder, alt, aria-label, etc.)
    document.querySelectorAll('[data-i18n-attr]').forEach((element) => {
      const attrs = element.getAttribute('data-i18n-attr').split(',');
      attrs.forEach((attrSpec) => {
        const [attrName, key] = attrSpec.trim().split(':');
        const value = this.t(key.trim());
        element.setAttribute(attrName.trim(), value);
      });
    });

    // Traducciones en arrays de elementos (lista, features, etc.)
    document.querySelectorAll('[data-i18n-list]').forEach((element) => {
      const key = element.getAttribute('data-i18n-list');
      const items = this.t(key);
      
      if (Array.isArray(items)) {
        element.innerHTML = items
          .map((item) => `<li>${item}</li>`)
          .join('');
      }
    });

    // Traducciones en data attributes de varios items
    document.querySelectorAll('[data-i18n-items]').forEach((container) => {
      const key = container.getAttribute('data-i18n-items');
      const items = this.t(key);

      if (Array.isArray(items)) {
        container.innerHTML = items
          .map((item) => {
            if (typeof item === 'string') {
              return `<div class="result-card"><div class="result-icon">✅</div><div class="result-text">${item}</div></div>`;
            } else if (typeof item === 'object') {
              return `<div class="result-card"><div class="result-icon">${item.icon || '✅'}</div><div class="result-text">${item.text}</div></div>`;
            }
          })
          .join('');
      }
    });

    // Dispatch evento para que otros scripts sepan que se cambió el idioma
    window.dispatchEvent(new CustomEvent('i18n-changed', { detail: { language: this.currentLanguage } }));
  }

  // Inicializar: cargar traducciones y renderizar
  async init(jsonPath) {
    await this.load(jsonPath);
    if (this.initialized) {
      this.render();
    } else {
      console.error('[i18n] Failed to initialize i18n system');
    }
  }
}

// Crear instancia global
const i18n = new I18n();

// Función para inicializar i18n
const initI18n = async () => {
  // Cargar traducciones
  await i18n.init('./i18n/translations.json');

  // Configurar botones de cambio de idioma
  const langButtons = document.querySelectorAll('[data-lang]');
  langButtons.forEach((button) => {
    const lang = button.getAttribute('data-lang');
    
    // Marcar como activo el idioma actual
    if (lang === i18n.getLanguage()) {
      button.classList.add('is-active');
    }

    // Listener para cambiar idioma
    button.addEventListener('click', () => {
      i18n.setLanguage(lang);
      
      // Actualizar botones activos
      langButtons.forEach((btn) => btn.classList.remove('is-active'));
      button.classList.add('is-active');
    });
  });

  console.log('[i18n] Initialization complete. Current language:', i18n.getLanguage());
};

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
  // DOM aún no está listo
  document.addEventListener('DOMContentLoaded', initI18n);
} else {
  // DOM ya está listo
  initI18n();
}
