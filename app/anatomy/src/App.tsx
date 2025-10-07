import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  Figure,
  FlashofferThemeProvider,
  HeroBanner,
  PreviewCard,
  Section
} from "flashoffer-react";

const heroMedia = (
  <svg
    viewBox="0 0 320 240"
    role="img"
    aria-labelledby="trapezius-hero-title trapezius-hero-desc"
    style={{ width: "100%" }}
  >
    <title id="trapezius-hero-title">Stylized upper back diagram</title>
    <desc id="trapezius-hero-desc">
      Simplified outlines of the trapezius and scapula floating above a gradient
      background.
    </desc>
    <defs>
      <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#312e81" stopOpacity="0.85" />
        <stop offset="100%" stopColor="#1e40af" stopOpacity="0.65" />
      </linearGradient>
    </defs>
    <rect width="320" height="240" rx="28" fill="url(#heroGradient)" />
    <g stroke="#f8fafc" strokeWidth="4" fill="none">
      <path d="M60 64 L160 32 L260 64 L260 152 L160 208 L60 152 Z" />
      <path d="M108 120 Q160 80 212 120" opacity="0.5" />
      <path d="M120 136 L160 176 L200 136" opacity="0.35" />
    </g>
  </svg>
);

const fiberHighlights = [
  {
    title: "Upper fibers",
    description:
      "Lift the shoulder girdle, helping the head and neck maintain an elegant " +
      "counterbalance during elevated gestures.",
    media: (
      <Box
        component="span"
        sx={{
          display: "inline-block",
          width: 64,
          height: 64,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 40% 40%, rgba(255,255,255,0.9), rgba(99,102,241,0.25))"
        }}
      />
    )
  },
  {
    title: "Middle fibers",
    description:
      "Retract the scapula to anchor drawing poses that call for confident " +
      "torso twists and broad chests.",
    media: (
      <Box
        component="span"
        sx={{
          display: "inline-block",
          width: 64,
          height: 64,
          borderRadius: "16px",
          background:
            "linear-gradient(135deg, rgba(244,114,182,0.45), rgba(59,130,246,0.45))"
        }}
      />
    )
  },
  {
    title: "Lower fibers",
    description:
      "Set the scapula into upward rotation so the arm can clear the head when " +
      "paired with serratus anterior and the rotator cuff.",
    media: (
      <Box
        component="span"
        sx={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 64,
          height: 64,
          borderRadius: "50%",
          border: "2px dashed rgba(96,165,250,0.6)"
        }}
      >
        <Box
          component="span"
          sx={{ width: 28, height: 28, borderRadius: "50%", bgcolor: "#60a5fa" }}
        />
      </Box>
    )
  }
];

const illustrationData = [
  {
    src: "https://artisticanatomy.sfo3.cdn.digitaloceanspaces.com/richer/plate54.webp",
    alt: "Richer plate showing the trapezius",
    caption: "Richer, Plate 54."
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/a/aa/Trapezius_animation_small2.gif?20121019044756",
    alt: "Animated scapular movement driven by the trapezius",
    caption:
      "Anatomography, CC BY-SA 2.1 JP via Wikimedia Commons."
  }
];

export function App() {
  return (
    <FlashofferThemeProvider>
      <CssBaseline />
      <Box
        sx={{
          background:
            "linear-gradient(180deg, rgba(15,23,42,0.08) 0%, rgba(248,250,252,1) 60%)",
          minHeight: "100vh"
        }}
      >
        <Container
          maxWidth="lg"
          component="main"
          sx={{ py: { xs: 6, md: 10 }, display: "flex", flexDirection: "column", gap: 8 }}
        >
          <HeroBanner
            align="left"
            title="Map the trapezius with design-system clarity"
            subtitle="Translate anatomical study notes into reusable marketing blocks."
            media={heroMedia}
            primaryCta={{ label: "Download muscle notes", href: "https://anatomybook.art/muscles/trapezius/" }}
            secondaryCta={{
              label: "View reference library",
              href: "https://anatomybook.art/muscles/"
            }}
          />

          <Section
            id="anatomy-overview"
            align="left"
            eyebrow="Anatomy overview"
            title="Three fiber bands organize the upper back"
          >
            <Stack spacing={2} alignItems="flex-start">
              <Typography component="p" variant="body1" color="text.secondary">
                The trapezius blankets the neck and shoulders in a diamond-shaped
                sheet. From the skull and thoracic spine it funnels into the
                clavicle, acromion, and scapular spine, positioning the shoulder
                girdle for every expressive gesture.
              </Typography>
              <Typography component="p" variant="body1" color="text.secondary">
                Pair the upper fibers with the sternocleidomastoid when tracking
                a shrug, note how the middle fibers mirror the rhomboids during
                retraction, and remember that the lower fibers team with the
                serratus anterior to free the arm overhead.
              </Typography>
            </Stack>
          </Section>

          <Section
            id="fiber-highlights"
            align="left"
            eyebrow="Fiber focus"
            title="Break down the trapezius into manageable rhythms"
          >
            <Grid container spacing={3}>
              {fiberHighlights.map((highlight) => (
                <Grid item xs={12} md={4} key={highlight.title}>
                  <PreviewCard
                    title={highlight.title}
                    description={highlight.description}
                    media={highlight.media}
                  />
                </Grid>
              ))}
            </Grid>
          </Section>

          <Section
            id="drawing-strategy"
            align="left"
            eyebrow="Drawing strategy"
            title="Anchor gesture, surface cues, and partnering muscles"
          >
            <Stack spacing={3} alignItems="flex-start">
              <Typography component="p" variant="body1" color="text.secondary">
                Start with the kite silhouette that frames the neck. Carve the
                upper loop from mastoid to acromion, sweep the middle band across
                the scapular spine, and drop the lower fibers toward T12.
              </Typography>
              <Box component="ul" sx={{ pl: 3, m: 0, color: "text.secondary" }}>
                <li>
                  Trace the superior nuchal line as a gentle ridge rather than a
                  hard crease.
                </li>
                <li>
                  Follow the scapular spine to the acromion to locate the middle
                  fiber insertion and the shoulder peak.
                </li>
                <li>
                  Let tonal shifts suggest the narrow tendon above T12; avoid
                  carving deep grooves into the back.
                </li>
              </Box>
              <Typography component="p" variant="body1" color="text.secondary">
                Compare these cues with complementary muscles: the{" "}
                <Link href="https://anatomybook.art/muscles/deltoid/" underline="hover">
                  deltoid
                </Link>
                ,{" "}
                <Link href="https://anatomybook.art/muscles/serratus-anterior/" underline="hover">
                  serratus anterior
                </Link>
                , and{" "}
                <Link href="https://anatomybook.art/muscles/rotator-cuff/" underline="hover">
                  rotator cuff complex
                </Link>{" "}
                all signal how the scapula is tilting beneath the skin.
              </Typography>
            </Stack>
          </Section>

          <Section
            id="practice-prompts"
            align="left"
            eyebrow="Practice prompts"
            title="Reinforce anatomical memory with quick drills"
          >
            <Box component="ol" sx={{ pl: 3, color: "text.secondary", m: 0 }}>
              <li>
                Sketch three gestures showing elevation, depression, and upward
                rotation. Mark the scapular spine on each pass.
              </li>
              <li>
                Layer the trapezius over a simplified rib cage before rendering
                light and shadow.
              </li>
              <li>
                Compare the trapezius with the levator scapulae to clarify where
                their borders separate near the superior angle.
              </li>
            </Box>
          </Section>

          <Section
            id="illustrations"
            align="left"
            eyebrow="Illustrations"
            title="Reference plates and motion studies"
          >
            <Stack spacing={4} sx={{ width: "100%" }}>
              {illustrationData.map((figure) => (
                <Figure
                  key={figure.src}
                  src={figure.src}
                  alt={figure.alt}
                  caption={figure.caption}
                  imgProps={{ loading: "lazy" }}
                />
              ))}
            </Stack>
          </Section>

          <Divider />

          <Stack spacing={1} alignItems="center" textAlign="center">
            <Typography variant="body2" color="text.secondary">
              Built with flashoffer-react components for the Artistic Anatomy
              study series.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Explore more muscles at{" "}
              <Link href="https://anatomybook.art/muscles/" underline="hover">
                anatomybook.art/muscles
              </Link>
              .
            </Typography>
          </Stack>
        </Container>
      </Box>
    </FlashofferThemeProvider>
  );
}
