<template>
  <Calendar inline>
    <template #date="slotProps">
      <div class="h-full">
        <span>{{ slotProps.date.day }}</span>
        <p class="flex flex-column gap-1 event-wrapper">
          <span
            v-for="todo in getDayTodoList(
              slotProps.date.year,
              slotProps.date.month,
              slotProps.date.day
            )"
            class="event"
            :style="{ backgroundColor: todo.category.color }"
          >
            {{ todo.name }}
          </span>
        </p>
      </div>
    </template>
  </Calendar>
</template>
<script setup lang="ts">
import { TDayTodo, TTodo } from "@/assets/types/TTodoList";
import utils from "@/utils/utils";
import Calendar from "primevue/calendar";

const props = defineProps<{
  todoList: TDayTodo[];
}>();

const getDayTodoList = (year: number, month: number, day: number): TTodo[] => {
  const date = utils.getDate(year, month, day);
  const index = props.todoList.findIndex((e) => e.date === date);

  if (index >= 0) return props.todoList[index].todo;
  else return [];
};
</script>
<style lang="scss" scoped>
.event-wrapper {
  height: calc(100% - 19px);
  margin: 0;
  overflow-y: overlay;

  .event {
    width: 100%;
    min-height: 18px;
    padding: 0.25rem 0.25rem;
    display: inline-block;
    flex-shrink: 0;
    box-sizing: border-box;
    border-radius: 6px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    color: white;
    font-size: 0.5rem;
  }
}

:deep(.p-datepicker table) {
  tr {
    display: flex;
    td,
    th {
      flex: 1;
      min-width: 0;
    }
  }
}

:deep(.p-datepicker table td > span) {
  width: 100%;
  height: 4rem;
  display: inline-block;

  box-sizing: border-box;
  border-radius: 0;
  transition: box-shadow 0.2s;
  border: 1px solid transparent;
}
</style>
