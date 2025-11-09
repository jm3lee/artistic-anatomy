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
      <Typography variant="h4" component="h2">
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

function EntryDetails({ entry, renderValue }) {
  const details = [
    {
      key: "id",
      label: "Identifier",
      content: <Box>{renderValue(entry.data.id)}</Box>,
      isVisible: true,
    },
    {
      key: "status",
      label: "Status",
      content: (
        <Typography variant="body1">
          {toTitleCase(entry.data.status)}
        </Typography>
      ),
      isVisible: Boolean(entry.data.status),
    },
    {
      key: "icon",
      label: "Icon",
      content: (
        <Typography variant="body1">
          {toTitleCase(entry.data.icon)}
        </Typography>
      ),
      isVisible: Boolean(entry.data.icon),
    },
    {
      key: "url",
      label: "URL",
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
      label: "Document title",
      value: doc.title,
    },
    {
      key: "author",
      label: "Author",
      value: doc.author,
    },
    {
      key: "pubdate",
      label: "Published",
      value: doc.pubdate,
    },
  ];

  return (
    <Stack spacing={2}>
      <Typography variant="h6" component="h3">
        Document metadata
      </Typography>
      <Stack spacing={2}>
        {metadataFields
          .filter(({ value }) => Boolean(value))
          .map(({ key, label, value }) => (
            <Box key={key}>
              <Typography variant="overline" sx={{ display: "block" }}>
                {label}
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

function LandmarkList({ landmarks, renderValue }) {
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
            {renderValue(landmark)}
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
            {toTitleCase(field)}
          </Typography>
          {field === "landmarks" ? (
            <LandmarkList landmarks={value} renderValue={renderValue} />
          ) : (
            renderValue(value)
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
    CATEGORY_LABELS[categorySegment] ?? toTitleCase(categorySegment);

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

  const selectEntry = useCallback(
    (entry) => {
      if (!entry) {
        return;
      }

      setInputValue(entry.label);
      startTransition(() => {
        setDebouncedInput(entry.label.trim().toLowerCase());
      });
    },
    [setInputValue, setDebouncedInput, startTransition],
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

  const renderValue = useCallback(
    function renderValueInner(value) {
      if (value === null || value === undefined) {
        return (
          <Typography
            component="span"
            variant="body2"
            color="text.secondary"
          >
            —
          </Typography>
        );
      }

      if (Array.isArray(value)) {
        if (value.length === 0) {
          return (
            <Typography
              component="span"
              variant="body2"
              color="text.secondary"
            >
              None listed
            </Typography>
          );
        }

        return (
          <Stack component="ul" spacing={1} sx={{ m: 0, pl: 2 }}>
            {value.map((entry, index) => (
              <Box
                key={index}
                component="li"
                sx={{ listStyleType: "disc", pl: 1 }}
              >
                {renderValueInner(entry)}
              </Box>
            ))}
          </Stack>
        );
      }

      if (typeof value === "object") {
        const entriesList = Object.entries(value);

        if (entriesList.length === 0) {
          return (
            <Typography
              component="span"
              variant="body2"
              color="text.secondary"
            >
              None listed
            </Typography>
          );
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
                  {formatKey(key)}
                </Typography>
                <Box component="dd" sx={{ m: 0 }}>
                  {renderValueInner(nestedValue)}
                </Box>
              </Box>
            ))}
          </Stack>
        );
      }

      if (typeof value === "string") {
        const trimmedValue = value.trim();
        const linkedEntry = entryById.get(trimmedValue);
        const landmarkAnchorId = landmarkAnchors.get(trimmedValue);

        if (linkedEntry) {
          return (
            <Link
              component="button"
              type="button"
              underline="hover"
              onClick={() => selectEntry(linkedEntry)}
              aria-label={`View record for ${linkedEntry.primaryName}`}
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
      }

      return (
        <Typography component="span" variant="body1">
          {String(value)}
        </Typography>
      );
    },
    [entryById, landmarkAnchors, selectEntry],
  );

  const selectedRecordTranslations = Object.entries(
    selectedEntry?.data?.name?.translations ?? {},
  );

  const detailSections = useMemo(() => {
    if (!selectedEntry) {
      return [];
    }

    return ["actions", "origins", "insertions", "landmarks", "tags"]
      .map((field) => ({ field, value: selectedEntry.data[field] }))
      .filter(({ value }) => {
        if (value === null || value === undefined) {
          return false;
        }
        return !(Array.isArray(value) && value.length === 0);
      });
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

                <EntryDetails entry={selectedEntry} renderValue={renderValue} />

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
