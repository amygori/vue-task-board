<script setup lang="ts">
import type Column from '@/types/Column'
import {nanoid} from 'nanoid'
const columns = ref <Column[]>([
  {
    id: nanoid(),
    title: "Backlog",
    tasks: [
      {
        id: nanoid(),
        title: "Task 1",
        createdAt: new Date(),
      },
      {
        id: nanoid(),
        title: "Task 2",
        createdAt: new Date(),
      }
    ]
  },
  {
    id: nanoid(),
    title: "Current Sprint",
    tasks: []
  },
  {
    id: nanoid(),
    title: "In Progress",
    tasks: [], },
  { id: nanoid(), title: "Done", tasks: [] }
]) //Nuxt injects ref automatically
</script>

<template>
    <div class="columns flex gap-4 overflow-x-auto items-start">
      <div v-for="column in columns" :key="column.id" class="column bg-gray-200 p-5 rounded min-w-[250px]">
        <header class="font-bold mb-4">{{ column.title }}</header>
        <div class="tasks">
          <TrelloBoardTask
            v-for="task in column.tasks"
            :key="task.id"
            class="task"
            :task="task"
          >
          </TrelloBoardTask>
          <footer>
            <button class="text-gray-500">+ Add a Card</button>
          </footer>
        </div>
      </div>
    </div>  
</template>
