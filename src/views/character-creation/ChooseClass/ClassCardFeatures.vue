<script setup lang="ts">
import { PropType } from 'vue'
import { Class } from '../../../types'
import DividerComp from '../../../components/DividerComp.vue'

const props = defineProps({
  charClass: {
    type: Object as PropType<Class>,
    required: true
  }
})

const renderProficiences = () => {
  let result = ''

  for(const [i, proficience] of props.charClass.proficiencies.entries()) {
    if(i === 0) {
      result += `${proficience}, `
    }
    else if((i + 1) === props.charClass.proficiencies.length - 1) {
      result += `${proficience.toLocaleLowerCase()} e `
    }
    else if((i + 1) === props.charClass.proficiencies.length) {
      result += `${proficience.toLocaleLowerCase()}.`
    }
  }

  return result
}
</script>

<template>
  <div class="features">
    <h3>CARACTERÍSTICAS</h3>
    <div class="feat-card">
      <div>
        <h4>PONTOS DE VIDA INICIAIS</h4><span class="main"> {{ charClass.initialPv }}+VIGOR</span>
      </div>
      <DividerComp no-margin />
      <div>
        <h6>A cada novo nível de exposição</h6><span class="sub"> {{ charClass.levelPv }} PV (+Vig)</span>
      </div>
    </div>
    <div class="feat-card">
      <div>
        <h4>PONTOS DE ESFORÇO INICIAIS</h4><span class="main">{{ charClass.initialPe }}+PRESENÇA</span>
      </div>
      <DividerComp no-margin />
      <div>
        <h6>A cada novo nível de exposição</h6><span class="sub">{{ charClass.levelPe }} PE (+Pre)</span>
      </div>
    </div>
    <div class="feat-card">
      <div>
        <h4>SANIDADE INICIAL</h4><span class="main">{{ charClass.initialSan }}</span>
      </div>
      <DividerComp no-margin />
      <div>
        <h6>A cada novo nível de exposição</h6><span class="sub">{{ charClass.levelSan }} SAN</span>
      </div>
    </div>
    <div class="feat-card">
      <h4>PERÍCIAS TREINADAS</h4>
      <DividerComp no-margin />
      <div v-if="charClass.trainedSkills.optionSkils.length > 0">
        <h6>
          {{ charClass.trainedSkills.optionSkils[0][0] }} ou {{ charClass.trainedSkills.optionSkils[0][1] }} (uma das duas) e {{ charClass.trainedSkills.optionSkils[1][0] }} ou {{ charClass.trainedSkills.optionSkils[1][1] }} (uma das duas), mais uma quantidade de perícias à sua escolha igual a {{ charClass.trainedSkills.quantity }} + Intelecto.
        </h6>
      </div>
      <div v-if="charClass.trainedSkills.skills.length === 0 && charClass.trainedSkills.optionSkils.length === 0">
        <h6>
          Uma quantidade de perícias à sua escolha igual a {{ charClass.trainedSkills.quantity }} + Intelecto.
        </h6>
      </div>
      <div v-if="charClass.trainedSkills.skills.length > 0">
        <h6>
          {{ charClass.trainedSkills.skills[0] }} e {{ charClass.trainedSkills.skills[1] }}, mais uma quantidade de perícias a sua escolha igual a {{ charClass.trainedSkills.quantity }} + Intelecto.
        </h6>
      </div>
    </div>
    <div class="feat-card">
      <h4>PROFICIÊNCIAS</h4>
      <DividerComp no-margin />
      <h6>{{ renderProficiences() }}</h6>
    </div>
  </div>
</template>

<style scoped>
.features {
  background-color: var(--color-smoky-black);
  border-radius: 4px;
  padding: .5rem;
} 
.features h3 {
  margin-top: 0;
  margin-bottom: .75rem;
  text-decoration: underline;
}
.feat-card div {
  display: flex;
  justify-content: space-between;
}
.feat-card h4 {
  font-size: 14px;
  font-weight: 500;
  margin: 0;
}
.feat-card h6 {
  font-size: 12px;
  margin-top: .25rem;
  font-weight: 400;
  margin-bottom: 1rem;
}
.feat-card h6:last-of-type {
  margin-bottom: .5rem;
}
.main {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-primary);
}
.sub {
  margin-top: .25rem;
  margin-bottom: 1rem;
  font-size: 12px;
  font-weight: 400;
  color: var(--color-primary);
}
</style>