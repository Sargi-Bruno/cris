<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth } from 'firebase/auth'
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore'
import _ from 'lodash'
import StepperView from '../../components/StepperView.vue'
import ChooseAttributes from './ChooseAttributes/ChooseAttributes.vue'
import ChooseBackground from './ChooseBackground/ChooseBackground.vue'
import ChooseClass from './ChooseClass/ChooseClass.vue'
import ChooseDescription from './ChooseDescription/ChooseDescription.vue'
import ToastNotification from '../../components/ToastNotification.vue'
import LoadingView from '../../components/LoadingView.vue'
import { Character, Background, Class, AttrKeys, Timestamp, ToastInfo } from '../../types'
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

const auth = getAuth()
const firestore = getFirestore()
const router = useRouter()
const currentStep = ref(0)
const character= ref<Character>(_.cloneDeep(characterDefaultValue))
const chosenBackground = ref<Background | null>(null)
const chosenClass = ref<Class | null>(null)
const loading = ref(false)

const toastInfo = ref<ToastInfo>({
  message: '',
  type: 'error',
  alive: false,
  timeout: 0
})

const handleNavigation = (value: number) => currentStep.value = value

const handleChangeAttribute = (payload: { value: number, attribute: AttrKeys}) => {
  changeAttribute(character.value, payload)
}

const handleAddBackground = (background: Background) => {
  chosenBackground.value = background
  currentStep.value = 2
}

const handleRemoveBackground = () => {
  chosenBackground.value = null
}

const handleAddClass = (charClass: Class) => {
  chosenClass.value = charClass
  currentStep.value = 3
}

const handleRemoveClass = () => {
  chosenClass.value = null
}

const handleChangeChar = (payload: {e: Event, key: 'name' | 'player'}) => {
  const value = (payload.e.target as HTMLInputElement).value
  character.value[payload.key] = value.trim()
}

const handleUpdateDescription = (payload: { value: string, key:  'physical' | 'personal' | 'history' | 'goal'}) => {
  updateDescription(character.value, payload)
}

const handleFinishCreation =  async () => {
  if(!auth.currentUser) return

  if(chosenBackground.value === null) {
    toastInfo.value.message = 'Escolha uma origem'
    toastInfo.value.alive = true
    return
  }
  if(chosenClass.value === null) {
    toastInfo.value.message = 'Escolha uma classe'
    toastInfo.value.alive = true
    return
  }

  loading.value = true
  addClass(character.value, chosenClass.value)
  addBackground(character.value, chosenBackground.value)
  character.value.uid = auth.currentUser.uid
  character.value.timestamp = (serverTimestamp() as unknown) as Timestamp

  const data = await addDoc(collection(firestore, 'characters'), character.value)
  
  router.push({ name: 'character-sheet', params: { id: data.id } })
}

onMounted(() => {
  if(!auth.currentUser) router.push({ name: 'home' })
})

watch(() => toastInfo.value.alive, () => {
  if(toastInfo.value.alive === true) {
    toastInfo.value.timeout = window.setTimeout(() => toastInfo.value.alive = false, 3000)
  }
})

const dismissToastInfo = () => {
  toastInfo.value.alive = false
  clearTimeout(toastInfo.value.timeout)
}
</script>

<template>
  <div v-if="!loading">
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
        :loading="loading"
        @handle-change-attribute="handleChangeAttribute"
        @handle-add-background="handleAddBackground"
        @handle-remove-background="handleRemoveBackground"
        @handle-add-class="handleAddClass"
        @handle-remove-class="handleRemoveClass"
        @handle-change-char="handleChangeChar"
        @handle-update-description="handleUpdateDescription"
        @handle-finish-creation="handleFinishCreation"
      />
    </KeepAlive>
  </div>
  <div v-else>
    <LoadingView />
  </div>
  <transition name="toast">
    <ToastNotification
      v-if="toastInfo.alive"
      :toast="toastInfo"
      :type="toastInfo.type"
      @dismiss="dismissToastInfo"
    />
  </transition>
</template>