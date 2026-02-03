# Password Hashing Implementation

## Overview

This document describes the password hashing implementation for the authentication system.

## Changes

### Before
- Plain text password comparison: `password === correctPassword`
- Password stored in `PAGE_ACCESS_PASSWORD` environment variable
- Vulnerable to timing attacks and password exposure

### After
- Bcrypt password hashing with salt rounds
- Hashed password stored in `PAGE_ACCESS_PASSWORD_HASH` environment variable
- Secure comparison using `bcrypt.compare()`
- Protection against timing attacks

## Setup

### 1. Generate Password Hash

Run the password hash generation script:

```bash
node scripts/generate-password-hash.js "your-password"
```

This will output:

```
✅ Password hash generated successfully!

Add this to your .env file:

PAGE_ACCESS_PASSWORD_HASH=$2a$10$...

⚠️  Remember to remove the old PAGE_ACCESS_PASSWORD variable
```

### 2. Update Environment Variables

Add the generated hash to your `.env` file:

```env
# Remove this:
# PAGE_ACCESS_PASSWORD=your-password

# Add this:
PAGE_ACCESS_PASSWORD_HASH=$2a$10$...
```

### 3. Deploy

Deploy the updated environment variables to your hosting platform (Vercel, etc.).

## Security Benefits

1. **Password Protection**: Even if the database/environment is compromised, the original password cannot be recovered
2. **Salt**: Each password hash includes a unique salt, preventing rainbow table attacks
3. **Timing Attack Prevention**: `bcrypt.compare()` uses constant-time comparison
4. **Industry Standard**: bcrypt is a well-tested, industry-standard password hashing algorithm

## Implementation Details

### Authentication Route

File: `src/app/api/authenticate/route.ts`

```typescript
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  const { password } = await request.json();
  const correctPasswordHash = process.env.PAGE_ACCESS_PASSWORD_HASH;

  const isValid = await bcrypt.compare(password, correctPasswordHash);
  
  if (isValid) {
    // Set authentication cookie
    return NextResponse.json({ success: true });
  }
  
  return NextResponse.json({ message: "Incorrect password" }, { status: 401 });
}
```

### Salt Rounds

- **Current**: 10 rounds
- **Security**: Provides good balance between security and performance
- **Future**: Can be increased if needed (12-14 rounds for higher security)

## Path Traversal Prevention

Also implemented path traversal prevention in `src/utils/utils.ts`:

```typescript
export function getPosts(customPath = ["", "", "", ""]) {
  // Sanitize each path component
  const safePath = customPath.map((component) =>
    component
      .replace(/\.\./g, "") // Remove ..
      .replace(/^\//, "")   // Remove leading /
      .replace(/\\/g, "/")  // Normalize slashes
  );

  const postsDir = path.join(process.cwd(), ...safePath);

  // Verify path is within project directory
  const resolvedPath = path.resolve(postsDir);
  const projectRoot = path.resolve(process.cwd());

  if (!resolvedPath.startsWith(projectRoot)) {
    throw new Error("Invalid path: Path traversal attempt detected");
  }

  return getMDXData(postsDir);
}
```

## Testing

### Test Valid Password

```bash
curl -X POST http://localhost:3000/api/authenticate \
  -H "Content-Type: application/json" \
  -d '{"password":"your-password"}'
```

Expected: `200 OK` with `Set-Cookie` header

### Test Invalid Password

```bash
curl -X POST http://localhost:3000/api/authenticate \
  -H "Content-Type: application/json" \
  -d '{"password":"wrong-password"}'
```

Expected: `401 Unauthorized`

### Test Path Traversal

```typescript
// Should throw error
getPosts(["../../../etc/passwd"]);

// Should work
getPosts(["blog", "posts"]);
```

## References

- [bcrypt.js GitHub](https://github.com/dcodeIO/bcrypt.js)
- [OWASP Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)
- [OWASP Path Traversal](https://owasp.org/www-community/attacks/Path_Traversal)

## Maintenance

- Review salt rounds annually
- Monitor bcrypt library for security updates
- Consider migrating to Argon2 for even higher security (future enhancement)
