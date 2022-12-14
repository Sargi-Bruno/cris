<script setup lang="ts">
import { ref, computed } from 'vue'
import { Character } from '../../../types'
import PowerCard from '../../../components/PowerCard.vue'
import FilterInput from '../../../components/FilterInput.vue'
import { compare } from '../../../utils/functions'
import { Power } from '../../../types'

const props = defineProps<{character: Character, disabledSheet: boolean}>()

const emit = defineEmits(['handleOpenAbilitiesModal', 'handleRemovePower', 'handleEditPower'])

const filterText = ref('')

const powersOrdered = computed(() => {
  const powers = [...props.character.powers]
  return powers.filter((ele) => compare(ele.name, filterText.value)).sort((a, b) => a.name.localeCompare(b.name))
})

const handleEdit = (power: Power) => emit('handleEditPower', power)
</script>

<template>
  <div class="tab">
    <div class="tab-header">
      <div v-if="character.powers.length > 0">
        <FilterInput
          :value="filterText"
          placeholder="Filtrar habilidades"
          @update="(value: string) => filterText = value"
        />
      </div>
      <button 
        v-if="!disabledSheet"
        class="button-primary add-button"
        @click="$emit('handleOpenAbilitiesModal')"
      >
        Adicionar
      </button>
    </div>
    <div v-if="character.powers.length > 0" class="sheet-cards-container">
      <div v-if="powersOrdered.length > 0">
        <div 
          v-for="power in powersOrdered" 
          :key="power.id"
          class="sheet-card-list"
        >
          <PowerCard 
            :id="power.id"
            :power="power"
            :disabled="disabledSheet"
            only-show
            sheet
            @handle-remove="(id: string) => $emit('handleRemovePower', id)"
            @handle-edit="handleEdit"
          />
        </div>
      </div>
      <div v-else class="no-content">
        <h3>Nenhuma habilidade encontrada</h3>
      </div>
    </div>
    <div v-else class="no-content">
      <h3>Você ainda não possui habilidades</h3>
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
.no-content h3 {
  text-align: center;
  margin-top: 10rem;
}
.tab-header {
  display: flex;
  align-items: flex-end;
}
.add-button {
  margin-left: auto;
}
.sheet-cards-container {
  margin-top: 1rem;
}
.sheet-card-list {
  margin-bottom: .5rem;
}
</style>