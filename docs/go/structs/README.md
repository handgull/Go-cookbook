# Le Structs

![golang-diagrams-13](../assets/golang-diagrams-13.png)

> È possibile mettere una struct all'interno di un'altra struct (composizione)

## Hands-on
```go
package main

import "fmt"

type contactInfo struct { // Custom type che estende una struct
	email   string
	zipCode int
}

type person struct {
	firstName string
	lastName  string
	contact   contactInfo // Composizione (Embedded struct)
}

func main() {
	// METODO 1 Assegnamento problematico se per qualche ragione inverto l'ordine delle variabili della struct
	alex := person{"Alex", "Anderson", contactInfo{
		email:   "a@a.com",
		zipCode: 28060,
	}}
	// METODO 2 (better way)
	jane := person{
		firstName: "Jane",
		lastName:  "Anderson",
		contact: contactInfo{
			email:   "b@b.com",
			zipCode: 28060,
		},
	}
	// METODO 3 inizializzazione in un secondo momento
	var bob person
	fmt.Printf("%+v", bob) // {firstName:"" lastName:"" contact:{email: zipCode:0}} (gli 0 values del tipo string/int)
	bob.firstName = "Bob"
	fmt.Println()
	fmt.Println(alex) // {Alex Anderson {a@a.com 28060}}
	fmt.Println(jane) // {Jane Anderson {b@b.com 28060}}
	fmt.Println(bob)  // {Bob "" {"" 0}}
}
```
