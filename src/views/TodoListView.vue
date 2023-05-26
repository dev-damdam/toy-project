<template>
  <section class="relative p-2">
    <TodoCalendar class="w-full" :todo-list="todoList" />
    <Button
      class="pencil-button"
      icon="pi pi-pencil"
      rounded
      aria-label="pencil"
      @click="openTodoModal"
    />
  </section>
  <AddTodoModal v-model="modalVisible" @add="addTodo" />
</template>
<script setup lang="ts">
import { ref } from "vue";
import Button from "primevue/button";
import TodoCalendar from "@/components/todo-list/TodoCalendar.vue";
import AddTodoModal from "@/components/todo-list/AddTodoModal.vue";
import { TDayTodo, TTodo } from "@/assets/types/TTodoList";
import utils from "@/utils/utils";

//variables
const todoList = ref<TDayTodo[]>([]);
const modalVisible = ref<boolean>(false);

//methods
const loadTodoList = () => {
  const temp = utils.getItem("todo-list");
  if (temp != null) {
    todoList.value = JSON.parse(temp);
  } else {
    todoList.value = [];
  }
};

const addTodo = (todo: TTodo) => {
  const dateIndex = todoList.value.findIndex((item) => item.date === todo.date);
  if (dateIndex < 0) {
    // 해당 날짜에 todo가 등록되어 있지 않으면
    todoList.value.push({
      date: todo.date,
      todo: [todo],
    });
  } else {
    const todoIndex = todoList.value[dateIndex].todo.findIndex(
      (item) => item.id === todo.id
    );
    if (todoIndex < 0) {
      todoList.value[dateIndex].todo.push(todo);
    }
  }

  utils.setItem("todo-list", JSON.stringify(todoList.value));
};

const openTodoModal = () => {
  modalVisible.value = true;
};

// load
loadTodoList();
</script>
<style lang="scss" scoped>
.pencil-button {
  position: absolute;
  right: rem(32px);
  bottom: rem(32px);
}

.todo-calendar-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 1rem 0;
}

.dropdown-option-color {
  width: 0.5rem;
  height: 0.5rem;
}

.completed-todo {
  text-decoration: line-through;
}

:deep(.p-card .p-card-content) {
  padding: 0;
  height: 100%;
}

:deep(.p-tag) {
  background: none;
}
</style>
