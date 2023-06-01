<template>
  <Card>
    <template #header>
      <div class="relative">
        <img
          class="food-image"
          alt="food-image"
          src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80"
        />
        <div class="icon-background">
          <i
            :class="['pi', boomarkIcon, 'bookmark-icon']"
            @click="booked(index)"
          />
        </div>
      </div>
    </template>
    <template #title> {{ food.name }} </template>
    <template #content>
      <p class="text-truncate">
        {{ food.description }}
      </p>
    </template>
    <template #footer>
      <Button label="레시피 보러가기" rounded size="small" />
    </template>
  </Card>
</template>
<script lang="ts" setup>
import Card from "primevue/card";
import Button from "primevue/button";
import { computed } from "vue";

const props = defineProps<{
  index: number;
  food: TFoodRecipe;
}>();

const emit = defineEmits<{
  (e: "booked", index: number): void;
}>();

const boomarkIcon = computed(() => {
  return props.food.is_booked ? "pi-bookmark-fill" : "pi-bookmark";
});
// methods
const booked = (index: number) => {
  emit("booked", index);
};
</script>
<style lang="scss" scoped>
.food-image {
  width: 100%;
  height: rem(180px);
  object-fit: cover;
}

.text-truncate {
  @include text-truncate(2, 1.5);
}

:deep(.p-card-body) {
  padding: rem(8px) !important;
}

:deep(.p-card-title) {
  font-size: 1.25rem;
  margin-bottom: 0 !important;
}

:deep(.p-card-content) {
  padding: rem(8px) 0 !important;
}

:deep(.p-card-footer) {
  display: flex;
  justify-content: center;
  padding-top: rem(8px) !important;
}

.icon-background {
  position: absolute;
  right: rem(8px);
  top: rem(8px);
  width: rem(32px);
  height: rem(32px);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba($gray700, 0.5);
  border-radius: 50%;
}

.bookmark-icon {
  font-size: rem(16px);
  color: white
}
</style>
