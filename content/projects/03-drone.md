+++
title = "d.r.o.n.e"
[extra]
top-right = ""
subtitle = "Rete di droni simulata su protocollo TCP-like."
link = "https://github.com/AP-2024-25-D-R-O-N-E"
+++

<!-- compact -->
Una simulazione di rete di droni costruita su un protocollo custom simile a TCP, che realizza comunicazione in tempo reale in ambienti distribuiti, con particolare attenzione alla sicurezza in contesti in cui la comunicazione può essere disturbata.
<!-- /compact -->

Caratteristiche principali:
- Protocollo custom per la messaggistica drone-to-drone
- Streaming di telemetria in tempo reale con architetture *client-server* e *peer-to-peer*
- Rilevamento dei guasti e reindirizzamento automatico
- Topologie di rete configurabili

Diversi team hanno sviluppato droni diversi, aderendo al suddetto protocollo. Questo progetto implementa un drone con tale protocollo, insieme a una suite per controllare l'intera simulazione coinvolgendo i droni degli altri team. Nel progetto sono anche sviluppati prototipi per diversi tipi di client e server.