<script setup lang="ts">
import { computed, ref } from 'vue'
import { campaignDefault } from '../../../utils/default'
import { Campaign, CampaignLog, Timestamp } from '../../../types'
import { validadeCampaignForm } from '../../../utils/forms'
import { getAuth } from 'firebase/auth'
import LoadingView from '../../../components/LoadingView.vue'
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { useRouter } from 'vue-router'

const auth = getAuth()
const firestore = getFirestore()
const router = useRouter()
const campaign = ref<Campaign>(campaignDefault)
const loading = ref(false)

const disabled = computed(() => {
  if(campaign.value.name === '') return true

  return false
})

const handleCreate = async () => {
  if(!auth.currentUser) return
  if(disabled.value) return

  loading.value = true

  const campaignLogValue: CampaignLog = {
    uid: auth.currentUser.uid,
    campaignLogMessages: [],
  }

  const campaignLog = await addDoc(collection(firestore, 'campaignLogs'), campaignLogValue)

  validadeCampaignForm(campaign.value)
  campaign.value.campaignLogId = campaignLog.id
  campaign.value.uid = auth.currentUser.uid
  campaign.value.dmName = auth.currentUser.displayName || ''
  campaign.value.usersId.push(auth.currentUser.uid)
  campaign.value.joinId = crypto.randomUUID().substring(0, 13)
  campaign.value.timestamp = (serverTimestamp() as unknown) as Timestamp

  const data = await addDoc(collection(firestore, 'campaigns'), campaign.value)

  campaign.value.name = ''
  campaign.value.description = ''
  loading.value = false
  
  router.push({ name: 'campaign-page', params: { id: data.id } })
}
</script>

<template>
  <div 
    v-if="!loading"
    class="page-container"
  >
    <div class="page-title">
      Criar Campanha
    </div>
    <div class="form-container">
      <div class="input-container">
        <div class="label">
          Nome*
        </div>
        <input 
          v-model="campaign.name"
          type="text" 
          class="input-primary dark big-input"
        >
      </div>
      <div class="label">
        Descrição
      </div>
      <p-editor v-model="campaign.description" editor-style="height: 12rem">
        <template #toolbar>
          <span class="ql-formats">
            <button class="ql-bold"></button>
            <button class="ql-italic"></button>
            <button class="ql-underline"></button>
          </span>
        </template>
      </p-editor>
      <div class="buttons-container">
        <button 
          class="button-cancel"
          @click="$router.push({ name: 'campaigns-list' })"
        >
          Cancelar
        </button>
        <div>
          <button
            class="button-primary big"
            :disabled="disabled"
            @click="handleCreate"
          >
            Criar
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <LoadingView />
  </div>
</template>

<style scoped>
.page-container {
  margin-left: 2.5rem;
  margin-right: 2.5rem;
}
.page-title {
  color: var(--color-white);
  font-size: 32px;
  margin-top: 2.5rem;
  margin-bottom: 1.5rem;
}
.form-container {
  padding: 1.5rem;
  background-color: var(--color-light-black);
  border-radius: 4px;
}
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
.big-input {
  width: 20rem;
}
.label span {
  font-size: 12px;
}
</style>