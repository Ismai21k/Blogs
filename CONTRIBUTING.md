# Contributing

Thanks for your interest in contributing to this project! Contributions (issues, bug reports, fixes, docs, tests) are welcome. The steps below explain the easiest way to get started.

1. Open an issue first
   - If you're proposing a feature or large change, open an issue describing the problem and expected behavior so we can discuss scope and design.

2. Fork the repository
   - Create your branch from `main`: `git checkout -b feat/short-description` or `fix/short-description`.

3. Commit changes
   - Keep commits small and focused.
   - Use clear commit messages (imperative tense): `Add: user login flow` or `Fix: image upload bug`.

4. Run tests & linters locally
   - Server: `cd server && pnpm install && pnpm test`
   - Client: `cd client/blog && pnpm install && pnpm test`
   - Run any linters or formatters used in the repo (Prettier/ESLint) if configured.

5. Create a pull request
   - Push your branch to your fork and open a PR against `main` in the upstream repository.
   - In your PR description include: what you changed, why, and any setup steps to test.

6. PR checklist (maintainers or contributors should verify):
   - [ ] Code builds and runs locally
   - [ ] New code includes tests or the change is covered by existing tests
   - [ ] Linter/formatting passes (if configured)
   - [ ] Documentation / README updated if necessary

7. Respond to feedback
   - Address review comments and push updates to your branch. The PR will update automatically.

Notes
- Keep PRs small and focused to make reviews easier.
- If your change touches sensitive areas (auth, DB migrations), explain the safety and rollback plan in the PR.

If you want, I can also add GitHub issue / PR templates and a CODE_OF_CONDUCT.md — tell me which you'd like and I will add them.
