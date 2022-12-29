<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getAuth } from 'firebase/auth'
import { getFirestore, getDoc, doc, onSnapshot, query, collection, where, updateDoc } from 'firebase/firestore'
import { Campaign, Character, CampaignLog, ToastInfo, ToastRoll, CampaignLogMessage } from '../../types'
import LoadingView from '../../components/LoadingView.vue'
import CampaignLogView from '../../components/CampaignLog.vue'
import TabNav from '../../components/TabNav.vue'
import MasterScreenChars from './master-screen-chars/MasterScreenChars.vue'
import MasterDices from './master-dices/MasterDices.vue'
import { useSound } from '@vueuse/sound'
import diceSound from '../../assets/dice-roll.mp3'
import ToastNotification from '../../components/ToastNotification.vue'
import { formatRollNotation, formatRollResult, rollDices } from '../character-sheet/characterSheetUtils'

const { play } = useSound(diceSound)

const tabOptionsDefault = [
  { label: 'AGENTES', value: 0 },
]

const tabOptionsDM = [
  { label: 'AGENTES', value: 0 },
  { label: 'DADOS DO MESTRE', value: 1 },
]

const auth = getAuth()
const firestore = getFirestore()
const router = useRouter()
const route = useRoute()
const campaignId = route.params.id as string
const loading = ref(true)
const tabOptions = ref(tabOptionsDefault)
const currentTab = ref(0)
const campaign = ref<Campaign>()
const characters = ref<Character[]>([])
const campaignLog = ref<CampaignLog>()
const toastInfo = ref<ToastInfo>({
  message: '',
  type: 'info',
  alive: false,
  timeout: 0
})

onMounted(async () => {
  if(!auth.currentUser) return

  const querySnapshot = await getDoc(doc(firestore, 'campaigns', campaignId))

  if(!querySnapshot.data()) router.push({ name: 'not-found' })

  campaign.value = querySnapshot.data() as Campaign
  campaign.value.id = querySnapshot.id

  if(!campaign.value.usersId.includes(auth.currentUser?.uid)) router.push({ name: 'not-found' })

  const campaignLogQuerySnapshot = await getDoc(doc(firestore, 'campaignLogs', campaign.value.campaignLogId))

  campaignLog.value = campaignLogQuerySnapshot.data() as CampaignLog
  campaignLog.value.id = campaignLogQuerySnapshot.id

  // Check if current user is the DM
  if(auth.currentUser.uid === campaign.value.uid) tabOptions.value = tabOptionsDM

  const campaignLogId = campaignLog.value?.id || ''

  onSnapshot(doc(firestore, 'campaignLogs', campaignLogId), (doc) => {
    if(!campaignLog.value) return
    if(!doc.data()) return

    campaignLog.value.campaignLogMessages = (doc.data() as CampaignLog).campaignLogMessages
  })

  const charsCollection = collection(firestore, 'characters')
  const charsRef = query(charsCollection, where('campaignId', '==', campaign.value.id))

  onSnapshot(charsRef, (docs) => {
    const docsData: Character[] = []

    docs.forEach((doc) => {
      const char: Character = doc.data() as Character
      char.id = doc.id

      docsData.push(char)
    })

    characters.value = docsData
  })

  loading.value = false
})

const handleNavigation = (value: number) => currentTab.value = value

const handleRollMasterDices = (value: string) => {
  const toastRoll: ToastRoll = {
    title: '',
    total: 0,
    output: '',
    notation: '',
    alive: false
  }

  try {
    const title = 'Resultado'
    const roll = rollDices(value)
    const total = roll.total
    const output = formatRollResult(roll.output)
    const notation = formatRollNotation(roll.output)

    toastRoll.title = title
    toastRoll.total = total
    toastRoll.output = output
    toastRoll.notation = notation

    if(!campaign.value) return
    if(!campaignLog.value) return

    const newLog: CampaignLogMessage = {
      sender: 'DM',
      timestamp: new Date().getTime(),
      content: toastRoll,
      contentType: 'roll'
    }

    campaignLog.value.campaignLogMessages.push(newLog)

    if(campaignLog.value.campaignLogMessages.length > 100) campaignLog.value.campaignLogMessages.pop()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateDoc(doc(firestore, 'campaignLogs', campaignLog.value.id as string), campaignLog.value as any)

    play()

  } catch(error) {
    toastInfo.value.message = 'Valor incorreto nos dados'
    toastInfo.value.type = 'error'
    toastInfo.value.alive = true
  }
}

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
  <div 
    v-if="!loading"
    class="screen-master-container"
  >
    <div class="page-title" @click="$router.push({ name: 'campaign-page', params: { id: campaign?.id }})">
      {{ campaign?.name }}
    </div>
    <div class="screen-master-content">
      <div class="small-screen-log-container">
        <CampaignLogView
          v-if="campaignLog"
          master-screen
          :campaign-log="campaignLog"
        />
      </div>
      <div class="scree-master-tabs-container">
        <div class="tab-nav-container">
          <TabNav
            :tab-options="tabOptions"
            :current-tab="currentTab"
            @handle-navigation="handleNavigation"
          />
        </div>
        <div class="tab-content">
          <KeepAlive>
            <MasterScreenChars
              v-if="currentTab === 0"
              :characters="characters"
            />
          </KeepAlive>
          <KeepAlive>
            <MasterDices
              v-if="currentTab === 1"
              @handle-roll-master-dices="handleRollMasterDices"
            />
          </KeepAlive>
        </div>
      </div>
    </div>
    <transition name="toast">
      <ToastNotification
        v-if="toastInfo.alive"
        :toast="toastInfo"
        :type="toastInfo.type"
        @dismiss="dismissToastInfo"
      />
    </transition>
  </div>
  <div v-else>
    <LoadingView />
  </div>
</template>

<style scoped>
.screen-master-container {
  margin-top: 2rem;
  margin-bottom: 1rem;
  padding-left: 2rem;
  padding-right: 2rem;
}
@media only screen and (max-width: 1280px) {
  .small-screen-log-container {
    position: relative;
  }
}
.page-title {
  color: var(--color-white);
  font-size: 24px;
  margin-bottom: 0.5rem;
  cursor: pointer;
}
.page-title:hover {
  color: var(--color-primary);
}
.screen-master-content {
  display: flex;
  gap: 4rem;
  /* overflow-x: hidden; */
}
.tab-nav-container {
  margin-bottom: 1.5rem;
}
</style>