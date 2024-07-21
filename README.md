## FundBox24-App

Die App wurde mit React Native entwickelt und funktioniert deswegen auf Android und iOS.

Installieren Sie zuerst die NPM-Module:

```shell
npm install
```

Starten Sie Metro:

```shell
npm run start
```

Sobald Metro gestartet ist, müssen Sie

- die `a`-Taste drücken, um die App auf Android zu installieren
- die `i`-Taste drücken, um die App auf iOS zu installieren

Vergewissern Sie sich, dass das Backend aktiv ist.

Sie können sich mit den folgenden Testbenutzern anmelden:

```
lurchi@quakmail.de
lurch123
```

```
whopwhop@bk.com
whopper123
```

Alternativ können Sie sich in der App auch registrieren.

## Tests auszuführen

Tests mit Testabdeckung ausführen

```shell
npm run test:ci
```


Tests ohne Testabdeckung ausführen

```shell
npm run test
```

## Troubleshooting

Falls Sie Probleme haben, die App auf iOS zu installieren, können Sie folgende Schritte probieren.

Wechseln Sie zum iOS-Ordner:
```shell
cd ios
```

Installieren Sie die Pods
```shell
npx pod-install
```

Versuchen Sie anschließend erneut, die iOS-App zu starten.

Was auch helfen kann:

Öffnen Sie das iOS-Projekt in XCode und versuchen Sie, von dort aus die App zu starten.
