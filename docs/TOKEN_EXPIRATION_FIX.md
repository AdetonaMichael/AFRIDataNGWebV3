# Token Expiration & Auto-Logout Testing Guide

## Summary of Changes

This fix resolves the endless loop issue that occurred when user tokens expired or were missing. The system now automatically detects token expiration and logs users out gracefully with proper UX.

## Key Components Fixed

### 1. **Token Validation Utility** (`src/utils/token.utils.ts`)
- **Purpose**: Centralized token validation and management
- **Key Functions**:
  - `hasValidToken()` - Checks if token exists
  - `isTokenLikelyExpired()` - Client-side JWT expiration check
  - `getTokenExpirationTime()` - Gets remaining token lifetime
  - `clearAuthTokens()` - Clears all auth data safely

### 2. **Auth Store Enhancement** (`src/store/auth.store.ts`)
- **New State**: `sessionExpired` flag for tracking expiration events
- **New Actions**: `handleSessionExpired()` - Properly handles session termination
- **Improvement**: Token utilities used instead of direct localStorage access

### 3. **API Client 401 Handling** (`src/services/api-client.ts`)
- **Before**: Simple redirect on 401 error
- **After**: 
  - Clears tokens immediately
  - Updates Zustand store via `handleSessionExpired()`
  - Redirects with `?session_expired=true` flag
  - Uses `window.location.replace()` to prevent back navigation

### 4. **AuthInitializer Enhancement** (`src/components/AuthInitializer.tsx`)
- **New**: Validates stored tokens on app startup
- **Detects**: Expired tokens before first page load
- **Prevents**: Requests with invalid tokens from being made

### 5. **AuthProtected Enhancement** (`src/components/AuthProtected.tsx`)
- **New**: Real-time token validation on protected routes
- **Prevents**: Rendering protected content with expired tokens
- **Early Detection**: Catches expiration before making API calls

## Testing Scenarios

### Scenario 1: Token Expired at App Startup
**Test Steps**:
1. Login to the app normally
2. Note the token expiration time in console: `[TokenUtils] Token expires in...`
3. Manually clear the token: Open DevTools → Application → LocalStorage → remove 'token'
4. Refresh the page

**Expected Result**:
- AuthInitializer detects missing token
- User is redirected to `/auth/login`
- No endless loop or stuck loading

**Console Logs to Check**:
```
[AuthInitializer] Token is likely expired on client - clearing auth proactively
[AuthStore] Logging out user...
[TokenUtils] All auth tokens cleared
```

### Scenario 2: Token Expires During Page Navigation
**Test Steps**:
1. Login to app
2. Navigate to `/dashboard`
3. Open DevTools → Application → LocalStorage → remove 'token'
4. Click on different dashboard sections

**Expected Result**:
- AuthProtected detects missing token
- Immediate redirect to `/auth/login?token_expired=true`
- Toast notification: "Your authentication token has expired..."
- No page render with missing token

**Console Logs to Check**:
```
[AuthProtected] Token is missing or expired - logging out proactively
[SessionExpiredHandler] Session expiration detected
```

### Scenario 3: Token Expires During API Call
**Test Steps**:
1. Login to app
2. Navigate to dashboard
3. Open DevTools → Application → LocalStorage → remove 'token'
4. Immediately try to make a request (e.g., click wallet balance, buy data)

**Expected Result**:
- API call fails with 401
- Interceptor handles error:
  - Clears tokens
  - Updates store with `handleSessionExpired()`
  - Redirects to login
- Toast shows session expired message
- No infinite retry loop

**Console Logs to Check**:
```
[ApiClient] 401 Unauthorized - Session expired or invalid token
[ApiClient] Triggering store session expiration handler
[SessionExpiredHandler] Session expiration detected
```

### Scenario 4: Manual Token Expiration (JWT Exp Claim)
**Test Steps**:
1. Login to app
2. Open DevTools → Application → LocalStorage → Copy token value
3. Decode token at jwt.io to see exp claim
4. If exp is in future, manually edit localStorage to create an expired token:
   ```javascript
   // In DevTools console:
   localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODA5MDAwMDB9.xxx')
   ```
5. Refresh page

**Expected Result**:
- AuthInitializer detects expired JWT
- Token is cleared
- User redirected to login
- No request attempts with expired token

### Scenario 5: Session Monitor Warnings (Optional)
**Test Setup** (if implementing in dashboard):
```tsx
export default function Dashboard() {
  useSessionMonitor({
    checkInterval: 30000, // 30 seconds
    warningThreshold: 300000, // 5 minutes before expiry
    onExpirationWarning: (ms) => console.log(`Expiring in ${ms}ms`),
    onTokenExpired: () => console.log('Token expired!'),
  });
  
  return <div>Dashboard content</div>;
}
```

**Test Steps**:
1. Login with short-lived token (if available for testing)
2. Wait in dashboard
3. Watch for expiration warnings in console
4. Let token expire

**Expected Result**:
- Toast warning appears when token is 5 minutes from expiry
- Users have time to save work
- Auto-logout happens smoothly on expiry
- No stuck UI state

## Debugging Tips

### Check Token Status
```javascript
// In DevTools console:
const store = JSON.parse(localStorage.getItem('auth-store'));
console.log('isAuthenticated:', store.state?.isAuthenticated);
console.log('user:', store.state?.user);
console.log('sessionExpired:', store.state?.sessionExpired);

// Check token validity
const token = localStorage.getItem('token');
if (token) {
  const parts = token.split('.');
  const payload = JSON.parse(atob(parts[1]));
  console.log('Token exp:', new Date(payload.exp * 1000));
  console.log('Time until expiry:', (payload.exp * 1000) - Date.now(), 'ms');
}
```

### Monitor API Requests
1. Open DevTools → Network tab
2. Filter by "wallet" or other API endpoints
3. Look for 401 responses
4. Check console for `[ApiClient]` logs

### Enable Verbose Logging
The following logs should appear in console:
- `[AuthInitializer]` - Startup token validation
- `[AuthProtected]` - Route protection checks
- `[ApiClient]` - API request/response logging
- `[SessionExpiredHandler]` - Session expiration handling
- `[TokenUtils]` - Token validation utilities

## Expected Behavior

### ✅ What Should Happen (Fixed)
- Token expiration detected automatically
- User logged out gracefully
- Clear error messages shown
- No infinite loops or stuck pages
- Auth state always consistent with token state

### ❌ What Should NOT Happen (Bugs)
- Endless redirect loops
- Loading spinner stuck indefinitely
- Unauthenticated API calls with missing token
- Auth store showing authenticated while token is missing
- Page content rendering before auth check
- Silent failures without user notification

## Performance Considerations

### Token Validation Overhead
- JWT exp check: ~1ms per check (minimal)
- Runs on app startup: Once per session
- Runs on protected route load: Once per navigation
- SessionMonitor: Configurable interval (default 1 minute)

### Recommendations
- Default monitoring interval: 60 seconds (balance between freshness and performance)
- Warning threshold: 5 minutes before expiry (gives users time)
- Check on app init: Always (prevents stuck sessions)
- Check on route protection: Always (critical for UX)

## Migration Notes

### For Existing User Sessions
- Old tokens in localStorage will continue to work until they expire
- First expiration will trigger new cleanup logic
- No breaking changes for active users
- Stale sessions will be cleaned up automatically

### For Development
- Set token expiration to short duration for testing (1 hour instead of 24 hours)
- Use browser dev tools to manually manipulate tokens for testing
- Watch console logs during token lifecycle

## Files Modified

1. ✅ `src/utils/token.utils.ts` - NEW
2. ✅ `src/store/auth.store.ts` - ENHANCED
3. ✅ `src/services/api-client.ts` - IMPROVED 401 handling
4. ✅ `src/components/AuthInitializer.tsx` - ENHANCED with validation
5. ✅ `src/components/AuthProtected.tsx` - ENHANCED with real-time checks
6. ✅ `src/hooks/useSessionMonitor.ts` - NEW (optional usage)
7. ✅ `src/components/SessionExpiredHandler.tsx` - NEW
8. ✅ `src/components/Providers.tsx` - UPDATED
9. ✅ `src/hooks/useAuth.ts` - IMPROVED logout handling
10. ✅ `src/lib/logout.ts` - IMPROVED with utilities

## Next Steps

1. **Test token expiration** using scenarios above
2. **Monitor console logs** for proper flow
3. **Verify no endless loops** in redirect scenarios
4. **Check UX** - users get clear messages and redirects
5. **Optional**: Implement `useSessionMonitor` hook in dashboard for proactive warnings
6. **Optional**: Customize warning thresholds based on token lifetime
