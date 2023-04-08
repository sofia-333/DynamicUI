<template>
  <div>
    <div v-if="showDictionaryPage && !showDataTable" class="flex flex-col">
      <div class="flex flex-row">
        <DictionaryForm class="mr-6" :dictionary-map="createDictionaryForm(objectSequence)" :sequence="objectSequence"
                        :label="'Object Sequence Dictionary'" @dictionary="getObjectDictionary"
                        :type="'Object'"></DictionaryForm>
        <DictionaryForm :dictionary-map="createDictionaryForm(subjectSequence)" :sequence="subjectSequence"
                        :label="'Subject Sequence Dictionary'" @dictionary="getSubjectDictionary"
                        :type="'Subject'"></DictionaryForm>
      </div>
      <button class="mt-3 bg-blue-100 bg-blue-200 text-blue-800 font-semibold py-2 px-4 rounded shadow"
              @click="generateTable()">
        Generate Table
      </button>
    </div>
    <Message v-if="this.success===false" :message="message" :success="success"></Message>
    <div v-else-if="!showDictionaryPage" class="flex flex-col">
      <div class="text-lg text-gray-600 my-2 wid-50"> Enter the object sequence, subject sequence and the number of
        rows
      </div>
      <input type="number" v-model="rows" min="1"
             class="border border-gray-300 text-gray-900 text-sm rounded-lg mb-2 p-2">
      <!--      columnFields-->
      <input type="text" v-model="objectInput"
             class="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
             placeholder="1, 1.1, 1.2, 1.2.1, 1.2.2, 1.3, 2, 3" required>
      <!--      rowFields-->
      <input type="text" v-model="subjectInput"
             class="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
             placeholder="1, 1.1, 1.2, 1.2.1, 1.2.2, 1.3, 2, 3" required>
      <button
          class="mt-3 disabled:bg-blue-100 bg-blue-200 text-blue-800 font-semibold py-2 px-4 rounded shadow"
          @click="checkInput()" :disabled="!objectInput || !subjectInput || !rows">
        Next
      </button>
    </div>
    <DataTable
        v-if="showDataTable" :columnFields="columnFields" :columns="columns"
        :data="objectSequence" :subjectSequence="subjectSequence" :rows="rows" :object-dictionary="objectDictionary"
        :subject-dictionary="subjectDictionary" :parentsWithNoChildren="parentsWithNoChildren"></DataTable>
  </div>
</template>

<script>
import Message from "@/components/notifications/Message.vue";
import analyse, {preProcessing} from "@/components/utils/Validate";
import DataTable from "@/components/table/DataTable.vue";
import DictionaryForm from "@/components/forms/DictionaryForm.vue";
import getParentsWithNoChildren, {fillArrayEmpty} from "@/components/utils/helperMethods";
import {mapActions} from "vuex";

export default {
  name: "Form.vue",
  components: {DictionaryForm, DataTable, Message},
  data() {
    return {
      objectInput: "1, 2, 2.1, 2.2, 2.2.1, 2.2.2, 3, 3.1, 3.2, 4",
      subjectInput: "",
      rows: 1,
      success: null,
      objectSequence: [],
      subjectSequence: [],
      message: "",
      subjectDictionary: {},
      objectDictionary: {},
      showDataTable: false,
      seenNames: [],
    }
  },
  computed: {
    getSubjectDictionary(value) {
      this.subjectDictionary = value;
    },
    getObjectDictionary(value) {
      this.objectDictionary = value;
    },
    showDictionaryPage() {
      return this.success && this.objectSequence && this.objectSequence.length !== 0 && this.subjectSequence && this.subjectSequence.length !== 0;
    },
    columnFields() {
      let data = [];
      // Group the sequence data by parent elements
      for (let i = 0; i < this.objectSequence.length; i++) {
        const element = this.objectSequence[i];
        if (/\./.test(element)) {
          const parent = element.replace(/\.\d+$/, '');
          let parentData = data.find(item => item.name === parent); //check if parent element exists in data array
          if (!parentData) {
            parentData = {
              name: parent,
              children: [],
            };
            data.push(parentData);
          }
          let childData = parentData.children.find(item => item.name === element);
          if (!childData) {
            childData = {name: element};
            parentData.children.push(childData);
          }
          // If child has sub-children, create a children array
          if (/\.\d+$/.test(element)) {
            if (!childData.children) {
              childData.children = [];
            }
          }
        } else {
          data.push({
            name: element,
            children: [],
          });
        }
      }
      this.replacedData = this.replaceDuplicateChildren(data);
      data = this.removeDuplicates(this.replacedData);
      return data;
    },
    parentsWithNoChildren() {
      return getParentsWithNoChildren(this.columnFields);
    },
    columns() {
      return this.parentsWithNoChildren.length;
    }
  },
  methods: {
    ...mapActions(['setTableData']),
    generateTable() {
      this.showDataTable = true;
    },
    createDictionaryForm(sequence) {
      let dictionary = {}
      sequence.forEach(element => dictionary[element] = "");
      return dictionary;
    },
    checkInput() {
      if (this.subjectInput && this.objectInput && this.rows) {
        this.objectSequence = preProcessing(this.objectInput);
        [this.success, this.message] = analyse(this.objectSequence, false);
        if (this.success) {
          this.subjectSequence = preProcessing(this.subjectInput);
          [this.success, this.message] = analyse(this.subjectSequence);
        }
        if (this.success) {
          this.success = this.subjectSequence.length === this.rows;
          this.message = "The number of rows should be equal to the length of inputted subject elements";
        }
        if (this.success){
          this.setTableData(fillArrayEmpty(this.rows,this.columns));
        }
      }
    },
    replaceDuplicateChildren(data) {
      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        for (let j = 0; j < item.children.length; j++) {
          const child = item.children[j];
          const existingItemIndex = data.findIndex(obj => obj.name === child.name && obj.children);
          if (existingItemIndex !== -1) {
            item.children[j] = data[existingItemIndex];
          }
        }
      }

      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        item.children = this.replaceDuplicateChildren(item.children);
      }

      return data.filter((item, index, self) => {
        const firstIndex = self.findIndex(obj => obj.name === item.name);
        return firstIndex === index;
      });
    },
    removeDuplicates(data) {
      this.storeChildNames(data, true);
      // Iterate through the stored names and remove elements with matching names
      for (let i = 0; i < this.seenNames.length; i++) {
        for (let j = 0; j < data.length; j++) {
          if (data[j].name === this.seenNames[i]) {
            data.splice(j, 1);
          }
        }
      }
      return data;
    },
    storeChildNames(data, isParentIteration) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].children) {
          this.storeChildNames(data[i].children, false);
        }
        if (!isParentIteration) {
          this.seenNames.push(data[i].name);
        }
      }
    },
  }
}
</script>
<style scoped>
.wid-50 {
  width: 50rem;
}
</style>
