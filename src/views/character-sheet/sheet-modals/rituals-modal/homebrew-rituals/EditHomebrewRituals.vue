<script setup lang="ts">
import { ref } from 'vue'
import { getAuth } from 'firebase/auth'
import { getFirestore, updateDoc, doc } from 'firebase/firestore'
import { Ritual } from '../../../../../types'
import RitualsForm from '../../../../../components/RitualsForm.vue'
import LoadingView from '../../../../../components/LoadingView.vue'

defineProps<{ritual: Ritual}>()

const emit = defineEmits(['handleClose', 'handleEditRitualSheet'])

const auth = getAuth()
const firestore = getFirestore()
const loading = ref(false)

interface Payload {
  ritual: Ritual
  sheet: boolean
}

const handleEditRitual = async (payload: Payload) => {
  if(!auth.currentUser) return

  loading.value = true
  
  if(payload.sheet) {
    emit('handleEditRitualSheet', payload.ritual)
    return
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await updateDoc(doc(firestore, 'homebrewRituals', payload.ritual.id as string), payload.ritual as any)

  loading.value = false

  emit('handleClose')
}
</script>

<template>
  <div v-if="!loading">
    <RitualsForm
      :ritual="ritual"
      edit
      @handle-edit-ritual="handleEditRitual"
      @handle-close="$emit('handleClose')"
    />
  </div>
  <div v-else>
    <LoadingView />
  </div>
</template>