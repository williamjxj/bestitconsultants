# Process Workflow Implementation

This document describes the technical implementation of the dynamic SVG workflow component used in
the "Our Process" section of the Services page.

## Overview

The "Our Process" section was transformed from a static numerical list into an interactive, animated
graphical workflow. This implementation provides a premium, "agentic" feel similar to orchestration
platforms like RAGflow.

## Components Involved

### 1. `WorkflowSection` (`src/components/ui/workflow-section.tsx`)

The core UI component responsible for rendering the workflow nodes and animated connections.

- **SVG Integration**: Uses a background SVG with two paths:
  - A faint background path for visual structure.
  - A dynamic "flow" path that animates its `pathLength` from 0 to 1 as the user scrolls or when the
    component enters the viewport.
- **Node Interaction**: Each process step (Discovery, Planning, Development, Deployment) is a "node"
  with:
  - Glossy gradient styling.
  - Hover effects (scale + subtle rotation).
  - Entrance animations using `framer-motion`.
- **Responsive Handling**:
  - **Desktop**: Horizontal curved path connecting 4 cards in a grid.
  - **Mobile**: Vertical straight line with staggered side-by-side or alternating icons for
    readability.

### 2. Services Page (`src/app/services/page.tsx`)

The feature is integrated into the main services page.

- **Data Mapping**: Passes localized titles and descriptions to the `WorkflowSection`.
- **Logic**: Handles language switching dynamically across EN, FR, ES, and CN.

## Technical Details

### Animations

- **Path Flow**:

  ```tsx
  <motion.path
    pathLength={pathLength}
    initial={{ pathLength: 0 }}
    whileInView={{ pathLength: 1 }}
    transition={{ duration: 2, ease: 'easeInOut' }}
  />
  ```

- **Pulse Effect**: Background radial gradients use infinite looping `scale` and `opacity`
  animations to create a "living" UI feel.

### Internationalization

The component is fully decoupled from the content. It receives an array of `steps`
(title/description) which are resolved in the parent page based on the current `language` context.

## Maintenance

To add or modify steps:

1. Update the translation objects in `src/app/services/page.tsx`.
2. Ensure the `icons` array in `workflow-section.tsx` matches the number of steps intended.

---

_Created on 2025-12-30_
