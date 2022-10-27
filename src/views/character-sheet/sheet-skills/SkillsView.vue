<script setup lang="ts">
import { Character, Skill } from '../../../types'
import SkillCard from './SkillCard.vue'

const props = defineProps<{character: Character, disabledSheet: boolean}>()

const emit = defineEmits(['handleOpenSkillModal', 'handleChangeSkillOtherBonus', 'handleChangeSkillDropdown', 'handleRollSkill'])

const handleOpenSkill = (skill: Skill) => {
  if(props.disabledSheet) return
  emit('handleOpenSkillModal', skill)
}

const handleRollSkill = (skill: Skill) => {
  if(props.disabledSheet) return
  emit('handleRollSkill', skill)
}
</script>

<template>
  <div class="skills-container">
    <h1 class="skills-title">
      PERÍCIAS
    </h1>
    <table class="skills-table">
      <thead>
        <tr>
          <th class="small"></th>
          <th class="left">
            PERÍCIA
          </th>
          <th>DADOS</th>
          <th>BÔNUS</th>
          <th>Treino</th>
          <th>Outros</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(skill, i) in character.skills" :key="skill.name">
          <SkillCard
            :skill="skill"
            :index="i"
            :length="character.skills.length"
            :disabled-sheet="disabledSheet"
            @handle-open-skill-modal="handleOpenSkill"
            @handle-change-skill-dropdown="payload => $emit('handleChangeSkillDropdown', payload)"
            @handle-change-skill-other-bonus="payload => $emit('handleChangeSkillOtherBonus', payload)"
            @handle-roll-skill="handleRollSkill"
          />
        </tr>
      </tbody>
    </table>
    <h4 class="table-caption">
      + <i>Penalidade de carga.</i> * <i>Somente treinada.</i>
    </h4>
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
  font-size: 14px;
}
.skills-table th {
  font-size: 10px;
  color: var(--color-off-white);
  width: 3.25rem;
}
.skills-table td {
  width: 3.25rem;
  text-align: center;
}
.skills-table td span {
  color: var(--color-white);
}
.left {
  width: 6.25rem;
  text-align: left;
}
.small {
  width: 1.5rem !important;
  text-align: center;
}
.table-caption {
  margin: 0;
  margin-top: .25rem;
  font-weight: normal;
  font-size: 10px;
}
</style>