# Module — How It Works

**Route:** `/howitworks`
**Source:** `src/pages/Howworks/Howworks.jsx` + `Howworks.css`

## Overview

Tab-driven workflow explainer. The user picks a journey (Property / Franchise / Service Providers / Enterprise) and sees the step-by-step process for that path.

## Workflows

| Tab | Audience |
|---|---|
| Property Transactions | Buyers & sellers |
| Franchise Partnership | Entrepreneurs starting a 91 IDAM franchise |
| Service Providers | Builders, surveyors, lawyers, loan agents (vendor onboarding) |
| Enterprise Solutions | Corporates, PGs, government, large investors |

Each workflow renders:

- Title + subtitle
- CTA button (opens the matching registration modal)
- Numbered step cards with title, description, feature list and duration

## Tour anchors

| Anchor | Element |
|---|---|
| `how-hero` | Top banner |
| `how-journey` | "Choose Your Journey" section |
| `how-tabs` | The four workflow tab buttons |
| `how-steps` | Steps container for the active workflow |

## Implementation notes

- Active workflow is held in component state (`activeProcess`); switching tabs re-renders the steps.
- All content is data-driven from a config object inside the component — adding a new workflow is just another entry.
- The CTAs share `<PartnerRegistrationModal>` with the header dropdowns; the `modalType` prop differs per CTA.
