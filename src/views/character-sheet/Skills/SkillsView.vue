<script setup lang="ts">
import { Character } from '../../../types'
import SkillCard from './SkillCard.vue'

defineProps<{character: Character}>()
</script>

<template>
  <div class="skills-container">
    <h1 class="skills-title">
      PERÍCIAS
    </h1>
    <div class="skills-header">
      <h2 class="skill-name">
        PERÍCIA
      </h2>
      <h2 class="skill-data">
        DADOS
      </h2>
      <h2 class="skill-data">
        BÔNUS
      </h2>
      <h2 class="skill-data">
        Treino
      </h2>
      <h2 class="skill-data">
        Outros
      </h2>
    </div>
    <div class="skills-content">
      <div v-for="skill in character.skills" :key="skill.name">
        <SkillCard
          :skill="skill"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.skills-container {
  padding-left: .5rem;
}
.skills-title {
  margin: 0;
  margin-top: .5rem;
  text-align: center;
  font-size: 16px;
}
.skills-header {
  display: flex;
  align-items: flex-end;
}
.skills-header h2 {
  margin: 0;
  font-size: 10px;
  color: var(--color-off-white);
}
.skill-name {
  width: 7rem;
}
.skill-data {
  width: 3rem;
}
</style>