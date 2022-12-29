<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { campaignDefault } from '../../../utils/default'
import { Campaign } from '../../../types'
import { validadeCampaignForm } from '../../../utils/forms'
import { getAuth } from 'firebase/auth'
import LoadingView from '../../../components/LoadingView.vue'
import { getFirestore, getDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { useRouter, useRoute } from 'vue-router'

const auth = getAuth()
const firestore = getFirestore()
const router = useRouter()
const route = useRoute()
const campaignId = route.params.id as string
const campaign = ref<Campaign>(campaignDefault)
const loading = ref(true)
const showModal = ref(false)
const modalRemoveInput = ref('')

const disabled = computed(() => {
  if(campaign.value.name === '') return true

  return false
})

onMounted(async () => {
  const querySnapshot = await getDoc(doc(firestore, 'campaigns', campaignId))

  if(!querySnapshot.data()) router.push({ name: 'not-found' })

  campaign.value = querySnapshot.data() as Campaign
  campaign.value.id = querySnapshot.id

  loading.value = false
})

const handleEdit = async () => {
  if(!auth.currentUser) return
  if(disabled.value) return

  loading.value = true
  validadeCampaignForm(campaign.value)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await updateDoc(doc(firestore, 'campaigns', campaign.value.id as string), campaign.value as any)

  loading.value = false
  
  router.push({ name: 'campaign-page', params: { id: campaign.value.id } })
}

const canRemove = computed(() => {
  return modalRemoveInput.value.toLocaleLowerCase().trim() === 'remover'
})

const handleOpenModal = () => {
  showModal.value = true
}

const handleCloseModal = () => {
  showModal.value = false
  modalRemoveInput.value = ''
}

const handleRemoveCampaign = () => {
  if(!campaign.value) return

  for(const charId of campaign.value.charactersId) {
    updateDoc(doc(firestore, 'characters', charId), { campaignId: '' })
  }

  deleteDoc(doc(firestore, 'campaignLogs', campaign.value.campaignLogId as string))
  deleteDoc(doc(firestore, 'campaigns', campaign.value.id as string))

  router.push({ name: 'campaigns-list' })
}
</script>

<template>
  <div 
    v-if="!loading"
    class="page-container"
  >
    <div class="page-title">
      Editar Campanha
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
          class="button-remove"
          @click="handleOpenModal"
        >
          Deletar
        </button>
        <div class="second-buttons-container">
          <button 
            class="button-cancel"
            @click="$router.push({ name: 'campaign-page', params: { id: campaign.id } })"
          >
            Cancelar
          </button>
          <button
            class="button-primary big"
            :disabled="disabled"
            @click="handleEdit"
          >
            Editar
          </button>
        </div>
      </div>
    </div>
    <div>
      <vue-final-modal 
        v-model="showModal"
        classes="modal-container"
      >
        <div class="modal-content modal-width">
          <div class="modal-header">
            <h2>Deletar campanha?</h2>
            <button @click="handleCloseModal">
              <img
                class="close-icon"
                src="../../../assets/close-icon.svg" 
                alt="fechar"
              >
            </button>
          </div>
          <div class="modal-body">
            <h3>Para confirmar essa operação, digite <b>REMOVER</b> no campo abaixo:</h3>
            <h4>Atenção: essa operação é permanente e irreversível!</h4>
            <div class="input-container-modal">
              <input 
                v-model="modalRemoveInput"
                type="text"
                class="input-primary"
                @keyup.enter="handleRemoveCampaign"
              />
              <button
                class="button-remove"
                :disabled="!canRemove"
                @click="handleRemoveCampaign"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      </vue-final-modal>
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
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding-left: .25rem;
  padding-right: .25rem;
}
.second-buttons-container {
  display: flex;
  gap: 2.5rem;
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
.modal-width {
  width: 40rem;
}
:deep(.modal-container) {
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-body h3 {
  margin: 0;
  font-weight: normal;
  font-size: 16px;
}
.modal-body h4 {
  margin: 0;
  font-size: 12px;
  color: var(--color-red);
  font-weight: normal;
}
.input-container-modal {
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
}
.input-container-modal input {
  background-color: var(--color-smoky-black);
  width: 100%;
}
</style>