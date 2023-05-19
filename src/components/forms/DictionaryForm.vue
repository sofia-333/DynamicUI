<template>
  <div>
    <p v-if="label" class="flex justify-center m-4">{{ label }}</p>
    <div v-for="element in sequence">
      <label :for="element" class="block text-xs font-small text-gray-500">{{ element }}</label>
      <div class="flex flex-col">
        <input type="text" v-model="dictionaryMap[element]"
               class="w-10/12 mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
               required>
      </div>
    </div>
    <div class="flex flex-row-reverse mb-4">
      <button class="mt-3 disabled:bg-blue-100 bg-blue-200 text-blue-800 font-semibold py-2 px-4 rounded shadow"
              @click="saveDictionary()">
        Save Dictionary
      </button>
      <button class="mr-3 mt-3 disabled:bg-gray-100 bg-gray-200 text-gray-600 font-semibold py-2 px-4 rounded shadow"
              @click="downloadDictionary()">
        Download JSON
      </button>
    </div>
  </div>
</template>

<script>
import {downloadJSONFile} from "@/components/utils/helperMethods";
import {mapActions} from "vuex";
import {TOAST_SUCCESS} from "@/components/utils/constants";

export default {
  name: "DictionaryForm",
  props: {
    sequence: {
      required: true,
      type: Array
    },
    label: {
      type: String,
      default: ""
    },
    dictionaryMap: {
      required: true,
      type: Object
    },
    type: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      // dictionaryMap: {}
      TOAST_SUCCESS: TOAST_SUCCESS
    }
  },
  methods: {
    ...mapActions(['setDictionary', 'setToastNotification']),
    saveDictionary() {
      this.setDictionary({dictionary: this.dictionaryMap, type: this.type});
      this.setToastNotification({show: true, message: this.type + " Dictionary Saved Successfully", type: TOAST_SUCCESS});
      setTimeout(() => this.setToastNotification({show: false, message: "", type: ""}), 3000);
    },
    downloadDictionary() {
      downloadJSONFile(this.dictionaryMap, this.label.replace(" ", "_") + ".json")
    },
  }
}
</script>

<style scoped>

</style>