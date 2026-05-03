# Installing the Upstream Sync Workflow

## Why Manual Installation?

GitHub has security restrictions that prevent automated tools from creating or modifying workflow files (`.github/workflows/*.yml`) without special permissions. This is a security feature to prevent malicious code from being automatically added to your repository's CI/CD pipeline.

## Installation Steps

### Option 1: Direct File Creation on GitHub (Recommended)

1. **Go to your repository on GitHub**
   - Navigate to: https://github.com/keshav1998/magic-portfolio

2. **Create the workflow file**
   - Click on **Add file** → **Create new file**
   - Name the file: `.github/workflows/sync-upstream.yml`
   - Copy the content from `docs/github-actions/sync-upstream.yml` in this repository
   - Paste it into the new file

3. **Commit the file**
   - Scroll down to the commit section
   - Commit message: `Add upstream sync workflow`
   - Select **Commit directly to the develop branch**
   - Click **Commit new file**

### Option 2: Using Git Locally

If you have the repository cloned locally with proper credentials:

```bash
# Navigate to your repository
cd magic-portfolio

# Checkout develop branch
git checkout develop

# Copy the workflow file from docs to .github/workflows
cp docs/github-actions/sync-upstream.yml .github/workflows/

# Add and commit
git add .github/workflows/sync-upstream.yml
git commit -m "Add upstream sync workflow"

# Push to GitHub
git push origin develop
```

### Option 3: Using GitHub CLI

```bash
# Navigate to your repository
cd magic-portfolio

# Checkout develop branch
git checkout develop

# Copy the workflow file
cp docs/github-actions/sync-upstream.yml .github/workflows/

# Add and commit
git add .github/workflows/sync-upstream.yml
git commit -m "Add upstream sync workflow"

# Push using gh CLI (bypasses some restrictions)
gh repo sync
git push origin develop
```

## Enable Workflow Permissions

After installing the workflow, you need to grant it the necessary permissions:

1. **Go to Repository Settings**
   - Navigate to: https://github.com/keshav1998/magic-portfolio/settings

2. **Configure Actions Permissions**
   - In the left sidebar, click **Actions** → **General**
   - Scroll to **Workflow permissions**
   - Select **Read and write permissions**
   - Check **Allow GitHub Actions to create and approve pull requests**
   - Click **Save**

## Verify Installation

1. **Check the workflow file exists**
   - Go to: https://github.com/keshav1998/magic-portfolio/tree/develop/.github/workflows
   - You should see `sync-upstream.yml`

2. **View in Actions tab**
   - Go to the **Actions** tab in your repository
   - You should see **Sync with Upstream Fork** in the workflows list

3. **Test the workflow**
   - Click on **Sync with Upstream Fork**
   - Click **Run workflow**
   - Select the `develop` branch
   - Click **Run workflow**
   - Wait for it to complete and check the results

## What the Workflow Does

### Automatic Sync
- **Runs daily at 2 AM UTC** to check for upstream updates
- **Fetches changes** from `once-ui-system/magic-portfolio`
- **Merges automatically** if no conflicts exist
- **Creates a PR** if merge conflicts are detected

### Manual Trigger
- You can trigger it anytime from the Actions tab
- Useful when you know upstream has updates

### Branch Strategy
```
once-ui-system/magic-portfolio (upstream)
    ↓ (auto-sync)
main (synced with upstream template)
    ↓ (manual merge when needed)
develop (your customizations)
```

## Troubleshooting

### Workflow Not Appearing in Actions Tab

**Cause**: Workflow file not in the correct location or branch

**Solution**:
- Ensure file is at `.github/workflows/sync-upstream.yml`
- Ensure you're viewing the correct branch (develop)
- Refresh the Actions tab

### Permission Denied Error

**Cause**: Workflow doesn't have write permissions

**Solution**:
1. Go to **Settings** → **Actions** → **General**
2. Set **Workflow permissions** to **Read and write permissions**
3. Enable **Allow GitHub Actions to create and approve pull requests**
4. Click **Save**

### Workflow Runs but Fails

**Cause**: Various reasons (network issues, conflicts, etc.)

**Solution**:
1. Click on the failed workflow run
2. Expand the failed step to see error details
3. Check the logs for specific error messages
4. Refer to `docs/SYNC_WORKFLOW.md` for detailed troubleshooting

## Next Steps

After installing the workflow:

1. **Read the documentation**: `docs/SYNC_WORKFLOW.md`
2. **Test the workflow**: Run it manually from the Actions tab
3. **Monitor the first run**: Check if it successfully syncs with upstream
4. **Set up notifications**: Configure GitHub to notify you of workflow runs

## Alternative: Manual Sync Without Workflow

If you prefer not to use the automated workflow, you can sync manually:

```bash
# Add upstream remote (one-time)
git remote add upstream https://github.com/once-ui-system/magic-portfolio.git

# Sync main branch
git checkout main
git fetch upstream
git merge upstream/main
git push origin main

# Merge updates into develop
git checkout develop
git merge main
git push origin develop
```

## Support

For issues with installation:
- Check GitHub Actions documentation: https://docs.github.com/en/actions
- Review the workflow file for syntax errors
- Ensure you have admin access to the repository

For issues with the workflow itself:
- See `docs/SYNC_WORKFLOW.md` for detailed documentation
- Check the workflow run logs in the Actions tab

---

**Note**: The workflow files are provided in the `docs/` directory for your reference and manual installation. This is due to GitHub's security restrictions on automated workflow file creation.
