<script setup lang="ts">
import { Character } from '../../../types'
import AttackCard from '../../../components/AttackCard.vue'

defineProps<{character: Character}>()

defineEmits(['handleAddAttack', 'handleRemoveAttack', 'handleChangeAttackText', 'handleChangeAttackNumber', 'handleChangeAttackDropdown'])
</script>
  
<template>
  <div class="attacks-tab">
    <button 
      class="button-primary add-button"
      @click="$emit('handleAddAttack')"
    >
      Adicionar
    </button>
    <div v-if="character.attacks.length > 0">
      <div class="attacks-info-row">
        <h3 class="name-label">
          NOME
        </h3>
        <h3 class="number-label">
          ATAQUE BÔNUS
        </h3>
        <h3 class="text-label">
          DANO
        </h3>
        <div class="second-text-label">
          <h3>
            DANO EXTRA
          </h3>
        </div>
        <h3 class="crit-label">
          CRÍTICO
        </h3>
      </div>
      <div 
        v-for="attack in character.attacks" 
        :key="attack.id"
        class="align-card"
      >
        <AttackCard 
          :id="attack.id"
          :attack="attack"
          @handle-remove-attack="(id: string) => $emit('handleRemoveAttack', id)"
          @handle-change-attack-text="payload => $emit('handleChangeAttackText', payload)"
          @handle-change-attack-number="payload => $emit('handleChangeAttackNumber', payload)"
          @handle-change-attack-dropdown="payload => $emit('handleChangeAttackDropdown', payload)"
        />
      </div>
    </div>
    <div v-else class="no-content">
      <h3>Você ainda não possue ataques</h3>
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
.attacks-info-row {
  display: flex;
  margin-top: 1rem;
  margin-left: 3rem;
}
.name-label {
  width: 9rem;
}
.number-label {
  width: 4.25rem;
}
.text-label {
  width: 2.5rem;
}
.second-text-label {
  display: flex;
  align-items: center;
  width: 2.5rem;
  margin-left: 1rem;
  margin-right: 1.25rem;
}
.crit-label {
  width: 2.5rem;
}
.attacks-info-row h3 {
  font-size: 10px;
  color: var(--color-white);
  margin: 0;
  text-align: center;
  margin-top: auto;
  margin-bottom: auto;
}
.align-card {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}
</style>