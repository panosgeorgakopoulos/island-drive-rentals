export const dictionaries = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  el: () => import('@/dictionaries/el.json').then((module) => module.default),
  fr: () => import('@/dictionaries/fr.json').then((module) => module.default),
  it: () => import('@/dictionaries/it.json').then((module) => module.default),
  es: () => import('@/dictionaries/es.json').then((module) => module.default),
  de: () => import('@/dictionaries/de.json').then((module) => module.default),
  sv: () => import('@/dictionaries/sv.json').then((module) => module.default),
  no: () => import('@/dictionaries/no.json').then((module) => module.default),
}

export const getDictionary = async (locale: string) => {
  if (!dictionaries[locale as keyof typeof dictionaries]) {
    return dictionaries.en()
  }
  return dictionaries[locale as keyof typeof dictionaries]()
}
