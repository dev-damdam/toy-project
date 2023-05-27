<template>
  <Card class="w-full">
    <template #content>
      <div class="flex justify-content-between">
        <p class="flex gap-2 align-items-center">
          <Checkbox
            :model-value="todo.is_completed"
            :input-id="todo.id"
            binary
            class="mr-2"
            @input="completedTodo(todo)"
          />
          <label
            :for="todo.id"
            class="mr-2"
            :class="todo.is_completed ? 'line-through' : ''"
            >{{ todo.name }}</label
          >
          <Tag :style="{ backgroundColor: todo.category.color }">
            <template #default>
              <span
                class="inline-block font-normal"
                :style="{ backgroundColor: todo.category.color }"
                >{{ todo.category.name }}</span
              >
            </template>
          </Tag>
        </p>
        <p class="flex gap-2 align-items-center">
          <span class="text-400 text-sm">
            등록일 : {{ todo.reg_date }}
          </span>
          <button class="border-none bg-white" @click="editTodo(todo.id)">
            <i class="pi pi-pencil"></i>
          </button>
          <button
            class="border-none bg-white"
            @click="deleteTodo(todo.id)"
          >
            <i class="pi pi-trash"></i>
          </button>
        </p>
      </div>
    </template>
  </Card>
</template>
<script setup lang="ts">
import { TTodo } from "@/assets/types/TTodoList";
import Card from "primevue/card";
import Checkbox from "primevue/checkbox";
import Button from "primevue/button";
import Tag from "primevue/tag";

const props = defineProps<{
  todo: TTodo;
}>();

const emit = defineEmits<{
  (e: "complete", id: string, state: boolean): void;
  (e: "edit", id: string): void;
  (e: "delete", id: string): void;
}>();

// methods
const editTodo = (id: string) => {
  emit("edit", id);
};

const completedTodo = (todo: TTodo) => {
  todo.is_completed = !todo.is_completed;
  emit("complete", todo.id, todo.is_completed);
};

const deleteTodo = (id: string) => {
  emit("delete", id);
};
</script>
<style lang="scss" scoped></style>
