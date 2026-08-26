+++
title = "rhyperx"
[extra]
top-right = ""
subtitle = "Libreria di ipergrafi con conteggio motif SOTA"
link = "https://github.com/rhyperx"
+++

<!-- compact -->
Una libreria per ipergrafi orientata alle prestazioni, scritta in `Rust` e progettata per essere esposta tramite binding `Python`.
<!-- /compact -->

I punti salienti includono:

- Conteggio esatto di *motif* **allo stato dell'arte** su ipergrafi pesati e non
- Implementazioni estremamente type-safe senza sacrificare le prestazioni
- Euristiche per *fingerprinting* di *graphlet* accelerate via `SIMD`

Questo progetto mira a essere una riscrittura in `Rust` della libreria Python [HypergraphX](https://github.com/HGX-Team/hypergraphx).
