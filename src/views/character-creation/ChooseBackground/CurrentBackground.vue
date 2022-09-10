<script setup lang="ts">
import { PropType } from 'vue'
import { Background } from '../../../types'

defineProps({
  background: {
    type: Object as PropType<Background>,
    required: true
  }
})
</script>

<template>
  <h1>{{ background.name }}</h1>
</template>