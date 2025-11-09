import { useMemo, useState } from "react";
import "./App.css";

const dataModules = import.meta.glob("@data/**/*.json", { eager: true });

const CATEGORY_LABELS = {
  bones: "Bone",
  muscles: "Muscle",
};

const KEY_OVERRIDES = {
  bone_id: "Bone ID",
  desc: "Description",
  id: "ID",
  landmark_id: "Landmark ID",
  url: "URL",
};

function toTitleCase(text) {
  return text
    .replace(/[._-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .replace(/\bId\b/g, "ID");
}

function formatKey(key) {
  return KEY_OVERRIDES[key] ?? toTitleCase(key);
}

function getPrimaryName(record, fallback) {
  if (typeof record?.name === "string") {
    return record.name;
  }

  if (typeof record?.name?.name === "string") {
    return record.name.name;
  }

  return fallback;
}

function normalizeEntry([pathKey, module]) {
  const jsonData = module?.default ?? module;
  const normalizedPath = pathKey.replaceAll("\\", "/");
  const segments = normalizedPath.split("/");
  const fileName = segments[segments.length - 1] ?? "";
  const categorySegment = segments[segments.length - 2] ?? "";
  const slug = fileName.replace(/\.json$/i, "");
  const categoryLabel = CATEGORY_LABELS[categorySegment] ?? toTitleCase(categorySegment);

  const primaryName = getPrimaryName(jsonData, toTitleCase(slug));

  return {
    key: `${categorySegment}/${slug}`,
    category: categoryLabel,
    categorySegment,
    slug,
    label: `${primaryName} · ${categoryLabel}`,
    primaryName,
    data: jsonData ?? {},
  };
}

function renderValue(value) {
  if (value === null || value === undefined) {
    return <span className="muted">—</span>;
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return <span className="muted">None listed</span>;
    }

    return (
      <ul className="value-list">
        {value.map((entry, index) => (
          <li key={index}>{renderValue(entry)}</li>
        ))}
      </ul>
    );
  }

  if (typeof value === "object") {
    const entries = Object.entries(value);

    if (entries.length === 0) {
      return <span className="muted">None listed</span>;
    }

    return (
      <dl className="value-dl">
        {entries.map(([key, nestedValue]) => (
          <div key={key} className="value-row">
            <dt>{formatKey(key)}</dt>
            <dd>{renderValue(nestedValue)}</dd>
          </div>
        ))}
      </dl>
    );
  }

  return <span>{String(value)}</span>;
}

function App() {
  const entries = useMemo(
    () =>
      Object.entries(dataModules)
        .map(normalizeEntry)
        .sort((a, b) => {
          if (a.categorySegment === b.categorySegment) {
            return a.label.localeCompare(b.label);
          }
          return a.categorySegment.localeCompare(b.categorySegment);
        }),
    [],
  );

  const [searchValue, setSearchValue] = useState(entries[0]?.label ?? "");
  const [selectedKey, setSelectedKey] = useState(entries[0]?.key ?? "");

  const selectedEntry = useMemo(
    () => entries.find((entry) => entry.key === selectedKey),
    [entries, selectedKey],
  );

  const selectedRecordTranslations = Object.entries(
    selectedEntry?.data?.name?.translations ?? {},
  );

  const handleSelection = (event) => {
    const { value } = event.target;
    setSearchValue(value);

    const normalizedValue = value.trim().toLowerCase();

    const exactMatch = entries.find(
      (entry) => entry.label.toLowerCase() === normalizedValue,
    );

    if (exactMatch) {
      setSelectedKey(exactMatch.key);
      return;
    }

    if (normalizedValue.length > 1) {
      const partialMatch = entries.find((entry) =>
        entry.label.toLowerCase().includes(normalizedValue),
      );

      if (partialMatch) {
        setSelectedKey(partialMatch.key);
      }
    }
  };

  return (
    <div className="app-shell">
      <header className="page-header">
        <h1>Artistic Anatomy Data Explorer</h1>
        <p>
          Browse the curated bones and muscles stored in the repository&apos;s data
          directory. Start typing to filter the dropdown, then review the
          anatomical details pulled straight from the JSON source.
        </p>
      </header>

      <section className="selector">
        <label htmlFor="anatomy-input" className="selector-label">
          Choose an entry
        </label>
        <input
          id="anatomy-input"
          className="selector-input"
          list="anatomy-options"
          placeholder="Search bones or muscles"
          value={searchValue}
          onChange={handleSelection}
        />
        <datalist id="anatomy-options">
          {entries.map((entry) => (
            <option key={entry.key} value={entry.label} />
          ))}
        </datalist>
      </section>

      {!entries.length && (
        <p className="muted">No anatomy data found in the repository.</p>
      )}

      {entries.length > 0 && !selectedEntry && (
        <p className="muted">
          No matching entry. Select a value from the dropdown to view its
          details.
        </p>
      )}

      {selectedEntry && (
        <article className="data-card" aria-live="polite">
          <header className="data-card-header">
            <span className="detail-chip">{selectedEntry.category}</span>
            <h2>{selectedEntry.primaryName}</h2>
            {selectedEntry.data.description && (
              <p className="data-summary">{selectedEntry.data.description}</p>
            )}
            {selectedRecordTranslations.length > 0 && (
              <ul className="translation-list">
                {selectedRecordTranslations.map(([locale, translation]) => (
                  <li key={locale}>
                    <span className="translation-locale">{locale.toUpperCase()}</span>
                    <span className="translation-text">{translation}</span>
                  </li>
                ))}
              </ul>
            )}
          </header>

          <section className="data-meta">
            <dl className="meta-list">
              <div className="meta-row">
                <dt>Identifier</dt>
                <dd>{selectedEntry.data.id}</dd>
              </div>
              {selectedEntry.data.status && (
                <div className="meta-row">
                  <dt>Status</dt>
                  <dd>{toTitleCase(selectedEntry.data.status)}</dd>
                </div>
              )}
              {selectedEntry.data.icon && (
                <div className="meta-row">
                  <dt>Icon</dt>
                  <dd>{toTitleCase(selectedEntry.data.icon)}</dd>
                </div>
              )}
              {selectedEntry.data.url && (
                <div className="meta-row">
                  <dt>URL</dt>
                  <dd>
                    <a href={selectedEntry.data.url}>{selectedEntry.data.url}</a>
                  </dd>
                </div>
              )}
            </dl>

            {selectedEntry.data.doc && (
              <section className="doc-section" aria-label="Document metadata">
                <h3>Document metadata</h3>
                <dl className="meta-list">
                  {selectedEntry.data.doc.title && (
                    <div className="meta-row">
                      <dt>Document title</dt>
                      <dd>{selectedEntry.data.doc.title}</dd>
                    </div>
                  )}
                  {selectedEntry.data.doc.author && (
                    <div className="meta-row">
                      <dt>Author</dt>
                      <dd>{selectedEntry.data.doc.author}</dd>
                    </div>
                  )}
                  {selectedEntry.data.doc.pubdate && (
                    <div className="meta-row">
                      <dt>Published</dt>
                      <dd>{selectedEntry.data.doc.pubdate}</dd>
                    </div>
                  )}
                </dl>
                {selectedEntry.data.doc.breadcrumbs?.length ? (
                  <ol className="breadcrumb-list">
                    {selectedEntry.data.doc.breadcrumbs.map((crumb, index) => (
                      <li key={`${crumb.title}-${index}`}>
                        {crumb.url ? (
                          <a href={crumb.url}>{crumb.title}</a>
                        ) : (
                          <span>{crumb.title}</span>
                        )}
                      </li>
                    ))}
                  </ol>
                ) : null}
              </section>
            )}
          </section>

          <section className="data-sections">
            {(
              ["actions", "origins", "insertions", "landmarks", "tags"]
            ).map((field) => {
              const value = selectedEntry.data[field];
              if (
                value === undefined ||
                value === null ||
                (Array.isArray(value) && value.length === 0)
              ) {
                return null;
              }

              return (
                <section key={field} className="detail-section">
                  <h3>{toTitleCase(field)}</h3>
                  {renderValue(value)}
                </section>
              );
            })}
          </section>
        </article>
      )}
    </div>
  );
}

export default App;
