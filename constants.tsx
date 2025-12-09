import { Experience, Client, Skill } from './types';

export const EXPERIENCES: Experience[] = [
  {
    role: "CO-FOUNDER / PROJECT LEAD",
    company: "Сайты за 72 часа (Новый проект)",
    period: "2024 - Наст. время",
    type: "Web Production / AI"
  },
  {
    role: "BUSINESS DEVELOPMENT MGR",
    company: "ФБУ «Росконтроль» + «Молния»",
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
    company: "Rob's Rentals (Стартап)",
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

// Используем названия проектов вместо логотипов
export const CLIENTS: string[] = [
  "Росконтроль", "Молния", "Росстрой", 
  "Парк Отель", "FINT Club", "Chillin Place", 
  "Akimbo Fit", "Rob's Rentals"
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