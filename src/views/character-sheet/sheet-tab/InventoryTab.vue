<script setup lang="ts">
  import { computed, getCurrentInstance } from 'vue'
import { Character, Weapon, Protection, Misc } from '../../../types'
import SheetDropdown from '../../../components/SheetDropdown.vue'
import WeaponCard from '../../../components/WeaponCard.vue'
import ProtectionCard from '../../../components/ProtectionCard.vue'
import MiscCard from '../../../components/MiscCard.vue'

const props = defineProps<{character: Character}>()

const emit = defineEmits([
  'handleOpenItemsModal', 
  'handleRemoveItem', 
  'handleEquipItem', 
  'handleChangeInventoryNumber', 
  'handleChangeItemsLimit', 
  'handleChangeInventoryDropdown'
])

const patentOptions = ['Recruta', 'Operador', 'Agente especial', 'Oficial de operações', 'Agente de elite']
const creditOptions = ['Baixo', 'Médio', 'Alto', 'Ilimitado']

const instance = getCurrentInstance()

const currentLoadColor = computed(() => {
  if(props.character.currentLoad > props.character.maxLoad * 2) return '#d9534f'
  if(props.character.currentLoad > props.character.maxLoad) return '#ff8c00'
  return '#fff'
})

const handleChangeItemsLimit = (e: Event, key: string) => {
  const value = (e.target as HTMLInputElement).valueAsNumber
  emit('handleChangeItemsLimit', {value, key})
  instance?.proxy?.$forceUpdate()
}

const handleChangeInventoryNumber = (e: Event, key: string) => {
  const value = (e.target as HTMLInputElement).valueAsNumber
  emit('handleChangeInventoryNumber', {value, key})
  instance?.proxy?.$forceUpdate()
}
</script>
  
<template>
  <div class="inventory-tab">
    <button 
      class="button-primary add-button"
      @click="$emit('handleOpenItemsModal')"
    >
      Adicionar
    </button>
    <div class="inventory-info-container">
      <div class="inventory-row">
        <div class="input-container">
          <h4 class="sheet-subtitle">
            PONTOS DE PRESTÍGIO
          </h4>
          <input 
            type="number"
            class="sheet-input sheet-input-size"
            :value="character.prestigePoints"
            @blur="e => handleChangeInventoryNumber(e, 'prestigePoints')"
          >
        </div>
        <SheetDropdown
          title="PATENTE"
          :value="character.patent"
          button-width="10rem"
          :options="patentOptions"
          @update-value="(value: string) => $emit('handleChangeInventoryDropdown', {value, key: 'patent'})"
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
            :value="character.itemsLimit.I"
            @blur="e => handleChangeItemsLimit(e, 'I')"
          >
          <input 
            type="number"
            class="sheet-input sheet-input-size"
            placeholder="II"
            :value="character.itemsLimit.II"
            @blur="e => handleChangeItemsLimit(e, 'II')"
          >
          <input 
            type="number"
            class="sheet-input sheet-input-size"
            placeholder="III"
            :value="character.itemsLimit.III"
            @blur="e => handleChangeItemsLimit(e, 'III')"
          >
          <input 
            type="number"
            class="sheet-input sheet-input-size"
            placeholder="IV"
            :value="character.itemsLimit.IV"
            @blur="e => handleChangeItemsLimit(e, 'IV')"
          >
        </div>
      </div>
      <div class="inventory-row">
        <SheetDropdown
          title="LIMITE DE CRÉDITO"
          :value="character.creditsLimit"
          button-width="6rem"
          :options="creditOptions"
          @update-value="(value: string) => $emit('handleChangeInventoryDropdown', {value, key: 'creditsLimit'})"
        />
        <div class="input-container">
          <h4 class="sheet-subtitle">
            CARGA MÁX.
          </h4>
          <input 
            type="number"
            class="sheet-input sheet-input-size current-load-color"
            :value="character.currentLoad"
            @blur="e => handleChangeInventoryNumber(e, 'currentLoad')"
          >
          <input 
            type="number"
            class="sheet-input sheet-input-size"
            :value="character.maxLoad"
            @blur="e => handleChangeInventoryNumber(e, 'maxLoad')"
          >
        </div>
      </div>
    </div>
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
            @handle-remove="(id: string) => $emit('handleRemoveItem', id)"
            @handle-equip="(id: string) => $emit('handleEquipItem', id)"
          />
        </div>
        <div v-if="item.itemType === 'protection'">
          <ProtectionCard
            :id="item.id"
            :protection="(item as Protection)"
            only-show
            sheet
            @handle-remove="(id: string) => $emit('handleRemoveItem', id)"
            @handle-equip="(id: string) => $emit('handleEquipItem', id)"
          />
        </div>
        <div v-if="item.itemType === 'misc'">
          <MiscCard
            :id="item.id"
            :misc="(item as Misc)"
            only-show
            sheet
            @handle-remove="(id: string) => $emit('handleRemoveItem', id)"
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
  margin-bottom: 2rem;
}
.inventory-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
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
.current-load-color {
  color: v-bind(currentLoadColor)
}
</style>