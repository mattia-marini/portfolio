+++
title = "d.r.o.n.e"
[extra]
top-right = ""
subtitle = "Simulated drone network over TCP-like protocol"
link = "https://github.com/AP-2024-25-D-R-O-N-E"
+++

<!-- compact -->
A drone network simulation built on top of a TCP-like custom protocol, achieving real-time communication in distributed environments, with a focus on safety in contexts where communication can be disturbed.
<!-- /compact -->

Key features:
- Custom protocol for drone-to-drone messaging
- Real-time telemetry streaming with client-server and *peer-to-peer* architectures
- Failure detection and automatic rerouting
- Configurable network topologies

Several different teams developed different drones adhering to the aforementioned protocol. This project implements a drone using said protocol, as well as a suite to control the whole simulation involving other teams' drones. Prototypes for different types of clients and servers are also developed in this project.