<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="TODO 추가"
    :closable="false"
    class="w-3"
    @show="reset"
  >
    <div class="p-2 flex flex-column gap-3">
      <InputText
        class="w-full"
        v-model="todo.name"
        placeholder="할 일을 입력해주세요."
      />
      <Calendar
        v-model="todo.date"
        showIcon
        placeholder="날짜를 선택해주세요."
        dateFormat="yy-mm-dd"
      />
      <Dropdown
        v-model="todo.category"
        :options="dropdownOpt"
        optionLabel="name"
        placeholder="카테고리를 선택해주세요."
        class="w-full"
      >
        <template #value="slotProps">
          <span v-if="slotProps.value.name">{{ slotProps.value.name }}</span>
          <span v-else>{{ slotProps.placeholder }}</span>
        </template>
        <template #option="slotProps">
          <p class="flex align-items-center gap-2">
            <div class="dropdown-option-color border-circle" :style="{backgroundColor:slotProps.option.color}"></div>
            <span>{{ slotProps.option.name }}</span>
          </p>
        </template>
      </Dropdown>
    </div>
    <template #footer>
      <Button
        label="취소"
        icon="pi pi-times"
        @click="visible = false"
        text
        size="small"
      />
      <Button label="추가" size="small" @click="addTodoList" />
    </template>
  </Dialog>
</template>
<script lang="ts" setup>
import { TTodo } from "@/assets/types/TTodoList";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Calendar from "primevue/calendar";
import Dropdown from "primevue/dropdown";
import { computed, ref } from "vue";
import shortid from "shortid";
import dayjs from "dayjs";

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "add", todo: TTodo): void;
}>();

const visible = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const todo = ref<TTodo>({
  id: "",
  category: {
    name: "",
    color: "",
  },
  name: "",
  reg_date: "",
  date: "",
  is_completed: false,
});

const dropdownOpt = ref<{ name: string; color: string }[]>([
  { name: "일상", color: "#6466f1" },
  { name: "여행", color: "#FCE22A" },
  { name: "개발", color: "#E0144C" },
  { name: "모임", color: "#72147E" },
  { name: "대학", color: "#3EC70B" },
]);

const addTodoList = () => {
  const id = shortid.generate();
  const reg_date = dayjs().format("YYYY-MM-DD");
  const date = dayjs(todo.value.date).format("YYYY-MM-DD");
  todo.value.id = id;
  todo.value.reg_date = reg_date;
  todo.value.date = date;

  emit("add", todo.value);
  visible.value = false;
};

const reset = () => {
  todo.value.id = "";
  todo.value.category.name = "";
  todo.value.category.color = "";
  todo.value.name = "";
  todo.value.reg_date = "";
  todo.value.date = "";
  todo.value.is_completed = false;};
</script>
<style lang="scss" scoped>
.dropdown-option-color {
  width: 0.5rem;
  height: 0.5rem;
}
</style>
