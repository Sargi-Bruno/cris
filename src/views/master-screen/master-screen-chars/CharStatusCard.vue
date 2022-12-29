<script setup lang="ts">
import { computed } from 'vue'
import { Character } from '../../../types'
import InfoBar from '../../character-sheet/sheet-stats/InfoBar.vue'

interface Props {
  character: Character
}

const props = defineProps<Props>()

const baseURL = import.meta.env.VITE_BASE_URL
const sheetURL = baseURL + 'agente/' + props.character.id

const movementInSquares = computed(() => {
  if(props.character.movement === 0) return 0
  return props.character.movement/1.5
})

const defense = computed(() => {
  const result = 10 + props.character.attributes.dex + props.character.protectionDefense + props.character.bonusDefense

  if(result > 0) return result
  else return 0
})

const block = computed(() => {
  return props.character.skills[9].bonus
})

const evade = computed(() => {
  return props.character.skills[22].bonus + defense.value
})
</script>

<template>
  <div class="char-status-card-container">
    <div class="header">
      <div
        v-if="character.sheetPictureURL"
      >
        <img
          class="card-img"
          :src="character.sheetPictureURL"
          alt="foto agente"
        >
      </div>
      <div>
        <div 
          v-if="character.name !== ''"
          class="agent-name"
        >
          {{ character.name }}
        </div>
        <div 
          v-else
          class="agent-name"
        >
          [Sem nome]
        </div>
        <div class="basic-info">
          {{ character.className }}
        </div>
        <div class="basic-info">
          {{ character.backgroundName }}
        </div>
        <div class="basic-combat-info">
          NEX: <span>{{ character.nex }}</span>
        </div>
      </div>
    </div>
    <div class="attributes-container">
      <div class="combat-info">
        <div>AGI</div>
        <div class="combat-info-value">
          {{ character.attributes.dex }}
        </div>
      </div>
      <div class="combat-info">
        <div>FOR</div>
        <div class="combat-info-value">
          {{ character.attributes.str }}
        </div>
      </div>
      <div class="combat-info">
        <div>INT</div>
        <div class="combat-info-value">
          {{ character.attributes.int }}
        </div>
      </div>
      <div class="combat-info">
        <div>PRE</div>
        <div class="combat-info-value">
          {{ character.attributes.pre }}
        </div>
      </div>
      <div class="combat-info">
        <div>VIG</div>
        <div class="combat-info-value">
          {{ character.attributes.con }}
        </div>
      </div>
    </div>
    <div class="bars-container">
      <InfoBar 
        type="pv"
        disabled-sheet
        master-screen
        :max-value="character.maxPv"
        :current-value="character.currentPv"
        :marks="character.deathMarks"
        :mark-mode="character.deathMode"
      />
      <InfoBar 
        type="san"
        disabled-sheet
        master-screen
        :max-value="character.maxSan"
        :current-value="character.currentSan"
        :marks="character.madnessMarks"
        :mark-mode="character.madnessMode"
      />
      <InfoBar 
        type="pe"
        disabled-sheet
        master-screen
        :max-value="character.maxPe"
        :current-value="character.currentPe"
      />
    </div>
    <div class="combat-info-container-first">
      <div class="combat-info-row">
        <div>PE/RODADA: </div>
        <span class="combat-info-value">
          {{ character.peTurn }}
        </span>
      </div>
      <div class="combat-info-row">
        <div>DESL: </div>
        <span class="combat-info-value">
          {{ character.movement }}m / {{ movementInSquares }}q
        </span>
      </div>
    </div>
    <div class="combat-info-container">
      <div class="combat-info">
        <div>DEFESA</div>
        <div class="combat-info-value">
          {{ defense }}
        </div>
      </div>
      <div class="combat-info">
        <div>BLOQUEIO</div>
        <div class="combat-info-value">
          {{ block }}
        </div>
      </div>
      <div class="combat-info">
        <div>ESQUIVA</div>
        <div class="combat-info-value">
          {{ evade }}
        </div>
      </div>
    </div>
    <div class="footer">
      <a 
        class="sheet-link"
        :href="sheetURL" 
        target="_blank"
      >
        Ficha
      </a>
    </div>
  </div>
</template>

<style scoped>
.char-status-card-container {
  width: 16.75rem;
  height: 25.941rem; 
  box-shadow: 0 5px 10px rgb(0 0 0 / 12%);
  border-radius: 4px;
  background-color: var(--color-dark-gray);
  padding: 1rem;
}
.header {
  display: flex;
  gap: 1rem;
}
.card-img {
  width: 5rem;
  height: 5rem;
  border: 1px solid var(--color-off-white);
}
.agent-name {
  width: 142px;
  font-size: 16px;
  color: var(--color-white);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.basic-info {
  width: 142px;
  font-size: 12px;
  color: var(--color-off-white);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.basic-combat-info {
  font-size: 12px;
  color: var(--color-off-white);
}
.basic-combat-info span {
  font-size: 12px;
  color: var(--color-white);
}
.attributes-container {
  display: flex;
  justify-content: space-between;
  margin-top: .25rem;
}
.combat-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--color-off-white);
  font-size: 14px;
}
.combat-info-row {
  margin-top: .5rem;
  display: flex;
  align-items: center;
  gap: .5rem;
  color: var(--color-off-white);
  font-size: 14px;
}
.combat-info-value {
  color: var(--color-white);
}
.bars-container {
  margin-top: .25rem;
  display: flex;
  flex-direction: column;
  gap: .25rem;
}
.combat-info-container-first {
  margin-top: .25rem;
  display: flex;
  justify-content: space-between;
}
.combat-info-container {
  margin-top: .5rem;
  display: flex;
  gap: 2rem;
}
.footer {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding-top: 1rem;
}
.sheet-link {
  color: var(--color-off-white);
  text-decoration: none;
  font-size: 12px;
}
.sheet-link:hover {
  color: var(--color-primary);
}
</style>