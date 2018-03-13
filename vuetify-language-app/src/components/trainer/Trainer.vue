<template>
<v-container fluid  fill-width>
    <v-snackbar
      :timeout="timeout"
      :color="color"
      :multi-line="mode === 'multi-line'"
      :vertical="mode === 'vertical'"
      v-model="snackbar"
    >
      {{ text }}
      <v-btn dark flat @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
    <v-form v-if="!showResult">
    <v-text-field
      v-model="wordDescription"
      :disabled="true"
    ></v-text-field>
    <v-text-field
      label="Wpisz odpowiedź"
      v-model="userAnswer"
      :counter="lengthAnswer"
      required
    ></v-text-field>
  </v-form>
  <div  class="text-xs-center">
        <div v-if="!showResult"> 
            <v-btn v-on:click = "checkAnswer" small color="primary" dark>Dalej</v-btn>
          </div>
          </div>
        <div v-if="showResult" class="text-xs-center">
          <div>
            <p>Zdobyłeś {{score}} punktów na {{wordsArray.length}}</p>
            <v-btn v-on:click = "resetQuiz" small color="primary" dark>Jeszcze raz</v-btn>
          </div>
        </div>
</v-container>    
</template>
<script>
export default {
  name: "words-trainer",
  created: function() {
    db
      .collection("words")
      .get()
      .then(querySnapshot => {
        const arr = [];
        querySnapshot.forEach(doc => {
          arr.push({
            ...doc.data(),
            id: doc.id
          });
        });
        this.wordsArray = arr.map(word => {
          return {
            polishWord: word.polishWord,
            transleted: word.englishWord,
            id: word.id
          };
        });

        this.wordDescription = this.wordsArray[0].polishWord;
        this.lengthAnswer = this.wordsArray[0].transleted.length;

        for (const word of this.wordsArray) {
          this.valuesAndKeys.set(word.polishWord, word.transleted);
        }

        // var item = this.wordsArray[
        //   Math.floor(Math.random() * this.wordsArray.length)
        // ];
        // console.log(item, "item");
        // console.log("COSSSSSSSSSSSSSSSSSSSS", this.wordsArray);
      });
  },

  methods: {
    checkAnswer: function() {
      if (this.index >= this.wordsArray.length - 1) {
        this.showResult = true;
        this.score++;
        return console.log("Gratulacje Koniec Testu!");
      }

      if (this.userAnswer == this.wordsArray[this.index].transleted.trim()) {
        this.index++;
        this.score++;
        this.resetQustion();
      } else {
        this.text = 'ŹLE! Poprawna odpowiedź: ' + this.wordsArray[this.index].transleted
        this.snackbar = true;
        this.index++;
        this.resetQustion();
      }
    },

    resetQuiz: function() {
      this.randomSortArray(this.wordsArray);
      this.score = 0;
      this.index = 0;
      this.showResult = false;
      this.resetQustion();
    },

    resetQustion: function() {
      this.userAnswer = "";
      this.wordDescription = this.wordsArray[this.index].transleted;
      this.lengthAnswer = this.wordsArray[this.index].transleted.length;
    },
    randomSortArray: function(array) {
      let count = array.length,
        randomnumber,
        temp;
      while (count) {
        randomnumber = (Math.random() * count--) | 0;
        temp = array[count];
        array[count] = array[randomnumber];
        array[randomnumber] = temp;
      }
    }
  },

  data: () => ({
    valuesAndKeys: new Map(),
    userAnswer: "",
    score: 0,
    showResult: false,
    lengthAnswer: 0,
    index: 0,
    wordsArray: [],
    wordDescription: "loading...",
    drawer: true,
    snackbar: false,
    color: "error",
    mode: "",
    timeout: 6000,
    text: "Hello, I'm a snackbar"
  })
};
</script>

<style>
#table-words {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
