+++
title = "free-lang-util"
[extra]
top-right = ""
subtitle = "Generator and visualizer for tables and automata."
link = "https://github.com/mattia-marini/free-lang-util"
+++

<!-- compact -->
A tool to generate and visualize tables and automata for educational purposes, written in `Rust`.
<!-- /compact -->

It is a simple CLI tool:

```bash
Usage: free-lang-util [OPTIONS] <--file <FILE>|--base-64 <BASE64>>
```

where `FILE` should be a valid path to a file containing a grammar using the same format as [grammophone](https://mdaines.github.io/grammophone/#/), for instance:

```
S -> A C .
A -> a S B | .
B -> b A | B b | D .
C -> c S C | .
D -> d D | .
```

Alternatively, a base64 representation of the string encoding the grammar can be provided using the `--base-64` flag.