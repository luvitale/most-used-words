<template>
  <v-container fluid>
    <v-form>
      <v-file-input
        label="Seleccioná los subtítulos"
        prepend-icon="mdi-message-text"
        outlined
        append-outer-icon="mdi-send"
        multiple
        chips
        v-model="files"
        @click:append-outer="processSubtitles"
      />
    </v-form>

    <div class="pills">
      <Pill
        v-for="word in groupedWords"
        :key="word.name"
        :name="word.name"
        :amount="word.amount"
      />
    </div>

    <v-btn color="error" dark class="text-none" @click="deleteWords">
      Delete words
    </v-btn>
  </v-container>
</template>

<script>
import Pill from "./Pill";

export default {
  components: { Pill },
  data: function () {
    return {
      files: [],
      groupedWords: [],
    };
  },
  methods: {
    processSubtitles() {
      const paths = this.files.map((f) => f.path);
      window.ipcRenderer.send("process-subtitles", paths);
      window.ipcRenderer.receive("process-subtitles", (resp) => {
        this.groupedWords = resp;
      });
    },

    deleteWords() {
      this.groupedWords = [];
    },
  },
};
</script>

<style>
.pills {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
