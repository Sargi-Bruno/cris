<script setup lang="ts">
import { PropType, getCurrentInstance, computed } from 'vue'
import { Skill } from '../../../types'
import SkillsDropdown from './SkillsDropdown.vue'

const props = defineProps({
  skill: {
    type: Object as PropType<Skill>,
    required: true
  },
  index: {
    type: Number,
    required: true
  },
  length: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['handleOpenSkillModal', 'handleChangeSkillOtherBonus', 'handleChangeSkillDropdown', 'handleRollSkill'])

const attrOptions = ['AGI', 'FOR', 'INT', 'PRE', 'VIG']
const trainingOptions = ['0', '5', '10', '15']
const skillColors = {
  trained: '#3d8b40',
  veteran: '#0a69b7',
  expert: '#b36b00',
}

const instance = getCurrentInstance()

const currentSkillColor = computed(() => {
  if(props.skill.trainingDegree === '5') return skillColors.trained
  if(props.skill.trainingDegree === '10') return skillColors.veteran
  if(props.skill.trainingDegree === '15') return skillColors.expert
  return '#fff'
})

const handleOpenSkill = () => {
  emit('handleOpenSkillModal', props.skill)
}

const handleChangeSkillDropdown = (value: string, skillName: string, key: string) => {
  emit('handleChangeSkillDropdown', {value, skillName, key})
}

const handleChangeSkillOtherBonus = (e: Event, skillName: string) => {
  const value = (e.target as HTMLInputElement).valueAsNumber
  emit('handleChangeSkillOtherBonus', {value, skillName})
  instance?.proxy?.$forceUpdate()
}
</script>

<template>
  <td class="small">
    <button 
      class="roll-button"
      @click="$emit('handleRollSkill', skill)"
    >
      <img src="../../../assets/d20-icon.png" alt="rolar">
    </button>
  </td>
  <td>
    <button 
      class="naked-button left"
      @click="handleOpenSkill"
    >
      {{ skill.name }}<span v-if="skill.onlyTrained">*</span><span v-if="skill.loadPenalty">+</span>
    </button>
  </td>
  <td v-if="index > (length - 7)">
    <SkillsDropdown 
      :value="skill.attribute" 
      :options="attrOptions"
      :color="currentSkillColor"
      up
      @update-value="(value: string) => handleChangeSkillDropdown(value, skill.name, 'attribute')"
    />
  </td>
  <td v-else>
    <SkillsDropdown 
      :value="skill.attribute" 
      :options="attrOptions"
      :color="currentSkillColor"
      @update-value="(value: string) => handleChangeSkillDropdown(value, skill.name, 'attribute')"
    />
  </td>
  <td>
    <h3 class="skill-bonus">
      <span>( </span>{{ skill.bonus }}<span> )</span>
    </h3>
  </td>
  <td v-if="index > (length - 7)">
    <SkillsDropdown 
      :value="skill.trainingDegree" 
      :options="trainingOptions"
      :color="currentSkillColor"
      underline
      up
      @update-value="(value: string) => handleChangeSkillDropdown(value, skill.name, 'trainingDegree')"
    />
  </td>
  <td v-else>
    <SkillsDropdown 
      :value="skill.trainingDegree" 
      :options="trainingOptions"
      :color="currentSkillColor"
      underline
      @update-value="(value: string) => handleChangeSkillDropdown(value, skill.name, 'trainingDegree')"
    />
  </td>
  <td>
    <div class="input-container">
      <input 
        type="number" 
        class="underline-input" 
        :value="skill.otherBonus"
        @blur="e => handleChangeSkillOtherBonus(e, skill.name)"
      >
    </div>
  </td>
</template>

<style scoped>
.roll-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin: 0;
}
.roll-button img {
  width: 1rem;
  height: 1rem;
}
td {
  width: 3.25rem;
  text-align: center;
}
td span {
  font-size: 14px;
  color: v-bind(currentSkillColor);
}
.input-container {
  display: flex;
  justify-content: center;
  width: 100%;
}
.naked-button {
  background-color: transparent;
  border: none;
  color: v-bind(currentSkillColor);
  padding: 0;
  font-size: 14px;
  cursor: pointer;
  text-align: left;
}
.naked-button:hover {
  color: var(--color-primary);
}
.naked-button:hover span {
  color: var(--color-primary);
  font-size: 14px;
}
.skill-bonus {
  font-size: 14px;
  margin: 0;
  font-weight: normal;
  color: v-bind(currentSkillColor);
}
.underline-input {
  background-color: transparent;
  border: none;
  border-bottom: 1px solid v-bind(currentSkillColor);
  color: v-bind(currentSkillColor);
  padding: 0;
  font-size: 14px;
  width: 2.25rem;
  text-align: center;
}
.left {
  width: 6.25rem;
  text-align: left;
}
.small {
  width: 1rem;
}
</style>