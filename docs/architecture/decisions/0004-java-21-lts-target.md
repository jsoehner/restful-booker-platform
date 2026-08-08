# ADR 4: Target Java 21 LTS for Backend Services

## Status
Accepted

## Date
2026-07-26

## Context
A recent PR set the target compile release version to Java 26 (e.g. `<release>26</release>`). However, Java 26 is not yet universally available, nor is it supported in many production and local development setups (including the target runtime JVM version 21 of this system). Using non-LTS versions or cutting-edge previews causes compile and runtime class-version mismatches.

## Decision
We will target **Java 21 LTS** as the baseline Java compiler release version across all backend microservices and E2E test modules. 

## Consequences
- The Maven build is now fully compatible with the installed OpenJDK 21 JRE/JDK on developer and CI machines.
- Code compiles to bytecode version 61 (Java 21), preventing `UnsupportedClassVersionError` at runtime.
- Long-term support is guaranteed by using a stable LTS version.
