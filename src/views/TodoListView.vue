<template>
  <article class="relative">
    <TodoCalendar
      class="todo-calendar-wrapper"
      :todo-list="todoList"
      @events="setTodoList"
      @height="setCalendarHeight"
    />
    <Button
      class="pencil-button"
      icon="pi pi-pencil"
      rounded
      aria-label="pencil"
      @click="openTodoModal"
    />
  </article>
  <Divider class="m-0" />
  <article ref="list" class="todo-list-wrapper">
    <Todo
      v-for="todo in selectedTodoList"
      :todo="todo"
      @delete="deleteTodo"
      @complete="completeTodo"
      @edit="editTodo"
    />
  </article>
  <AddTodoModal
    v-model="modalVisible"
    :value="todo"
    @add="addTodo"
    @update="updateTodo"
  />
</template>
<script setup lang="ts">
import { ref } from "vue";
import { TDayTodo, TTodo } from "@/assets/types/TTodoList";
import lodash from "lodash";
import Button from "primevue/button";
import Todo from "@/components/todo-list/Todo.vue";
import TodoCalendar from "@/components/todo-list/TodoCalendar.vue";
import AddTodoModal from "@/components/todo-list/AddTodoModal.vue";
import Divider from "primevue/divider";
import utils from "@/utils/utils";

//variables
const todoList = ref<TDayTodo[]>([]);
const selectedDate = ref<string>("");
const selectedTodoList = ref<TTodo[]>([]);
const modalVisible = ref<boolean>(false);
const todo = ref<TTodo | undefined>(undefined);
const calendarHeight = ref<number>(0);
const list = ref<any | null>(null);

//methods
const loadTodoList = () => {
  const temp = utils.getItem("todo-list");
  if (temp != null) {
    todoList.value = JSON.parse(temp);
  } else {
    todoList.value = [];
  }
};

const addTodo = (_todo: TTodo) => {
  const dateIndex = todoList.value.findIndex(
    (item) => item.date === _todo.date
  );
  if (dateIndex < 0) {
    // 해당 날짜에 todo가 등록되어 있지 않으면
    todoList.value.push({
      date: _todo.date,
      todo: [_todo],
    });
    setTodoList(_todo.date, [_todo]);
  } else {
    const todoIndex = todoList.value[dateIndex].todo.findIndex(
      (item) => item.id === _todo.id
    );
    if (todoIndex < 0) {
      todoList.value[dateIndex].todo.push(_todo);
    }
    setTodoList(_todo.date, todoList.value[dateIndex].todo);
  }

  utils.setItem("todo-list", JSON.stringify(todoList.value));
};

const updateTodo = (_todo: TTodo, originDate: string) => {
  const originDateIndex = todoList.value.findIndex(
    (item) => item.date === originDate
  );

  const dateIndex = todoList.value.findIndex(
    (item) => item.date === _todo.date
  );

  if (originDate !== _todo.date) {
    const deleteIndex = todoList.value[originDateIndex].todo.findIndex(
      (item) => item.id === _todo.id
    );
    // 기존 등록된 todo 제거
    todoList.value[originDateIndex].todo.splice(deleteIndex, 1);

    // 해당 날짜에 todo가 등록되어 있지 않으면 추가
    todoList.value.push({
      date: _todo.date,
      todo: [_todo],
    });

    setTodoList(_todo.date, [_todo]);
  } else {
    const todoIndex = todoList.value[dateIndex].todo.findIndex(
      (item) => item.id === _todo.id
    );
    todoList.value[dateIndex].todo[todoIndex] = _todo;
    setTodoList(_todo.date, todoList.value[dateIndex].todo);
  }

  utils.setItem("todo-list", JSON.stringify(todoList.value));
  todo.value = undefined;
};

const setTodoList = (date: string, events: TTodo[]) => {
  // init
  selectedDate.value = "";
  selectedTodoList.value.splice(0, selectedTodoList.value.length);

  // allocated
  selectedDate.value = date;
  selectedTodoList.value = lodash.cloneDeep(events);
};

const setCalendarHeight = (height: number) => {
  list.value.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  calendarHeight.value = height;
};

const deleteTodo = (id: string) => {
  trigger("delete", id);
};

const completeTodo = (id: string, state: boolean) => {
  trigger("complete", id, state);
};

const editTodo = (id: string) => {
  trigger("edit", id);
};

const trigger = (mode: string, todoID: string, value?: any) => {
  const dateIndex = todoList.value.findIndex(
    (el) => el.date === selectedDate.value
  );
  const todoIndex = todoList.value[dateIndex].todo.findIndex(
    (el: TTodo) => el.id === todoID
  );
  switch (mode) {
    case "delete":
      todoList.value[dateIndex].todo.splice(todoIndex, 1);
      break;
    case "complete":
      todoList.value[dateIndex].todo[todoIndex].is_completed = value;
      break;
    case "edit":
      todo.value = todoList.value[dateIndex].todo[todoIndex];
      modalVisible.value = true;
  }

  utils.setItem("todo-list", JSON.stringify(todoList.value));
  setTodoList(selectedDate.value, todoList.value[dateIndex].todo);
  return;
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
  right: rem(24px);
  bottom: rem(24px);
}

.todo-calendar-wrapper {
  width: 100%;
  padding: rem(8px);
  box-sizing: border-box;
}
.todo-list-wrapper {
  height: calc(100% - calc(v-bind(calendarHeight) * 1px));
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  row-gap: rem(8px);
  padding: rem(8px);
}

:deep(.p-card .p-card-content) {
  padding: 0;
  height: 100%;
}

:deep(.p-tag) {
  background: none;
}
</style>
