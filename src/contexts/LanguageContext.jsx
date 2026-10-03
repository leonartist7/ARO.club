'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../i18n/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language,setLanguage]=useState('en');
  const [ready,setReady]=useState(false);
  useEffect(()=>{try{const saved=localStorage.getItem('conversa-language');if(translations[saved])setLanguage(saved);}catch{ /* Storage may be disabled. */ }setReady(true);},[]);

  useEffect(() => {
    // Save to localStorage whenever language changes
    if(ready)try{localStorage.setItem('conversa-language', language);}catch{ /* Storage may be disabled. */ }
  }, [language, ready]);

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];

    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) {
        console.warn(`Translation missing for key: ${key} in language: ${language}`);
        return key;
      }
    }

    return value;
  };

  const changeLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
