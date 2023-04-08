<template>
  <p class="break-words inline-block m-0 text-xs"
     :class="node.children && node.children.length ? `p-2 max-w-${getParentsWithNoChildren(node.children).length} height-control` : `p-2 wid-control height-control h-full`">
    [{{ node.name }}] {{ contentInfo }}
  </p>
</template>

<script>
import countEmptyChildren from "@/components/utils/helperMethods";
import getParentsWithNoChildren from "@/components/utils/helperMethods";

export default {
  name: "CellContent",
  methods: {getParentsWithNoChildren, countEmptyChildren},
  props: {
    node: {
      type: Object,
      required: true
    },
    contentInfo: {
      type: String,
      required: true
    },

  }
}
</script>

<style scoped>
.height-control {
  min-height: var(--cell-min-height);
}

.wid-control {
  min-width: var(--cell-min-width);
  max-width: var(--cell-max-width);
}

.max-w-2 {
  max-width: var(--max-w-2);
}

.max-w-3 {
  max-width: var(--max-w-3);
}

.max-w-4 {
  max-width: var(--max-w-4);
}

.max-w-5 {
  max-width: var(--max-w-5);
}

.max-w-6 {
  max-width: var(--max-w-6);
}

.max-w-7 {
  max-width: var(--max-w-7);
}

.max-w-8 {
  max-width: var(--max-w-8);
}

.max-w-9 {
  max-width: var(--max-w-9);
}

.max-w-10 {
  max-width: var(--max-w-10);
}

</style>