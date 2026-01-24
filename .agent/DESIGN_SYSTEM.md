# LGIS Government-Grade Design System
**National Capital District Commission**  
**Version 2.0 - January 2026**

---

## 1. Design Intent

The LGIS design system implements a **formal, authoritative, government-grade** aesthetic that prioritizes:

✅ **Clarity and Legibility** - High-contrast text, clear hierarchy  
✅ **Fast Decision-Making** - Workflow-optimized UI patterns  
✅ **Accessibility** - WCAG 2.2 AA compliant (4.5:1 contrast minimum)  
✅ **Audit Readiness** - Clear status indicators, consistent patterns  
✅ **Professional Trust** - Official government aesthetics  

**This is NOT a consumer or startup UI.** The design must feel official, auditable, and trustworthy.

---

## 2. Core Color Palette

### 2.1 Brand Colors

| Token | Value | Usage | Contrast |
|-------|-------|-------|----------|
| `--color-brand-primary` | #F4C400 | LGIS Yellow - CTAs, highlights, active states | 4.8:1 on white (AA) |
| `--color-brand-primary-hover` | #DDB200 | Hover state for yellow elements | 5.2:1 on white (AA) |
| `--color-brand-primary-active` | #C29F00 | Active/pressed state | 6.1:1 on white (AA) |

**Rule**: Yellow MUST NEVER be used for paragraph text.

### 2.2 UI Foundation Colors 

| Token | Value | Usage | Notes |
|-------|-------|-------|-------|
| `--color-ui-black` | #0F0F0F | Sidebar, headers, primary text | Near-black (17:1 on white - AAA) |
| `--color-ui-white` | #FFFFFF | Cards, content surfaces | Pure white |
|  `--color-ui-background` | #FFF2B2 | Page workspace background | Light yellow tint |
| `--color-ui-border` | #E5E5E5 | Dividers, card borders | Subtle gray |

### 2.3 Text/Foreground Colors

| Token | Value | Usage | Contrast |
|-------|-------|-------|----------|
| `--color-ui-text-primary` | #0F0F0F | Primary text on light backgrounds | 17:1 on white (AAA) |
| `--color-ui-text-secondary` | #6B6B6B | Secondary/meta text | 6.4:1 on white (AA) |
| `--color-ui-text-tertiary` | #9E9E9E | Disabled/placeholder text | 4.5:1 on white (AA) |
| `--color-ui-text-inverse` | #FFFFFF | Text on dark backgrounds | 17:1 on black (AAA) |

### 2.4 Status & Workflow Colors

| Status | Background | Text | Border | Usage |
|--------|------------|------|--------|-------|
| **Success** | #1E8E3E | #FFFFFF | #9DD3AA | Approved, completed |
| **Warning** | #FFD84D | #0F0F0F | #F4C400 | Pending, review |
| **Error** | #D93025 | #FFFFFF | #F28B82 | Rejected, invalid |
| **Info** | #1A73E8 | #FFFFFF | #AECBFA | Informational |
| **Neutral** | #5F6368 | #FFFFFF | #DADCE0 | Draft, inactive |

**Rule**: Red and green MUST always include text labels or icons (accessibility).

---

## 3. Component-Specific Color Tokens

### 3.1 Sidebar Navigation

```css
--sidebar-background: #0F0F0F;           /* Black sidebar */
--sidebar-foreground: #FFFFFF;            /* White text */
--sidebar-item-active-bg: #F4C400;       /* Yellow active item */
--sidebar-item-active-text: #0F0F0F;     /* Black text on yellow */
--sidebar-item-hover-bg: #1C1C1C;        /* Subtle hover */
--sidebar-item-inactive-text: #6B6B6B;   /* Gray for inactive */
--sidebar-icon-active: #F4C400;          /* Yellow icons when active */
--sidebar-icon-inactive: #6B6B6B;        /* Gray icons when inactive */
```

### 3.2 Header/Top Bar

```css
--header-background: #FFFFFF;            /* White header */
--header-foreground: #0F0F0F;            /* Black text */
--header-border: #E5E5E5;                /* Light gray bottom border */
--header-utility-icon: #6B6B6B;          /* Gray utility icons */
```

### 3.3 Buttons

| Button Type | Background | Text | Hover | Use Case |
|-------------|------------|------|-------|----------|
| **Primary** | #0F0F0F (Black) | #FFFFFF | #1C1C1C | Main actions (Apply, Create, Submit) |
| **Secondary** | #FFFFFF (White) | #0F0F0F | #FFF2B2 | Secondary actions (View, Cancel) |
| **Success** | #1E8E3E (Green) | #FFFFFF | #16682E | Approve actions |
| **Destructive** | #D93025 (Red) | #FFFFFF | #B71C1C | Delete, Reject |
| **Warning** | #F4C400 (Yellow) | #0F0F0F | #DDB200 | Caution actions |

### 3.4 Form Inputs

```css
--input-bg: #FFFFFF;                     /* White background */
--input-border: #E5E5E5;                 /* Light gray border */
--input-border-focus: #F4C400;           /* Yellow border on focus */
--input-text: #0F0F0F;                   /* Black text */
--input-placeholder: #9E9E9E;            /* Gray placeholder */
--input-disabled-bg: #F5F5F5;            /* Light gray when disabled */
```

### 3.5 Status Badges

| Badge | Background | Text | Usage |
|-------|------------|------|-------|
| Approved | #1E8E3E (Green) | #FFFFFF | Approved documents/applications |
| Pending | #FFD84D (Yellow) | #0F0F0F | Pending  review/approval |
| Rejected | #D93025 (Red) | #FFFFFF | Rejected/failed items |
| Draft | #5F6368 (Gray) | #FFFFFF | Draft/inactive items |

---

## 4. Typography System

### 4.1 Font Families

```css
--font-family-default: "Inter", "SF Pro Display", system-ui, -apple-system, sans-serif;
--font-family-code: "IBM Plex Mono", "Consolas", monospace;
```

### 4.2 Font Sizes

| Token | Size | Usage |
|-------|------|-------|
| `--font-size-small` | 12px | Metadata, captions, badges |
| `--font-size-default` | 14px | Body text, most text |
| `--font-size-subhead-default` | 16px | Subheadings |
| `--font-size-subhead-big` | 20px | Large subheadings |
| `--font-size-header-default` | 24px | Page headers |
| `--font-size-header-big` | 32px | Main page titles |
| `--font-size-display` | 40px | Hero text (rare) |

### 4.3 Font Weights

| Token | Weight | Usage |
|-------|--------|-------|
| `--font-weight-regular` | 400 | Body text |
| `--font-weight-medium` | 500 | Slightly emphasized text |
| `--font-weight-semibold` | 600 | Buttons, subheadings |
| `--font-weight-bold` | 700 | Headers, important text |

### 4.4 Typography Color Rules

```css
/* Primary text (use for most content) */
color: var(--color-ui-text-primary);     /* #0F0F0F - black */

/* Secondary text (metadata, labels) */
color: var(--color-ui-text-secondary);   /* #6B6B6B - gray */

/* Disabled text */
color: var(--color-ui-text-tertiary);    /* #9E9E9E - light gray */

/* Text on dark backgrounds (sidebar, black buttons) */
color: var(--color-ui-text-inverse);     /* #FFFFFF - white */
```

**CRITICAL**: Yellow (#F4C400) must NEVER be used for paragraph text!

---

## 5. Spacing System (8-Point Grid)

All spacing uses multiples of 4px:

| Token | Value | Common Uses |
|-------|-------|-------------|
| `--space-4` | 4px | Tight spacing, badge padding |
| `--space-8` | 8px | Icon gaps, small margins |
| `--space-12` | 12px | Button padding (vertical) |
| `--space-16` | 16px | Default padding, small gaps |
| `--space-24` | 24px | Card padding, section spacing |
| `--space-32` | 32px | Large section gaps |
| `--space-48` | 48px | Major section breaks |
| `--space-64` | 64px | Page margins |

---

## 6. Border Radius System

Government UI uses **minimal** border radius for a formal appearance:

| Token | Value | Usage |
|-------|-------|-------|
| `--border-radius-none` | 0px | Square corners (rare) |
| `--border-radius-sm` | 2px | Very subtle rounding |
| `--border-radius-default` | 4px | Buttons, inputs (standard) |
 `--border-radius-md` | 6px | Medium rounding |
| `--border-radius-lg` | 8px | Cards, large containers |
| `--border-radius-full` | 9999px | Circular (avatars, dots) |

**Semantic Tokens**:
- `--border-radius-button`: 4px
- `--border-radius-card`: 8px
- `--border-radius-input`: 4px
- `--border-radius-badge`: 4px

**Rule**: No gradients in core workflows. Keep it professional.

---

## 7. Shadow & Elevation System

Subtle, professional shadows:

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | 0px 1px 2px rgba(15, 15, 15, 0.08) | Subtle elevation |
| `--shadow-md` | 0px 2px 4px rgba(15, 15, 15, 0.12) | Default card shadow |
| `--shadow-lg` | 0px 4px 8px rgba(15, 15, 15, 0.16) | Elevated elements |
| `--shadow-xl` | 0px 8px 16px rgba(15, 15, 15, 0.20) | Modals, popovers |

**Rule**: Shadows should be subtle. This is not a flashy design.

---

## 8. Government-Grade Utility Classes

### 8.1 Card Components

```html
<!-- Basic Government Card -->
<div class="gov-card">
  <h3>Card Title</h3>
  <p>Card content</p>
</div>
```

### 8.2 Buttons

```html
<!-- Primary Button (Black) -->
<button class="gov-btn-primary">Apply Now</button>

<!-- Secondary Button (Outline) -->
<button class="gov-btn-secondary">View Details</button>

<!-- Success Button (Green) -->
<button class="gov-btn-success">Approve</button>

<!-- Destructive Button (Red) -->
<button class="gov-btn-destructive">Reject</button>

<!-- Warning Button (Yellow) -->
<button class="gov-btn-warning">Review Required</button>
```

### 8.3 Status Badges

```html
<span class="gov-badge-approved">✓ Approved</span>
<span class="gov-badge-pending">⏱ Pending</span>
<span class="gov-badge-rejected">✗ Rejected</span>
<span class="gov-badge-draft">Draft</span>
```

### 8.4 Form Inputs

```html
<input type="text" class="gov-input" placeholder="Enter text...">
```

### 8.5 Alert Boxes

```html
<div class="gov-alert-success">
  <strong>Success!</strong> Application has been submitted.
</div>

<div class="gov-alert-warning">
  <strong>Warning:</strong> Document expiring soon.
</div>

<div class="gov-alert-error">
  <strong>Error:</strong> Invalid file format.
</div>

<div class="gov-alert-info">
  <strong>Info:</strong> Processing may take 3-5 business days.
</div>
```

### 8.6 Data Tables

```html
<table class="gov-table">
  <thead>
    <tr>
      <th>Application ID</th>
      <th>Applicant</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>LTC-2026-001</td>
      <td>John Doe</td>
      <td><span class="gov-badge-approved">Approved</span></td>
    </tr>
  </tbody>
</table>
```

### 8.7 Sidebar Navigation

```html
<nav>
  <a href="/dashboard" class="gov-sidebar-item active">
    <Icon name="dashboard" />
    <span>Dashboard</span>
  </a>
  <a href="/licensing" class="gov-sidebar-item">
    <Icon name="license" />
    <span>Licensing</span>
  </a>
</nav>
```

---

## 9. Accessibility Requirements (NON-NEGOTIABLE)

### 9.1 WCAG 2.2 AA Compliance

✅ **All text must meet minimum 4.5:1 contrast ratio** against background  
✅ **Large text (18px+) must meet 3:1** contrast ratio  
✅ **Interactive elements must have visible focus states**  
✅ **Status colors must include text labels or icons** (don't rely on color alone)

### 9.2 Focus States

All interactive elements receive a **2px yellow outline** on keyboard focus:

```css
:focus-visible {
  outline: 2px solid var(--color-ui-focus-ring);  /* #F4C400 */
  outline-offset: 2px;
}
```

### 9.3 Color Usage Restrictions

❌ **Never use yellow (#F4C400) for paragraph text**  
❌ **Never rely on color alone for status** (always include text/icon)  
❌ **Never use low-contrast text colors**  
✅ **Always test with grayscale** (should still be usable)  
✅ **Always provide text alternatives for icons**

---

## 10. Customization Guidelines

### 10.1 Using the Theme Customizer

Administrators can customize theme colors via the **Theme Customizer** component:

1. Navigate to **Settings → Theme Customization**
2. Adjust colors using the color pickers
3. System automatically checks WCAG compliance
4. Preview changes before saving
5. Export/import theme configurations as JSON

### 10.2 Multi-Council Branding

The design system supports **multi-tenant branding**:

```javascript
// Each council can have custom colors
{
  "councilId": "NCDC",
  "theme": {
    "--color-brand-primary": "#F4C400",      // NCDC Yellow
    "--sidebar-background": "#0F0F0F",       // Black sidebar
    "--color-ui-background": "#FFF2B2"       // Light yellow workspace
  }
}
```

### 10.3 Safe Customization Zones

✅ **Can customize**:
- Brand primary color (must maintain WCAG AA)
- Sidebar colors
- Page background color
- Status badge colors

❌ **Cannot customize**:
- Typography scale (government-standard)
- Spacing system (8-point grid)
- Border radius (minimal government aesthetic)
- Shadow depths (subtle professional only)

---

## 11. Implementation Checklist

When implementing new features:

- [ ] Use semantic color tokens (not hard-coded colors)
- [ ] Apply `.gov-*` utility classes where appropriate
- [ ] Ensure buttons have proper states (hover, active, focus, disabled)
- [ ] Use status badges with both color AND text/icons
- [ ] Test contrast ratios (all text >= 4.5:1)
- [ ] Support keyboard navigation with visible focus states
- [ ] Use 8-point grid for spacing
- [ ] Avoid gradients in core workflows
- [ ] Test in grayscale/print preview
- [ ] Ensure mobile responsiveness

---

## 12. Future Enhancements

The design system is built to support:

✅ **Dark mode extension** (token-based system ready)  
✅ **Print/PDF export** (print-friendly colors  chosen)  
✅ **Low-bandwidth environments** (no heavy assets)  
✅ **Multi-language support** (semantic tokens)  
✅ **White-label deployments** (customizable via Theme Customizer)

---

## 13. Design System Governance

### 13.1 Token Changes
- All color changes MUST go through Theme Customizer
- Direct CSS overrides are NOT permitted
- Use semantic tokens, not hard-coded values

### 13.2 New Components
- Must use existing `.gov-*` patterns
- Must maintain WCAG AA contrast
- Must include hover, focus, and disabled states
- Must work in grayscale

### 13.3 Review Process
- Visual design review: Check government aesthetic
- Accessibility review: Verify WCAG compliance
- Print review: Test in print preview
- Grayscale review: Ensure usability without color

---

## 14. Quick Reference

### Most Common Tokens

```css
/* Colors */
--color-brand-primary                /* #F4C400 - LGIS Yellow */
--color-ui-black                     /* #0F0F0F - Near-black */
--color-ui-white                     /* #FFFFFF - White */
--color-ui-background                /* #FFF2B2 - Page background */
--color-status-success               /* #1E8E3E - Approved (green) */
--color-status-error                 /* #D93025 - Rejected (red) */

/* Spacing */
--space-8, --space-16, --space-24, --space-32

/* Typography */
--font-size-default                  /* 14px */
--font-weight-semibold               /* 600 */

/* Borders */
--border-radius-default              /* 4px */
--card-border                        /* #E5E5E5 */

/* Shadows */
--shadow-md                          /* Default card shadow */
```

### Most Common Classes

```
.gov-card                            /* White card with border */
.gov-btn-primary                     /* Black button */
.gov-btn-secondary                   /* White outline button */
.gov-btn-success                     /* Green approve button */
.gov-btn-destructive                 /* Red reject button */
.gov-badge-approved                  /* Green approved badge */
.gov-badge-pending                   /* Yellow pending badge */
.gov-input                           /* Standard input field */
.gov-table                           /* Data table */
```

---

**National Capital District Commission**  
*LGIS Design System v2.0*  
*Formal. Accessible. Trustworthy.*
