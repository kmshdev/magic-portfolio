# Upstream Sync Workflow

## Overview

This repository includes a GitHub Action workflow that automatically keeps your `main` branch in sync with the upstream fork (`once-ui-system/magic-portfolio`). This ensures you always have the latest template updates while preserving your customizations in the `develop` branch.

## How It Works

### Automatic Sync
The workflow runs automatically:
- **Daily at 2 AM UTC** (scheduled)
- **When you push to main** (optional trigger)
- **Manually from the Actions tab** (workflow_dispatch)

### Sync Process

1. **Fetch Upstream**: Retrieves the latest changes from `once-ui-system/magic-portfolio`
2. **Check for Updates**: Compares your `main` branch with upstream
3. **Merge Changes**: Automatically merges if no conflicts exist
4. **Push to Main**: Updates your `main` branch with upstream changes

### Conflict Handling

If merge conflicts are detected:
- The workflow **creates a Pull Request** instead of auto-merging
- The PR includes details about the conflicts
- You can manually resolve conflicts and merge the PR

## Branch Strategy

```
once-ui-system/magic-portfolio (upstream)
    ↓ (auto-sync)
main (synced with upstream template)
    ↓ (manual merge when needed)
develop (your customizations)
```

### Recommended Workflow

1. **Main Branch**: Always stays in sync with upstream template
2. **Develop Branch**: Contains your portfolio customizations
3. **Merging Updates**: Periodically merge `main` into `develop` to get upstream improvements

## Manual Sync

### Trigger the Workflow Manually

1. Go to your repository on GitHub
2. Click **Actions** tab
3. Select **Sync with Upstream Fork** workflow
4. Click **Run workflow** button
5. Select the `main` branch
6. Click **Run workflow**

### Manual Sync via Git

If you prefer to sync manually:

```bash
# Add upstream remote (one-time setup)
git remote add upstream https://github.com/once-ui-system/magic-portfolio.git

# Fetch upstream changes
git fetch upstream

# Switch to main branch
git checkout main

# Merge upstream changes
git merge upstream/main

# Push to your repository
git push origin main
```

## Merging Upstream Updates into Develop

After the `main` branch is synced with upstream, you can merge those updates into your `develop` branch:

```bash
# Switch to develop branch
git checkout develop

# Merge main into develop
git merge main

# Resolve any conflicts if they occur
# Then commit and push
git push origin develop
```

## Configuration

### Change Sync Schedule

Edit `.github/workflows/sync-upstream.yml`:

```yaml
on:
  schedule:
    - cron: '0 2 * * *'  # Change this cron expression
```

**Cron Examples**:
- `0 2 * * *` - Daily at 2 AM UTC
- `0 2 * * 1` - Weekly on Monday at 2 AM UTC
- `0 2 1 * *` - Monthly on the 1st at 2 AM UTC

### Disable Automatic Sync

Remove or comment out the schedule trigger:

```yaml
on:
  # schedule:
  #   - cron: '0 2 * * *'
  workflow_dispatch:  # Keep manual trigger
```

## Monitoring

### View Workflow Runs

1. Go to your repository on GitHub
2. Click **Actions** tab
3. Select **Sync with Upstream Fork**
4. View the list of workflow runs

### Notifications

GitHub will notify you:
- When a sync PR is created (due to conflicts)
- When a workflow fails
- Via email or GitHub notifications (based on your settings)

## Troubleshooting

### Workflow Fails with Permission Error

**Solution**: Ensure the workflow has write permissions
1. Go to **Settings** → **Actions** → **General**
2. Scroll to **Workflow permissions**
3. Select **Read and write permissions**
4. Click **Save**

### Merge Conflicts Every Time

**Solution**: Your `main` branch has custom changes
- Keep customizations only in `develop` branch
- Reset `main` to match upstream:
  ```bash
  git checkout main
  git reset --hard upstream/main
  git push --force origin main
  ```

### Workflow Not Running on Schedule

**Possible causes**:
- Repository is inactive (GitHub disables scheduled workflows after 60 days of inactivity)
- Workflow file has syntax errors
- Repository is private and you're on a free plan (limited Actions minutes)

**Solution**: Trigger manually or push a commit to re-enable

## Best Practices

### 1. Keep Main Clean
- Don't make custom changes directly to `main`
- Use `main` only for syncing with upstream
- All customizations go in `develop` or feature branches

### 2. Review Upstream Changes
- Check the PR created by the workflow
- Review what's changing in the template
- Test changes before merging into `develop`

### 3. Regular Merges
- Periodically merge `main` into `develop`
- This keeps your customizations up-to-date with template improvements
- Resolve conflicts incrementally rather than letting them accumulate

### 4. Test Before Deploying
- After merging upstream updates into `develop`
- Run `npm run build` to ensure everything works
- Test locally before deploying

## Security

### GitHub Token

The workflow uses `GITHUB_TOKEN` which is automatically provided by GitHub:
- Has limited permissions (read/write to your repository only)
- Automatically expires after the workflow run
- No manual configuration needed

### Upstream Repository

The workflow syncs from:
```
https://github.com/once-ui-system/magic-portfolio.git
```

This is the official Once UI Magic Portfolio template. If you want to sync from a different repository, edit the workflow file:

```yaml
- name: Add upstream remote
  run: |
    git remote add upstream https://github.com/YOUR-UPSTREAM/repo.git
```

## FAQ

**Q: Will this overwrite my customizations?**  
A: No. Your customizations in the `develop` branch are safe. Only the `main` branch syncs with upstream.

**Q: How do I get upstream updates in my develop branch?**  
A: Merge `main` into `develop` after the sync completes.

**Q: What if I don't want automatic syncing?**  
A: Remove the `schedule` trigger and use manual triggering only.

**Q: Can I sync with a different upstream repository?**  
A: Yes, edit the `Add upstream remote` step in the workflow file.

**Q: Will this use my GitHub Actions minutes?**  
A: Yes, but minimally. Each sync run takes ~1 minute. Public repositories have unlimited Actions minutes.

## Support

For issues with the workflow:
1. Check the workflow run logs in the Actions tab
2. Review this documentation
3. Check GitHub Actions documentation: https://docs.github.com/en/actions

For issues with the Magic Portfolio template:
- Visit: https://docs.once-ui.com
- Discord: https://discord.com/invite/5EyAQ4eNdS

---

**Last Updated**: January 2025  
**Workflow Version**: 1.0
