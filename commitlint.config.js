// Commitlint configuration for conventional commits
// https://commitlint.js.org/

module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // Type must be one of the following
    "type-enum": [
      2,
      "always",
      [
        "feat", // New feature
        "fix", // Bug fix
        "docs", // Documentation only
        "style", // Code style (formatting, semicolons, etc.)
        "refactor", // Code refactoring
        "perf", // Performance improvement
        "test", // Adding or updating tests
        "build", // Build system or dependencies
        "ci", // CI configuration
        "chore", // Other changes (maintenance)
        "revert", // Revert previous commit
        "security", // Security improvements
      ],
    ],
    // Subject should not be empty
    "subject-empty": [2, "never"],
    // Type should not be empty
    "type-empty": [2, "never"],
    // Subject should be lowercase
    "subject-case": [2, "always", "lower-case"],
    // Header max length
    "header-max-length": [2, "always", 100],
    // Body max line length
    "body-max-line-length": [1, "always", 100],
  },
};
