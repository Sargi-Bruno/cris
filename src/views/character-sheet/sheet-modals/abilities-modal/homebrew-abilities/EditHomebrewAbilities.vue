<script setup lang="ts">
import { ref } from 'vue'
import { getAuth } from 'firebase/auth'
import { getFirestore, updateDoc, doc } from 'firebase/firestore'
import { Power } from '../../../../../types'
import AbilitiesForm from '../../../../../components/AbilitiesForm.vue'
import LoadingView from '../../../../../components/LoadingView.vue'

defineProps<{power: Power}>()

const emit = defineEmits(['handleClose', 'handleEditPowerSheet'])

const auth = getAuth()
const firestore = getFirestore()
const loading = ref(false)

interface Payload {
  power: Power
  sheet: boolean
}

const handleEditPower = async (payload: Payload) => {
  if(!auth.currentUser) return

  loading.value = true
  
  if(payload.sheet) {
    emit('handleEditPowerSheet', payload.power)
    return
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await updateDoc(doc(firestore, 'homebrewPowers', payload.power.id as string), payload.power as any)

  loading.value = false

  emit('handleClose')
}
</script>

<template>
  <div v-if="!loading">
    <AbilitiesForm
      :power="power"
      edit
      @handle-edit-power="handleEditPower"
      @handle-close="$emit('handleClose')"
    />
  </div>
  <div v-else>
    <LoadingView />
  </div>
</template>