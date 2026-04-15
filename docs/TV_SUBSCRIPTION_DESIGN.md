# TV Subscription UI Design Documentation

## Design Philosophy
- **Mobile-First**: Optimized for mobile screens with graceful desktop enhancement
- **Consistency**: Matches existing airtime/data flow patterns
- **Clarity**: Step-by-step wizard makes process intuitive
- **Security**: PIN verification and smartcard validation for trust

## Color Palette

```
Primary Color: #a9b7ff (Periwinkle Blue)
Primary Hover: #9aa5ff (Darker Periwinkle)
Light Background: #f7f8ff (Lavender)
Text Primary: #111827 (Gray-900)
Text Secondary: #4b5563 (Gray-600)
Border Default: #e5e7eb (Gray-200)
Border Light: #f0f1f2 (Gray-100)
Success: #10b981 (Green)
Error: #ef4444 (Red)
Warning: #f59e0b (Amber)
```

## Layout Structure

### Desktop (md breakpoint and up)
```
┌─────────────────────────────────────────┐
│     Header (Breadcrumb / Back Button)   │
├────────────────────┬────────────────────┤
│                    │                    │
│   Main Content     │   Sidebar Summary │
│   (2/3 width)      │   (1/3 width)     │
│                    │   (Sticky)        │
│                    │                   │
└────────────────────┴────────────────────┘
```

### Mobile (sm breakpoint)
```
┌─────────────────────────┐
│   Header (Back Button)  │
├─────────────────────────┤
│   Content               │
│   (Full Width)          │
│   - Forms               │
│   - Summaries           │
│   - Buttons             │
└─────────────────────────┘
```

## Step Indicator Component

### Visual Design
```
┌──┐     ┌──┐     ┌──┐     ┌──┐
│ 1├─────│ 2├─────│ 3├─────│ 4│
└──┘     └──┘     └──┘     └──┘
Provider  Plan  Verify     Pay
```

**States:**
- Active step: Filled circle with primary color
- Previous step: Filled circle with primary color
- Next step: Hollow circle with border
- Line between: Filled or hollow based on completion

### Responsive Behavior
- Labels hidden on mobile (show only numbers)
- Full labels shown on tablet and desktop
- Horizontal overflow with min-width on mobile

## Page: TV Subscription (Main)

### Step 1: Provider Selection

**Component Layout:**
```
┌─────────────────────────────┐
│ Select TV Provider          │
├─────────────────────────────┤
│  ┌──────┐  ┌──────┐  ┌──────┐
│  │ Logo │  │ Logo │  │ Logo │
│  │ DSTV │  │ GoTV │  │      │
│  └──────┘  └──────┘  └──────┘
│  ┌──────┐  ┌──────┐
│  │ Logo │  │ Logo │
│  │Start │  │Show  │
│  └──────┘  └──────┘
└─────────────────────────────┘
```

**Grid:**
- Mobile: 2 columns
- Tablet (sm): 2 columns
- Desktop (md+): 3 columns
- Large screens (lg): 4 columns

**Card States:**
- Default: Gray-200 border, white background
- Hover: Gray-300 border
- Selected: #a9b7ff border, #f7f8ff background, shadow

**Spacing:**
- Gap between items: 12px (mobile), 20px (desktop)

### Step 2: Plan Selection

**Component Layout:**
```
┌────────────────────────────┐
│ Selected Provider Summary   │
├────────────────────────────┤
│ Provider Name              │
└────────────────────────────┘

┌────────────────────────────┐
│ Select Subscription Plan    │
├────────────────────────────┤
│ ┌──────────────────────────┐
│ │ Plan Name        ₦50,000 │
│ │ Fixed Price             │
│ └──────────────────────────┘
│ ┌──────────────────────────┐
│ │ Plan Name        ₦60,000 │
│ │ Fixed Price             │
│ └──────────────────────────┘
├──────────────────────────────┘
```

**List Item Design:**
- Full width (100%)
- Flexible layout: Name on left, price on right
- Plan name can wrap (line-clamp-2)
- Price bold and in primary color

### Step 3: Smartcard Verification

**Information Box:**
```
┌─────────────────────────────┐
│ 📺  Enter Your Smartcard     │
│                              │
│ Find your smartcard/decoder  │
│ number on your device or bill│
└─────────────────────────────┘
```

**Input Field:**
- Accepts only digits
- Max length: 30 characters
- Helper hints below

**Help Section:**
```
Hints:
• DSTV: Look for "Decoder No."
• GoTV: Check your smartcard
• Startimes: Find on decoder
```

## Page: TV Review

### Main Content Area

**Section 1: Subscription Details**
```
┌──────────────────────────────┐
│ Subscription Details          │
├──────────────────────────────┤
│ Provider      | 📺 DSTV      │
├──────────────────────────────┤
│ Plan          | Compact      │
├──────────────────────────────┤
│ Smartcard     | ****2312    │
├──────────────────────────────┤
│ Amount        | ₦19,000      │
└──────────────────────────────┘
```

**Section 2: Smartcard Verification**
- Dynamically updates as verification progresses
- Shows status: verifying/verified/error
- Hints only shown on initial state

**Section 3: Payment Method**
```
┌──────────────────────────────┐
│ Payment Method               │
├──────────────────────────────┤
│ ○ Wallet (Selected)          │
│ ○ Debit Card                 │
│ ○ Bank Transfer              │
└──────────────────────────────┘
```

### Sidebar: Order Summary

**Desktop Only (Sticky)**
```
┌──────────────────────────┐
│ Order Summary            │
├──────────────────────────┤
│ Provider    | DSTV       │
│ Plan        | Compact... │
├──────────────────────────┤
│ Subtotal    | ₦19,000   │
│ Fee         | ₦0.00     │
├──────────────────────────┤
│ Total       | ₦19,000   │
├──────────────────────────┤
│  [ Pay Now ]             │
├──────────────────────────┤
│ ✓ Secure payment         │
└──────────────────────────┘
```

**Mobile Behavior:**
- Summary integrated into main content
- No sticky positioning

## Typography Scale

```
Display: 36px (4xl) - Page titles
Heading 2: 24px (2xl) - Section titles  
Heading 3: 18px (lg) - Card titles
Body: 16px (base) - Main content
Label: 14px (sm) - Form labels
Helper: 12px (xs) - Hints, secondary text
```

**Font Weights:**
- Regular: 400 - Body text
- Medium: 500 - Labels, helper text
- Semibold: 600 - Headings, emphasis
- Bold: 700 - Primary headings, prices

## Form Components

### Input Field
```
┌─────────────────────────┐
│ Label                   │
│ ┌─────────────────────┐ │
│ │ Placeholder text    │ │
│ └─────────────────────┘ │
│ Helper text or error    │
└─────────────────────────┘
```

**States:**
- Default: Gray-200 border, gray placeholder
- Focus: Gray-300 border, darker text
- Error: Red border with error message
- Disabled: Gray background, opacity 50%

### Buttons

**Primary Button (Default)**
- Background: #a9b7ff
- Hover: #9aa5ff
- Padding: 12px 24px
- Border Radius: 8px
- Font: Semibold, white

**Outlined Button**
- Border: Gray-300
- Background: Transparent
- Text: Gray-900
- Hover: Gray-100 background

**Button Sizes:**
- Mobile: Full width or next to icon
- Desktop: Auto width, center aligned

## Card Component

```
┌─────────────────────────────┐
│ padding: 24px (6)           │
│                             │
│  Content here               │
│                             │
└─────────────────────────────┘
```

**Properties:**
- Border: 1px solid #e5e7eb
- Border Radius: 8px
- Shadow: 0 10px 35px rgba(0,0,0,0.04)
- Background: White

**Responsive Padding:**
- Mobile: 16px (p-4)
- Desktop and up: 24px (p-6)

## Spacing Scale

```
4px   → gap-1, p-1
8px   → gap-2, p-2
12px  → gap-3, p-3
16px  → gap-4, p-4
20px  → gap-5, p-5
24px  → gap-6, p-6
32px  → gap-8, p-8
```

## Responsive Breakpoints

```
sm: 640px  - Tablets
md: 768px  - Small desktop
lg: 1024px - Large desktop
xl: 1280px - Very large desktop
```

## Loading States

**Spinner Loading:**
```
    ⚙️
  Verifying...
    
Text color: Gray-500
Spinner color: Primary (#a9b7ff)
```

**Skeleton Loading:**
- Gray-200 background
- Slightly darker gray animation

## Error States

**Toast Notification:**
- Position: Top-right or top-center
- Duration: 3-5 seconds
- Icon: Alert circle for errors, checkmark for success
- Colors: Red for error, Green for success

**Inline Errors:**
- Red text below input
- Red border on input field
- Error message: 12px, red-600

## Success State

**Success Modal:**
```
     ✓
   
Success!

Transaction ID: xxxx-xxxx

[ Back to Dashboard ]
```

## Accessibility Features

- Semantic HTML (label, fieldset, legend)
- ARIA labels for icons
- Keyboard navigation support
- Color not sole method of indication
- Sufficient color contrast (WCAG AA)
- Focus states visible on all interactive elements

## Animation & Transitions

- Smooth transitions: 200-300ms
- Easing: ease-in-out for natural motion
- Hover effects on clickable items
- Loading spinner continuous rotation
- Form state transitions smooth

## Dark Mode Considerations

Current: Light mode only
Future: Can be adapted by:
- Inverting color scheme
- Adjusting backgrounds to dark
- Updating text colors for contrast

## Browser Support

- Chrome latest
- Firefox latest
- Safari latest
- Edge latest
- iOS Safari (responsive)
- Android Chrome (responsive)
