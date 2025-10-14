# 🧩 Компонент `Vacancies`

Компонент **`Vacancies`** — це повнофункціональна сторінка для відображення вакансій з фільтрами, пошуком і збереженням стану в LocalStorage. Побудований на **React** з використанням **чистого CSS (BEM)**.

---

## 🚀 Основні можливості

✅ Відображення списку вакансій із ключовими даними (назва, компанія, локація, зарплата, опис).
✅ Пошук по назві вакансії або компанії.
✅ Фільтрація за кількома параметрами (категорія, відділ, позиція, тип компанії, формат роботи).
✅ Збереження обраних фільтрів у `localStorage`, щоб при перезавантаженні сторінки дані не зникали.
✅ Кнопка очищення фільтрів і пошуку.
✅ Адаптивна, зрозуміла структура з оформленням у стилі **BEM**.

---

## 🧱 Структура компоненту

```plaintext
Vacancies
├── Фільтри (форма)
│   ├── Пошуковий input
│   ├── Select для кожного параметра
│   ├── Кнопки "Шукати" і "Очистити"
│
├── Список вакансій
│   ├── VacancyCard (карточка вакансії)
│   │   ├── Назва компанії, локація, бейдж
│   │   ├── Посада, зарплата
│   │   ├── Детальний опис (формат, кого шукають)
│
└── Повідомлення "нічого не знайдено"
```

---

## ⚙️ Логіка роботи

### 1. **Ініціалізація стану**

```js
const [filters, setFilters] = useState(() => {
  const saved = localStorage.getItem("vacancyFilters");
  return saved ? JSON.parse(saved) : { category: "", department: "", position: "", type: "", format: "" };
});
```

> Використовується `lazy initialization`, щоб одразу зчитати попередні фільтри з `localStorage`.

---

### 2. **Фільтрація вакансій**

Використовується комбінація умов для кожного фільтра + текстовий пошук:

```js
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
```

---

### 3. **Збереження фільтрів**

Будь-яка зміна фільтра тригерить оновлення `localStorage`:

```js
useEffect(() => {
  localStorage.setItem("vacancyFilters", JSON.stringify(filters));
}, [filters]);
```

---

### 4. **Очищення**

Кнопка **«Очистити»** скидає всі поля і очищує localStorage:

```js
const handleClear = () => {
  setFilters({ category: "", department: "", position: "", type: "", format: "" });
  setSearch("");
  localStorage.removeItem("vacancyFilters");
};
```

---

## 💅 Стилізація

CSS-файл побудований за **BEM**-методологією:

* `vacancies` — головний блок сторінки.
* `vacancies__filters`, `vacancies__filter`, `vacancies__select` — фільтри.
* `vacancy-card` — окрема картка вакансії.

> Використовуються плавні анімації, градієнти, адаптивність і пастельна кольорова гама.

---

## 🧠 Приклад структури вакансії

```json
{
  "id": 1,
  "company": "Hidden X",
  "location": "Ukraine",
  "title": "МЕДІАБАЙЕР",
  "salary": "1000$",
  "badge": "Hot",
  "category": "Маркетинг",
  "department": "Реклама",
  "position": "Media Buyer",
  "type": "Продуктова компанія",
  "format": "Віддалено",
  "description": {
    "position": "Media Buyer (FB, Gambling)",
    "location": "віддалено",
    "format": "повна зайнятість",
    "lookingFor": "Шукаємо досвідченого медіабаєра..."
  }
}
```

---

## 🧩 Технічна інформація

| Технологія       | Використання                     |
| ---------------- | -------------------------------- |
| **React**        | Основна логіка, стани, рендеринг |
| **LocalStorage** | Збереження фільтрів між сесіями  |
| **CSS (BEM)**    | Структурована стилізація         |
| **ES6+**         | Сучасний синтаксис JS            |

---

## 🖥️ Приклад використання

```jsx
import React from "react";
import Vacancies from "./Vacancies";

const App = () => (
  <div>
    <Vacancies />
  </div>
);

export default App;
```

---

## 📸 UI Preview

🩷 **Пастельна тема:** м’які рожеві та сливові відтінки, легкі тіні, зручні поля для фільтрації.
📱 **Адаптивність:** чудово виглядає на мобільних пристроях, усі елементи стають вертикальними.
⚡ **UX:** швидке оновлення без перезавантаження, миттєва фільтрація.

---
