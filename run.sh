#!/usr/bin/env bash
set -euo pipefail
cd -- "$(dirname -- "$0")"
# Prefer a user-configured JDK; support the bundled IntelliJ JDK in this workspace.
if [[ -n "${JAVA_HOME:-}" && -x "$JAVA_HOME/bin/javac" ]]; then
  compiler="$JAVA_HOME/bin/javac"
  runtime="$JAVA_HOME/bin/java"
elif command -v javac >/dev/null 2>&1; then
  compiler="$(command -v javac)"
  runtime="$(command -v java)"
elif [[ -x /opt/intellij-idea-ultimate-edition/jbr/bin/javac ]]; then
  compiler=/opt/intellij-idea-ultimate-edition/jbr/bin/javac
  runtime=/opt/intellij-idea-ultimate-edition/jbr/bin/java
else
  echo 'JDK 17 이상을 설치하고 JAVA_HOME을 설정해 주세요.' >&2
  exit 1
fi
mkdir -p out
"$compiler" --release 17 -encoding UTF-8 -d out src/CampusQuiz.java
exec "$runtime" -cp out CampusQuiz "$@"
