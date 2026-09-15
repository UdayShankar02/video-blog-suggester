# Video Blog Suggester

A personalized video blog recommendation platform with GitHub OAuth authentication. Get tailored recommendations for video blogs based on your interests and viewing preferences.

![Authentication](https://img.shields.io/badge/Auth-GitHub%20OAuth-blue)
![Next.js](https://img.shields.io/badge/Next.js-16-green)
![Better Auth](https://img.shields.io/badge/Better%20Auth-v1.7-3B82F6)

## Features

- 🔐 **GitHub OAuth Authentication** - Secure sign-in with GitHub
- 👤 **Profile Display** - Show user's name and profile picture (email kept private!)
- 🎯 **AI-Powered Recommendations** - Smart video blog suggestions
- ✨ **Minimal Design** - Clean, modern interface
- 📱 **Responsive** - Works great on all devices

## Quick Start

### Prerequisites

1. Get GitHub OAuth credentials:
   - Visit [GitHub Settings > Developers](https://github.com/settings/developers)
   - Create a new OAuth App
   - Note your Client ID and Client Secret
   - Set callback URL: `http://localhost:3000/api/auth/callback/github`

2. Generate a secure secret (one-time):
   ```bash
   openssl rand -base64 32
   ```

### Setup

1. Configure environment variables (see `.env.example`):

```env
# GitHub OAuth credentials
GITHUB_CLIENT_ID=your_client_id_here
GITHUB_CLIENT_SECRET=your_client_secret_here

# Better Auth secret (use output from openssl command above)
BETTER_AUTH_SECRET=<32-character-secret>

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Database connection
DATABASE_URL=your_database_connection_string
```

2. Run database migrations:
   ```bash
   npm run db:migrate
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Visit [http://localhost:3000](http://localhost:3000)

## Authentication Flow

1. User clicks "Sign In with GitHub" on the homepage
2. Redirects to GitHub's OAuth authorization page
3. After authentication, redirects back to your app
4. User sees their profile (name + picture) on the dashboard

### Profile Privacy

For privacy and security, only these profile fields are displayed:
- ✅ User name
- ✅ Profile picture

❌ **Email address is never shown** - respects user privacy

## Project Structure

```
src/
├── app/
│   ├── api/auth/[...all]/route.ts    # Auth API routes (sign-in, sign-out)
│   ├── page.tsx                       # Homepage with GitHub sign-in button
│   ├── sign-in/page.tsx               # Sign-in page (only shown if auth fails)
│   └── layout.tsx                     # Root layout
├── db/
│   └── db.ts                          # Drizzle database connection
├── lib/
│   ├── auth.ts                       # Better Auth server configuration
│   └── auth-client.ts                # React client for Better Auth
└── data/
    └── serverEnv.ts                  # Server environment variables
```

## API Routes

- `/api/auth/signin/github` - GitHub OAuth sign-in
- `/api/auth/callback/github` - GitHub OAuth callback
- `/api/auth/signout` - Sign out endpoint

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GITHUB_CLIENT_ID` | GitHub OAuth Client ID | ✅ Yes |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth Client Secret | ✅ Yes |
| `BETTER_AUTH_SECRET` | Auth encryption key (32+ chars) | ✅ Yes |
| `NEXT_PUBLIC_APP_URL` | Public app URL for client | ⚠️ Development |
| `DATABASE_URL` | PostgreSQL connection string | ✅ Yes |

## Security Best Practices

- ✅ Use a strong, random secret (`openssl rand -base64 32`)
- ✅ Never commit `.env*` files to version control
- ✅ Use HTTPS in production
- ✅ Set up proper CORS headers for production deployment
- ✅ Consider enabling rate limiting on auth endpoints

## Troubleshooting

### "Invalid OAuth state" error
Make sure your GitHub app's callback URL matches exactly:
```
http://localhost:3000/api/auth/callback/github
```

### "Secret not set" error
Ensure `BETTER_AUTH_SECRET` is set with at least 32 characters.

### Sign in redirects to sign-in page instead of homepage
Check that GitHub OAuth credentials are correctly configured in environment variables.

## Next Steps

- [ ] Add user profile settings page
- [ ] Implement video blog suggestion algorithms
- [ ] Add user preferences and interests
- [ ] Create admin dashboard for content moderation
- [ ] Set up analytics and tracking

## Learn More

- [Better Auth Documentation](https://better-auth.com/docs)
- [GitHub OAuth Setup Guide](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app)
- [Next.js Authentication](https://nextjs.org/docs/app/building-your-application/routing/authenticating-the-root-layout)

## License

MIT
