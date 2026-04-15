# TV Subscription - Architecture & Quick Reference

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        BROWSER / CLIENT                      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                     NEXT.JS APPLICATION                      │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Pages                                               │  │
│  │  ├─ /dashboard/tv          [Main Selection Form]    │  │
│  │  └─ /dashboard/tv/review   [Checkout & Payment]     │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Components                                          │  │
│  │  ├─ Card, Button, Input, Toast (shared)            │  │
│  │  ├─ PINVerificationModal (shared)                   │  │
│  │  └─ SmartcardVerification (new)                     │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Services & Hooks                                   │  │
│  │  ├─ vtuService.getTVProviders()                     │  │
│  │  ├─ vtuService.getTVVariations()                    │  │
│  │  ├─ vtuService.verifySmartcard()                    │  │
│  │  ├─ useAuth(), useUIStore()                         │  │
│  │  └─ sessionStorage persistence                      │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
       ┌──────────────────────┼──────────────────────┐
       ↓                      ↓                      ↓
┌─────────────┐      ┌──────────────┐      ┌──────────────┐
│   API       │      │  Auth        │      │  Payment     │
│ Endpoints   │      │  Service     │      │  Service     │
└─────────────┘      └──────────────┘      └──────────────┘
```

## 📊 Data Flow Diagram

```
USER INITIATION
       ↓
┌─────────────────────────────────────────────┐
│ /dashboard/tv (Main Page)                   │
│ - useState for form, step, variations      │
│ - useEffect to fetch providers             │
│ - Display provider grid                    │
└─────────────────────────────────────────────┘
       ↓
   FORM INPUT
   (Provider/Plan/Smartcard)
       ↓
┌─────────────────────────────────────────────┐
│ sessionStorage.setItem('tvFormData', {...}) │
└─────────────────────────────────────────────┘
       ↓
┌─────────────────────────────────────────────┐
│ /dashboard/tv/review (Review Page)          │
│ - sessionStorage.getItem('tvFormData')      │
│ - Auto-call verifySmartcard()              │
│ - Show verification status                 │
└─────────────────────────────────────────────┘
       ↓
   PAYMENT SELECTION
   (Wallet/Card/Bank)
       ↓
┌─────────────────────────────────────────────┐
│ If Wallet: Show PIN Modal                   │
│ User enters PIN                             │
└─────────────────────────────────────────────┘
       ↓
┌─────────────────────────────────────────────┐
│ PAYMENT PROCESSING                          │
│ - Call vtuService.processPayment()         │
│ - Wait for API response                    │
│ - Show success/error state                 │
└─────────────────────────────────────────────┘
       ↓
┌─────────────────────────────────────────────┐
│ SUCCESS                                      │
│ - Clear sessionStorage                      │
│ - Show transaction ID                       │
│ - Redirect to dashboard after 3s           │
└─────────────────────────────────────────────┘
```

## 📁 Directory Structure

```
afridatawebv3/
├── app/
│   └── dashboard/
│       ├── layout.tsx              ← Added TV nav icon
│       └── tv/                     ← NEW
│           ├── layout.tsx
│           ├── page.tsx            ← Main form (3 steps)
│           └── review/
│               └── page.tsx        ← Checkout & payment
│
├── src/
│   ├── components/
│   │   └── shared/
│   │       ├── Card.tsx
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── Toast.tsx
│   │       ├── Modal.tsx
│   │       ├── SmartcardVerification.tsx    ← NEW
│   │       └── ...
│   │
│   └── services/
│       ├── vtu.service.ts         ← Added TV methods
│       ├── payment.service.ts
│       ├── auth.service.ts
│       └── ...
│
└── docs/
    ├── TV_DELIVERY_SUMMARY.md          ← Start here!
    ├── TV_IMPLEMENTATION_SUMMARY.md
    ├── TV_SUBSCRIPTION_DESIGN.md
    ├── TV_USER_EXPERIENCE.md
    └── TV_DEVELOPER_CHECKLIST.md
```

## 🔗 Component Relationships

```
Dashboard (layout.tsx)
  ├─ Sidebar Navigation (includes TV option)
  │
  └─ /dashboard/tv (page.tsx)
      ├─ Card component
      ├─ Button component
      ├─ Input component
      ├─ Toast notifications
      └─ Step Indicator
              ↓
         Provider Selection → Plan Selection → Smartcard Input
              ↓
         sessionStorage.setItem()
              ↓
      /dashboard/tv/review (page.tsx)
      ├─ SmartcardVerification component
      ├─ Payment Method Selector
      ├─ PINVerificationModal
      └─ Order Summary (desktop only)
              ↓
         Success Modal / Error Toast
```

## 🔄 State Management

### Local Component State (React)
```typescript
// TV Main Page
const [providers, setProviders] = useState<VTUProvider[]>([])
const [selectedProvider, setSelectedProvider] = useState<string>('')
const [variations, setVariations] = useState<VTUVariation[]>([])
const [selectedVariation, setSelectedVariation] = useState<string>('')
const [smartcard, setSmartcard] = useState<string>('')
const [step, setStep] = useState<'select' | 'plan' | 'verify'>('select')
const [errors, setErrors] = useState<Record<string, string>>({})
```

### SessionStorage (Persistence)
```javascript
// Save to SessionStorage
sessionStorage.setItem('tvFormData', JSON.stringify({
  provider: string,
  providerName: string,
  variationCode: string,
  variationName: string,
  variationAmount: string,
  smartcard: string
}))

// Retrieve on review page
const data = JSON.parse(sessionStorage.getItem('tvFormData'))

// Clear on success
sessionStorage.removeItem('tvFormData')
```

### Global State (Zustand)
```typescript
// useUIStore for notifications
const { addToast } = useUIStore()
addToast({ message: 'Success!', type: 'success' })

// useAuth for user context
const { user } = useAuth()
```

## 🎯 API Call Flow

```
VTU SERVICE LAYER (vtu.service.ts)
│
├─ getServiceProviders(serviceId)
│  ├─ GET /vtu/service/tv-subscription
│  ├─ Extract response.content
│  └─ Return TVProvider[]
│
├─ getVariations(serviceId)
│  ├─ GET /vtu/variations/{serviceID}
│  ├─ Extract response.content
│  └─ Return VTUVariationResponse
│
├─ verifySmartcard(smartcard, serviceID)
│  ├─ POST /vtu/merchant-verify
│  ├─ Payload: { billersCode: smartcard, serviceID }
│  └─ Return: { WrongBillersCode, error, Customer_Name }
│
└─ processPayment(paymentData)
   ├─ POST /vtu/pay
   ├─ Payload: VTUPaymentRequest
   └─ Return: { status, transaction_id, message }
```

## 🎨 Styling Architecture

### Tailwind CSS Classes
```
Spacing:     gap-x, p-x, m-x (x = 1-8 → 4-32px)
Colors:      text-[#a9b7ff], bg-[#f7f8ff], border-gray-200
Typography:  text-4xl, font-bold, font-semibold
Responsive:  sm:, md:, lg: prefixes
Borders:     border-2, rounded-lg, shadow-md
```

### Color System
```
Primary:       #a9b7ff (Tailwind: to-purple-300)
Primary Hover: #9aa5ff
Light BG:      #f7f8ff (Tailwind: from-purple-100)
Text:          Gray-900/600/500
Border:        Gray-300/200
Success:       Green-600
Error:         Red-600
```

## 🔐 Security Implementation

```
SMARTCARD VERIFICATION
│
├─ Input Validation
│  ├─ Digits only (regex: /\D/g)
│  ├─ Length: 10-30 characters
│  └─ Partial masking: ****2312
│
├─ API Verification
│  ├─ Server-side validation on /vtu/merchant-verify
│  └─ Response check for WrongBillersCode flag
│
└─ Error Display
   └─ User-friendly error messages

PAYMENT PROCESSING
│
├─ Wallet Payment
│  ├─ Requires PIN verification
│  ├─ Modal intercept
│  └─ User confirmation
│
├─ Card/Bank Transfer
│  ├─ Direct processing
│  └─ Third-party handling
│
└─ Idempotency
   ├─ Request ID generation (UUID)
   └─ Prevents duplicate transactions
```

## 🚀 Performance Optimization

```
CODE SPLITTING
│
├─ Page-level: Each page loaded separately
├─ Component-level: Reuse existing components
└─ No new dependencies: ↓ Bundle size

IMAGE OPTIMIZATION
│
├─ From API/CDN: Not bundled
├─ Lazy loading: Load on demand
└─ Responsive: Different sizes per device

STATE OPTIMIZATION
│
├─ Local state only: No Redux/Context burden
├─ SessionStorage: Efficient persistence
└─ Minimal re-renders: Proper hook dependencies

API EFFICIENCY
│
├─ Single call per action: No redundant requests
├─ Error caching: Don't retry failed requests
└─ Loading states: Clear user feedback
```

## 🧪 Testing Strategy

```
UNIT TESTS
│
├─ Component rendering
├─ Form validation
├─ State updates
└─ API error handling

INTEGRATION TESTS
│
├─ Provider loading
├─ Plan selection flow
├─ Smartcard verification
└─ Payment processing

E2E TESTS
│
├─ Complete purchase flow
├─ Mobile responsiveness
├─ Error scenario recovery
└─ Form data persistence

BROWSER TESTS
│
├─ Chrome, Firefox, Safari, Edge
├─ Modern versions
└─ Mobile browsers
```

## 📱 Responsive Design Breakpoints

```
Mobile-First Approach
│
├─ Base: < 640px (Mobile)
│  ├─ 2-column grid
│  ├─ Full-width forms
│  ├─ Stacked layouts
│  └─ Compact step indicator
│
├─ sm: 640px (Tablets)
│  ├─ 2-3 column grid
│  ├─ Slightly larger spacing
│  └─ More readable
│
├─ md: 768px (Small Desktop)
│  ├─ 3-4 column grid
│  ├─ Sidebar appears
│  └─ Two-column layout
│
└─ lg: 1024px+ (Large Desktop)
   ├─ Full sidebar
   ├─ Sticky summary
   └─ Maximum grid columns
```

## 🔄 Form Validation Rules

```
SMARTCARD VALIDATION
│
├─ Format: Digits only
├─ Length: 10-30 characters
├─ Invalid: Shows error message
└─ Valid: Enables next button

PROVIDER VALIDATION
│
├─ Required: Must select provider
├─ Valid: TVProvider object exists
└─ Error: "Please select a provider"

PLAN VALIDATION
│
├─ Required: Must select plan
├─ Valid: Plan code exists in variations
└─ Error: "Please select a plan"
```

## 📊 Transaction Flow

```
INITIATION
  └─ User clicks "Pay Now"
      │
      ├─ Check: Smartcard verified? ✓
      ├─ Check: Payment method selected? ✓
      └─ Check: Form valid? ✓
           │
           ↓
PAYMENT MODAL (if Wallet)
  └─ Show PIN field
      │
      ├─ User enters PIN
      └─ ProcessPayment() called
           │
           ↓
API CALL
  ├─ POST /vtu/pay
  ├─ Status: Processing (loading shown)
  └─ Await response
           │
           ↓
RESPONSE HANDLING
  │
  ├─ Success: Show success modal + redirect
  ├─ Error: Show error toast + keep form
  └─ Network: Handle gracefully
```

## 🎓 Key Concepts

| Concept | Implementation |
|---------|-----------------|
| **Multi-Step Form** | useState for step tracking |
| **Data Persistence** | sessionStorage for page nav |
| **Async Operations** | useEffect for API calls |
| **Form Validation** | Inline field validation |
| **Error Handling** | Try-catch + user feedback |
| **Loading States** | Conditional rendering |
| **Mobile Responsive** | Tailwind breakpoints |
| **Component Reuse** | Shared UI library |
| **Type Safety** | TypeScript interfaces |
| **State Management** | React hooks + Zustand |

## 📞 Common Questions

**Q: How does smartcard verification work?**
A: Client sends to `/vtu/merchant-verify`. Server validates with provider's system. Returns success/error with customer name if valid.

**Q: Where is form data stored?**
A: In `sessionStorage` as JSON. Survives page navigation but cleared on browser close or success.

**Q: How is payment secured?**
A: PIN verification modal intercepts wallet payments. Card/bank handled by payment service. All over HTTPS.

**Q: Can providers be added dynamically?**
A: Yes! They come from API endpoint. Just add to provider array response.

**Q: Is mobile layout automatic?**
A: Yes! Tailwind responsive classes handle all breakpoints automatically.

---

**Document Version:** 1.0
**Last Updated:** April 15, 2026
**Status:** Complete & Ready
