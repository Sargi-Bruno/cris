<script setup lang="ts">
import { ref } from 'vue'
import CharacterCreationStepper from '../../components/CharacterCreationStepper.vue'
import ChooseAttributes from './ChooseAttributes.vue'
import ChooseBackground from './ChooseBackground/ChooseBackground.vue'
import ChooseClass from './ChooseClass.vue'
import ChooseDescription from './ChooseDescription.vue'
import { Character } from '../../types'
import characterDefaultValue from './characterDefaultValue'

const componentOptions = [
  ChooseAttributes,
  ChooseBackground,
  ChooseClass,
  ChooseDescription
]

const currentStep = ref(0)
const character= ref<Character>(characterDefaultValue)

const handleNavigation = (value: number) => currentStep.value = value

const handleChangeAttribute = (payload: { value: number, attribute: 'str' | 'dex' | 'int' | 'con' | 'pre' }) => {
  if(payload.value > 3) payload.value = 3

  if(payload.value < 0) payload.value = 0

  character.value.attributes[payload.attribute] = payload.value
}
</script>

<template>
  <CharacterCreationStepper
    :current-step="currentStep"
    @handle-navigation="handleNavigation"
  />
  <KeepAlive>
    <component 
      :is="componentOptions[currentStep]"
      :character="character"
      @handle-change-attribute="handleChangeAttribute"
    />
  </KeepAlive>
</template>