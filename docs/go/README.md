# Hello Golang
::: warning
I seguenti sono semplici appunti e non una soluzione completa di risorse, nella home sono presenti vari **approfondimenti**.<br>
Consiglio di guardare soprattutto il [Tour](https://tour.golang.org) di Go e successivamente [Golang effective_go](https://golang.org/doc/effective_go.html) e [gobyexample](http://gobyexample.com) per approfondire!
:::
Eseguiamo il nostro primo programma:
```go
package main // Specifico a quale package appartiene il sorgente (un package eseguibile in questo caso)

import "fmt" // Rende disponibile il package fmt (uno standard library package di go) al package main
// NOTA: fmt = format

func main() { // La sintassi per la dichiarazione delle funzioni è abbastanza intuitiva
	greetings := "Hello world" // Dichiarazione ed assegnamento (greetings accetta solo stringhe, vedi sotto la "tipizzazione")
	// var greetings string = "Hello world" // equivalente ma più verboso
    fmt.Println(greetings)
}
```
::: tip
Go ha una [tipizzazione forte e statica](https://it.wikipedia.org/wiki/Tipizzazione_forte), significa che il tipo di una **variabile** non può cambiare (ne a [compile-time](https://it.wikipedia.org/wiki/Compile-time), ne a [run-time](https://it.wikipedia.org/wiki/Run-time))
:::

![golang-diagrams-05](./assets/golang-diagrams-05.png)

::: tip
L'operatore `:=` è usato solo nell'assegnamento di **nuove variabili**.<br>

Inoltre non è possibile inizializzare variabili fuori dal corpo di una funzione (es. `counter := 10` deve essere fatto dentro una **func**; `var counter int` ovvero un'inizializzazione può essere invece fatta anche fuori da una funzione)
:::
```sh
# METODO 1
go run <file> ... # Compila ed esegue il programma (se il programma è composto da n file vanno passati n file)
# METODO 2 (se si vuole tenere un file binario sulla macchina)
go build <file> ... # Compila il programma
./<program> # Lo eseguo (linux way)
go clean # Quando non voglio più l'eseguibile

# Comandi usati per aggiungere package sviluppati da terzi
go install
go get

go help # Panoramica della CLI per altri comandi
```

![golang-screenshots-01](./assets/golang-screenshots-01.png)

> Il comando `go fmt` formatta auomaticamente ogni file nella directory! (usato automaticamente ad ogni salvataggio dalle estensioni di [VS code](https://code.visualstudio.com/))

## Go packages
Un package, in golang, è una **collezione di codice** sorgente e può avere al suo interno il sorgente di molti files.<br>
L'appartenenza ad un package DEVE essere specificata nella prima riga di ogni file.

![golang-diagrams-01](./assets/golang-diagrams-01.png)

::: tip
Per creare un eseguibile tramite `go build` è necessario che il package si chiami `main` e al suo interno vi sia dichiarata una **func**(funzione) di nome main, altrimenti non vi sarà un **file binario** risultante! (invece `go run` esegue normalmente il sorgente, sempre se vi è una funzione main).<br>
Invece per avere package **riusabili** va scelto un nome diverso da `main`
:::

![golang-diagrams-02](./assets/golang-diagrams-02.png)

### Import statements
Le import **rendono disponibili package riusabili** al package corrente.
::: tip
Documentazione degli standard library packages di go [golang.org/pkg](https://golang.org/pkg)
:::

## Struttura di un file *.go

![golang-diagrams-03](./assets/golang-diagrams-03.png)

## Gestire liste di elementi in go
Go ci fornisce due tipi di strutture:
1. Gli **Array**, di lunghezza **fissa**
2. Gli **Slice**. di lughezza **variabile** (la lunghezza può aumentare o diminuire)
```go
animals := []string{"dog", "cat"} // Esempio di Slice
animals = append(animals, "bird") // Aggiunta di un elemento allo Slice
animals[1] // "cat"
// COOL STUFF:
animals[0:2] // sottosequenza specificando un range {"dog, "cat"}
animals[:2] // sottosequenza che parte dal primo elemento (equivalente a sopra)
animals[1:] // sottosequenza che parte dal secondo elemento fino all'ultimo {"cat", "bird"}
// NOTA: l'index finale non è incluso
```
> Ogni elemento deve essere dello **stesso tipo**, e gli indici partono da 0 :ok_hand:. Questo vale per entrambe le strutture

## Iterazioni e cicli
```go
for i, animal := range animals { // Come si usa ultimamente la sintassi del for è un foreach ibrido
    fmt.Println(i, animal) // Stampa l'index dell'elemento e l'elemento, separandoli con uno spazio
}
```

![golang-diagrams-06](./assets/golang-diagrams-06.png)

::: tip
L'esempio di codice riportato nell'immagine non compilerebbe perchè `index` è una variabile che **non è usata** e go **non fa compilare!**<br>
Se non si ha intenzione di usare l'indice dell'elemento all'interno del ciclo va quindi tolta la variabile index.
:::

## Valori di ritorno multipli
In go è possibile far tornare alle funzioni più di un valore:
```go
func f1() (int, string) { // Valore di ritorno multiplo!
	return 42, "42"
}

numberVar, stringVar := f1()
// numberVar = 42; stringVar = "42"
```

## Hello Golang: esercitazione

[GO!](./exercise-cards.md)

## OO tradizionale vs Go
In Go è possibile fare OOP, ma non certo in maniera tradizionale:
- Non vi sono le classi (anche se come vedremo le **struct** hanno molte features)
- Non vi è l'**ereditarietà**, si usa solo la [composizione](https://it.wikipedia.org/wiki/Composizione_al_posto_dell%27ereditariet%C3%A0) (le interfacce sono comunque presenti ed il **Polimorfismo** è comunque ottenibile)

Per avere un idea più chiara di alcune differenze prendiamo come esempio l'esercitazione svolta:

![golang-diagrams-07](./assets/golang-diagrams-07.png)

### Tipi estesi e receiver
In go si può **estendere** un tipo base aggiungendo delle funzionalità, questo avviene definendo delle funzioni con un `receiver` del tipo esteso.
Una funzione con un receiver appartiene ad un **istanza** del tipo del receiver. (vaga somiglianza con l'approccio OO tradizionale)

![golang-diagrams-08](./assets/golang-diagrams-08.png)

> Per altri esempi pratici sull'**implementazione** dei **custom types** basta guardare il codice dell'esercitazione linkata [sopra](./#hello-golang-esercitazione) (sono trattate anche altre cose di un certo rilievo, come i valori di ritorno multipli o i test)

![golang-diagrams-09](./assets/golang-diagrams-09.png)