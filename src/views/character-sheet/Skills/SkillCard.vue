<script setup lang="ts">
import { Skill } from '../../../types'

defineProps<{skill: Skill}>()
</script>

<template>
  <div class="skill-card">
    <button class="skill-name naked-button">
      {{ skill.name }}<span v-if="skill.onlyTrained">*</span><span v-if="skill.loadPenalty">+</span>
    </button>
    <div class="skill-data">
      <span>( </span>
      <button class="naked-button">
        {{ skill.attribute }}
      </button>
      <span> )</span>
    </div>
    <div class="skill-data">
      <span>( </span>
      <button class="naked-button">
        + 10
      </button>
      <span> )</span>
    </div>
    <button class="skill-data underline-button">
      {{ skill.trainingDegree }}
    </button>
    <button class="other-data underline-button">
      {{ skill.otherBonus }}
    </button>
  </div>
</template>

<style scoped>
.skill-card {
  display: flex;
}
.naked-button {
  background-color: transparent;
  border: none;
  color: var(--color-white);
  padding: 0;
  font-size: 14px;
  cursor: pointer;
  text-align: left;
}
.naked-button:hover {
  color: var(--color-primary);
}
.underline-button {

}
.skill-name {
  width: 7rem;
}
.skill-data {
  width: 3rem;
}
</style>