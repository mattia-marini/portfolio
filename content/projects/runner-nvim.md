+++
title = "runner.nvim"
[extra]
top-right = ""
subtitle = "Run code snippets from your editor."
link = "https://github.com/mattia-marini/runner.nvim"
+++

<!-- compact -->A Neovim plugin that lets you run code snippets directly from the editor, supporting multiple programming languages.<!-- /compact -->

```lua
-- Run the current buffer or selected lines
require('runner').run_buffer()
require('runner').run_selection()

-- Output appears in a split window
```

Languages supported: Python, Lua, JavaScript, Rust, Go, and more. Configurable per-filetype runners.