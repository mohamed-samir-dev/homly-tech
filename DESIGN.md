---
name: Premium Home
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#45464d'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#775a19'
  on-secondary: '#ffffff'
  secondary-container: '#fed488'
  on-secondary-container: '#785a1a'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#00201c'
  on-tertiary-container: '#009485'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#ffdea5'
  secondary-fixed-dim: '#e9c176'
  on-secondary-fixed: '#261900'
  on-secondary-fixed-variant: '#5d4201'
  tertiary-fixed: '#62fae3'
  tertiary-fixed-dim: '#3cddc7'
  on-tertiary-fixed: '#00201c'
  on-tertiary-fixed-variant: '#005047'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-xl:
    fontFamily: Inter
    fontSize: 60px
    fontWeight: '700'
    lineHeight: 72px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 38px
  headline-sm:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  title-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
  stack-xs: 4px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
  stack-xl: 80px
---

## Brand & Style

This design system is engineered for a high-end domestic commerce experience, emphasizing sophistication, reliability, and technological precision. The aesthetic is rooted in **Minimalism** with a **Modern Corporate** influence, prioritizing high-quality product photography and ample whitespace to convey a sense of luxury and cleanliness. 

The target audience consists of discerning homeowners and tech enthusiasts who value both form and function. The UI should evoke a sense of calm, professional guidance, and trust. Visual elements are sharp and structured, yet softened by intentional rounding to remain approachable. Imagery should focus on appliances in architectural settings, utilizing natural light and high-resolution details to justify the premium positioning of the catalog.

## Colors

The palette is anchored by a deep navy, providing a foundation of authority and depth. This is contrasted against crisp white surfaces to maintain a "clinical" sense of cleanliness essential for home appliances. 

- **Primary (Deep Navy):** Used for navigation, primary buttons, and heavy headings.
- **Secondary (Elegant Gold):** Reserved for high-value accents, loyalty indicators, and premium product badges.
- **Tertiary (Soft Teal):** Utilized for functional success states and interactive "tech-forward" highlights.
- **Neutral:** A spectrum of slate grays and off-whites ensure soft transitions and prevent visual fatigue.

## Typography

This design system utilizes **Inter** for its exceptional readability and neutral, geometric architecture. It pairs perfectly with Arabic scripts, maintaining a professional and contemporary appearance across multi-lingual interfaces. 

Hierarchies are established through significant weight changes and generous line heights. Display and Headline styles use a tighter letter spacing for a "magazine" editorial feel, while labels utilize increased tracking for clarity at small scales. For Arabic implementation, ensure that the line height is increased by approximately 15% to accommodate the script's ascenders and descenders without crowding the layout.

## Layout & Spacing

The layout follows a **Fixed Grid** model on desktop (12 columns) and a fluid model on mobile (4 columns). The rhythm is based on an 8px baseline grid to ensure mathematical harmony across all components.

Vertical rhythm should be generous. Product details and marketing sections should use `stack-xl` to create distinct "zones" of information, preventing the UI from feeling cluttered. Gutters are kept wide at 24px to give product imagery room to breathe, reinforcing the premium aesthetic. Use "Safe Areas" for text overlays on imagery to ensure legibility is never compromised by the background.

## Elevation & Depth

Visual hierarchy is achieved through a combination of **Tonal Layers** and **Ambient Shadows**. Surfaces do not rely on heavy borders; instead, they use subtle shifts in background color and diffused shadows.

- **Level 0 (Base):** Crisp white (#FFFFFF) for the main canvas.
- **Level 1 (Cards):** Softest ambient shadow (Blur 12px, Opacity 4%, Navy tint) to lift product cards from the background.
- **Level 2 (Dropdowns/Modals):** Medium-diffusion shadow (Blur 24px, Opacity 8%) with a 1px low-contrast neutral border.
- **Floating Elements:** High elevation for primary action buttons (Blur 16px, Gold-tinted shadow) to draw immediate attention.

This approach creates a sense of physical layering without the "heavy" feeling of traditional skeuomorphism.

## Shapes

The design system adopts a **Rounded** shape language. A base radius of 8px (0.5rem) is applied to all standard components including buttons, input fields, and cards. 

- **Standard (8px):** Primary UI elements and container cards.
- **Large (16px):** Hero sections and promotional banners.
- **Full (Pill):** Used exclusively for status chips (e.g., "In Stock") and small utility buttons.

This consistent rounding strikes a balance between the precision of high-end appliances and the approachability required for a consumer e-commerce platform.

## Components

### Buttons
- **Primary:** Deep Navy background with White text. 8px radius. Solid, high-contrast.
- **Secondary/CTA:** Elegant Gold background for "Buy Now" or "Limited Offer" to differentiate from standard navigation.
- **Ghost:** Navy or Gold text with no background, used for secondary actions like "View Specs."

### Product Cards
- White background with a subtle Level 1 shadow. 
- Image aspect ratio should be 1:1 or 4:5, using high-key lighting. 
- Product titles in `title-lg`, price in `headline-sm` Navy.

### Input Fields
- 8px rounded corners with a 1px Slate-200 border. 
- Focus state switches the border to Deep Navy with a soft 2px outer glow.
- Labels are always positioned above the field in `label-md`.

### Chips & Badges
- Used for technical specs (e.g., "Energy Star", "Smart Tech").
- Pill-shaped with Soft Teal backgrounds or light Navy outlines.

### Image Carousels
- Navigation arrows should be contained in circular white containers with a Level 1 shadow.
- Pagination dots use Navy (active) and Slate-200 (inactive).

### Filter Sidebar
- Uses clean, low-contrast dividers. 
- Checkboxes and Radio buttons follow the 8px rounding rule and use Navy for the active state.