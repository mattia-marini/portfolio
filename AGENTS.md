This is a Zola static website.

Development:
- Run `zola check` to validate the site.
- Run `zola build` before considering a task complete.
- Never edit `public/`; it is generated.
- Content belongs in `content/`.
- Tera templates belong in `templates/`.
- Static assets belong in `static/`.
- Sass belongs in `sass/`.

Before making substantial changes:
- inspect the existing templates and content structure;
- preserve the existing design system;
- reuse existing components/macros where possible;
- do not introduce a JavaScript framework unless explicitly requested.

After changes:
1. run `zola check`;
2. run `zola build`;
3. inspect the resulting site in the browser;
4. fix errors;
5. review `git diff`;
6. do not commit unless explicitly asked.
