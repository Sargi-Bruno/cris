<script setup lang="ts">
import { ref } from 'vue'
import { Character, AttrKeys } from '../../../../types'
import AttributesEdit from './AttributesEdit.vue'
import AttributesRoll from './AttributesRoll.vue'

defineProps<{character: Character}>()

const emit = defineEmits(['handleChangeAttribute', 'handleRollAttribute'])

const handleRollAttribute = (attr: AttrKeys) => {
  emit('handleRollAttribute', attr)
}
const edit = ref(false)
</script>

<template>
  <div v-if="edit">
    <button class="change-button" @click="edit = false">
      <img 
        src="../../../../assets/done-icon.svg" 
        alt="concluir"
      >
    </button>
    <AttributesEdit 
      :character="character"
      @handle-change-attribute="(payload) => $emit('handleChangeAttribute', payload)"
    />
  </div>
  <div v-else>
    <button class="change-button" @click="edit = true">
      <img 
        src="../../../../assets/edit-icon.svg" 
        alt="editar"
      >
    </button>
    <AttributesRoll
      :character="character"
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
}
</style>