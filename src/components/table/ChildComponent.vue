<template>
  <div class="border-t overflow-hidden" :class="{'border-r': borderRight}">
    <cell-content :node="node" :content-info="objectDictionary ? objectDictionary[node.name] : ''"/>
    <div class="flex flex-row h-full" v-if="node.children && node.children.length">
      <div class="flex" v-for="(child, index) in node.children" :key="child.name">
        <child-component :node="child" :border-right="index < node.children.length - 1"
                         :object-dictionary="objectDictionary"/>
      </div>
    </div>
  </div>
</template>

<script>

import CellContent from "@/components/table/CellContent.vue";

export default {
  name: "ChildComponent",
  components: {CellContent},
  props: {
    node: {
      type: Object,
      required: true
    },
    borderRight: {
      type: Boolean,
      required: true
    },
    objectDictionary: {
      type: Object,
      required: true
    }
  },
}
</script>

<style scoped>

p{
  display: inline-block;
  word-break: break-word;
}

</style>