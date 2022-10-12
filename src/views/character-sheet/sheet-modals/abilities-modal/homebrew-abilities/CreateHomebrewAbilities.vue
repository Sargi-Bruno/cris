<script setup lang="ts">
import { ref } from 'vue'
import { getAuth } from 'firebase/auth'
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import { Power } from '../../../../../types'
import AbilitiesForm from '../../../../../components/AbilitiesForm.vue'
import LoadingView from '../../../../../components/LoadingView.vue'

const emit = defineEmits(['handleClose'])

const auth = getAuth()
const firestore = getFirestore()
const loading = ref(false)

const handleCreatePower = async (power: Power) => {
  if(!auth.currentUser) return

  loading.value = true
  power.uid = auth.currentUser.uid

  await addDoc(collection(firestore, 'homebrewPowers'), power)
  loading.value = false

  emit('handleClose')
}
</script>

<template>
  <div v-if="!loading">
    <AbilitiesForm
      @handle-create-power="handleCreatePower"
      @handle-close="$emit('handleClose')"
    />
  </div>
  <div v-else>
    <LoadingView />
  </div>
</template>

<style scoped>
.input-container {
  margin-bottom: .5rem;
}
.label {
  color: var(--color-white);
  font-size: 16px;
}
.dark {
  background: var(--color-smoky-black)
}
.buttons-container {
  display: flex;
  justify-content: flex-end;
  gap: 2.5rem;
  margin-top: 1rem;
}
.big {
  width: 6rem;
}
</style>