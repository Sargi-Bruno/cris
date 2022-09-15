<script setup lang="ts">
import SheetStats from './sheet-stats/SheetStats.vue'
import SkillsView from './Skills/SkillsView.vue'
import { characterDefaultValue } from './characterSheetUtils'

const character = characterDefaultValue
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
      />
    </div>
    <div class="sheet-tab">
      <!-- Ataques, Habilidades & Rituais, Inventário, Descrição -->
    </div>
  </div>
</template>

<style scoped>
.character-sheet {
  display: flex;
  margin-top: 3rem;
}
.sheet-stats {
  border: 1px solid white;
}
.sheet-skills {
  border: 1px solid white;
}
</style>