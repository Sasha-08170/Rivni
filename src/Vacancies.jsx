import React, { useState, useEffect, useMemo } from "react";
import "./Vacancies.css";

// === Конфигурация фильтров ===
// Вынесена за пределы компонента, чтобы не пересоздавалась при каждом рендере.
// Содержит список полей, по которым выполняется фильтрация.
const FILTER_FIELDS = [
  { name: "category", label: "Категорія" },
  { name: "department", label: "Відділ" },
  { name: "position", label: "Позиція" },
  { name: "type", label: "Тип компанії" },
  { name: "format", label: "Формат" },
];

const Vacancies = () => {
  // === Данные о вакансиях ===
  // В реальном проекте эти данные обычно приходят из API.
  const vacancies = [
    {
      id: 1,
      company: "Hidden X",
      location: "Ukraine",
      title: "МЕДІАБАЙЕР",
      salary: "1000$",
      badge: "Hot",
      category: "Маркетинг",
      department: "Реклама",
      position: "Media Buyer",
      type: "Продуктова компанія",
      format: "Віддалено",
      description: {
        position: "Media Buyer (FB, Gambling)",
        location: "віддалено",
        format:
          "повна зайнятість (8 годин на день, з оперативним зв’язком із командою в робочих чатах)",
        lookingFor:
          "Шукаємо досвідченого медіабаєра, який упевнено працює з Facebook Ads, має успішні кейси та досвід по різних GEO.",
      },
    },
    {
      id: 2,
      company: "NovaLab",
      location: "Kyiv",
      title: "UI/UX Designer",
      salary: "1500$",
      badge: "New",
      category: "IT",
      department: "Дизайн",
      position: "Designer",
      type: "Агентство",
      format: "Офіс",
      description: {
        position: "UI/UX Designer",
        location: "офіс (Київ)",
        format: "повна зайнятість",
        lookingFor:
          "Маєш око до деталей і почуття стилю? Приєднуйся до нашої дизайн-команди.",
      },
    },
    {
      id: 3,
      company: "NextSoft",
      location: "Lviv",
      title: "Frontend Developer",
      salary: "2000$",
      badge: "🔥",
      category: "IT",
      department: "Розробка",
      position: "Frontend Developer",
      type: "Продуктова компанія",
      format: "Віддалено",
      description: {
        position: "React Developer",
        location: "віддалено або офіс (Львів)",
        format: "повна зайнятість",
        lookingFor:
          "Ми шукаємо React-розробника з досвідом роботи з Redux, REST API, Tailwind або Bootstrap.",
      },
    },
  ];

  // === Состояние фильтров ===
  // При первом рендере пробуем считать фильтры из localStorage (если были сохранены ранее).
  // Если нет — создаем объект с пустыми значениями для всех полей фильтрации.
  const [filters, setFilters] = useState(() => {
    const saved = localStorage.getItem("vacancyFilters");
    return saved
      ? JSON.parse(saved)
      : Object.fromEntries(FILTER_FIELDS.map((f) => [f.name, ""]));
  });

  // === Состояние строки поиска ===
  const [searchQuery, setSearchQuery] = useState("");

  // === Синхронизация фильтров с localStorage ===
  // Каждый раз при изменении фильтров — сохраняем их.
  useEffect(() => {
    localStorage.setItem("vacancyFilters", JSON.stringify(filters));
  }, [filters]);

  // === Обработчик изменения фильтра ===
  // Обновляем нужное поле фильтра по имени (name).
  const handleFilterChange = ({ target }) => {
    const { name, value } = target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // === Очистка всех фильтров ===
  // Сбрасываем состояние, очищаем localStorage и строку поиска.
  const handleClearFilters = () => {
    const cleared = Object.fromEntries(FILTER_FIELDS.map((f) => [f.name, ""]));
    setFilters(cleared);
    setSearchQuery("");
    localStorage.removeItem("vacancyFilters");
  };

  // === Основная фильтрация вакансий (useMemo) ===
  // Мемоизируем вычисления, чтобы не пересчитывать при каждом рендере.
  // Пересчет происходит только если изменились:
  //  - filters (поля фильтрации)
  //  - searchQuery (строка поиска)
  const filteredVacancies = useMemo(() => {
    return vacancies.filter((v) => {
      // Проверяем совпадения по каждому фильтру
      const matchesFilters = FILTER_FIELDS.every(
        ({ name }) => !filters[name] || v[name] === filters[name]
      );

      // Проверяем совпадение с текстом поиска
      const matchesSearch =
        v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.company.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesFilters && matchesSearch;
    });
  }, [vacancies, filters, searchQuery]);

  // === Разметка ===
  return (
    <section className="vacancies">
      {/* === Хлебные крошки === */}
      <div className="vacancies__breadcrumbs">
        <a href="#" className="vacancies__link">
          Головна
        </a>
        <span className="vacancies__separator">›</span>
        <span className="vacancies__current">Вакансії</span>
      </div>

      <h1 className="vacancies__title">Пошук вакансій</h1>

      {/* === Блок фильтрации === */}
      <form className="vacancies__filters" onSubmit={(e) => e.preventDefault()}>
        {/* Поле поиска */}
        <input
          type="text"
          placeholder="🔍 Пошук за назвою або компанією..."
          className="vacancies__search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Селекты фильтрации по каждому полю */}
        {FILTER_FIELDS.map(({ name, label }) => (
          <div className="vacancies__filter" key={name}>
            <label className="vacancies__label">{label}</label>
            <select
              name={name}
              className="vacancies__select"
              value={filters[name]}
              onChange={handleFilterChange}
            >
              <option value="">Усі</option>
              {/* Уникальные значения для каждого фильтра */}
              {[...new Set(vacancies.map((v) => v[name]))].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}

        {/* Кнопки действий */}
        <div className="vacancies__actions">
          <button type="submit" className="vacancies__button">
            🔎 Шукати
          </button>
          <button
            type="button"
            onClick={handleClearFilters}
            className="vacancies__button vacancies__button--clear"
          >
            ❌ Очистити
          </button>
        </div>
      </form>

      {/* === Список вакансий === */}
      <div className="vacancies__list">
        {filteredVacancies.length > 0 ? (
          filteredVacancies.map((v) => (
            <div key={v.id} className="vacancy-card">
              {/* Заголовок карточки */}
              <div className="vacancy-card__header">
                <span className="vacancy-card__company">{v.company}</span>
                <span className="vacancy-card__location">{v.location}</span>
                <span className="vacancy-card__badge">{v.badge}</span>
              </div>

              {/* Название позиции */}
              <h2 className="vacancy-card__position">{v.title}</h2>
              <div className="vacancy-card__salary">{v.salary}</div>

              {/* Основное описание */}
              <div className="vacancy-card__body">
                <p>
                  <strong>Вакансія:</strong> {v.description.position}
                </p>
                <p>
                  <strong>Локація:</strong> {v.description.location}
                </p>
                <p>
                  <strong>Формат:</strong> {v.description.format}
                </p>
                <p>
                  <strong>Кого шукаємо:</strong> {v.description.lookingFor}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="vacancies__empty">Нічого не знайдено 😕</div>
        )}
      </div>
    </section>
  );
};

export default Vacancies;


