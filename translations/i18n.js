// Sistema simple de internacionalización
const i18n = {
  currentLanguage: 'es',
  translations: {
    es: translations_es,
    en: translations_en
  },

  // Detectar idioma por dominio
  detectLanguage() {
    const hostname = window.location.hostname;
    
    if (hostname === 'myeasybeads.com' || hostname.includes('myeasybeads')) {
      return 'en';
    }
    
    if (hostname === 'easycuentas.com' || hostname.includes('easycuentas')) {
      return 'es';
    }
    
    // Default por navegador si es localhost
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      const browserLang = navigator.language || navigator.userLanguage;
      return browserLang.startsWith('es') ? 'es' : 'en';
    }
    
    return 'es'; // Default español
  },

  // Inicializar
  init() {
    this.currentLanguage = this.detectLanguage();
    console.log('🌐 Idioma detectado:', this.currentLanguage);
  },

  // Obtener traducción
  t(key) {
    const keys = key.split('.');
    let value = this.translations[this.currentLanguage];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key; // Si no encuentra, devuelve la key
      }
    }
    
    return value || key;
  },

  // Cambiar idioma manualmente (para futuro toggle)
  setLanguage(lang) {
    if (this.translations[lang]) {
      this.currentLanguage = lang;
    }
  }
};

// Inicializar al cargar
i18n.init();