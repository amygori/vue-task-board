<script setup lang="ts">
import type { Task, ID } from '@/types'
import { emit } from 'process';
// macros
const props = defineProps<{
  task: Task
}>()
const emit = defineEmits<{
  // delete: (id: string) => void
  (e: 'delete', payload: ID): void
}>()
const focused = ref(false)
onKeyStroke('Backspace', e => {
  if (focused.value) emit('delete', props.task.id)
})
</script>

<template>
  <div
    :title="new Date(task.createdAt).toLocaleDateString()"
    class="task bg-white p-2 mb-2 rounded shadow-sm max-w-[250px] flex items-center gap-2"
    @focus="focused = true"
    @blur="focused = false"
    tabindex="0"
  >
    <!-- tabindex is needed so that the browser will allow the div to be focusable  -->
    <DragHandle />
    <span> {{ task.title }}</span>
  </div>
</template>

<style>
/* .sortable-chosen {
  background-color: greenyellow
} */

.sortable-drag .task {
  transform: rotate(5deg);
}

.sortable-ghost .task {
  position: relative;
}

.sortable-ghost .task::after {
  content: '';
  @apply absolute top-0 bottom-0 left-0 right-0 w-full h-full bg-slate-300 rounded;
}

.task:focus,
.task:focus-visible {
  @apply outline-gray-300 !important;
  outline: silver auto 1px;
}
</style>
