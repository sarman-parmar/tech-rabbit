import React from "react";

const CategoryFilter = ({ categories, selected, onSelect }) => {
  return (
    <ul className="category-list">
      <li
        className={selected === "all" ? "active" : ""}
        onClick={() => onSelect("all")}
      >
        All
      </li>

      {categories.map(
        (cat) =>
          typeof cat === "string" && (
            <li
              key={cat}
              className={selected === cat ? "active" : ""}
              onClick={() => onSelect(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </li>
          )
      )}
    </ul>
  );
};

export default CategoryFilter;
