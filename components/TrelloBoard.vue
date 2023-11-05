<script setup lang="ts">
import type { Column, Task } from '@/types/Column'
import { nanoid } from 'nanoid'
import draggable from 'vuedraggable'
// https://vueuse.org/core/useLocalStorage/
const columns = useLocalStorage<Column[]>("vueTrelloBoard", [
  {
    id: nanoid(),
    title: 'Backlog',
    tasks: [
      {
        id: nanoid(),
        title: 'Task 1',
        createdAt: new Date(),
      },
      {
        id: nanoid(),
        title: 'Task 2',
        createdAt: new Date(),
      },
    ],
  },
  {
    id: nanoid(),
    title: 'Current Sprint',
    tasks: [],
  },
  {
    id: nanoid(),
    title: 'In Progress',
    tasks: [],
  },
  { id: nanoid(), title: 'Done', tasks: [] },
]) //Nuxt injects ref automatically
const alt = useKeyModifier('Alt')

// if there was a backend, we could watch columns and sync to the backend
// watch(columns, (columns) => {
//   console.log('columns changed', columns)
//   // request here
// }, { deep: true }) // deep: true is needed to watch nested properties

function createColumn() {
  const newColumn: Column = {
    id: nanoid(),
    title: '',
    tasks: [],
  }
  columns.value.push(newColumn)
  // nextTick from vue core is used to wait for the DOM to update
  nextTick(() => {
    focusLastColumn()
  })
}

function focusLastColumn() {
  ;(
    document.querySelector(
      '.column:last-of-type .title-input'
    ) as HTMLInputElement
  ).focus()
}
</script>

<template>
  <div class="flex items-start overflow-x-auto gap-4">
    <draggable
      v-model="columns"
      group="columns"
      item-key="id"
      :animation="150"
      handle=".drag-handle"
      class="columns flex gap-4 items-start"
    >
      <template #item="{ element: column }: { element: Column }">
        <div class="column bg-gray-200 p-5 rounded min-w-[250px]">
          <header class="font-bold mb-4">
            <DragHandle />
            <!-- {{ column.title }} -->
            <input
              v-model="column.title"
              @keyup.enter=";($event.target as HTMLInputElement).blur()"
              @keydown.backspace="
                column.title === ''
                  ? (columns = columns.filter((col) => col.id !== column.id))
                  : null
              "
              class="title-input bg-transparent focus:bg-white rounded px-1 w-4/5"
              type="text"
            />
          </header>
          <draggable
            v-model="column.tasks"
            :group="{ name: 'tasks', pull: alt ? 'clone' : true }"
            item-key="id"
            :animation="150"
          >
            <template #item="{ element: task }: { element: Task }">
              <div>
                <TrelloBoardTask
                  :task="task"
                  class="task"
                  @delete="
                    column.tasks = column.tasks.filter(
                      (task) => task.id !== $event
                    )
                  "
                />
              </div>
            </template>
          </draggable>
          <footer>
            <!-- <button class="text-gray-500">+ Add a Card</button> -->
            <NewTask @add="(task) => column.tasks.push(task)" />
          </footer>
        </div>
      </template>
    </draggable>
    <button
      @click="createColumn"
      class="bg-gray-200 whitespace-nowrap p-2 rounded opacity-50"
    >
      + Add a new column
    </button>
  </div>
</template>
