<template>
  <Calendar inline ref="calendar" @month-change="changeMonth">
    <template #date="slotProps">
      <div class="h-full" @click="click(slotProps.date)">
        <span :class="[dayClass(slotProps.date)]">{{
          slotProps.date.day
        }}</span>
        <p
          v-if="hasEvent(slotProps.date)"
          class="relative flex flex-column gap-1 event-wrapper"
        >
          <span
            v-for="event in getDayEventList(slotProps.date)"
            class="event"
            :style="{ backgroundColor: event.category.color }"
            @click.prevent.stop="click(slotProps.date, event)"
          >
            {{ event.name }}
          </span>
          <span v-if="hasEtc(slotProps.date)" class="more-todo-message"
            >그 외 {{ getEtcCount(slotProps.date) }} 개</span
          >
        </p>
      </div>
    </template>
  </Calendar>
</template>
<script setup lang="ts">
import { TDayTodo, TTodo } from "@/assets/types/TTodoList";
import utils from "@/utils/utils";
import lodash from "lodash";
import dayjs from "dayjs";
import Calendar from "primevue/calendar";
import { nextTick, onMounted, ref } from "vue";

const props = defineProps<{
  todoList: TDayTodo[];
}>();

const emit = defineEmits<{
  (e: "events", date: string, event: TTodo[]): void;
  (e: "height", height: number): void;
}>();

const calendar = ref<any | null>(null);

const dayClass = (dateObj: any): string => {
  const date = utils.getDate(dateObj.year, dateObj.month, dateObj.day);
  const dayOfWeek = dayjs(date).day();

  if (dateObj.day === dayjs().date()) {
    return "today";
  }

  if (dayOfWeek === 0) {
    return "sunday";
  } else if (dayOfWeek === 6) {
    return "saturday";
  } else {
    return "";
  }
};

const getTodoList = (dateObj: any): TTodo[] => {
  const date = utils.getDate(dateObj.year, dateObj.month, dateObj.day);
  const index = props.todoList.findIndex((e) => e.date === date);
  const clone = lodash
    .cloneDeep(props.todoList[index].todo)
    .filter((el) => !el.is_completed);

  if (index > -1) {
    return clone;
  } else {
    return [];
  }
};

onMounted(() => {
  emit("height", calendar.value.$el.clientHeight);
});

const changeMonth = (value: { year: number; month: number }) => {
  nextTick(() => {
    emit("height", calendar.value.$el.clientHeight);
  });
};

const hasEvent = (dateObj: any): boolean => {
  const date = utils.getDate(dateObj.year, dateObj.month, dateObj.day);
  const index = props.todoList.findIndex((e) => e.date === date);
  console;
  if (index > -1) {
    return true;
  } else {
    return false;
  }
};

const hasEtc = (dateObj: any): boolean => {
  const count = getTodoList(dateObj).length;

  return count - 2 > 0 ? true : false;
};

const getDayEventList = (dateObj: any): TTodo[] => {
  const list = getTodoList(dateObj);

  if (list.length > 2) {
    return list.splice(0, 2);
  } else {
    return list;
  }
};

const getEtcCount = (dateObj: any): number => {
  const count = getTodoList(dateObj).length;

  return count - 2;
};

const click = (dateObj: any, event?: TTodo): void => {
  const date = utils.getDate(dateObj.year, dateObj.month, dateObj.day);
  if (event) {
    emit("events", date, [event]);
  } else {
    const dateIndex = props.todoList.findIndex((e) => e.date === date);
    if (dateIndex < 0) emit("events", date, []);
    else emit("events", date, props.todoList[dateIndex].todo);
  }
};
</script>
<style lang="scss" scoped>
.event-wrapper {
  margin-top: rem(3px);

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
    font-weight: normal;
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

    td:nth-child(2n) {
      border-left: 1px solid $gray500;
      border-right: 1px solid $gray500;
    }

    .p-datepicker-today > span {
      background: white;
      font-weight: bold;
    }
  }

  tbody > tr:nth-child(2n) {
    border-top: 1px solid $gray500;
    border-bottom: 1px solid $gray500;
  }

  tbody > tr:last-child {
    border-bottom: none;
  }
}

.today {
  color: $purple500;
}

.sunday {
  color: $red;
}

.saturday {
  color: $blue;
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

.more-todo-message {
  position: absolute;
  top: rem(-16px);
  right: rem(0px);

  font-size: rem(8px);
  color: $gray800;
}
</style>
