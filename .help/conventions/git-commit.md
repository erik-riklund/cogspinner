**AngularJS Commit Message Quick Reference**

Provide clear, structured commit messages.

**Structure:** **`<type>(<scope>): <subject>`**

* **`<type>`:** (Required)
  * `feat`: A new feature.
  * `fix`: A bug fix.
  * `docs`: Documentation changes.
  * `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc).
  * `refactor`: A code change that neither fixes a bug nor adds a feature.
  * `test`: Adding missing tests or correcting existing tests.
  * `chore`: Changes to the build process or auxiliary tools and libraries such as documentation generation.
  * `build`: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm).
  * `ci`: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs).
  * `perf`: A code change that improves performance.
* **`<scope>`:** (Optional)
  * Indicates the area of the codebase affected (e.g., `login`, `profile`, `ngOptions`, `route`, etc.).
  * Use `*` when the change affects more than a single scope.
* **`<subject>`:** (Required)
  * Concise description of the change.
  * Use the imperative, present tense: "change" not "changed" nor "changes".
  * Don't capitalize the first letter.
  * No dot (.) at the end.
* **Body (Optional):**
  * Separate from subject by a blank line.
  * Explain the *what* and *why* of the change.
  * Wrap lines at 72 characters.
* **Footer (Optional):**
  * **BREAKING CHANGES:** List any breaking changes.
  * **Closes:** References to issues (e.g., `Closes #123`).

**Examples:**

* `feat(login): add remember me functionality`
* `fix(profile): correct avatar upload bug`
* `docs(readme): update installation instructions`
* `style(core): enforce consistent indentation`
* `refactor(route): simplify navigation logic`
* `test(search): add unit tests for filter`
* `chore(deps): update dependencies`
* `build(npm): update build scripts`
* `ci(travis): add integration test`
* `perf(list): improve rendering speed`

**Key Conventions:**

* **Type and Scope:** Use the predefined types and scopes for clarity.
* **Imperative Mood:** Follow the imperative, present tense style.
* **Conciseness:** Keep the subject line short and to the point.
* **Detailed Body:** Use the body to provide context.
* **Footer for Issues and Breaks:** Use the footer for issue tracking and breaking changes.

**Why Use These Conventions?**

* Automated changelog generation.
* Easy to understand commit history.
* Better code reviews.
* Consistent project communication.
