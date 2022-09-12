<script setup lang="ts">
import { PropType } from 'vue'
import { Class } from '../../../types'

defineProps({
  charClass: {
    type: Object as PropType<Class>,
    required: true
  }
})

const labels = ['5%', '10%', '15%', '20%', '25%', '30%', '35%', '40%', '45%', '50%', '55%', '60%', '65%', '70%', '75%', '80%', '85%', '90%', '95%', '99%']
</script>

<template>
  <div class="table-content">
    <table class="table">
      <thead>
        <tr>
          <th class="center">
            NEX
          </th>
          <th class="left">
            Habilidades
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(nex, index) in labels" :key="nex">
          <td class="center">
            {{ nex }}
          </td>
          <td class="left">
            {{ charClass.table[index] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-content {
  margin-top: 1rem;
  background-color: var(--color-smoky-black);
  border-radius: 4px;
  padding: .5rem .5rem 1rem .5rem;
}
.center {
  text-align: center;
}
.left {
  text-align: left;
}
.table {
  width: 100%;
  border-collapse: collapse;
}
.table th, td {
  min-width: 6rem;
  height: 2.25rem;
}
.table th {
  color: var(--color-primary);
}
.table td {
  color: var(--color-white);
}
.table tr:nth-child(even) {
  background-color: var(--color-dark-gray);
}
</style>