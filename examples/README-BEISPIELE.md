# Beispiele

In den Unterverzeichnissen befinden sich einzelne, isolierte React-Beispiele zu denen
im React Buch behandelten Themen.

# Ausführen

Um ein Beispiel auszuführen, müssen zunächst mit `npm install` in diesem Verzeichnis
alle benötigten Module installiert werden. Dieser Schritt muss nur einmal durchgeführt
werden, unabhängig davon, welche Beispiele dann ausgeführt werden sollen.

Zum Ausführen eines Beispiels wird dann - ebenfalls aus diesem Verzeichnis - das `start`
Script von npm ausgeführt. Diesem Script wird als Parameter der relative Name des Unterverzeichnisses
übergeben, dessen Beispiel ausgeführt werden soll:

```
npm start events/
```

Nachdem dann das jeweilige Beispiel mit Webpack übersetzt wurde, kann es im Browser
mit http://localhost:8080 aufgerufen werden.

Da viele der Beispiele (lediglich) Ausgaben auf der Browser Konsole erzeugen, 
sollte vor dem Öffnen des Beispiels die Browser Konsole geöffnet werden.
