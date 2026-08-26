+++
title = "free-lang-util"
[extra]
top-right = ""
subtitle = "Generator and visualizer for tables and automata."
link = "https://github.com/mattia-marini/free-lang-util"
+++

<!-- compact -->An educational tool written in Rust that generates and visualizes formal language constructs — transition tables, DFAs, NFAs, and pushdown automata.<!-- /compact -->

```rust
let dfa = DfaBuilder::new()
    .states(&["q0", "q1", "q2"])
    .alphabet(&['a', 'b'])
    .transition(("q0", 'a'), "q1")
    .transition(("q1", 'b'), "q2")
    .accepting("q2")
    .build();

dfa.render("dfa_output.png");
```

Outputs both PNG renderings and LaTeX-compatible table formats.