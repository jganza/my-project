const translations: Record<string, { licensed: boolean }> = {
  WEB: { licensed: false }
};

export function assertTranslationAllowed(translation: string) {
  const entry = translations[translation];
  if (!entry) {
    throw new Error("Unsupported translation");
  }
  if (entry.licensed && process.env.ALLOW_LICENSED_TRANSLATIONS !== "true") {
    throw new Error("Translation not licensed for use");
  }
}

export function listTranslations() {
  return Object.entries(translations).map(([key, value]) => ({
    key,
    licensed: value.licensed
  }));
}
