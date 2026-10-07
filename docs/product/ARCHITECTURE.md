# MAATAA UI Architecture

```text
Registry Registry
  ↓
Workspace Registry
  ↓
Page Registry
  ↓
Layout Registry
  ↓
Region / Slot
  ↓
Pattern / Composition
  ↓
Component
  ↓
Atom
```

`@maataa/ui` remains visual and host-agnostic. Registry metadata must not be mistaken for backend runtime authority, authentication, authorization, persistence, infrastructure reality, migration approval, or deployment approval.


## Generator / Tool / AI Space layer

```text
Registry Registry
  ↓
Workspace / AI Space
  ↓
Page / Layout
  ↓
Generator / Tool Surface
  ↓
Atomic Regions
  ↓
Components / Atoms
```

Generator and tool surfaces are UI abstractions, not execution authority.

## Device-responsive chain

```text
DEVICE
  → VIEWPORT
  → INPUT MODALITY
  → CAPABILITY
  → ORIENTATION
  → SAFE AREA
  → RESPONSIVE TRANSFORMATION
  → LAYOUT
  → PAGE
  → WORKSPACE
```

The device layer is descriptive UI metadata. Physical hardware access and capability verification remain host/runtime concerns.
