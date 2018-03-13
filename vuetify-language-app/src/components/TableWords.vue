<template>
    <v-container fluid  fill-width>
      <add-word v-bind:words ="words" v-on:new ="addWord"></add-word>
    <v-data-table
        :headers="headers"
        :items="items"
        hide-actions
        item-key="name">
        
    <template slot="items" slot-scope="props">
      <tr @click="props.expanded = !props.expanded">
        <td>{{ props.item.polishWord }}</td>
        <td>{{ props.item.transleted }}</td>
        <td>
          <v-btn  @click = "deleteWord(props.item.id)" icon class="mx-0">
            <v-icon  color="pink">delete</v-icon>
          </v-btn>
        </td>
        <!-- <td class="text-xs-right">{{ props.item.carbs }}</td>
        <td class="text-xs-right">{{ props.item.protein }}</td>
        <td class="text-xs-right">{{ props.item.iron }}</td> -->
      </tr>
    </template>
    <!-- <template slot="expand" slot-scope="props">
      <v-card flat>
        <v-card-text>Peek-a-boo!</v-card-text>
      </v-card>
    </template> -->
  </v-data-table>
</v-container>
    
</template>

<script>
import AddWord from "./modals/addWord";

export default {
  name: "table-words",
  components: {
    AddWord
  },

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

        this.items = arr.map(word => {
          return {
            polishWord: word.polishWord,
            transleted: word.englishWord,
            id: word.id
          };
        });
      });
  },

  data: () => ({
    total: 0,
    words: {
      polishWord: "POLSKIE",
      englishWord: "ANGLIESKIE"
    },

    headers: [
      {
        text: "J. Polski",
        align: "left",
        sortable: true,
        value: "polishWord"
      },
      { text: "J. Angielski", value: "translated" },
      { text: "Usuń", value: "id" }
    ],

    items: [],

    drawer: true
  }),

  methods: {
    deleteWord: function(id) {
      let docWordToDelete = db.collection("words").doc(id);
      docWordToDelete.delete().then(res => {
        this.items = this.items.filter(word => word.id !== id);
      });
    },

    addWord: function(payload) {
      payload.get().then(payload => {
        const word = {
          id: payload.id,
          ...payload.data()
        };
        word.transleted = word.englishWord;
        this.items.push(word);
      });
    }
  }
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
