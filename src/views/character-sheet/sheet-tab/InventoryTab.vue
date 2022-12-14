<script setup lang="ts">
import { ref, computed, getCurrentInstance } from 'vue'
import { Character, Weapon, Protection, Misc, CursedItem, Ammunition } from '../../../types'
import SheetDropdown from '../../../components/SheetDropdown.vue'
import WeaponCard from '../../../components/WeaponCard.vue'
import ProtectionCard from '../../../components/ProtectionCard.vue'
import MiscCard from '../../../components/MiscCard.vue'
import CursedItemCard from '../../../components/CursedItemCard.vue'
import FilterInput from '../../../components/FilterInput.vue'
import { compare } from '../../../utils/functions'

const props = defineProps<{character: Character, disabledSheet: boolean}>()

const emit = defineEmits([
  'handleOpenItemsModal', 
  'handleRemoveItem', 
  'handleEquipItem', 
  'handleChangeInventoryNumber', 
  'handleChangeItemsLimit', 
  'handleChangeInventoryDropdown',
  'handleEditItem',
])

const patentOptions = ['Recruta', 'Operador', 'Agente especial', 'Oficial de operações', 'Agente de elite']
const creditOptions = ['Baixo', 'Médio', 'Alto', 'Ilimitado']

const instance = getCurrentInstance()
const filterText = ref('')

const inventoryFiltered = computed(() => {
  const inventory = [...props.character.inventory]
  return inventory.filter((ele) => compare(ele.name, filterText.value)).sort((a, b) => a.name.localeCompare(b.name))
})

const currentLoadColor = computed(() => {
  if(props.character.currentLoad > props.character.maxLoad * 2) return '#d9534f'
  if(props.character.currentLoad > props.character.maxLoad) return '#ff8c00'
  return '#fff'
})

const currentLoad = computed(() => {
  if(props.character.currentLoad < 0) return 0
  return props.character.currentLoad
})

const handleEditItem = (item: Weapon | Protection | Misc | Ammunition | CursedItem) => emit('handleEditItem', item)

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
  <div class="tab">
    <div class="tab-header">
      <div v-if="character.inventory.length > 0">
        <FilterInput
          :value="filterText"
          placeholder="Filtrar itens"
          @update="(value: string) => filterText = value"
        />
      </div>
      <button 
        v-if="!disabledSheet"
        class="button-primary add-button"
        @click="$emit('handleOpenItemsModal')"
      >
        Adicionar
      </button>
    </div>
    <div class="inventory-info-container">
      <div class="inventory-row">
        <div class="input-container">
          <h4 class="sheet-subtitle">
            PONTOS DE PRESTÍGIO
          </h4>
          <input 
            type="number"
            class="sheet-input sheet-input-size"
            :disabled="disabledSheet"
            :value="character.prestigePoints"
            @blur="e => handleChangeInventoryNumber(e, 'prestigePoints')"
          >
        </div>
        <SheetDropdown
          title="PATENTE"
          :disabled="disabledSheet"
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
            :disabled="disabledSheet"
            :value="character.itemsLimit.I"
            @blur="e => handleChangeItemsLimit(e, 'I')"
          >
          <input 
            type="number"
            class="sheet-input sheet-input-size"
            placeholder="II"
            :disabled="disabledSheet"
            :value="character.itemsLimit.II"
            @blur="e => handleChangeItemsLimit(e, 'II')"
          >
          <input 
            type="number"
            class="sheet-input sheet-input-size"
            placeholder="III"
            :disabled="disabledSheet"
            :value="character.itemsLimit.III"
            @blur="e => handleChangeItemsLimit(e, 'III')"
          >
          <input 
            type="number"
            class="sheet-input sheet-input-size"
            placeholder="IV"
            :disabled="disabledSheet"
            :value="character.itemsLimit.IV"
            @blur="e => handleChangeItemsLimit(e, 'IV')"
          >
        </div>
      </div>
      <div class="inventory-row">
        <div class="input-container">
          <h4 class="sheet-subtitle width-to-align">
            NO INVENTÁRIO
          </h4>
          <div class="sheet-div">
            {{ character.currentItemsLimit?.I || '0' }}
          </div>
          <div class="sheet-div">
            {{ character.currentItemsLimit?.II || '0' }}
          </div>
          <div class="sheet-div">
            {{ character.currentItemsLimit?.III || '0' }}
          </div>
          <div class="sheet-div">
            {{ character.currentItemsLimit?.IV || '0' }}
          </div>
        </div>
      </div>
      <div class="inventory-row">
        <SheetDropdown
          title="LIMITE DE CRÉDITO"
          :disabled="disabledSheet"
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
            :disabled="disabledSheet"
            :value="currentLoad"
            @blur="e => handleChangeInventoryNumber(e, 'currentLoad')"
          >
          <input 
            type="number"
            class="sheet-input sheet-input-size"
            :disabled="disabledSheet"
            :value="character.maxLoad"
            @blur="e => handleChangeInventoryNumber(e, 'maxLoad')"
          >
        </div>
      </div>
    </div>
    <div v-if="character.inventory.length > 0" class="sheet-cards-container">
      <div v-if="inventoryFiltered.length > 0">
        <div 
          v-for="item in inventoryFiltered" 
          :key="item.id"
          class="sheet-card-list"
        >
          <div v-if="item.itemType === 'weapon'">
            <WeaponCard
              :id="item.id"
              :weapon="(item as Weapon)"
              :disabled="disabledSheet"
              only-show
              sheet
              @handle-remove="payload => $emit('handleRemoveItem', payload.id)"
              @handle-equip="(id: string) => $emit('handleEquipItem', id)"
              @handle-edit="handleEditItem"
            />
          </div>
          <div v-if="item.itemType === 'protection'">
            <ProtectionCard
              :id="item.id"
              :protection="(item as Protection)"
              :disabled="disabledSheet"
              only-show
              sheet
              @handle-remove="payload => $emit('handleRemoveItem', payload.id)"
              @handle-equip="(id: string) => $emit('handleEquipItem', id)"
              @handle-edit="handleEditItem"
            />
          </div>
          <div v-if="item.itemType === 'misc' || item.itemType === 'ammunition'">
            <MiscCard
              :id="item.id"
              :misc="(item as Misc | Ammunition)"
              :disabled="disabledSheet"
              only-show
              sheet
              @handle-remove="payload => $emit('handleRemoveItem', payload.id)"
              @handle-edit="handleEditItem"
            />
          </div>
          <div v-if="item.itemType === 'cursedItem'">
            <CursedItemCard
              :id="item.id"
              :cursed-item="(item as CursedItem)"
              :disabled="disabledSheet"
              only-show
              sheet
              @handle-remove="payload => $emit('handleRemoveItem', payload.id)"
              @handle-edit="handleEditItem"
            />
          </div>
        </div>
      </div>
      <div v-else class="no-content">
        <h3>Nenhum item encontrado</h3>
      </div>
    </div>
    <div v-else class="no-content">
      <h3>Você ainda não possui itens</h3>
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
  margin-bottom: 2rem;
}
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
.width-to-align {
  width: 6.611rem;
}
.sheet-div {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.25rem;
  height: 2.25rem;
  background-color: transparent;
  border: 1px solid var(--color-white);
  color: var(--color-white);
  font-size: 14px;
  font-weight: bold;
}
</style>