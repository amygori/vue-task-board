<script setup lang="ts">
import type { Task } from '@/types'
import { create } from 'domain';
import { nanoid } from 'nanoid'

const emit = defineEmits<{
  // addTask: (task: Task) => void
  (e: 'add', payload: Task): void
}>()

const focused = ref(false)
const title = ref('')

function createTask(e: Event) {
  if (title.value.trim()) {
    e.preventDefault()
    emit('add', {
      title: title.value.trim(),
      createdAt: new Date(),
      id: nanoid(),
    } as Task);
  }
  title.value = ''
}
</script>

<template>
  <div>
    <textarea 
      v-model="title"
      @keydown.tab="createTask"
      @keydown.enter="createTask"
      class="focus:bg-white focus:shadow resize-none w-full p-2 rounded shadow-sm"
      :class="{ 'h-7': !focused, 'h-20': focused, 'bg-gray-200': !focused }"
      style="outline: none !important;"
      @focus="focused = true"
      @blur="focused = false"
      :placeholder="!focused ? '+ Add a Card' : 'Enter a title for this card.'"
    ></textarea>
  </div>
</template>
