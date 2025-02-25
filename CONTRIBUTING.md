# Contributing to Our Documentation

Thank you for your interest in contributing to our documentation! This guide will help you set up your development environment, make changes, and submit your contributions.

## Getting Started

### Fork and Clone

1. Fork the repository by clicking the "Fork" button at the top of the repository page.
2. Clone your fork to your local machine:
   ```bash
   git clone https://github.com/YOUR-USERNAME/REPOSITORY-NAME.git
   cd REPOSITORY-NAME
   ```
3. Add the upstream repository as a remote to keep your fork in sync:
   ```bash
   git remote add upstream https://github.com/ORIGINAL-OWNER/REPOSITORY-NAME.git
   ```

### Environment Setup

#### Setting Repository Variables

To develop the documentation locally, you'll need to set up environment variables in your forked repository:

1. Go to your forked repository on GitHub
2. Click on "Settings" → "Secrets and variables" → "Actions"
3. Select the "Variables" tab
4. Click "New repository variable"
5. Add the following variable:
   - Name: `BASE_URL`
   - Value: `http://localhost:3000` (or your preferred local development URL)

This variable will be used during the build process. Don't worry if you skip this step - the build will still work, but will use default values.

#### Install Dependencies

```bash
pnpm install
```

#### Start Development Test

After development, you can run tests to ensure your changes work as expected:

```bash
pnpm run test
```

## Submitting Your Contribution

### Push Your Changes

```bash
git push origin your-branch-name
```

### Create a Pull Request

1. Go to your fork on GitHub
2. Click "Compare & pull request" next to your pushed branch
3. Fill out the PR template with:
   - A clear title
   - A detailed description of your changes
   - References to any related issues
4. Click "Create pull request"

### PR Review Process

1. A maintainer will review your PR
2. They may request changes or ask questions
3. Address any feedback and push additional commits to your branch
4. Once approved, a maintainer will merge your PR

## Filing Issues

If you find a problem or have a suggestion but don't want to contribute code/docs, please file an issue.

### Issue Guidelines

1. Check existing issues to avoid duplicates
2. Use a clear, descriptive title
3. Provide detailed information about the issue:
   - For bugs: steps to reproduce, expected vs actual behavior
   - For improvements: clear description of the suggestion and its benefits
   - For questions: specific, focused questions
4. Add relevant labels if you have permission

## Code of Conduct

Please follow our [Code of Conduct](https://tac.openwallet.foundation/governance/code-of-conduct/) in all your interactions with the project.

## Need Help?

If you need assistance or have questions, you can:

- Open an issue with the "question" label
- Contact the maintainers directly
- Join our community chat

Thank you for contributing to our documentation!
