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

function getCategoryLabel(segment) {
  return CATEGORY_LABELS[segment] ?? segment;
}

function getModuleData(module) {
  return module?.default ?? module ?? {};
}

function parseEntryPath(pathKey) {
  const normalized = pathKey.replaceAll("\\", "/");
  const segments = normalized.split("/");
  const fileName = segments[segments.length - 1] ?? "";
  const categorySegment = segments[segments.length - 2] ?? "";

  return { fileName, categorySegment };
}

function createSlug(fileName) {
  return fileName.replace(/\.json$/i, "");
}

function createEntryLabel(primaryName, categoryLabel) {
  return `${primaryName} · ${categoryLabel}`;
}

function getLandmarkAnchorId(rawId) {
  if (typeof rawId !== "string") {
    return undefined;
  }

  const trimmedId = rawId.trim();

  if (!trimmedId) {
    return undefined;
  }

  const sanitized = trimmedId.replace(/\s+/g, "-");

  return sanitized ? `landmark-${sanitized}` : undefined;
}

function buildEntryIndex(entries) {
  const map = new Map();

  for (const entry of entries) {
    const entryId =
      typeof entry?.data?.id === "string" ? entry.data.id.trim() : "";

    if (entryId) {
      map.set(entryId, entry);
    }
  }

  return map;
}

function buildLandmarkEntryIndex(entries) {
  const map = new Map();

  for (const entry of entries) {
    const landmarks = Array.isArray(entry?.data?.landmarks)
      ? entry.data.landmarks
      : [];

    for (const landmark of landmarks) {
      const landmarkId =
        typeof landmark?.id === "string" ? landmark.id.trim() : "";
      const anchorId = getLandmarkAnchorId(landmarkId);

      if (landmarkId && anchorId) {
        map.set(landmarkId, { entry, anchorId });
      }
    }
  }

  return map;
}

function buildLandmarkAnchors(selectedEntry) {
  const map = new Map();

  if (!selectedEntry) {
    return map;
  }

  const landmarks = Array.isArray(selectedEntry.data?.landmarks)
    ? selectedEntry.data.landmarks
    : [];

  for (const landmark of landmarks) {
    const landmarkId =
      typeof landmark?.id === "string" ? landmark.id.trim() : "";
    const anchorId = getLandmarkAnchorId(landmarkId);

    if (landmarkId && anchorId) {
      map.set(landmarkId, anchorId);
    }
  }

  return map;
}

function getLandmarkListItemMeta(landmark, index) {
  const rawId =
    typeof landmark?.id === "string" ? landmark.id.trim() : String(index);
  const anchorId = getLandmarkAnchorId(rawId);
  const listKey = rawId || String(index);

  return { anchorId, listKey };
}

function getInitialInput(entries) {
  return entries[0]?.label ?? "";
}

function findExactEntry(entries, query) {
  return entries.find(
    (entry) => entry.label.toLowerCase() === query.toLowerCase(),
  );
}

function findPartialEntry(entries, query) {
  return entries.find((entry) =>
    entry.label.toLowerCase().includes(query.toLowerCase()),
  );
}

function findMatchingEntry(entries, query) {
  if (!query) {
    return null;
  }

  const lowered = query.trim().toLowerCase();

  if (!lowered) {
    return null;
  }

  const exactMatch = findExactEntry(entries, lowered);

  if (exactMatch) {
    return exactMatch;
  }

  if (lowered.length > 1) {
    return findPartialEntry(entries, lowered);
  }

  return null;
}

function shouldAllowLinks(contextKey, linkifyIds) {
  if (!linkifyIds) {
    return false;
  }

  if (!contextKey) {
    return true;
  }

  return (
    !isIdKey(contextKey) || LINKABLE_ID_KEYS.has(canonicalizeIdKey(contextKey))
  );
}

function getEntryScrollTarget(entry, options, fallback) {
  if (options.scrollTo) {
    return options.scrollTo;
  }

  if (!entry) {
    return null;
  }

  const isAnatomyEntry =
    entry.categorySegment === "bones" || entry.categorySegment === "muscles";

  return isAnatomyEntry ? fallback : null;
}

function runScrollTarget(scrollTarget) {
  if (!scrollTarget) {
    return;
  }

  if (typeof requestAnimationFrame === "function") {
    requestAnimationFrame(scrollTarget);
    return;
  }

  scrollTarget();
}

function scrollLandmarkIntoView(anchorId, attemptsLeft = 6) {
  if (typeof document === "undefined") {
    return;
  }

  const element = document.getElementById(anchorId);

  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });

    if (typeof element.focus === "function") {
      element.focus({ preventScroll: true });
    }

    if (typeof window !== "undefined" && window.history?.replaceState) {
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
    requestAnimationFrame(() =>
      scrollLandmarkIntoView(anchorId, attemptsLeft - 1),
    );
  }
}

function compareEntries(a, b) {
  if (a.categorySegment === b.categorySegment) {
    return a.label.localeCompare(b.label);
  }

  return a.categorySegment.localeCompare(b.categorySegment);
}

function loadEntries() {
  return Object.entries(dataModules).map(normalizeEntry);
}

function getSortedEntries() {
  return loadEntries().sort(compareEntries);
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
      <Typography variant="overline" component="span" sx={{ display: "block" }}>
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
        <Typography color="text.secondary">{entry.data.description}</Typography>
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
        const { anchorId, listKey } = getLandmarkListItemMeta(landmark, index);

        return (
          <Box
            key={listKey}
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
  const nameRecord = record?.name;

  if (typeof nameRecord === "string") {
    return nameRecord;
  }

  if (
    nameRecord &&
    typeof nameRecord === "object" &&
    typeof nameRecord.name === "string"
  ) {
    return nameRecord.name;
  }

  return fallback;
}

function normalizeEntry([pathKey, module]) {
  const jsonData = getModuleData(module);
  const { fileName, categorySegment } = parseEntryPath(pathKey);
  const slug = createSlug(fileName);
  const categoryLabel = getCategoryLabel(categorySegment);
  const primaryName = getPrimaryName(jsonData, slug);

  return {
    key: `${categorySegment}/${slug}`,
    category: categoryLabel,
    categorySegment,
    slug,
    label: createEntryLabel(primaryName, categoryLabel),
    primaryName,
    data: jsonData,
  };
}

function App() {
  const entries = useMemo(() => getSortedEntries(), []);
  const [inputValue, setInputValue] = useState(getInitialInput(entries));
  const [debouncedInput, setDebouncedInput] = useState("");
  const [, startTransition] = useTransition();

  const entryById = useMemo(() => buildEntryIndex(entries), [entries]);
  const landmarkEntryIndex = useMemo(
    () => buildLandmarkEntryIndex(entries),
    [entries],
  );

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

      const scrollTarget = getEntryScrollTarget(
        entry,
        options,
        scrollToEntryTitle,
      );

      runScrollTarget(scrollTarget);
    },
    [setInputValue, setDebouncedInput, startTransition, scrollToEntryTitle],
  );

  const selectedEntry = useMemo(
    () => findMatchingEntry(entries, debouncedInput),
    [debouncedInput, entries],
  );

  const landmarkAnchors = useMemo(
    () => buildLandmarkAnchors(selectedEntry),
    [selectedEntry],
  );

  const renderValue = useCallback(
    function renderValueInner(value, { contextKey, linkifyIds = true } = {}) {
      const renderMissing = (label = "None listed") => (
        <Typography component="span" variant="body2" color="text.secondary">
          {label}
        </Typography>
      );

      const renderText = (text) => (
        <Typography component="span" variant="body1">
          {text}
        </Typography>
      );

      const renderArrayValue = (items) => {
        if (!items.length) {
          return renderMissing();
        }

        return (
          <Stack component="ul" spacing={1} sx={{ m: 0, pl: 2 }}>
            {items.map((entry, index) => (
              <Box
                key={index}
                component="li"
                sx={{ listStyleType: "disc", pl: 1 }}
              >
                {renderValueInner(entry, { contextKey, linkifyIds })}
              </Box>
            ))}
          </Stack>
        );
      };

      const handleAnchorClick = (event, anchorId) => {
        if (typeof document === "undefined") {
          return;
        }

        const target = document.getElementById(anchorId);

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
          url.hash = anchorId;
          window.history.replaceState(null, "", url);
        }
      };

      const renderObjectValue = (objectValue) => {
        const entriesList = Object.entries(objectValue);

        if (!entriesList.length) {
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
                    linkifyIds: shouldAllowLinks(key, linkifyIds),
                  })}
                </Box>
              </Box>
            ))}
          </Stack>
        );
      };

      const renderEntryLink = (trimmedValue) => {
        const linkedEntry = entryById.get(trimmedValue);

        if (!linkedEntry) {
          return null;
        }

        return (
          <Link
            component="button"
            type="button"
            underline="hover"
            onClick={() => selectEntry(linkedEntry)}
            aria-label={`View record for ${trimmedValue}`}
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
      };

      const renderLandmarkAnchor = (trimmedValue) => {
        const anchorId = landmarkAnchors.get(trimmedValue);

        if (!anchorId) {
          return null;
        }

        return (
          <Link
            href={`#${anchorId}`}
            underline="hover"
            onClick={(event) => handleAnchorClick(event, anchorId)}
          >
            {trimmedValue}
          </Link>
        );
      };

      const renderCrossEntryLandmark = (trimmedValue) => {
        const landmarkTarget = landmarkEntryIndex.get(trimmedValue);

        if (!landmarkTarget) {
          return null;
        }

        const { entry: targetEntry, anchorId } = landmarkTarget;

        const handleClick = () => {
          selectEntry(targetEntry, {
            scrollTo: () => scrollLandmarkIntoView(anchorId),
          });
        };

        return (
          <Link
            component="button"
            type="button"
            underline="hover"
            onClick={handleClick}
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
      };

      const renderStringValue = (rawValue) => {
        const trimmedValue = rawValue.trim();

        if (!trimmedValue) {
          return renderMissing("—");
        }

        const allowLinks = shouldAllowLinks(contextKey, linkifyIds);

        if (!allowLinks) {
          return renderText(trimmedValue);
        }

        const entryLink = renderEntryLink(trimmedValue);

        if (entryLink) {
          return entryLink;
        }

        const anchorLink = renderLandmarkAnchor(trimmedValue);

        if (anchorLink) {
          return anchorLink;
        }

        const crossEntryLandmark = renderCrossEntryLandmark(trimmedValue);

        if (crossEntryLandmark) {
          return crossEntryLandmark;
        }

        return renderText(trimmedValue);
      };

      if (value === null || value === undefined) {
        return renderMissing("—");
      }

      if (Array.isArray(value)) {
        return renderArrayValue(value);
      }

      if (typeof value === "object") {
        return renderObjectValue(value);
      }

      if (typeof value === "string") {
        return renderStringValue(value);
      }

      return renderText(String(value));
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
