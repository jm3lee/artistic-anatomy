import { useCallback, useMemo, useState, useTransition } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const dataModules = import.meta.glob("@data/**/*.json", { eager: true });

const CATEGORY_LABELS = {
  bones: "Bone",
  muscles: "Muscle",
};

const LINKABLE_ID_KEYS = new Set(["bone_id", "muscle_id", "landmark_id"]);

function normalizeKey(key) {
  return typeof key === "string" ? key.trim().toLowerCase() : "";
}

function canonicalizeIdKey(key) {
  return normalizeKey(key).replace(/[-\s]+/g, "_");
}

function isIdKey(key) {
  if (typeof key !== "string") {
    return false;
  }

  const normalized = normalizeKey(key);
  return (
    normalized === "id" ||
    normalized.endsWith("_id") ||
    normalized.endsWith("-id") ||
    normalized.endsWith(" id")
  );
}

function TranslationItem({ locale, translation }) {
  return (
    <Box
      sx={{
        border: 1,
        borderColor: "divider",
        borderRadius: 1,
        px: 1.5,
        py: 1,
      }}
    >
      <Typography
        variant="overline"
        component="span"
        sx={{ display: "block" }}
      >
        {locale.toUpperCase()}
      </Typography>
      <Typography variant="body2">{translation}</Typography>
    </Box>
  );
}

function TranslationList({ translations }) {
  return (
    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
      {translations.map(([locale, translation]) => (
        <TranslationItem
          key={locale}
          locale={locale}
          translation={translation}
        />
      ))}
    </Stack>
  );
}

function EntrySummary({ entry, translations }) {
  return (
    <Stack spacing={1.5}>
      <Chip
        label={entry.category}
        size="small"
        sx={{ alignSelf: "flex-start" }}
      />
      <Typography
        id="entry-title"
        variant="h4"
        component="h2"
        tabIndex={-1}
        sx={{ outline: "none" }}
      >
        {entry.primaryName}
      </Typography>
      {entry.data.description ? (
        <Typography color="text.secondary">
          {entry.data.description}
        </Typography>
      ) : null}
      {translations.length > 0 ? (
        <TranslationList translations={translations} />
      ) : null}
    </Stack>
  );
}

function EntryDetails({ entry }) {
  const details = [
    {
      key: "id",
      label: "id",
      content: (
        <Typography component="span" variant="body1">
          {entry.data.id}
        </Typography>
      ),
      isVisible: true,
    },
    {
      key: "status",
      label: "status",
      content: <Typography variant="body1">{entry.data.status}</Typography>,
      isVisible: Boolean(entry.data.status),
    },
    {
      key: "icon",
      label: "icon",
      content: <Typography variant="body1">{entry.data.icon}</Typography>,
      isVisible: Boolean(entry.data.icon),
    },
    {
      key: "url",
      label: "url",
      content: entry.data.url ? (
        <Link href={entry.data.url}>{entry.data.url}</Link>
      ) : null,
      isVisible: Boolean(entry.data.url),
    },
  ];

  return (
    <Stack spacing={2}>
      {details
        .filter(({ isVisible }) => isVisible)
        .map(({ key, label, content }) => (
          <Box key={key}>
            <Typography variant="overline" sx={{ display: "block" }}>
              {label}
            </Typography>
            {content}
          </Box>
        ))}
    </Stack>
  );
}

function DocumentMetadata({ doc }) {
  const metadataFields = [
    {
      key: "title",
      value: doc.title,
    },
    {
      key: "author",
      value: doc.author,
    },
    {
      key: "pubdate",
      value: doc.pubdate,
    },
  ];

  return (
    <Stack spacing={2}>
      <Typography variant="h6" component="h3">
        doc
      </Typography>
      <Stack spacing={2}>
        {metadataFields
          .filter(({ value }) => Boolean(value))
          .map(({ key, value }) => (
            <Box key={key}>
              <Typography variant="overline" sx={{ display: "block" }}>
                {key}
              </Typography>
              <Typography variant="body1">{value}</Typography>
            </Box>
          ))}
      </Stack>
      {doc.breadcrumbs?.length ? (
        <BreadcrumbTrail breadcrumbs={doc.breadcrumbs} />
      ) : null}
    </Stack>
  );
}

function BreadcrumbTrail({ breadcrumbs }) {
  return (
    <Breadcrumbs separator="›" aria-label="Document breadcrumbs">
      {breadcrumbs.map((crumb, index) =>
        crumb.url ? (
          <Link key={`${crumb.title}-${index}`} href={crumb.url}>
            {crumb.title}
          </Link>
        ) : (
          <Typography key={`${crumb.title}-${index}`} color="text.primary">
            {crumb.title}
          </Typography>
        ),
      )}
    </Breadcrumbs>
  );
}

function LandmarkList({ landmarks, renderValue, parentKey }) {
  if (!Array.isArray(landmarks) || landmarks.length === 0) {
    return (
      <Typography component="span" variant="body2" color="text.secondary">
        None listed
      </Typography>
    );
  }

  return (
    <Stack component="ul" spacing={1} sx={{ m: 0, pl: 2 }}>
      {landmarks.map((landmark, index) => {
        const rawId = landmark?.id;
        const trimmedId =
          typeof rawId === "string" ? rawId.trim() : String(index);
        const sanitizedId = trimmedId.replace(/\s+/g, "-");
        const anchorId = sanitizedId ? `landmark-${sanitizedId}` : undefined;

        return (
          <Box
            key={trimmedId || index}
            component="li"
            id={anchorId}
            tabIndex={anchorId ? -1 : undefined}
            sx={{
              listStyleType: "disc",
              pl: 1,
              scrollMarginTop: (theme) => theme.spacing(8),
              outline: "none",
            }}
          >
            {renderValue(landmark, { contextKey: parentKey })}
          </Box>
        );
      })}
    </Stack>
  );
}

function AdditionalDetailSections({ detailSections, renderValue }) {
  return (
    <Stack spacing={3}>
      {detailSections.map(({ field, value }) => (
        <Box key={field}>
          <Typography variant="h6" component="h3" gutterBottom>
            {field}
          </Typography>
          {field === "landmarks" ? (
            <LandmarkList
              landmarks={value}
              renderValue={renderValue}
              parentKey={field}
            />
          ) : (
            renderValue(value, { contextKey: field })
          )}
        </Box>
      ))}
    </Stack>
  );
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
  const categoryLabel =
    CATEGORY_LABELS[categorySegment] ?? categorySegment;

  const primaryName = getPrimaryName(jsonData, slug);

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

  const [inputValue, setInputValue] = useState(entries[0]?.label ?? "");

  const [debouncedInput, setDebouncedInput] = useState("");
  const [, startTransition] = useTransition();

  const entryById = useMemo(() => {
    const map = new Map();

    for (const entry of entries) {
      const entryId = entry?.data?.id;

      if (typeof entryId === "string" && entryId.trim()) {
        map.set(entryId, entry);
      }
    }

    return map;
  }, [entries]);

  const landmarkEntryIndex = useMemo(() => {
    const map = new Map();

    for (const entry of entries) {
      const landmarks = entry?.data?.landmarks;

      if (!Array.isArray(landmarks)) {
        continue;
      }

      for (const landmark of landmarks) {
        const rawId =
          typeof landmark?.id === "string" ? landmark.id.trim() : "";

        if (!rawId) {
          continue;
        }

        const sanitizedId = rawId.replace(/\s+/g, "-");

        map.set(rawId, {
          entry,
          anchorId: `landmark-${sanitizedId}`,
        });
      }
    }

    return map;
  }, [entries]);

  const scrollToEntryTitle = useCallback(() => {
    if (typeof document === "undefined") {
      return;
    }

    const titleElement = document.getElementById("entry-title");

    if (!titleElement) {
      return;
    }

    titleElement.scrollIntoView({ behavior: "smooth", block: "start" });

    if (typeof titleElement.focus === "function") {
      titleElement.focus({ preventScroll: true });
    }
  }, []);

  const selectEntry = useCallback(
    (entry, options = {}) => {
      if (!entry) {
        return;
      }

      setInputValue(entry.label);
      startTransition(() => {
        setDebouncedInput(entry.label.trim().toLowerCase());
      });

      const scrollTarget =
        options.scrollTo ??
        (entry.categorySegment === "bones" || entry.categorySegment === "muscles"
          ? scrollToEntryTitle
          : null);

      if (scrollTarget) {
        if (typeof requestAnimationFrame === "function") {
          requestAnimationFrame(scrollTarget);
        } else {
          scrollTarget();
        }
      }
    },
    [setInputValue, setDebouncedInput, startTransition, scrollToEntryTitle],
  );

  const selectedEntry = useMemo(() => {
    if (!debouncedInput) {
      return null;
    }

    const exactMatch = entries.find(
      (entry) => entry.label.toLowerCase() === debouncedInput,
    );

    if (exactMatch) {
      return exactMatch;
    }

    if (debouncedInput.length > 1) {
      const partialMatch = entries.find((entry) =>
        entry.label.toLowerCase().includes(debouncedInput),
      );

      if (partialMatch) {
        return partialMatch;
      }
    }

    return null;
  }, [debouncedInput, entries]);

  const landmarkAnchors = useMemo(() => {
    // Precompute landmark ids so attachments can scroll to matching sections.
    const map = new Map();

    if (!selectedEntry) {
      return map;
    }

    for (const landmark of selectedEntry.data?.landmarks ?? []) {
      const landmarkId =
        typeof landmark?.id === "string" ? landmark.id.trim() : "";

      if (landmarkId) {
        const sanitizedId = landmarkId.replace(/\s+/g, "-");

        map.set(landmarkId, `landmark-${sanitizedId}`);
      }
    }

    return map;
  }, [selectedEntry]);

  // renderValue normalizes arbitrary JSON into typography, links, or lists.
  const renderValue = useCallback(
    function renderValueInner(value, { contextKey, linkifyIds = true } = {}) {
      // Shared helper keeps empty states consistent across data shapes.
      const renderMissing = (label = "None listed") => (
        <Typography component="span" variant="body2" color="text.secondary">
          {label}
        </Typography>
      );

      if (value === null || value === undefined) {
        return renderMissing("—");
      }

      if (Array.isArray(value)) {
        if (value.length === 0) {
          return renderMissing();
        }

        return (
          <Stack component="ul" spacing={1} sx={{ m: 0, pl: 2 }}>
            {value.map((entry, index) => (
              <Box
                key={index}
                component="li"
                sx={{ listStyleType: "disc", pl: 1 }}
              >
                {renderValueInner(entry, {
                  contextKey,
                  linkifyIds,
                })}
              </Box>
            ))}
          </Stack>
        );
      }

      if (typeof value === "object") {
        const entriesList = Object.entries(value);

        if (entriesList.length === 0) {
          return renderMissing();
        }

        return (
          <Stack component="dl" spacing={1.5} sx={{ m: 0 }}>
            {entriesList.map(([key, nestedValue]) => (
              <Box key={key} component="div">
                <Typography
                  component="dt"
                  variant="overline"
                  sx={{ display: "block" }}
                >
                  {key}
                </Typography>
                <Box component="dd" sx={{ m: 0 }}>
                  {renderValueInner(nestedValue, {
                    contextKey: key,
                    linkifyIds:
                      linkifyIds &&
                      (!isIdKey(key) ||
                        LINKABLE_ID_KEYS.has(canonicalizeIdKey(key))),
                  })}
                </Box>
              </Box>
            ))}
          </Stack>
        );
      }

      if (typeof value === "string") {
        const trimmedValue = value.trim();

        if (!trimmedValue) {
          return renderMissing("—");
        }

        const normalizedContextKey = canonicalizeIdKey(contextKey);
        const allowLinks =
          linkifyIds &&
          (!isIdKey(contextKey) || LINKABLE_ID_KEYS.has(normalizedContextKey));

        if (allowLinks) {
          const linkedEntry = entryById.get(trimmedValue);

          if (linkedEntry) {
            const displayLabel = trimmedValue;

            return (
              <Link
                component="button"
                type="button"
                underline="hover"
                onClick={() => selectEntry(linkedEntry)}
                aria-label={`View record for ${displayLabel}`}
                title={trimmedValue}
                sx={{
                  cursor: "pointer",
                  p: 0,
                  fontSize: "inherit",
                  fontWeight: "inherit",
                  fontFamily: "inherit",
                  textAlign: "left",
                }}
              >
                {displayLabel}
              </Link>
            );
          }
        }

        const landmarkAnchorId = allowLinks
          ? landmarkAnchors.get(trimmedValue)
          : undefined;

        if (landmarkAnchorId) {
          return (
            <Link
              href={`#${landmarkAnchorId}`}
              underline="hover"
              onClick={(event) => {
                if (typeof document === "undefined") {
                  return;
                }

                const target = document.getElementById(landmarkAnchorId);

                if (!target) {
                  return;
                }

                event.preventDefault();
                target.scrollIntoView({ behavior: "smooth", block: "start" });

                if (typeof target.focus === "function") {
                  target.focus({ preventScroll: true });
                }

                if (
                  typeof window !== "undefined" &&
                  window.history?.replaceState
                ) {
                  const url = new URL(window.location.href);
                  url.hash = landmarkAnchorId;
                  window.history.replaceState(null, "", url);
                }
              }}
            >
              {trimmedValue}
            </Link>
          );
        }

        if (allowLinks) {
          const landmarkTarget = landmarkEntryIndex.get(trimmedValue);

          if (landmarkTarget) {
            const { entry: targetEntry, anchorId } = landmarkTarget;

            const scrollToLandmark = () => {
              if (typeof document === "undefined") {
                return;
              }

              const runScroll = (attemptsLeft = 6) => {
                const element = document.getElementById(anchorId);

                if (element) {
                  element.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });

                  if (typeof element.focus === "function") {
                    element.focus({ preventScroll: true });
                  }

                  if (
                    typeof window !== "undefined" &&
                    window.history?.replaceState
                  ) {
                    const url = new URL(window.location.href);
                    url.hash = anchorId;
                    window.history.replaceState(null, "", url);
                  }

                  return;
                }

                if (
                  attemptsLeft > 0 &&
                  typeof requestAnimationFrame === "function"
                ) {
                  requestAnimationFrame(() => runScroll(attemptsLeft - 1));
                }
              };

              if (typeof requestAnimationFrame === "function") {
                requestAnimationFrame(() => runScroll());
              } else {
                runScroll();
              }
            };

            return (
              <Link
                component="button"
                type="button"
                underline="hover"
                onClick={() => {
                  selectEntry(targetEntry, {
                    scrollTo: scrollToLandmark,
                  });
                }}
                aria-label={`View landmark ${trimmedValue}`}
                title={trimmedValue}
                sx={{
                  cursor: "pointer",
                  p: 0,
                  fontSize: "inherit",
                  fontWeight: "inherit",
                  fontFamily: "inherit",
                  textAlign: "left",
                }}
              >
                {trimmedValue}
              </Link>
            );
          }
        }

        return (
          <Typography component="span" variant="body1">
            {trimmedValue}
          </Typography>
        );
      }

      return (
        <Typography component="span" variant="body1">
          {String(value)}
        </Typography>
      );
    },
    [entryById, landmarkAnchors, landmarkEntryIndex, selectEntry],
  );

  const selectedRecordTranslations = Object.entries(
    selectedEntry?.data?.name?.translations ?? {},
  );

  const detailSections = useMemo(() => {
    if (!selectedEntry) {
      return [];
    }

    const sections = [];

    if (
      selectedEntry.categorySegment === "muscles" &&
      Array.isArray(selectedEntry.data.heads) &&
      selectedEntry.data.heads.length > 0
    ) {
      // Surface muscle heads before other details so users can drill down fast.
      sections.push({ field: "heads", value: selectedEntry.data.heads });
    }

    for (const field of [
      "actions",
      "origins",
      "insertions",
      "landmarks",
      "tags",
    ]) {
      const value = selectedEntry.data[field];

      if (value === null || value === undefined) {
        continue;
      }

      if (Array.isArray(value) && value.length === 0) {
        continue;
      }

      sections.push({ field, value });
    }

    return sections;
  }, [selectedEntry]);

  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
      <Stack spacing={4}>
        <Stack spacing={1.5}>
          <Typography variant="h3" component="h1">
            Artistic Anatomy Data Explorer
          </Typography>
          <Typography color="text.secondary">
            Browse the curated bones and muscles stored in the repository&apos;s
            data directory. Start typing to filter the dropdown, then review the
            anatomical details pulled straight from the JSON source.
          </Typography>
        </Stack>

        <Autocomplete
          options={entries}
          value={selectedEntry}
          onChange={(event, newValue) => {
            if (newValue && newValue.label) {
              selectEntry(newValue);
            } else {
              setInputValue("");
            }
          }}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, value) => option.key === value?.key}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Choose an entry"
              placeholder="Search bones or muscles"
            />
          )}
          autoHighlight
          clearOnEscape
        />

        {!entries.length && (
          <Typography color="text.secondary">
            No anatomy data found in the repository.
          </Typography>
        )}

        {entries.length > 0 && !selectedEntry && inputValue.trim() && (
          <Typography color="text.secondary">
            No matching entry. Select a value from the dropdown to view its
            details.
          </Typography>
        )}

        {selectedEntry && (
          <Card variant="outlined" aria-live="polite">
            <CardContent>
              <Stack spacing={3}>
                <EntrySummary
                  entry={selectedEntry}
                  translations={selectedRecordTranslations}
                />

                <Divider />

                <EntryDetails entry={selectedEntry} />

                {selectedEntry.data.doc ? (
                  <>
                    <Divider />
                    <DocumentMetadata doc={selectedEntry.data.doc} />
                  </>
                ) : null}

                {detailSections.length > 0 ? (
                  <>
                    <Divider />
                    <AdditionalDetailSections
                      detailSections={detailSections}
                      renderValue={renderValue}
                    />
                  </>
                ) : null}
              </Stack>
            </CardContent>
          </Card>
        )}
      </Stack>
    </Container>
  );
}

export default App;
