import { useEffect, useMemo, useState } from "react";
import {
  Autocomplete,
  Box,
  Breadcrumbs,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

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
    return (
      <Typography component="span" variant="body2" color="text.secondary">
        —
      </Typography>
    );
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return (
        <Typography component="span" variant="body2" color="text.secondary">
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
            {renderValue(entry)}
          </Box>
        ))}
      </Stack>
    );
  }

  if (typeof value === "object") {
    const entries = Object.entries(value);

    if (entries.length === 0) {
      return (
        <Typography component="span" variant="body2" color="text.secondary">
          None listed
        </Typography>
      );
    }

    return (
      <Stack component="dl" spacing={1.5} sx={{ m: 0 }}>
        {entries.map(([key, nestedValue]) => (
          <Box key={key} component="div">
            <Typography component="dt" variant="overline" sx={{ display: "block" }}>
              {formatKey(key)}
            </Typography>
            <Box component="dd" sx={{ m: 0 }}>
              {renderValue(nestedValue)}
            </Box>
          </Box>
        ))}
      </Stack>
    );
  }

  return (
    <Typography component="span" variant="body1">
      {String(value)}
    </Typography>
  );
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
  const [selectedEntry, setSelectedEntry] = useState(entries[0] ?? null);

  const selectedRecordTranslations = Object.entries(
    selectedEntry?.data?.name?.translations ?? {},
  );

  useEffect(() => {
    const normalizedValue = inputValue.trim().toLowerCase();

    if (!normalizedValue) {
      if (selectedEntry !== null) {
        setSelectedEntry(null);
      }
      return;
    }

    const exactMatch = entries.find(
      (entry) => entry.label.toLowerCase() === normalizedValue,
    );

    if (exactMatch) {
      if (selectedEntry?.key !== exactMatch.key) {
        setSelectedEntry(exactMatch);
      }
      return;
    }

    if (normalizedValue.length > 1) {
      const partialMatch = entries.find((entry) =>
        entry.label.toLowerCase().includes(normalizedValue),
      );

      if (partialMatch) {
        if (selectedEntry?.key !== partialMatch.key) {
          setSelectedEntry(partialMatch);
        }
        return;
      }
    }

    if (selectedEntry !== null) {
      setSelectedEntry(null);
    }
  }, [entries, inputValue, selectedEntry]);

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
            Browse the curated bones and muscles stored in the repository&apos;s data
            directory. Start typing to filter the dropdown, then review the
            anatomical details pulled straight from the JSON source.
          </Typography>
        </Stack>

        <Autocomplete
          options={entries}
          value={selectedEntry}
          inputValue={inputValue}
          onChange={(event, newValue) => {
            setSelectedEntry(newValue);
            if (newValue) {
              setInputValue(newValue.label);
            }
          }}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, value) => option.key === value.key}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Choose an entry"
              placeholder="Search bones or muscles"
            />
          )}
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
                <Stack spacing={1.5}>
                  <Chip
                    label={selectedEntry.category}
                    size="small"
                    sx={{ alignSelf: "flex-start" }}
                  />
                  <Typography variant="h4" component="h2">
                    {selectedEntry.primaryName}
                  </Typography>
                  {selectedEntry.data.description && (
                    <Typography color="text.secondary">
                      {selectedEntry.data.description}
                    </Typography>
                  )}
                  {selectedRecordTranslations.length > 0 && (
                    <Stack
                      direction="row"
                      spacing={1}
                      useFlexGap
                      flexWrap="wrap"
                    >
                      {selectedRecordTranslations.map(([locale, translation]) => (
                        <Box
                          key={locale}
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
                      ))}
                    </Stack>
                  )}
                </Stack>

                <Divider />

                <Stack spacing={2}>
                  <Box>
                    <Typography variant="overline" sx={{ display: "block" }}>
                      Identifier
                    </Typography>
                    <Typography variant="body1">
                      {selectedEntry.data.id ?? "—"}
                    </Typography>
                  </Box>

                  {selectedEntry.data.status && (
                    <Box>
                      <Typography variant="overline" sx={{ display: "block" }}>
                        Status
                      </Typography>
                      <Typography variant="body1">
                        {toTitleCase(selectedEntry.data.status)}
                      </Typography>
                    </Box>
                  )}

                  {selectedEntry.data.icon && (
                    <Box>
                      <Typography variant="overline" sx={{ display: "block" }}>
                        Icon
                      </Typography>
                      <Typography variant="body1">
                        {toTitleCase(selectedEntry.data.icon)}
                      </Typography>
                    </Box>
                  )}

                  {selectedEntry.data.url && (
                    <Box>
                      <Typography variant="overline" sx={{ display: "block" }}>
                        URL
                      </Typography>
                      <Link href={selectedEntry.data.url}>{selectedEntry.data.url}</Link>
                    </Box>
                  )}
                </Stack>

                {selectedEntry.data.doc && (
                  <>
                    <Divider />
                    <Stack spacing={2}>
                      <Typography variant="h6" component="h3">
                        Document metadata
                      </Typography>

                      <Stack spacing={2}>
                        {selectedEntry.data.doc.title && (
                          <Box>
                            <Typography
                              variant="overline"
                              sx={{ display: "block" }}
                            >
                              Document title
                            </Typography>
                            <Typography variant="body1">
                              {selectedEntry.data.doc.title}
                            </Typography>
                          </Box>
                        )}

                        {selectedEntry.data.doc.author && (
                          <Box>
                            <Typography
                              variant="overline"
                              sx={{ display: "block" }}
                            >
                              Author
                            </Typography>
                            <Typography variant="body1">
                              {selectedEntry.data.doc.author}
                            </Typography>
                          </Box>
                        )}

                        {selectedEntry.data.doc.pubdate && (
                          <Box>
                            <Typography
                              variant="overline"
                              sx={{ display: "block" }}
                            >
                              Published
                            </Typography>
                            <Typography variant="body1">
                              {selectedEntry.data.doc.pubdate}
                            </Typography>
                          </Box>
                        )}
                      </Stack>

                      {selectedEntry.data.doc.breadcrumbs?.length ? (
                        <Breadcrumbs separator="›" aria-label="Document breadcrumbs">
                          {selectedEntry.data.doc.breadcrumbs.map((crumb, index) =>
                            crumb.url ? (
                              <Link key={`${crumb.title}-${index}`} href={crumb.url}>
                                {crumb.title}
                              </Link>
                            ) : (
                              <Typography
                                key={`${crumb.title}-${index}`}
                                color="text.primary"
                              >
                                {crumb.title}
                              </Typography>
                            ),
                          )}
                        </Breadcrumbs>
                      ) : null}
                    </Stack>
                  </>
                )}

                {detailSections.length > 0 && (
                  <>
                    <Divider />
                    <Stack spacing={3}>
                      {detailSections.map(({ field, value }) => (
                        <Box key={field}>
                          <Typography variant="h6" component="h3" gutterBottom>
                            {toTitleCase(field)}
                          </Typography>
                          {renderValue(value)}
                        </Box>
                      ))}
                    </Stack>
                  </>
                )}
              </Stack>
            </CardContent>
          </Card>
        )}
      </Stack>
    </Container>
  );
}

export default App;
