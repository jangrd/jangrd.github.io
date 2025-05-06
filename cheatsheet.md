# Biblioteke
```cpp
#include <iostream>
#include <vector>
```

# Klasa
```cpp
class NekaKlasa {
private:
	int a;
	void prvaMetoda() {}
public:
	int b;
	void drugaMetoda() {}
	NekaKlasa() {}
	~NekaKlasa() {}
};
```

# Default konstruktor
```cpp
NekaKlasa() {}
```

# Konstruktor
```cpp
NekaKlasa(tip1 param1, tip2 param2, ...) {}
```

# Destruktor
```cpp
~NekaKlasa() {}
```

# Preopterecenje funkcije/metode (overloading)
```cpp
void ispis(int a) {}
void ispis(int a, int b) {}
void ispis(float a) {}
```

# Staticki vs dinamicki objekti
## Staticki
Vrijednost se pohranjuje na stacku (stogu)
```cpp
int polje[100];
NekaKlasa objekt = NekaKlasa();
```

## dinamicki
Vrijednost se pohranjuje na heapu (hrpi).
Vrijednosti se pristupa pomocu pointera.
```cpp
int* polje = new int[100];
NekaKlasa* objekt = new NekaKlasa();
// rucno alocirane objekte potrebno rucno dealocirati
delete polje;
delete objekt;
```

# Pametni pokazivaci
Sluze da programeru olaksaju vodenje brige o pointerima.

## auto_ptr
Stvoren kako bi automatski dealocirao memoriju. Ogranicen na pointere na jedan objekt jer pri alokaciji se poziva `delete`. Kod niza objekata potrebno je pozvati `delete[]`
```cpp
std::auto_ptr<int> niz(new int); // podrzano
std::auto_ptr<int[]> niz(new int[10]); // nije podrzano
```
auto_ptr sadrzi nedenifirano ponasanje koje je opasno po program i tesko za debugirati. Iduci kod ima kritikalnu gresku ali nece errorati prilikom kompajlirana (eventualno neki compileri daju warning).
```cpp
std::auto_ptr<int> p(new int);	// stvara pointer na heap vrijednost
std::auto_ptr<int> p2 = p;		// preuzima vlasnistvo i postavlja p = nullptr
*p = 1;							// dereferencira se p koji je nullptr (nedefinirano ponasanje)
```

## unique_ptr
Stvoren kao zamjena za `auto_ptr` koja podrzava niz objekata i nema nedefinirano ponasanje.
```cpp
std::unique_ptr<int> niz(new int); // podrzano
std::unique_ptr<int[]> niz(new int[10]); // podrzano
```
Za ispravno prebacivanje vlasnistva potrebno je koristiti semantiku prijenosa (move).
```cpp
std::unique_ptr<int> p(new int);
std::unique_ptr<int> p2 = move(p); 
```
Sljedeci primjer javlja gresku tokom kompajliranja jer se pokusava semantikom kopiranja prebaciti vlasnistvo.
```cpp
std::unique_ptr<int> p(new int);
std::unique_ptr<int> p2 = p; // greška prevoditelja!
```
U slucaju da je programeru potreban obican pointer na vrijednost na koju pokazuje `unique_ptr` moze se dobiti pomocu `get()` metode
```cpp
std::unique_ptr<int> p(new int);
int* obican_ptr = p.get();
```

## shared_ptr
TODO

# Enkapsulacija
Dozvoljava provjeru uvijeta ili transformacija podataka prilikom postavljanja ili dohvacanja `private` svojstvu.
```cpp
class Osoba {
private:
	int godine;
public:
	void setGodine(int nove_godine) {
		if (nove_godine >= 0) {
			this->godine = nove_godine;
		}
	}
	int getGodine() {
		return this->godine;
	}
}
```

# Const metode
Ako imamo konstantu instancu (const objekt) neke klase, nad njom se ne mogu pozivati obicne metode. Oznacavanjem neke metode `const` kompajleru govorimo da ta metoda ne mijenja stanje objekta i moze se koristiti na `const` objektu.
```cpp
class Osoba {
private:
	int godine = 99;
public:
	int getGodine1() {
		return this->godine;
	}
	int getGodine2() const {
		return this->godine;
	}
}
```
```cpp
Osoba jedan;
jedan.getGodine1();	// OK
jedan.getGodine2(); // OK
const Osoba dva;
dva.getGodine1();	// ERROR
dva.getGodine2();	// OK
```

# Prijenos argumenata
## Po vrijednosti
Stvara lokalnu varijablu u koju se kopira vrijednost argumenta
```cpp
void funkcija(NekaKlasa a) {}
```
```cpp
NekaKlasa x;
funkcija(x);
```

## Po referenci
Referenca jest poput aliasa (drugog imena) za memoriju danu u argumentu. Ne alocira se nova memorija.
```cpp
void funkcija(NekaKlasa& a) {
	a = NekaKlasa(); // OK
}
```
```cpp
NekaKlasa x;
funkcija(x);
```
### const
`const` referenca je read-only
```cpp
void funkcija(const NekaKlasa& a) {
	a = NekaKlasa(); // ERROR
}
```

## Po pokazivacu
Slanjem pokazivaca salje tocna adresa na danu memoriju
```cpp
void funkcija(NekaKlasa* a) {}
```
```cpp
NekaKlasa x;
funkcija(&x);
```

# Namespaceovi
Namespace sluzi logickom i semantickom razlikovanju imena varijabli. U sljedecem primjeru postoje 3 varijable `x` kojima se pristupa na razlicite nacine.
```cpp
int x;
namespace Prvi {
	int x;
	namespace Drugi {
		int x;
	}
}

std::cout << x;
std::cout << Prvi::x;
std::cout << Prvi::Drugi::x;
```
# Kopirni konstruktor
Koristi se kada se stvara novi objekt pomocu vec postojeceg objekta na nacin da se kopiraju sva svojstva. Defaultna implementacija vrsi shallow-copy sto je problem kod klasa koje kao svojstvo imaju pointer. Zato se rucno radi deep-copy.
```cpp
NekaKlasa(const NekaKlasa& other) {
	// za obicna svojstva:
	// 		kopirati ih pomocu obicnog pridruzivanja (=)
	// za pointer svojstva:
	//		stvoriti lokalnu kopiju jednake velicine
	//		prebaciti elemente iz other u this
}
```
```cpp
class Podatci {
public:
	int count;
	int* data;
	Podatci(const Podatci& other) {
		this->count = other.count;
		this->data = new int[other.count];
		for (int i = 0; i < other.count; i++) {
			this->data[i] = other.data[i];
		}
	}
	~Podatci() {
		delete this->data;
	}
};
```

# Kopirni operator pridruzivanja
Overloadanje implicitnog operatora jednako koji vrsi shallow-copy sa nasim operatorom koji vrsi deep-copy. Uvijek je potrebno provjeriti za self-assignment.
```cpp
NekaKlasa& operator = (const NekaKlasa& other) {
	if (this != &other) {
		// izbrisati postojece podatke
		// za obicna svojstva:
		//		kopirati ih pomocu obicnog pridruzivanja (=)
		// za pointer svojstva:
		//		stvoriti memoriju za nove podatke
		//		popuniti memoriju s novim podatcima
	}
	return *this;
}
```
```cpp
class Podatci {
public:
	int count;
	int* data;
	Podatci& operator = (const Podatci& other) {
		if (this != &other) {
			delete data;
			this->count = other.count;
			this->data = new int[other.count];
			for (int i = 0; i < other.count; i++) {
				this->data[i] = other.data[i];
			}
		}
		return *this;		
	}
	~Podatci() {
		delete this->data;
	}
};
```

# Prijenosni konstruktor
Prijenosni konstruktor se koristi za optimizaciju programa tako da se manji broj potrebnih alokacija memorije i prebacivanja podataka.
```cpp
NekKlasa(NekaKlasa&& temp){
	// za obicna svojstva:
	//		kopirati ih pomocu obicnog pridruzivanja (=)
	// za pointer svojstva:
	//		prebaciti pointer iz temp u this
	//		pointer u temp postaviti na nullptr
	//		(tako se izbjegava double-free memorije)
}
```
```cpp
class Podatci {
public:
	int count;
	int* data;
	Podatci(Podatci&& temp) {
		this->count = temp.count;
		this->data = temp.data;
		temp.data = nullptr;
	}
	~Podatci() {
		delete this->data;
	}
};
```

# Prijenosni operator pridruzivanja
Implementira `std::move()` funkcionalnost
```cpp
NekaKlasa& operator = (NekaKlasa&& temp) noexcept {
	if (this != &other) {
		// dealocirati vec postojecu memoriju
		// za obicna svojstva:
		//		kopirati ih pomocu obicnog pridruzivanja (=)
		// za pointer svojstva:
		//		prebaciti pointer iz temp u this
		//		pointer u temp postaviti na nullptr
		//		(tako se izbjegava double-free memorije)
	}
	return *this;
}
```
```cpp
class Podatci {
public:
	int count;
	int* data;
	Podatci& operator = (Podatci&& temp) noexcept {
		if (this != &other) {
			delete this->data;
			this->count = temp.count;
			this->data = temp.data;
			temp.data = nullptr;
		}
		return *this;
	}
	~Podatci() {
		delete this->data;
	}
};
```
