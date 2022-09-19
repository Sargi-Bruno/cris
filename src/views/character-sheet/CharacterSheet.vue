<script setup lang="ts">
import { ref } from 'vue'
import { Skill } from '../../types'
import SheetStats from './sheet-stats/SheetStats.vue'
import SkillsView from './sheet-skills/SkillsView.vue'
import SheetTabView from './sheet-tab/SheetTabView.vue'
import { characterDefaultValue } from './characterSheetUtils'
import AbilitiesModal from './sheet-modals/abilities-modal/AbilitiesModal.vue'
import AttackModal from './sheet-modals/attack-modal/AttackModal.vue'
import InventoryModal from './sheet-modals/inventory-modal/InventoryModal.vue'
import RitualsModal from './sheet-modals/rituals-modal/RitualsModal.vue'
import SkillModal from './sheet-modals/skill-modal/SkillModal.vue'

const modalOptions = [AbilitiesModal, AttackModal, InventoryModal, RitualsModal, SkillModal]
const modals = {
  abilities: 0,
  attack: 1,
  inventory: 2,
  rituals: 3,
  skill: 4
}

const character = characterDefaultValue

const showModal = ref(false)
const currentModal = ref(0)
const currentSkill = ref<Skill>()

const handleOpenAbilitiesModal = () => {
  currentModal.value = modals.abilities
  showModal.value = true
}

const handleOpenSkillModal = (skill: Skill) => {
  currentSkill.value = skill
  currentModal.value = modals.skill
  showModal.value = true
}
</script>

<template>
  <div class="character-sheet">
    <div class="sheet-stats">
      <SheetStats
        :character="character"
      />
    </div>
    <div class="sheet-skills">
      <SkillsView
        :character="character"
        @handle-open-skill-modal="handleOpenSkillModal"
      />
    </div>
    <div class="sheet-tab">
      <SheetTabView
        :character="character"
        @handle-open-abilities-modal="handleOpenAbilitiesModal"
      />
    </div>
    <vue-final-modal 
      v-model="showModal" 
      classes="modal-container"
    >
      <component 
        :is="modalOptions[currentModal]"
        :character="character"
        :skill="currentSkill"
        @handle-close-modal="showModal = false"
      />
    </vue-final-modal>
  </div>
</template>

<style scoped>
.character-sheet {
  display: flex;
  justify-content: space-between;
  margin-top: 2.25rem;
  margin-bottom: 2.25rem;
}
.sheet-stats {
  border: 1px solid white;
}
.sheet-skills {
  border: 1px solid white;
}
.sheet-tab {
  border: 1px solid white;
}
:deep(.modal-container) {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>