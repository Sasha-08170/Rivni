import React, { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import "./Vacancies.css";

// === Конфигурация фильтров ===
const FILTER_FIELDS = [
  { name: "category", label: "Категорія" },
  { name: "department", label: "Відділ" },
  { name: "position", label: "Позиція" },
  { name: "type", label: "Тип компанії" },
  { name: "format", label: "Формат" },
];

// === Запрос к API ===
// Можно использовать локальный файл или API-асиос для сервера
// Например: /api/vacancies.json 
const fetchVacancies = async () => {
  const response = await fetch("/api/vacancies.json"); 
  if (!response.ok) throw new Error("Failed to load vacancies");
  return response.json();
};

const Vacancies = () => {
  // === React Query ===
  const {
    data: vacancies = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["vacancies"],
    queryFn: fetchVacancies,
    refetchOnWindowFocus: false, 
    staleTime: 1000 * 60 * 5,
  });

  // === Состояние фильтров ===
  const [filters, setFilters] = useState(() => {
    const saved = localStorage.getItem("vacancyFilters");
    return saved
      ? JSON.parse(saved)
      : Object.fromEntries(FILTER_FIELDS.map((f) => [f.name, ""]));
  });

  // === Поисковая строка ===
  const [searchQuery, setSearchQuery] = useState("");

  // === Синхронизация с localStorage ===
  useEffect(() => {
    localStorage.setItem("vacancyFilters", JSON.stringify(filters));
  }, [filters]);

  // === Обработка изменения фильтра ===
  const handleFilterChange = ({ target }) => {
    const { name, value } = target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // === Очистка фильтров ===
  const handleClearFilters = () => {
    const cleared = Object.fromEntries(FILTER_FIELDS.map((f) => [f.name, ""]));
    setFilters(cleared);
    setSearchQuery("");
    localStorage.removeItem("vacancyFilters");
    refetch();
  };

  // === Фильтрация и поиск ===
  const filteredVacancies = useMemo(() => {
    return vacancies.filter((v) => {
      const matchesFilters = FILTER_FIELDS.every(
        ({ name }) => !filters[name] || v[name] === filters[name]
      );
      const matchesSearch =
        v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.company.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilters && matchesSearch;
    });
  }, [vacancies, filters, searchQuery]);

  // === Состояние загрузки и ошибок ===
  if (isLoading) return <div className="vacancies__loading">Завантаження...</div>;
  if (isError) return <div className="vacancies__error">Помилка при завантаженні 😕</div>;

  // === Разметка ===
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

      <form className="vacancies__filters" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="🔍 Пошук за назвою або компанією..."
          className="vacancies__search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

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
              {[...new Set(vacancies.map((v) => v[name]))].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}

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
