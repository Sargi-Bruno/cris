<script setup lang="ts">
import { ref } from 'vue'
import { Character, Weapon, Protection, Misc } from '../../../types'
import SheetDropdown from '../../../components/SheetDropdown.vue'
import WeaponCard from '../../../components/WeaponCard.vue'
import ProtectionCard from '../../../components/ProtectionCard.vue'
import MiscCard from '../../../components/MiscCard.vue'

defineProps<{character: Character}>()

defineEmits(['handleOpenItemsModal', 'handleRemoveItem'])

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
          button-width="10rem"
          :options="patentOptions"
          @update-value="(option: string) => patentValue = option"
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
          button-width="6rem"
          :options="creditOptions"
          @update-value="(option: string) => creditValue = option"
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
    <div v-if="character.inventory.length > 0" class="sheet-cards-container">
      <div 
        v-for="item in character.inventory" 
        :key="item.id"
        class="sheet-card-list"
      >
        <div v-if="item.itemType === 'weapon'">
          <WeaponCard
            :id="item.id"
            :weapon="(item as Weapon)"
            only-show
            sheet
            @handle-remove="$emit('handleRemoveItem', item.id)"
          />
        </div>
        <div v-if="item.itemType === 'protection'">
          <ProtectionCard
            :id="item.id"
            :procetion="(item as Protection)"
            only-show
            sheet
            @handle-remove="$emit('handleRemoveItem', item.id)"
          />
        </div>
        <div v-if="item.itemType === 'misc'">
          <MiscCard
            :id="item.id"
            :misc="(item as Misc)"
            only-show
            sheet
            @handle-remove="$emit('handleRemoveItem', item.id)"
          />
        </div>
      </div>
    </div>
    <div v-else class="no-content">
      <h3>Você ainda não possue itens</h3>
    </div>
  </div>
</template>
  
<style scoped>
.no-content h3 {
  text-align: center;
  margin-top: 10rem;
}
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
.sheet-cards-container {
  margin-top: 1rem;
}
.sheet-card-list {
  margin-bottom: .5rem;
}
</style>