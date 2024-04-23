const app01 = Vue.createApp({
  template: `
    <h1>Hola mundo con VueJs</h1>
    <p>{{1+1}}</p>
    <p>{{ message }}</p>
    <p>{{ quote }}</p>
    <p>{{ author }}</p>
    <button v-on:click="changeQuote">Change Quote</button>
    <br/><br/>
    <!--<button v-on:click="capitalize">Capitalize</button>-->
  `,
  data() {
    return {
      // Todo esto es reactivo
      message: "Hola mundo desde data()",
      quote: "I'm Batman",
      author: "Bruce Wayne",
    };
  },
  methods: {
    changeQuote(event) {
      console.log(event);
      this.author = "Joan C";
      this.capitalize();
    },
    capitalize() {
      this.quote = this.quote.toUpperCase();
    },
  },
}).mount("#app01");

const quotes = [
  {
    quote:
      "The night is darkest just before the dawn. And I promise you, the dawn is coming.",
    author: "Harvey Dent, The Dark Knight",
  },
  {
    quote: "I believe what doesn’t kill you simply makes you, stranger.",
    author: "The Joker, The Dark Knight",
  },
  {
    quote:
      "Your anger gives you great power. But if you let it, it will destroy you… As it almost did me",
    author: "Henri Ducard, Batman Begins",
  },
  {
    quote:
      "You either die a hero or live long enough to see yourself become the villain.",
    author: "Harvey Dent, The Dark Knight",
  },
  {
    quote: "If you’re good at something, never do it for free.",
    author: "The Joker, The Dark Knight",
  },
  {
    quote: "Yes, father. I shall become a bat.",
    author: "Bruce Wayne/Batman, Batman: Year One",
  },
];

const app02 = Vue.createApp({
  template: `
    <h1>Batman quotes</h1>
    <small style="display:block;">{{newQuote}}</small>
    <input 
      type="text"
      v-model="newQuote"
      v-on:keypress.enter="addQuote02"
      />
    <hr/>
    <ul>
      <!--
        - No es recomendable usar v-if y v-for en la misma etiqueta
        - Lo mejor seria a una etiqueta padre el v-if y luego el v-for a la etiqueta hijo
      -->
      <li v-for="({quote,author},i) in quotes">
        <span>{{i+1}} {{quote}}</span>
        <blockquote v-if="author">{{author}}</blockquote>
      </li>
    </ul>
  `,
  data() {
    return {
      // Todo esto es reactivo
      // No pueden tener valor undefined para un v-model
      quotes,
      newQuote: "",
    };
  },
  methods: {
    addQuote01({ charCode }) {
      if (charCode !== 13) return;
      // Aqui no es obligatorio desestructurar, podemos usar push y unshift
      this.quotes.unshift({
        quote: this.newQuote,
        author: "Joan C",
      });
    },
    addQuote02() {
      // Aqui no es obligatorio desestructurar, podemos usar push y unshift
      this.quotes.unshift({
        quote: this.newQuote,
      });
    },
  },
}).mount("#app02");
