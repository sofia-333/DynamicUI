<template>
  <div>
    <div class="border-b flex flex-row" v-for="row in rows" :key="row">
      <div class="border-l flex flex-col" :class="{'border-r': col === columns }"
           v-for="col in columns" :key="col">
          <textarea
              class="text-xs text-gray-900 block wid-control height-control p-2 text-base border-0 rounded-md
               resize-none focus:outline-none focus:ring focus:ring-gray-300"
              type="text" rows=1 v-model="tableData[row-1][col-1]"
              :ref="`textarea-${row-1}-${col-1}`"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "TableContent",
  props: {
    columns: {
      type: Number,
      required: true
    },
    rows: {
      type: Number,
      required: true
    },
  },
  computed: {
    ...mapState({
      tableData: state => state.tableData,
    }),
  },
}
</script>

<style scoped>
.wid-control {
  min-width: var(--cell-min-width);
  max-width: var(--cell-max-width);
}

.height-control {
  min-height: var(--cell-min-height);
}
</style>