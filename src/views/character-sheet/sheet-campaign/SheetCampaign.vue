<script setup lang="ts">
import { Campaign, CampaignLog } from '../../../types'

const props = defineProps<{campaign: Campaign, campaignLog: CampaignLog}>()

defineEmits(['handleOpenCampaignLog'])

const baseURL = import.meta.env.VITE_BASE_URL
const campaignURL = baseURL + 'campanha/' + props.campaign.id
</script>

<template>
  <div class="campaign-log-container">
    <button 
      class="campaign-log-button"
      @click="$emit('handleOpenCampaignLog')"
    >
      <img src="../../../assets/chat-icon.png" alt="log">
    </button>
    <a class="campaign-nav-link" :href="campaignURL" target="_blank">
      <div class="campaign-label">
        Campanha:
      </div>
      <div class="campaign-title">
        {{ campaign?.name }}
      </div>
    </a>
  </div>
</template>

<style scoped>
.campaign-log-container {
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
  margin-left: 1rem;
}
.campaign-log-button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.5rem;
  width: 2.5rem;
  background-color: transparent;
  border: 1px solid var(--color-white);
  cursor: pointer;
}
.campaign-log-button:hover {
  border: 1px solid var(--color-primary);
}
.campaign-nav-link {
  display: flex;
  align-items: center;
  height: 2.5rem;
  gap: .25rem;
  color: var(--color-white);
  background-color: transparent;
  border: none;
  font-size: 14px;
  cursor: pointer;
  text-decoration: none;
}
.campaign-nav-link:hover {
  color: var(--color-primary);
}
.campaign-label {
  color: var(--color-off-white);
}
.campaign-title {
  width: 220px;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>