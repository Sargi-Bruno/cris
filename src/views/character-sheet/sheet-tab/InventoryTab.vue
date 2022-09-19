<script setup lang="ts">
import { Character } from '../../../types'
import SheetDropdown from '../../../components/SheetDropdown.vue'
import ItemCard from '../../../components/ItemCard.vue'
import { ref } from 'vue'

defineProps<{character: Character}>()

defineEmits(['handleOpenItemsModal'])

const patentOptions = ['Recruta', 'Operador', 'Agente especial', 'Oficial de operações', 'Agente de elite']
const creditOptions = ['Baixo', 'Médio', 'Alto', 'Ilimitado']

const patentValue = ref('Recruta')
const creditValue = ref('Baixo')
</script>
  
<template>
  <div class="inventory-tab">
    <div class="inventory-info-container">
      <div class="inventory-row inventory-row-gap">
        <div class="input-container">
          <h4 class="sheet-subtitle">
            PONTOS DE PRESTÍGIO
          </h4>
          <input 
            type="number"
            class="sheet-input sheet-input-size"
          >
        </div>
        <SheetDropdown
          title="PATENTE"
          :value="patentValue"
          button-width="12rem"
          :options="patentOptions"
          @update-value="(option) => patentValue = option"
        />
      </div>
      <div class="inventory-row">
        <div class="input-container">
          <h4 class="sheet-subtitle">
            LIMITE DE ITENS
          </h4>
          <input 
            type="number"
            class="sheet-input sheet-input-size"
            placeholder="I"
          >
          <input 
            type="number"
            class="sheet-input sheet-input-size"
            placeholder="II"
          >
          <input 
            type="number"
            class="sheet-input sheet-input-size"
            placeholder="III"
          >
          <input 
            type="number"
            class="sheet-input sheet-input-size"
            placeholder="IV"
          >
        </div>
      </div>
      <div class="inventory-row inventory-row-gap">
        <SheetDropdown
          title="LIMITE DE CRÉDITO"
          :value="creditValue"
          button-width="8rem"
          :options="creditOptions"
          @update-value="(option) => creditValue = option"
        />
        <div class="input-container">
          <h4 class="sheet-subtitle">
            CARGA MÁX.
          </h4>
          <input 
            type="number"
            class="sheet-input sheet-input-size"
          >
          <input 
            type="number"
            class="sheet-input sheet-input-size"
          >
        </div>
      </div>
    </div>
    <button 
      class="button-primary add-button"
      @click="$emit('handleOpenItemsModal')"
    >
      Adicionar
    </button>
    <div v-if="character.inventory.length > 0">
      <div v-for="(item, index) in character.inventory" :key="index">
        <ItemCard :item="item" />
      </div>
    </div>
    <div v-else>
      <h3>Você ainda não possue itens</h3>
    </div>
  </div>
</template>
  
<style scoped>
.add-button {
  display: block;
  margin-left: auto;
}
.inventory-row {
  display: flex;
  margin-bottom: 1rem;
}
.inventory-row-gap {
  gap: 1.5rem;
}
.input-container {
  display: flex;
  align-items: center;
  gap: .5rem
}
.patent-dropdown {
  width: 12rem;
}
.credit-dropdown {
  width: 8rem;
}
</style>