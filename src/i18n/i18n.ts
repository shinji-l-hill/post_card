import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend) // 翻訳ファイルをロードするためのバックエンドプラグイン
  .use(LanguageDetector) // ブラウザの言語設定を自動検出
  .use(initReactI18next) // react-i18next初期化
  .init({
    fallbackLng: 'ja',
    debug: false, // 開発中はデバッグモードを有効に
    interpolation: {
      escapeValue: false, // XSS対策が不要な場合はエスケープ処理を無効に
    },
    detection: {
      order: ['localStorage', 'navigator'], // 使用する検出順序
      caches: ['localStorage'], // 言語設定をlocalStorageに保存
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // 翻訳ファイルのパス
    },
  });

export default i18n;
