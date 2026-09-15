# Authentication Setup Guide

This project uses **Better Auth** with GitHub OAuth for authentication.

## Quick Start

### 1. Get GitHub OAuth Credentials

1. Go to [GitHub Settings > Developers](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in:
   - **Application name**: Video Blog Suggester
   - **Homepage URL**: `http://localhost:3000` (or your domain)
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
4. Create the app and copy the **Client ID** and **Client Secret**

### 2. Configure Environment Variables

Create a `.env.local` file with your GitHub credentials:

```env
# GitHub OAuth (get from https://github.com/settings/developers)
GITHUB_CLIENT_ID=your_github_client_id_here
GITHUB_CLIENT_SECRET=your_github_client_secret_here

# Better Auth Secret (generate with: openssl rand -base64 32)
BETTER_AUTH_SECRET=your-super-secret-32-character-key-change-this-in-production

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Database connection string (from your database config)
DATABASE_URL=postgresql://user:password@host:port/database
```

### 3. Run Database Migrations

```bash
npm run db:migrate
```

### 4. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the homepage with a sign-in button.

## Features

- ✅ GitHub OAuth authentication
- ✅ Profile display (name and picture only - email hidden)
- ✅ Minimal, clean design
- ✅ Responsive layout
- ✅ Secure session management

## Session Privacy

The user's **email address is never displayed** in the UI. Only:
- User name
- Profile picture

This respects privacy and security best practices.

## Troubleshooting

### "Invalid OAuth state" error
Make sure your callback URL matches exactly what you registered in GitHub settings:
```
http://localhost:3000/api/auth/callback/github
```

### "Secret not set" error
Ensure `BETTER_AUTH_SECRET` is set with at least 32 random characters.

### Sign in redirect loop
Check that your GitHub OAuth credentials are correct in the environment variables.

## Next Steps

- [ ] Add user preferences/settings page
- [ ] Implement video blog suggestions logic
- [ ] Add user profile settings (change avatar, update bio)
- [ ] Create admin dashboard

## Security Notes

- Never commit `.env.local` to version control
- Use a secure secret for production
- Consider enabling HTTPS in production
- Review GitHub app permissions before deploying
