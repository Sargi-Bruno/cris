<script setup lang="ts">
import { ref } from 'vue'
import StepperView from '../../components/StepperView.vue'
import ChooseAttributes from './ChooseAttributes/ChooseAttributes.vue'
import ChooseBackground from './ChooseBackground/ChooseBackground.vue'
import ChooseClass from './ChooseClass/ChooseClass.vue'
import ChooseDescription from './ChooseDescription/ChooseDescription.vue'
import { Character, Background, Class } from '../../types'
import { 
  characterDefaultValue,
  changeAttribute,
  addBackground,
  removeBackground,
  addClass,
  removeClass,
  updateDescription
} from './characterCreationUtils'

const componentOptions = [
  ChooseAttributes,
  ChooseBackground,
  ChooseClass,
  ChooseDescription
]

const stepperOptions = [
  { label: 'Atributos', value: 0 },
  { label: 'Origem', value: 1 },
  { label: 'Classe', value: 2 },
  { label: 'Toques Finais', value: 3 }
]

const currentStep = ref(0)
const character= ref<Character>(characterDefaultValue)

const handleNavigation = (value: number) => currentStep.value = value

const handleChangeAttribute = (payload: { value: number, attribute: 'str' | 'dex' | 'int' | 'con' | 'pre' }) => {
  changeAttribute(character.value, payload)
}

const handleAddBackground = (background: Background) => {
  addBackground(character.value, background)
}

const handleRemoveBackground = (background: Background) => {
  removeBackground(character.value, background)
}

const handleAddClass = (charClass: Class) => {
  addClass(character.value, charClass)
}

const handleRemoveClass = (charClass: Class) => {
  removeClass(character.value, charClass)
}

const handleUpdateDescription = (payload: { value: string, key:  'physical' | 'personal' | 'history' | 'goal'}) => {
  updateDescription(character.value, payload)
}
</script>

<template>
  <StepperView
    :current-step="currentStep"
    :stepper-options="stepperOptions"
    @handle-navigation="handleNavigation"
  />
  <KeepAlive>
    <component
      :is="componentOptions[currentStep]"
      :character="character"
      @handle-change-attribute="handleChangeAttribute"
      @handle-add-background="handleAddBackground"
      @handle-remove-background="handleRemoveBackground"
      @handle-add-class="handleAddClass"
      @handle-remove-class="handleRemoveClass"
      @handle-update-description="handleUpdateDescription"
    />
  </KeepAlive>
</template>