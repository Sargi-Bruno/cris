<script setup lang="ts">
import { ref } from 'vue'
import { getAuth } from 'firebase/auth'
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import { Ritual } from '../../../../../types'
import RitualsForm from '../../../../../components/RitualsForm.vue'
import LoadingView from '../../../../../components/LoadingView.vue'

const emit = defineEmits(['handleClose'])

const auth = getAuth()
const firestore = getFirestore()
const loading = ref(false)

const handleCreateRitual = async (ritual: Ritual) => {
  if(!auth.currentUser) return

  loading.value = true
  ritual.uid = auth.currentUser.uid

  await addDoc(collection(firestore, 'homebrewRituals'), ritual)
  loading.value = false

  emit('handleClose')
}
</script>

<template>
  <div v-if="!loading">
    <RitualsForm
      @handle-create-ritual="handleCreateRitual"
      @handle-close="$emit('handleClose')"
    />
  </div>
  <div v-else>
    <LoadingView />
  </div>
</template>