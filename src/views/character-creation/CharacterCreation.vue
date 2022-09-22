<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import StepperView from '../../components/StepperView.vue'
import ChooseAttributes from './ChooseAttributes/ChooseAttributes.vue'
import ChooseBackground from './ChooseBackground/ChooseBackground.vue'
import ChooseClass from './ChooseClass/ChooseClass.vue'
import ChooseDescription from './ChooseDescription/ChooseDescription.vue'
import ToastNotification from '../../components/ToastNotification.vue'
import { Character, Background, Class, AttrKeys } from '../../types'
import { 
  characterDefaultValue,
  changeAttribute,
  addBackground,
  addClass,
  updateDescription
} from './characterCreationUtils'

const stepperOptions = [
  { label: 'Atributos', value: 0 },
  { label: 'Origem', value: 1 },
  { label: 'Classe', value: 2 },
  { label: 'Toques Finais', value: 3 }
]

const componentOptions = [
  ChooseAttributes,
  ChooseBackground,
  ChooseClass,
  ChooseDescription
]

const router = useRouter()
const currentStep = ref(0)
const character= ref<Character>(characterDefaultValue)
const chosenBackground = ref<Background | null>(null)
const chosenClass = ref<Class | null>(null)
const errorMessage = ref('')
const toastAlive = ref(false)
const toastTimeout = ref<number>()

const handleNavigation = (value: number) => currentStep.value = value

const handleChangeAttribute = (payload: { value: number, attribute: AttrKeys}) => {
  changeAttribute(character.value, payload)
}

const handleAddBackground = (background: Background) => {
  chosenBackground.value = background
}

const handleRemoveBackground = () => {
  chosenBackground.value = null
}

const handleAddClass = (charClass: Class) => {
  chosenClass.value = charClass
}

const handleRemoveClass = () => {
  chosenClass.value = null
}

const handleUpdateDescription = (payload: { value: string, key:  'physical' | 'personal' | 'history' | 'goal'}) => {
  updateDescription(character.value, payload)
}

const handleFinishCreation = () => {
  if(chosenBackground.value === null) {
    errorMessage.value = 'Escolha uma origem'
    toastAlive.value = true
    return
  }
  if(chosenClass.value === null) {
    errorMessage.value = 'Escolha uma classe'
    toastAlive.value = true
    return
  }

  addClass(character.value, chosenClass.value)
  addBackground(character.value, chosenBackground.value)

  router.push({ name: 'character-sheet' })
}

watch(toastAlive, () => {
  if(toastAlive.value === true) {
    toastTimeout.value = setTimeout(() => toastAlive.value = false, 3000)
  }
})

const dismissToast = () => {
  toastAlive.value = false
  clearTimeout(toastTimeout.value)
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
      :chosen-background="chosenBackground"
      :chosen-class="chosenClass"
      @handle-change-attribute="handleChangeAttribute"
      @handle-add-background="handleAddBackground"
      @handle-remove-background="handleRemoveBackground"
      @handle-add-class="handleAddClass"
      @handle-remove-class="handleRemoveClass"
      @handle-update-description="handleUpdateDescription"
      @handle-finish-creation="handleFinishCreation"
    />
  </KeepAlive>
  <transition name="toast">
    <ToastNotification
      v-if="toastAlive"
      :value="errorMessage"
      type="error"
      @dismiss="dismissToast"
    />
  </transition>
</template>