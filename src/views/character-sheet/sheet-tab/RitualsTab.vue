<script setup lang="ts">
import { computed, getCurrentInstance } from 'vue'
import { Character } from '../../../types'
import RitualCard from '../../../components/RitualCard.vue'

const props = defineProps<{character: Character}>()

const emit = defineEmits(['handleOpenRitualsModal', 'handleRemoveRitual', 'handleChangeRitualDc'])

const instance = getCurrentInstance()

const ritualsOrdered = computed(() => {
  const rituals = [...props.character.rituals]
  return rituals.sort((a, b) => a.name.localeCompare(b.name))
})

const handleChangeRitualDc = (e: Event) => {
 emit('handleChangeRitualDc', e)
 instance?.proxy?.$forceUpdate()
}
</script>
  
<template>
  <div class="rituals-tab">
    <button 
      class="button-primary add-button"
      @click="$emit('handleOpenRitualsModal')"
    >
      Adicionar
    </button>
    <div class="ritual-dc-wrapper">
      <div class="ritual-dc-container">
        <h4 class="sheet-subtitle">
          DT DE RITUAIS
        </h4>
        <input 
          type="number"
          class="sheet-input sheet-input-size"
          :value="character.ritualsDc"
          @blur="handleChangeRitualDc"
        >
      </div>
    </div>
    <div v-if="character.rituals.length > 0" class="sheet-cards-container">
      <div 
        v-for="ritual in ritualsOrdered" 
        :key="ritual.id"
        class="sheet-card-list"
      >
        <RitualCard 
          :id="ritual.id"
          :ritual="ritual"
          only-show
          sheet
          @handle-remove="(id: string) => $emit('handleRemoveRitual', id)"
        />
      </div>
    </div>
    <div v-else class="no-content">
      <h3>Você ainda não possui rituais</h3>
    </div>
  </div>
</template>
  
<style scoped>
.ritual-dc-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
  margin-bottom: 2rem;
}
.ritual-dc-container {
  display: flex;
  align-items: center;
  gap: .5rem;
}
.no-content h3 {
  text-align: center;
  margin-top: 10rem;
}
.add-button {
  display: block;
  margin-left: auto;
}
.sheet-cards-container {
  margin-top: 1rem;
}
.sheet-card-list {
  margin-bottom: .5rem;
}
</style>