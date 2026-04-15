# TV Subscription User Experience Flow

## Complete User Journey

```
START: User navigates to Dashboard
│
└─→ [Dashboard Nav] TV Subscription clicked
    │
    └─→ 📺 [TV Subscription Page]
        │
        ├─ STEP 1: Select Provider
        │  ├─ Display: Grid of providers with logos
        │  ├─ Action: User clicks provider card
        │  ├─ Feedback: Card highlights with blue border
        │  └─ Auto-loads: Plans for selected provider
        │
        ├─ STEP 2: Select Plan  
        │  ├─ Display: List of available plans
        │  ├─ Actions: 
        │  │  ├─ Click plan to select
        │  │  └─ Click "Back" to change provider
        │  └─ Feedback: Selected plan highlighted
        │
        ├─ STEP 3: Verify Smartcard
        │  ├─ Display:
        │  │  ├─ Selected plan summary
        │  │  ├─ Input field for smartcard
        │  │  └─ Helper hints
        │  ├─ Validation:
        │  │  ├─ Only digits allowed
        │  │  ├─ 10-30 character limit
        │  │  └─ Real-time validation
        │  └─ Actions:
        │     ├─ "Back" button to previous step
        │     └─ "Continue to Payment" button
        │
        └─→ 📝 [Review Page]
            │
            ├─ Auto-Verification
            │  ├─ Shows: "Verifying Smartcard..."
            │  ├─ On Success:
            │  │  ├─ Shows customer name
            │  │  ├─ Shows green checkmark
            │  │  └─ Enables payment
            │  └─ On Error:
            │     ├─ Shows error message
            │     ├─ Provides "Update Smartcard" link
            │     └─ Disables payment buttons
            │
            ├─ Payment Method Selection
            │  ├─ Options:
            │  │  ├─ Wallet (with PIN) - DEFAULT
            │  │  ├─ Debit Card
            │  │  └─ Bank Transfer
            │  └─ Selection: User clicks option
            │
            ├─ Summary Strip (Desktop)
            │  ├─ Provider name
            │  ├─ Plan name
            │  ├─ Pricing breakdown
            │  └─ "Pay Now" button
            │
            └─→ Payment Processing
                ├─ If Wallet Selected:
                │  ├─ Show PIN Modal
                │  └─ User enters PIN
                │
                ├─ Process Payment
                │  ├─ Loading state shown
                │  ├─ Transaction ID generated
                │  └─ API call to /vtu/pay
                │
                ├─ Success State
                │  ├─ Show checkmark icon
                │  ├─ Display transaction ID
                │  └─ Auto-redirect to dashboard
                │
                └─ Error State
                   ├─ Show error message
                   ├─ Allow retry/payment method change
                   └─ Keep PIN modal available
```

## Screen Flow Diagram

```
┌────────────────────────────────────────────┐
│  Dashboard > TV Subscription               │
│  Route: /dashboard/tv                      │
└────────────────────────────────────────────┘
                    │
         ┌──────────┴──────────┐
         │                     │
    Step 1: Provider       Step 4: Pay
    Selection             (Pending)
         │
         └──────────┬──────────┐
                    │          │
            Step 2: Plan   Step 3:
            Selection      Verify
                    │
         ┌──────────┴──────────┐
         │                     │
    Review Page           Success
    /dashboard/tv/review  Modal
```

## Detailed UI Sections

### Main Page: TV Selection

#### Header Section
```
Title: "Buy Airtime"
Description: "Quick and easy airtime recharge for all networks"
```

#### Step Indicator
```
Desktop:
  1 Provider ━━━ 2 Plan ━━━ 3 Verify ━━━ 4 Pay
  
Mobile (simplified):
  1 ━━━ 2 ━━━ 3 ━━━ 4
```

#### Provider Grid (Step 1)
```
┌──────────────────────────────────────────────┐
│ Select TV Provider                           │
├──────────────────────────────────────────────┤
│
│  DSTV        GoTV         Startimes    ShowMax
│  [LOGO]      [LOGO]       [LOGO]       [LOGO]
│  DSTV        GoTV         Startimes    ShowMax
│
│  Responsive: 2,3,4 columns based on screen
│
└──────────────────────────────────────────────┘
```

#### Plan List (Step 2)
```
┌──────────────────────────────────────────────┐
│ Selected Provider: DSTV                      │
├──────────────────────────────────────────────┤
│                                              │
│ Select Subscription Plan                    │
│                                              │
│ ┌────────────────────────────────────────┐  │
│ │ DStv Padi N4,400              ₦4,400  │  │
│ │ Fixed Price                            │  │
│ └────────────────────────────────────────┘  │
│                                              │
│ ┌────────────────────────────────────────┐  │
│ │ DStv Yanga N6,000             ₦6,000  │  │
│ │ Fixed Price                            │  │
│ └────────────────────────────────────────┘  │
│ ... (many more plans)                      │
│                                              │
│ Action: Scroll for more, click to select   │
│                                              │
└──────────────────────────────────────────────┘
```

#### Smartcard Input (Step 3)
```
┌──────────────────────────────────────────────┐
│ Selected Plan Summary                        │
│ ┌────────────────────────────────────────┐  │
│ │ DStv Compact N19,000          ₦19,000 │  │
│ └────────────────────────────────────────┘  │
├──────────────────────────────────────────────┤
│                                              │
│ 📺 Enter Your Smartcard Number               │
│ Find your smartcard/decoder number on your   │
│ device or bill                               │
│                                              │
│ Smartcard/Decoder Number                    │
│ ┌────────────────────────────────────────┐  │
│ │ Enter your smartcard number            │  │
│ │ [2312345678................]            │  │
│ └────────────────────────────────────────┘  │
│                                              │
│ Hints:                                       │
│ • DSTV: Look for "Decoder No."              │
│ • GoTV: Check your smartcard                │
│ • Startimes: Find on your decoder           │
│                                              │
│ Button: [ Back ] [ Continue to Payment ]    │
│                                              │
└──────────────────────────────────────────────┘
```

### Review Page

#### Desktop Layout
```
┌─────────────────────────────────┬──────────────┐
│  Header / Back Button           │              │
├─────────────────────────────────┤  SIDEBAR     │
│                                 │  SUMMARY     │
│  Subscription Details           │              │
│  - Provider                     │  Order       │
│  - Plan                         │  Summary     │
│  - Smartcard                    │              │
│  - Amount                       │  [Pay Now]   │
│                                 │              │
│  Smartcard Verification Status  │  Secure      │
│  (Verifying / Verified / Error) │  payment     │
│                                 │              │
│  Payment Method Selection       │              │
│  - Wallet (selected)            │              │
│  - Card                         │              │
│  - Bank Transfer                │              │
│                                 │              │
└─────────────────────────────────┴──────────────┘
```

#### Mobile Layout
```
┌──────────────────────────────┐
│ Header / Back               │
├──────────────────────────────┤
│                              │
│ Subscription Details         │
│ - Provider: DSTV             │
│ - Plan: Compact              │
│ - Amount: ₦19,000            │
│                              │
├──────────────────────────────┤
│                              │
│ Smartcard Verification       │
│ Status: Verifying...         │
│                              │
├──────────────────────────────┤
│                              │
│ Payment Method               │
│ ○ Wallet                     │
│ ○ Card                       │
│ ○ Bank                       │
│                              │
├──────────────────────────────┤
│                              │
│ Order Summary                │
│ Subtotal: ₦19,000            │
│ Fee: ₦0                      │
│ Total: ₦19,000               │
│                              │
│ [ Full Width Pay Now ]       │
│                              │
└──────────────────────────────┘
```

## State Transitions

### Verification States
```
Page Load
    ↓
[Verifying] ← Shows spinner
    ↓
┌─────────┬──────────┐
│         │          │
[Verified] [Error]   |
│         │          │
└→ Payment ← [Retry] │
  Enabled   (reload) │
            └────────┘
```

### Payment States
```
[Idle] 
  ↓
[Processing] ← Shows spinner, button disabled
  ↓
  ├─ [Success] → Redirect to dashboard
  │
  └─ [Error] → Toast notification, form re-enabled
```

## Form Validation Path

```
Input: "123" (3 digits)
  ↓
Validation: Not >= 10 digits
  ↓
Error: "Please enter a valid smartcard number (10-30 digits)"
  ↓
User Input: "1234567890" (10 digits, valid)
  ↓
[Continue to Payment] enabled
```

## Error Recovery Flows

### Invalid Smartcard Format
```
User enters: "ABC123" (not digits)
    ↓
Input stripped to: "123"
    ↓
Error: "Invalid format"
    ↓
Fix: User clicks "Update Smartcard"
    ↓
Routes back to Step 3
```

### Verification Failed
```
Verification initiated
    ↓
API returns: "Invalid smartcard number"
    ↓
Show Error: "The smartcard number appears invalid"
    ↓
Solutions:
  • Click "Update Smartcard" → Go back to form
  • Click "Back" → Change plan
    ↓
Input corrected smartcard
    ↓
Try verification again
```

### Payment Failed
```
Payment initiated
    ↓
API returns error
    ↓
Show Error Toast: "Payment failed..."
    ↓
Options:
  • Try Again (same method)
  • Change Payment Method
  • Go Back (abandon transaction)
```

## Success Path

```
All validations ✓
    ↓
Smartcard verified ✓
    ↓
Payment method selected ✓
    ↓
PIN entered (if wallet) ✓
    ↓
"Pay Now" clicked
    ↓
[Processing...] (loading)
    ↓
Payment API successful
    ↓
Success Modal appears
    ↓
Shows Transaction ID
    ↓
3-second delay
    ↓
Auto-redirect to Dashboard
    ↓
✓ Complete
```

## Mobile-First Considerations

### Touch Targets
- All buttons: ≥ 44px height
- Card click areas: ≥ 40px
- Input fields: ≥ 44px height

### Typography Scaling
- Mobile: Base 16px, larger tap targets
- Labels clearly visible
- No text smaller than 12px

### Navigation Helpers
- Back button on review page
- Step indicator shows progress
- Clear call-to-action buttons

### Spacing
- Vertical rhythm: 8px grid
- Generous gaps between sections
- Adequate padding in inputs

## Accessibility Paths

### Keyboard Navigation
```
Tab → Provider selection
Tab → Plan selection
Tab → Smartcard input
Tab → Continue button
     ↓
Tab → Payment method selection
Tab → Pay button
Tab → PIN Modal inputs
Tab → Confirm button
```

### Screen Reader Announcements
- Form labels associated with inputs
- Error messages announced as alerts
- Loading states described
- Button purposes clear

## Animation Timeline

```
Select Provider (instant)
  ↓
Load Plans (0.3s fade-in) ← Skeleton loading
  ↓
Click Continue (smooth scroll)
  ↓
Verify Smartcard (spinner rotates during verification)
  ↓
Payment Processing (button loading state)
  ↓
Success (checkmark animates in, then modal appears)
```

## Data Flow Summary

```
User Input
    ↓
[Client State] (React)
    ↓
[SessionStorage] (persistence)
    ↓
[API Call] (vtu service)
    ↓
[Response Processing]
    ↓
[UI Update] (toast/modal/redirect)
    ↓
[Cleanup] (clear storage on success)
```
