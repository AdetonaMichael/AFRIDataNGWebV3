# Idempotency Key Implementation Guide

## Overview

This document outlines the idempotency key implementation for AFRIDataNG frontend payment operations. This system prevents duplicate charges by ensuring that the same payment request with the same idempotency key will be rejected as a duplicate if re-submitted.

---

## Architecture

### Components

1. **`src/utils/idempotency.utils.ts`** - Core idempotency utilities
2. **`src/services/api-client.ts`** - HTTP client with automatic idempotency header injection
3. **`src/services/payment.service.ts`** - Payment API service with retry logic
4. **`src/lib/logout.ts`** - Cleanup handler for session termination
5. **`src/utils/__tests__/idempotency.utils.test.ts`** - Test suite

### Data Flow

```
User initiates payment
    ↓
Generate/retrieve idempotency key
    ↓
Store key in sessionStorage
    ↓
Add Idempotency-Key header to request
    ↓
Send payment request
    ↓
On Success:
  - Clear key from storage (with 5min delay)
  - Redirect to transaction history

On Error (Duplicate detected):
  - Remove key immediately
  - Show "already processed" message
  - Optionally fetch transaction status

On Network Error:
  - Keep key in storage
  - Retry (max 3 times with exponential backoff)
  - Reuse same key for all retries
```

---

## Usage

### 1. Simple Payment Purchase

```typescript
import { paymentService } from '@/services/payment.service';
import { useUIStore } from '@/store/ui.store';

export default function AirtimePage() {
  const { addToast } = useUIStore();

  const handlePurchaseAirtime = async () => {
    try {
      // Payment service automatically handles idempotency
      const response = await paymentService.purchaseAirtime({
        provider: 'mtn',
        phone_number: '08012345678',
        amount: 500,
        payment_method: 'wallet',
      });

      if (response.success) {
        addToast({
          message: 'Airtime purchased successfully!',
          type: 'success',
        });
      }
    } catch (error) {
      addToast({
        message: error.message,
        type: 'error',
      });
    }
  };

  return (
    <button onClick={handlePurchaseAirtime}>
      Buy Airtime
    </button>
  );
}
```

### 2. Purchase with PIN Verification

```typescript
import { paymentService } from '@/services/payment.service';

const handleVerifyPIN = async (pin: string) => {
  try {
    // Step 1: Initial purchase request (idempotency key auto-added)
    const purchaseResponse = await paymentService.purchaseAirtime({
      provider: 'airtel',
      phone_number: '08112345678',
      amount: 1000,
      payment_method: 'wallet',
      request_id: 'unique-request-id',
    });

    if (purchaseResponse.success) {
      // Step 2: Confirm with PIN (uses same idempotency context)
      const confirmResponse = await paymentService.confirmAirtimePurchase(
        'unique-request-id',
        {
          pin,
          request_id: 'unique-request-id',
        }
      );

      if (confirmResponse.success) {
        // Transaction successful
        router.push('/dashboard/history');
      }
    }
  } catch (error) {
    // Error handling with idempotency checks
    if (error.isDuplicateError) {
      // Already processed
      showAlert('info', 'Transaction already completed');
    } else if (error.isIdempotencyError) {
      // System error
      showAlert('error', 'Please try again');
    } else {
      showAlert('error', error.message);
    }
  }
};
```

### 3. Error Handling

```typescript
try {
  const response = await paymentService.purchaseAirtime(payload);
} catch (error) {
  // Check for specific error types
  if (error.isDuplicateError) {
    // Code: DUPLICATE_IDEMPOTENCY_KEY
    // This payment was already successfully processed
    console.log('Transaction already processed:', error.message);
  } else if (error.isIdempotencyError) {
    // Code: MISSING_IDEMPOTENCY_KEY
    // System error - idempotency key wasn't included
    console.log('Payment system error:', error.message);
  } else if (error.code === 'ECONNABORTED') {
    // Timeout - will be retried automatically
    console.log('Request timeout - retrying...');
  } else {
    // Validation or other errors
    console.log('Payment failed:', error.message);
  }
}
```

---

## Key Features

### ✅ Automatic Header Injection

The API client automatically adds `Idempotency-Key` headers to all payment operations:

```typescript
// Automatic - no manual header configuration needed
POST /api/v1/transactions/airtime/purchase
Headers: {
  'Idempotency-Key': '1704067200000-550e8400-e29b-41d4-a716-446655440000'
}
```

### ✅ Key Storage & Retrieval

Keys are stored in `sessionStorage` for the duration of the session:

```typescript
// Storage format
sessionStorage.idempotency_keys = {
  "/airtime/purchase-data-12345": {
    key: "1704067200000-550e8400-e29b-41d4-a716-446655440000",
    timestamp: 1704067200000
  }
}
```

### ✅ Automatic Retry Logic

Network errors are retried automatically with exponential backoff:

```
Attempt 1: immediate
Attempt 2: 1 second delay
Attempt 3: 2 seconds delay
Attempt 4: 4 seconds delay
```

### ✅ Session Cleanup

On logout, all stored keys are cleared:

```typescript
import { handleLogout } from '@/lib/logout';

// Clears all idempotency keys + auth tokens
await handleLogout();
```

### ✅ Duplicate Detection

The system handles duplicate requests gracefully:

```typescript
// First request succeeds
POST /transactions/airtime/purchase
Idempotency-Key: abc123
Response: 200 OK { transaction_id: '1234' }

// Retry with same key
POST /transactions/airtime/purchase
Idempotency-Key: abc123
Response: 409 CONFLICT { code: 'DUPLICATE_IDEMPOTENCY_KEY' }
```

---

## Payment Operations Requiring Idempotency

The following endpoints automatically include idempotency keys:

1. **`/payments/initialize`** - Initialize payment flow
2. **`/payments/verify`** - Verify payment status
3. **`/transactions/airtime/purchase`** - Buy airtime
4. **`/transactions/airtime/purchase/confirm`** - Confirm with PIN
5. **`/transactions/data/purchase`** - Buy data bundle
6. **`/transactions/data/purchase/confirm`** - Confirm with PIN
7. **`/transactions/bills/pay`** - Pay bills
8. **`/transactions/bills/pay/confirm`** - Confirm with PIN

Custom endpoints can be added to `PAYMENT_OPERATIONS` list in `src/services/api-client.ts`.

---

## Best Practices

### ✅ Do

- **Generate unique request IDs** for each transaction:
  ```typescript
  const requestId = `${timestamp}-${uuid}`;
  ```

- **Store request IDs** in component state or sessionStorage for reference:
  ```typescript
  sessionStorage.setItem('currentRequestId', requestId);
  ```

- **Reuse keys during retries** - The system does this automatically

- **Clear keys** on logout - The system does this automatically

- **Log idempotency keys** for debugging (masked in production):
  ```typescript
  console.log(`[Idempotency] Key: ${key.substring(0, 10)}...`);
  ```

- **Handle duplicate errors** gracefully:
  ```typescript
  if (error.isDuplicateError) {
    showMessage('Transaction already processed. Checking status...');
  }
  ```

### ❌ Don't

- **Use same key for different transactions** - Each gets unique key
- **Store keys in localStorage** - Use sessionStorage (cleared on logout)
- **Ignore MISSING_IDEMPOTENCY_KEY errors** - These indicate system issues
- **Retry indefinitely** - Maximum 3 retries built-in
- **Log sensitive payment details** - Only log keys (masked)
- **Clear keys immediately** after request - Wait for response (5min timeout)

---

## Configuration

### Add Custom Payment Endpoint

To add new payment endpoints that require idempotency:

```typescript
// src/services/api-client.ts

const PAYMENT_OPERATIONS = [
  // ... existing operations ...
  '/transactions/new-service/purchase',  // Add here
];
```

### Adjust Retry Settings

```typescript
// src/services/api-client.ts

class ApiClient {
  private maxRetries = 3;        // Change retry count
  private retryDelay = 1000;     // Change initial delay (ms)
  
  // Exponential backoff: Math.pow(2, attempt) * retryDelay
}
```

### Timeout Configuration

```typescript
// src/services/api-client.ts

this.axiosInstance = axios.create({
  timeout: 30000,  // 30 seconds - adjust if needed
});
```

---

## Monitoring & Debugging

### Enable Debug Logging

The system includes comprehensive logging:

```
[ApiClient] Added Idempotency-Key: 1234567890-abc123def456... for /transactions/airtime/purchase
[PaymentService] Purchasing airtime: { provider: 'mtn', amount: 500 }
[Idempotency] Key stored for operation: /airtime/purchase-data-xyz
[Idempotency] Duplicate request detected (idempotency key already used)
```

### Check Stored Keys

```typescript
// Browser DevTools Console
JSON.parse(sessionStorage.getItem('idempotency_keys'))
```

### Verify Headers

Use browser DevTools Network tab:
1. Open Network panel
2. Filter for payment requests
3. Check Request Headers for `Idempotency-Key`

---

## Testing

### Run Test Suite

```bash
npm test -- src/utils/__tests__/idempotency.utils.test.ts
```

### Manual Testing

1. **Test successful payment:**
   - Initiate payment → Verify idempotency key in headers → Confirm success

2. **Test duplicate detection:**
   - Intercept first request → Retry with same ID → Verify 409 response

3. **Test retry logic:**
   - Simulate network timeout → Wait for retry → Verify key reused

4. **Test session cleanup:**
   - Complete payment → Logout → Verify keys cleared

---

## Error Reference

| Code | Meaning | Action |
|------|---------|--------|
| `MISSING_IDEMPOTENCY_KEY` | Header not sent | Check interceptor, retry |
| `DUPLICATE_IDEMPOTENCY_KEY` | Same key sent twice | Show "already processed" |
| `ECONNABORTED` | Request timeout | Auto-retry with same key |
| `ENOTFOUND` | Network unreachable | Auto-retry with same key |
| `409 CONFLICT` | Duplicate request | Clear key, show message |

---

## Implementation Checklist

- [x] Created `src/utils/idempotency.utils.ts`
- [x] Updated `src/services/api-client.ts` with interceptor logic
- [x] Created `src/services/payment.service.ts` with all payment methods
- [x] Updated `app/dashboard/airtime/review/page.tsx` to use payment service
- [x] Created `src/lib/logout.ts` for session cleanup
- [x] Created comprehensive test suite
- [x] Added error handling for idempotency errors
- [x] Documented retry logic

---

## Support

For issues or questions:
1. Check console logs for detailed error messages
2. Review the test suite for usage examples
3. Verify payment endpoint is in `PAYMENT_OPERATIONS` list
4. Ensure sessionStorage is not disabled in browser

---

**Last Updated:** April 2026  
**Version:** 1.0.0  
**Status:** Production Ready
