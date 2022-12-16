<script setup lang="ts">
import { ref } from 'vue'
import { Character, AttrKeys } from '../../../../types'
import AttributesEdit from './AttributesEdit.vue'
import AttributesRoll from './AttributesRoll.vue'

defineProps<{character: Character, disabledSheet: boolean}>()

const emit = defineEmits(['handleChangeAttribute', 'handleRollAttribute'])

const handleRollAttribute = (attr: AttrKeys) => {
  emit('handleRollAttribute', attr)
}
const edit = ref(false)
</script>

<template>
  <div v-if="edit">
    <AttributesEdit 
      :character="character"
      @handle-edit="edit = false"
      @handle-change-attribute="(payload) => $emit('handleChangeAttribute', payload)"
    />
  </div>
  <div v-else>
    <AttributesRoll
      :character="character"
      :disabled-sheet="disabledSheet"
      @handle-edit="edit = true"
      @handle-roll-attribute="handleRollAttribute"
    />
  </div>
</template>

<style scoped>
.change-button {
  display: block;
  background: transparent;
  border: none;
  margin-left: auto;
  margin-right: 1rem;
  cursor: pointer;
  padding: 0;
}
</style>