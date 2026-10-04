# MAATAA UI Core Icons — Alpha 7.4

Alpha 7.4 introduces a provider-free SVG icon primitive for the local demo surface.

- **42 core icons**
- one `MaataaIcon` component
- direct import path: `@maataa/ui/icons/MaataaIcon`
- icons are rendered as inline SVG and inherit `currentColor`

```tsx
import { MaataaIcon } from "@maataa/ui/icons/MaataaIcon";

<MaataaIcon name="workspace" size={20} />
<MaataaIcon name="evidence" size={20} />
<MaataaIcon name="ai" size={20} />
```

The Full Surface Explorer includes an **Icons** catalog with live size/context previews and copyable code.
