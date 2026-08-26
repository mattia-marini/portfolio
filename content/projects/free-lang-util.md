+++
title = "free-lang-util"
[extra]
top-right = ""
subtitle = "Generatore e visualizzatore di tabelle e automi."
link = "https://github.com/mattia-marini/free-lang-util"
+++

<!-- compact -->
Un tool per generare e visualizzare tabelle e automi a scopo didattico, scritto in `Rust`.
<!-- /compact -->

È un semplice tool CLI:

```bash
Usage: free-lang-util [OPTIONS] <--file <FILE>|--base-64 <BASE64>>
```

dove `FILE` deve essere un percorso valido verso un file contenente una grammatica nello stesso formato usato da [grammophone](https://mdaines.github.io/grammophone/#/), per esempio:

```
S -> A C .
A -> a S B | .
B -> b A | B b | D .
C -> c S C | .
D -> d D | .
```

In alternativa, è possibile fornire una rappresentazione base64 della stringa che codifica la grammatica usando il flag `--base-64`.