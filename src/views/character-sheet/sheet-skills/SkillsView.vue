<script setup lang="ts">
import { Character } from '../../../types'

defineProps<{character: Character}>()
</script>

<template>
  <div class="skills-container">
    <h1 class="skills-title">
      PERÍCIAS
    </h1>
    <table class="skills-table">
      <thead>
        <tr>
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
        <tr v-for="skill in character.skills" :key="skill.name">
          <td>
            <button class="naked-button left">
              {{ skill.name }}<span v-if="skill.onlyTrained">*</span><span v-if="skill.loadPenalty">+</span>
            </button>
          </td>
          <td>
            <span>( </span>
            <button class="naked-button gray">
              {{ skill.attribute }}
            </button>
            <span> )</span>
          </td>
          <td>
            <span>( </span>
            <button class="naked-button">
              + 10
            </button>
            <span> )</span>
          </td>
          <td>
            <button class="underline-button">
              {{ skill.trainingDegree }}
            </button>
          </td>
          <td>
            <input type="number" class="underline-input" value="0">
          </td>
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
  text-align: center;
}
.skills-table td span {
  color: var(--color-white);
}
.left {
  width: 6.25rem;
  text-align: left;
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
.naked-button:hover span {
  color: var(--color-primary);
}
.underline-button {
  background-color: transparent;
  border: none;
  border-bottom: 1px solid var(--color-white);
  color: var(--color-white);
  padding: 0;
  font-size: 14px;
  cursor: pointer;
  width: 2rem;
}
.underline-button:hover {
  color: var(--color-primary);
}
.underline-input {
  background-color: transparent;
  border: none;
  border-bottom: 1px solid var(--color-white);
  color: var(--color-white);
  padding: 0;
  font-size: 14px;
  width: 2rem;
  text-align: center;
}
.gray {
  color: var(--color-off-white);
}
.table-caption {
  margin: 0;
  margin-top: .25rem;
  font-weight: normal;
  font-size: 10px;
}
</style>