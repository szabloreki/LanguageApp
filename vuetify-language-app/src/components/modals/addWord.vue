<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-btn color="primary" dark slot="activator">Dodaj słówko</v-btn>
      <v-card>
        <!-- {{words}}  -->
        <v-card-title>
          <span class="headline">Dodaj słówko</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
               <v-flex xs12 sm6 md4>
                <v-text-field v-model="polishWord" label="W języku polskim" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="englishWord" label="W języku Angielskim" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="saveWord()">Save</v-btn>
        </v-card-actions>
      </v-card>
       <v-snackbar
      :timeout="timeout"
      :color="color"
      :multi-line="mode === 'multi-line'"
      :vertical="mode === 'vertical'"
      v-model="snackbar"
    >
    {{text}}
      <v-btn dark flat @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
    </v-dialog>
    
  </v-layout>
</template>
<script>
export default {
  name: "add-word",
  props: ["words"],

  data: () => ({
    counter: 0,
    polishWord: "",
    englishWord: "",
    snackbar: false,
    color: "",
    mode: "",
    timeout: 6000,
    text: "Hello, I'm a snackbar",
    dialog: false
  }),

  methods: {
    saveWord: function() {
      if (this.englishWord.length < 2) {
        this.text = "Za krótki angielski";
        this.clearForm();
        return (this.snackbar = true);
      }
      if (this.polishWord.length < 2) {
        this.clearForm();
        this.text = "Za krótki polski";
        return (this.snackbar = true);
      }

      db
        .collection("words")
        .add({
          polishWord: this.polishWord,
          englishWord: this.englishWord
        })
        .then(res => {
          this.$emit("new", res);
          this.text = "Pomyślnie dodano!";
          this.snackbar = true;
        });

      this.dialog = false;
    },
    clearForm: function() {
      this.polishWord = "";
      this.englishWord = "";
    }

  }
};
</script>