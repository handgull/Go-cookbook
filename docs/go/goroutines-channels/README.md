# Goroutines e Channels
Cosa possono offrirci questi strumenti? partiamo da un esempio diretto:<br>
Vogliamo controllare lo stato di n siti (se sono raggiungibili). Senza goroutines questo viene fatto con una certa **sequenzialità**, ovvero **bisogna attendere** la risposta di ogni sito prima di testare il sito successivo.

![golang-diagrams-21](../assets/golang-diagrams-21.png)

Le **goroutines**, come del resto la programmazione [concorrente](https://it.wikipedia.org/wiki/Concorrenza_(informatica)) in generale, ci permettono di avere un approccio **parallelo**, del tipo:

![golang-diagrams-22](../assets/golang-diagrams-22.png)

::: tip
Fin ora abbiamo usato le goroutines senza saperlo, l'esecuzione di un programma infatti se non specificato diversamente è racchiusa tutta in una goroutine (**Main Go Routine**)!
:::

![golang-diagrams-23](../assets/golang-diagrams-23.png)

## Channels
La Main routine **non si cura di aspettare** che le sue child routines siano finite per terminare, per questo entrano in gioco i **channels**, che sono l'unico modo che le goroutines hanno per **comunicare**.<br>

**Ogni channel ha un tipo**, un channel di un determinato tipo è usato per un **flusso di dati** ESCLUSIVAMENTE di quel tipo (e.g. un channel di tipo int)

![golang-diagrams-24](../assets/golang-diagrams-24.png)

```go
package main

import (
	"fmt"
	"log"
	"net/http"
	"time"
)

func main() {
	links := []string{
		"https://google.com",
		"https://facebook.com",
		"https://fakesite.ihope",
		"https://stackoverflow.com",
		"https://golang.org",
		"https://amazon.com",
		"https://draw.io",
	}

	sequentialCheck(links)
	fmt.Println()
	concurrentCheck(links)
}

func timeTrack(start time.Time, name string) {
	elapsed := time.Since(start)
	log.Printf("%s took %dms", name, elapsed.Nanoseconds()/1000)
}

func sequentialCheck(links []string) {
	defer timeTrack(time.Now(), "sequentialCheck") // time.Now viene determinato subito ma la funzione grazie a defer viene chiamata solo una volta finito il for
	for _, link := range links {
		checkLink(link) // Controllo sequenziale, l'esecuzione è bloccata finchè la funzione non finisce
	}
}

func concurrentCheck(links []string) {
	c := make(chan string) // Creo un canale di comunicazione dentro cui posso passare dei valori string
	// NOTA: il channel va passato alla funzione

	for _, link := range links {
		go concurrentCheckLink(link, c) // Davvero facilissimo dire a Go di eseguire del codice in maniera concorrente!
	}
	defer timeTrack(time.Now(), "concurrentCheck")
	for i := 0; i < len(links); i++ {
		fmt.Println(<-c) // Blocco di codice bloccante che si aspetta un output da parte del canale c
	}
}

func checkLink(link string) {
	_, err := http.Get(link)
	if err != nil {
		fmt.Println(link, " offline!")
	} else {
		fmt.Println(link, " online!")
	}
}

// Funzione equivalente ma che al posto che stampare a schermo comunica all'interno di un channel
func concurrentCheckLink(link string, c chan string) {
	_, err := http.Get(link)
	if err != nil {
		c <- link + " offline!"
	} else {
		c <- link + " online!"
	}
}
```

![golang-screenshots-02](../assets/golang-screenshots-02.png)

## Goroutines e Channels: esercitazione
[GO!](./exercise-factorial.md)
