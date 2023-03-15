const en = {
  greeting: 'Welcome!',
  submit: 'Submit',
  validation: {
    nameRequired: 'Please enter your name',
    nameMinLength: 'Name is too short',
    nameMaxLength: 'Name is too long',
    bioRequired: 'Please enter some text about yourself',
    bioMinLength: 'Please provide some more information',
    bioMaxLength: "Send long memoirs by mail, we don't read it anyway",
    positionRequired: 'Please select your position',
    relationRequired: 'Please select at least one relation',
  },
  labels: {
    name: 'Your name',
    bio: 'About',
    position: 'Position',
    relation: 'Relation',
  },
  addNewItem: (value: string) => `Add "${value}"`,
  clearText: 'Clear',
  closeText: 'Close',
  loadingText: 'Loading…',
  noOptionsText: 'No options',
  openText: 'Open',
  remove: 'Remove',
};

const ru: typeof en = {
  greeting: 'Добро пожаловать!',
  submit: 'Отправить',
  validation: {
    nameRequired: 'Пожалуйста, введите своё имя',
    nameMinLength: 'Имя слишком короткое',
    nameMaxLength: 'Имя слишком длинное',
    bioRequired: 'Пожалуйста, напишите немного о себе',
    bioMinLength: 'Пожалуйста, предоставьте больше информации',
    bioMaxLength: 'Присылайте длинные мемуары по почте, мы их всё равно не читаем',
    positionRequired: 'Пожалуйста, выберите свою должность',
    relationRequired: 'Пожалуйста, выберите хотя бы одно отношение',
  },
  labels: {
    name: 'Ваше имя',
    bio: 'О себе',
    position: 'Должность',
    relation: 'Отношение',
  },
  addNewItem: (value: string) => `Добавить: "${value}"`,
  clearText: 'Очистить',
  closeText: 'Закрыть',
  loadingText: 'Загрузка…',
  noOptionsText: 'Нет элементов для выбота',
  openText: 'Открыть',
  remove: 'Удалить',
};

const localeMap: Record<string, typeof en> = {
  ru,
  en,
  'en-US': en,
  'en-GB': en,
};

const lang = Array.isArray(navigator.languages) ? navigator.languages[0] : navigator.language;

export const locale = localeMap[lang] ?? en;
