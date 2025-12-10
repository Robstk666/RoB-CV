import { Experience, Project, Skill } from './types';

// ==========================================
// ИНСТРУКЦИЯ ПО ФОТОГРАФИИ
// ==========================================
// Мы используем прямой импорт, чтобы картинка точно попала в сборку.
// 
// Если вы хотите заменить фото:
// 1. Убедитесь, что файл называется 'me.png' и лежит в списке слева.
// 2. Если файл называется иначе, поменяйте название в импорте ниже: import localPhoto from './ВАШЕ_НАЗВАНИЕ.png';
// ==========================================

// @ts-ignore: Игнорируем проверку типов для картинки
import localPhoto from './me.png';

// Используем импортированное фото.
export const HERO_IMAGE_URL = localPhoto;

// Если вы захотите использовать ссылку из интернета, 
// закомментируйте две строки выше и раскомментируйте строку ниже:
// export const HERO_IMAGE_URL = "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop";


export const EXPERIENCES: Experience[] = [
  {
    role: "CO-FOUNDER / PROJECT LEAD",
    company: "Сайты за 72 часа",
    period: "2024 - Наст. время",
    type: "Web Production / AI"
  },
  {
    role: "BUSINESS DEVELOPMENT MGR",
    company: "ФБУ «Росстройконтроль»",
    period: "Ноя 2023 - Наст. время",
    type: "IT-Решения / B2G / B2B"
  },
  {
    role: "BDM / ОПЕРАЦИОННЫЙ ДИРЕКТОР",
    company: "ГАУК «Центр Визуального Искусства»",
    period: "Янв 2023 - Ноя 2023",
    type: "Театр & Кино (Запуск с 0)"
  },
  {
    role: "УПРАВЛЯЮЩИЙ / BDM",
    company: "Парк Отель & БК «FINT»",
    period: "Май 2019 - Май 2022",
    type: "HoReCa & Спорт"
  },
  {
    role: "ОСНОВАТЕЛЬ / CEO",
    company: "Rob's Rentals",
    period: "Апр 2018 - Сен 2021",
    type: "Прокат / Инвестиции"
  },
  {
    role: "СООСНОВАТЕЛЬ",
    company: "Chillin Place",
    period: "Фев 2017 - Мар 2018",
    type: "HoReCa (Ресторан)"
  },
  {
    role: "BDM / SALES LEADER",
    company: "ФК «Акимбо»",
    period: "Июл 2012 - Ноя 2015",
    type: "Фитнес / Продажи"
  }
];

// Обновленный список проектов
export const PROJECTS: Project[] = [
  {
    name: "ГАУК «ЦВИ»",
    category: "Culture / Gov",
    description: "Операционное управление Центром Визуального Искусства. Запуск новых направлений, организация масштабных мероприятий, взаимодействие с Департаментом культуры.",
    images: [
      "https://images.unsplash.com/photo-1514525253440-b39345208668?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507676184212-d0370baf12ce?q=80&w=1000&auto=format&fit=crop"
    ]
  },
  {
    name: "Росстройконтроль",
    category: "IT / B2G",
    description: "Внедрение автоматизированных систем контроля качества. Организация взаимодействия с государственными структурами, оптимизация процессов проверки продукции.",
    images: [
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop"
    ]
  },
  {
    name: "Молния",
    category: "Energy / Tech",
    description: "Разработка стратегии выхода на новые рынки для энергетической компании. Увеличение портфеля B2B клиентов на 40% за полгода.",
    images: [
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop"
    ]
  },
  {
    name: "Парк Отель FINT",
    category: "HoReCa",
    description: "Полный перезапуск загородного отеля. Внедрение новой системы бронирования, обновление номерного фонда, запуск ресторана авторской кухни.",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1000&auto=format&fit=crop"
    ]
  },
  {
    name: "Chillin Place",
    category: "Restaurant",
    description: "Создание концепции ресторана с нуля. Дизайн интерьера, разработка меню, найм и обучение персонала, запуск маркетинговой кампании.",
    images: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1000&auto=format&fit=crop"
    ]
  },
  {
    name: "Акимбо",
    category: "Fitness",
    description: "Управление отделом продаж фитнес-клуба. Разработка скриптов продаж, внедрение CRM, проведение тренингов для менеджеров.",
    images: [
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1000&auto=format&fit=crop"
    ]
  },
  {
    name: "Rob's Rentals",
    category: "StartUp",
    description: "Сервис проката. Разработка бизнес-модели, закупка оборудования, создание сайта и системы онлайн-бронирования, операционное управление.",
    images: [
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1000&auto=format&fit=crop"
    ]
  }
];

export const SKILLS = [
  "Business Development",
  "B2B / B2C / B2G Продажи",
  "Запуск стартапов",
  "Управление проектами",
  "AI-технологии",
  "Стратегическое планирование",
  "Переговоры",
  "Кризис-менеджмент"
];