<template class="border">
  <div>
    <div class="flex flex-row">
      <div class="border border-r-0">
        <div class="p-2 min-w-4 text-center text-xs w-60">
          All
        </div>
      </div>
      <div class="border border-r-0">
        <div class="p-2 min-w-4 text-xs text-center">
          No
        </div>
      </div>
      <div class="border border-r-0">
        <div class="p-2 min-w-3 text-xs text-center">
          No
        </div>
      </div>
      <div class="border flex">
        <div class="overflow-hidden" v-for="(node, index) in columnFields" :key="node.name"
             :class="{'border-r': index < columnFields.length - 1}">
          <cell-content :node="node" :content-info="objectDictionary ? objectDictionary[node.name] : ''"></cell-content>
          <div class="flex flex-row h-full" v-if="node.children && node.children.length">
            <div class="flex" v-for="(child,index) in node.children" :key="child.name">
              <child-component :node="child" :rows="rows" :objectDictionary="objectDictionary"
                               :border-right="index < node.children.length - 1"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="flex flex-row">
    <div class="flex flex-col border-l">
      <div class="border-b text-center w-60 text-xs" v-for="(element, index) in subjectSequence" :key="index">
        <div class="p-2 min-w-4 height-control truncate font-xs" data-te-toggle="tooltip"
             :title="`${subjectDictionary[element]}`"> {{ subjectDictionary[element] }}
        </div>
      </div>
    </div>
    <div class="flex flex-col border-l">
      <div class="border-b text-center text-xs " v-for="(element, index) in subjectSequence" :key="index">
        <div class="p-2 min-w-4 height-control "> {{ element }}</div>
      </div>
    </div>
    <div class="flex flex-col border-l">
      <div class="border-b text-center text-xs" v-for="row in rows" :key="row">
        <div class="p-2 min-w-3 height-control "> {{ row }}</div>
      </div>
    </div>
    <table-content :rows="rows" :columns="columns"></table-content>
  </div>
  <button class="mt-3 disabled:bg-blue-100 bg-blue-200 text-blue-800 font-semibold py-2 px-4 rounded shadow"
          @click="saveTableData()">
    Save Table Content
  </button>

</template>

<script>

import ChildComponent from "@/components/table/ChildComponent.vue";
import CellContent from "@/components/table/CellContent.vue";
import TableContent from "@/components/table/TableContent.vue";
import {mapState} from "vuex";
import {downloadJSONFile} from "@/components/utils/helperMethods";

export default {
  name: "DataTable",
  components: {
    TableContent,
    CellContent,
    ChildComponent
  },
  data() {
    return {
      seenNames: [],
      replacedData: [],
    }
  },
  props: {
    data: {
      type: Array,
      required: true
    },
    subjectSequence: {
      type: Array,
      required: true
    },
    rows: {
      type: Number,
      required: true
    },
    columns: {
      type: Number,
      required: true
    },
    columnFields: {
      type: Array,
      required: true
    },
    parentsWithNoChildren: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapState({
      objectDictionary: state => state.objectDictionary,
      subjectDictionary: state => state.subjectDictionary,
      tableData: state => state.tableData,
    }),
  },
  methods: {
    saveTableData() {
      let objectToSave = {}
      for (let i=0; i<this.tableData.length; i++) {
        let rowNum = this.subjectSequence[i];
        objectToSave[rowNum] = {};
        for (let j=0; j<this.tableData[i].length;j++){
          let colNum = this.parentsWithNoChildren[j];
          objectToSave[rowNum][colNum] = this.tableData[i][j]
        }
      }
      downloadJSONFile(objectToSave);
    }
  },
}
</script>

<!--1, 1.1, 1.2, 1.2.1, 1.2.2, 1.3, 2-->
<!--1,1.1,1.2,1.2.1,1.2.1.1,1.2.1.2,1.2.2,1.2.3,1.3, 2, 3, 4-->
<!--1, 2, 2.1, 2.2, 2.2.1, 2.2.2, 3, 3.1, 3.2, 4-->
<style scoped>
.wid-control {
  min-width: var(--cell-min-width);
  max-width: var(--cell-max-width);
}

.height-control {
  min-height: var(--cell-min-height);
}

.min-w-4 {
  min-width: 4rem;
}

.min-w-3 {
  min-width: 3rem;
}
</style>