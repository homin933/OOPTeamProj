@echo off
cd /d "%~dp0"
if not exist out mkdir out
if defined JAVA_HOME (
  "%JAVA_HOME%\bin\javac" --release 17 -encoding UTF-8 -d out src\CampusQuiz.java
) else (
  javac --release 17 -encoding UTF-8 -d out src\CampusQuiz.java
)
if errorlevel 1 exit /b 1
if defined JAVA_HOME (
  "%JAVA_HOME%\bin\java" -cp out CampusQuiz %*
) else (
  java -cp out CampusQuiz %*
)
