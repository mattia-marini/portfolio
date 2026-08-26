+++
title = "rhyperx"
[extra]
top-right = ""
subtitle = "Hypergraph library with state-of-the-art motif counting."
link = "https://github.com/rhyperx"
+++

<!-- compact -->A performance-focused implementation of hypergraph motif counting, written in Rust and designed to be exposed through Python bindings.<!-- /compact -->

```rust
use rhyperx::Hypergraph;

let mut hg = Hypergraph::new();
hg.add_edge(&[1, 2, 3]);
hg.add_edge(&[2, 3, 4]);
hg.add_edge(&[3, 4, 5]);

let motifs = hg.count_motifs(3);
println!("{:?}", motifs);
```

The library supports arbitrary-sized hyperedges, streaming enumeration of motifs up to size 5, and zero-cost Python interop via PyO3.