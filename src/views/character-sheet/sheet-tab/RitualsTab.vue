<script setup lang="ts">
import { ref, computed, getCurrentInstance } from 'vue'
import { Character, Ritual } from '../../../types'
import RitualCard from '../../../components/RitualCard.vue'
import FilterInput from '../../../components/FilterInput.vue'
import { compare } from '../../../utils/functions'

const props = defineProps<{character: Character, disabledSheet: boolean}>()

const emit = defineEmits(['handleOpenRitualsModal', 'handleRemoveRitual', 'handleChangeRitualDc', 'handleEditRitual'])

const instance = getCurrentInstance()
const filterText = ref('')

const ritualsOrdered = computed(() => {
  const rituals = [...props.character.rituals]
  return rituals.filter((ele) => compare(ele.name, filterText.value)).sort((a, b) => a.name.localeCompare(b.name))
})

const handleChangeRitualDc = (e: Event) => {
 emit('handleChangeRitualDc', e)
 instance?.proxy?.$forceUpdate()
}

const handleEdit = (ritual: Ritual) => emit('handleEditRitual', ritual)
</script>
  
<template>
  <div class="tab">
    <div class="tab-header">
      <div v-if="character.rituals.length > 0">
        <FilterInput
          :value="filterText"
          placeholder="Filtrar rituais"
          @update="(value: string) => filterText = value"
        />
      </div>
      <button
        v-if="!disabledSheet"
        class="button-primary add-button"
        @click="$emit('handleOpenRitualsModal')"
      >
        Adicionar
      </button>
    </div>
    <div class="ritual-dc-wrapper">
      <div class="ritual-dc-container">
        <h4 class="sheet-subtitle">
          DT DE RITUAIS
        </h4>
        <input 
          type="number"
          class="sheet-input sheet-input-size"
          :disabled="disabledSheet"
          :value="character.ritualsDc"
          @blur="handleChangeRitualDc"
        >
      </div>
    </div>
    <div v-if="character.rituals.length > 0" class="sheet-cards-container">
      <div v-if="ritualsOrdered.length > 0">
        <div 
          v-for="ritual in ritualsOrdered" 
          :key="ritual.id"
          class="sheet-card-list"
        >
          <RitualCard 
            :id="ritual.id"
            :ritual="ritual"
            :disabled="disabledSheet"
            only-show
            sheet
            @handle-remove="(id: string) => $emit('handleRemoveRitual', id)"
            @handle-edit="handleEdit"
          />
        </div>
      </div>
      <div v-else class="no-content">
        <h3>Nenhum ritual encontrado</h3>
      </div>
    </div>
    <div v-else class="no-content">
      <h3>Você ainda não possui rituais</h3>
    </div>
  </div>
</template>
  
<style scoped>
.tab {
  height: 52.25rem;
  overflow-y: scroll;
  overflow-x: hidden;
  padding-right: .5rem;
}
.tab-header {
  display: flex;
  align-items: flex-end;
}
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