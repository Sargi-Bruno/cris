<script setup lang="ts">
import SheetStats from './sheet-stats/SheetStats.vue'
import SkillsView from './sheet-skills/SkillsView.vue'
import SheetTabView from './sheet-tab/SheetTabView.vue'
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
      <SheetTabView
        :character="character"
      />
    </div>
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
</style>