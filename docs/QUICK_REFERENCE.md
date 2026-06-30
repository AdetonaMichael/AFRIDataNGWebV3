# Quick Reference: Token Expiration Fix

## What Was Fixed
- ❌ **Problem**: App got stuck in endless loop when token expired
- ✅ **Solution**: Automatic token validation and graceful logout

## Key Files & Their Roles

### 🔐 Token Utilities (`src/utils/token.utils.ts`)
```typescript
import { hasValidToken, isTokenLikelyExpired, clearAuthTokens } from '@/utils/token.utils';

// Check if token is present and valid
if (hasValidToken()) { /* token exists */ }

// Check if JWT is expired (client-side)
if (isTokenLikelyExpired()) { /* token expired */ }

// Clear all auth data
clearAuthTokens();
```

### 🏪 Auth Store (`src/store/auth.store.ts`)
```typescript
import { useAuthStore } from '@/store/auth.store';

const store = useAuthStore();

// Normal logout (user initiated)
store.logout();

// Session expired logout (token expiration)
store.handleSessionExpired(); // Sets error message

// Check if session expired
if (store.sessionExpired) { /* show special message */ }
```

### 🛡️ Auth Protection
```typescript
// AuthInitializer - runs on app startup
// ✓ Validates stored tokens
// ✓ Clears expired tokens
// ✓ Prevents mismatched state

// AuthProtected - wraps protected routes
// ✓ Real-time token validation
// ✓ Prevents rendering with expired token

// SessionExpiredHandler - catches expiration events
// ✓ Shows user notifications
// ✓ Ensures logout is complete
```

### 📡 API Client (`src/services/api-client.ts`)
```
Request Interceptor:
  → Checks token exists (logs if missing)
  → Adds Bearer token to Authorization header

Response Interceptor (401 Error):
  → Clears tokens immediately
  → Calls store.handleSessionExpired()
  → Redirects to /auth/login?session_expired=true
  → No retry loop (auth already cleared)
```

## Common Scenarios

### Scenario 1: User's Token Expired
```
1. App Startup → AuthInitializer checks token
2. Finds token expired → Calls logout()
3. Auth state cleared automatically
4. User redirected to login
5. ✓ No loop, clean experience
```

### Scenario 2: Token Expires While Using App
```
1. User on /dashboard
2. Token expires
3. AuthProtected detects (real-time check)
4. Redirects to login immediately
5. ✓ No stuck loading, clear message
```

### Scenario 3: API Request With Expired Token
```
1. Request sent (should not happen due to AuthProtected)
2. Server returns 401
3. Interceptor handles immediately
4. Calls handleSessionExpired()
5. Redirects with ?session_expired=true flag
6. SessionExpiredHandler shows message
7. ✓ No loop, cleanup complete
```

## Implementation Checklist

- [x] Token validation utility created
- [x] Auth store enhanced with session expiration
- [x] API client 401 handling improved
- [x] AuthInitializer validates tokens on startup
- [x] AuthProtected does real-time validation
- [x] Session expiration handler added
- [x] Providers updated with handler
- [x] Testing guide created

## Testing Quick Commands

### In Browser DevTools Console:

```javascript
// Check current auth state
const auth = JSON.parse(localStorage.getItem('auth-store')).state;
console.log('isAuthenticated:', auth?.isAuthenticated);
console.log('sessionExpired:', auth?.sessionExpired);
console.log('user:', auth?.user?.email);

// Check token
const token = localStorage.getItem('token');
console.log('Token exists:', !!token);

// Check token expiration
if (token) {
  const parts = token.split('.');
  const payload = JSON.parse(atob(parts[1]));
  const expDate = new Date(payload.exp * 1000);
  console.log('Expires at:', expDate);
  console.log('Time until expiry:', expDate - new Date(), 'ms');
}

// Simulate token expiration
localStorage.removeItem('token');
location.reload(); // Should redirect to login
```

## Console Log Patterns to Watch

### ✅ Healthy Startup
```
[AuthInitializer] Starting auth initialization...
[AuthInitializer] Checking for token in storage...
[AuthInitializer] Valid token found: true
[AuthInitializer] Token is likely expired: false
[AuthInitializer] Auth initialization complete
```

### ⚠️ Token Missing
```
[AuthInitializer] Starting auth initialization...
[AuthInitializer] Valid token found: false
[AuthInitializer] No valid token found - user is not authenticated
[AuthInitializer] Auth initialization complete
```

### 🔄 Token Expired Detected
```
[AuthInitializer] Token is likely expired: true
[AuthInitializer] Token is expired on client - clearing auth proactively
[AuthStore] Logging out user...
[TokenUtils] All auth tokens cleared
```

### 🚨 API 401 Error
```
[ApiClient] 401 Unauthorized - Session expired or invalid token
[ApiClient] Triggering store session expiration handler
[SessionExpiredHandler] Session expiration detected
```

## Troubleshooting

### Issue: Still see "hasToken: false" in logs
**Expected**: This is normal if token expired/missing
**Check**: Look for subsequent logout logs
**Fix**: Ensure token is valid before making requests

### Issue: Infinite redirect loop persists
**Check**: Auth store state in DevTools
**Expected**: `isAuthenticated: false` after expiration
**If still true**: Clear localStorage manually, refresh

### Issue: No error toast appears
**Check**: SessionExpiredHandler is in Providers
**Verify**: URL has `?session_expired=true` after redirect
**Debug**: Check console for SessionExpiredHandler logs

### Issue: Page stuck on loading spinner
**Likely**: Token validation taking too long
**Check**: Token file operations in safe-storage
**Solution**: Ensure no infinite loops in token check

## Key Principles

1. **Token validation happens early** - Before any API calls
2. **State is always consistent** - Token state matches auth state
3. **Logout is idempotent** - Safe to call multiple times
4. **No retry loops** - Auth cleared before redirect
5. **User gets feedback** - Clear error messages via toast

## Files to Reference

| Task | File |
|------|------|
| Understand token validation | `src/utils/token.utils.ts` |
| Fix logout issues | `src/store/auth.store.ts` |
| Debug API errors | `src/services/api-client.ts` |
| Fix auth check logic | `src/components/AuthProtected.tsx` |
| Add session warnings | `src/hooks/useSessionMonitor.ts` |
| Test expiration | `docs/TOKEN_EXPIRATION_FIX.md` |
| Full details | `docs/IMPLEMENTATION_SUMMARY.md` |

## When to Use Each Hook/Component

### Use `useAuth()` for:
- Login form
- Registration form  
- Logout button
- Getting current user

### Use `useSessionMonitor()` for:
- Dashboard (warn before expiry)
- Protected pages (detect expiration)
- Long-running operations

### Use `AuthProtected` for:
- Route protection
- Preventing render with invalid token
- Route-level auth checks

### Use `useAuthStore()` for:
- Direct auth state access
- Checking session expiration
- Custom logout logic

## Advanced: Custom Session Handling

```typescript
// In protected page:
export default function ProtectedPage() {
  const { isAuthenticated, sessionExpired } = useAuthStore();
  
  // Monitor and warn
  useSessionMonitor({
    warningThreshold: 600000, // 10 minutes
    onExpirationWarning: (ms) => {
      // Save work, show warning dialog
      console.log(`Saving work before expiry in ${ms}ms`);
    },
  });

  if (sessionExpired) {
    return <div>Your session expired. Redirecting...</div>;
  }

  return <div>Protected content</div>;
}
```

## Performance Tips

- Token validation: ~1-2ms per check
- Run validation: On startup + route changes + as needed
- Not on every render (too frequent)
- Session monitor interval: 60s recommended (configurable)

## Security Notes

✅ Token stored in localStorage  
✅ Token validated before API calls  
✅ Expired tokens cleared immediately  
✅ No stale tokens in requests  
⚠️  For highest security, consider server-side sessions later

---

**Last Updated**: 2024  
**Status**: ✅ Production Ready
