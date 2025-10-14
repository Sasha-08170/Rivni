import React, { useState, useEffect } from "react";
import "./Vacancies.css";

const Vacancies = () => {
  // === Массив вакансий ===
  const vacanciesData = [
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
    {
      id: 4,
      company: "BizPro",
      location: "Kharkiv",
      title: "Sales Manager",
      salary: "1200$ + бонуси",
      badge: "Top",
      category: "Продажі",
      department: "Комерція",
      position: "Sales Manager",
      type: "Агентство",
      format: "Офіс",
      description: {
        position: "Менеджер з продажу",
        location: "офіс (Харків)",
        format: "повна зайнятість",
        lookingFor:
          "Активного спеціаліста, який вміє працювати з клієнтами, вести переговори та досягати KPI.",
      },
    },
    {
      id: 5,
      company: "TechMind",
      location: "Odessa",
      title: "QA Engineer",
      salary: "1300$",
      badge: "Hot",
      category: "IT",
      department: "Тестування",
      position: "QA Engineer",
      type: "Продуктова компанія",
      format: "Віддалено",
      description: {
        position: "Middle QA Engineer",
        location: "віддалено",
        format: "повна зайнятість",
        lookingFor:
          "Шукаємо QA спеціаліста, який має досвід у ручному тестуванні веб-додатків.",
      },
    },
    {
      id: 6,
      company: "AdVision",
      location: "Dnipro",
      title: "SMM Specialist",
      salary: "800$",
      badge: "New",
      category: "Маркетинг",
      department: "Реклама",
      position: "SMM Specialist",
      type: "Агентство",
      format: "Гібрид",
      description: {
        position: "SMM Specialist (Instagram, TikTok)",
        location: "офіс або віддалено",
        format: "гібридна робота",
        lookingFor:
          "Маєш креатив і вмієш працювати з аналітикою — welcome в команду!",
      },
    },
    {
      id: 7,
      company: "BrightTeam",
      location: "Kyiv",
      title: "Project Manager",
      salary: "2200$",
      badge: "Top",
      category: "IT",
      department: "Менеджмент",
      position: "Project Manager",
      type: "Продуктова компанія",
      format: "Гібрид",
      description: {
        position: "PM Middle/Senior",
        location: "офіс або гібрид (Київ)",
        format: "повна зайнятість",
        lookingFor:
          "Досвід керування IT-командою, володіння Jira, Scrum, Agile. Вітається сертифікація PMP.",
      },
    },
    {
      id: 8,
      company: "MarketIQ",
      location: "Poland / Remote",
      title: "SEO Specialist",
      salary: "1400$",
      badge: "Active",
      category: "Маркетинг",
      department: "SEO",
      position: "SEO Specialist",
      type: "Агентство",
      format: "Віддалено",
      description: {
        position: "SEO Specialist (Linkbuilding + Content)",
        location: "віддалено",
        format: "повна зайнятість",
        lookingFor:
          "Потрібен SEO спеціаліст із досвідом побудови стратегії та оптимізації сайтів під різні ринки.",
      },
    },
  ];

  // === Состояние фильтров ===
  const [filters, setFilters] = useState(() => {
    const saved = localStorage.getItem("vacancyFilters");
    return saved
      ? JSON.parse(saved)
      : { category: "", department: "", position: "", type: "", format: "" };
  });

  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("vacancyFilters", JSON.stringify(filters));
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleClear = () => {
    const cleared = {
      category: "",
      department: "",
      position: "",
      type: "",
      format: "",
    };
    setFilters(cleared);
    setSearch("");
    localStorage.removeItem("vacancyFilters");
  };

  // === Фильтрация ===
  const filteredVacancies = vacanciesData.filter((v) => {
    const matchesFilters =
      (!filters.category || v.category === filters.category) &&
      (!filters.department || v.department === filters.department) &&
      (!filters.position || v.position === filters.position) &&
      (!filters.type || v.type === filters.type) &&
      (!filters.format || v.format === filters.format);

    const matchesSearch =
      v.title.toLowerCase().includes(search.toLowerCase()) ||
      v.company.toLowerCase().includes(search.toLowerCase());

    return matchesFilters && matchesSearch;
  });

  return (
    <section className="vacancies">
      <div className="vacancies__breadcrumbs">
        <a href="#" className="vacancies__link">
          Головна
        </a>
        <span className="vacancies__separator">›</span>
        <span className="vacancies__current">Вакансії</span>
      </div>

      <h1 className="vacancies__title">Пошук вакансій</h1>

      {/* === Форма фильтра === */}
      <form className="vacancies__filters" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="🔍 Пошук за назвою або компанією..."
          className="vacancies__search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {["category", "department", "position", "type", "format"].map(
          (name) => (
            <div className="vacancies__filter" key={name}>
              <label className="vacancies__label">
                {name === "category"
                  ? "Категорія"
                  : name === "department"
                  ? "Відділ"
                  : name === "position"
                  ? "Позиція"
                  : name === "type"
                  ? "Тип компанії"
                  : "Формат"}
              </label>
              <select
                name={name}
                className="vacancies__select"
                value={filters[name]}
                onChange={handleFilterChange}
              >
                <option value="">Усі</option>
                {[...new Set(vacanciesData.map((v) => v[name]))].map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          )
        )}

        <div className="vacancies__actions">
          <button type="submit" className="vacancies__button">
            🔎 Шукати
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="vacancies__button vacancies__button--clear"
          >
            ❌ Очистити
          </button>
        </div>
      </form>

      {/* === Список вакансій === */}
      <div className="vacancies__list">
        {filteredVacancies.length > 0 ? (
          filteredVacancies.map((v) => (
            <div key={v.id} className="vacancy-card">
              <div className="vacancy-card__header">
                <span className="vacancy-card__company">{v.company}</span>
                <span className="vacancy-card__location">{v.location}</span>
                <span className="vacancy-card__badge">{v.badge}</span>
              </div>
              <h2 className="vacancy-card__position">{v.title}</h2>
              <div className="vacancy-card__salary">{v.salary}</div>
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

