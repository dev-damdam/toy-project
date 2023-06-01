<template>
  <article class="w-full p-3 flex justify-content-center">
    <div class="p-inputgroup w-8">
      <InputText
        v-model="searchKeyword"
        placeholder="검색어를 입력해주세요"
        @keydown.prevent.enter="search"
      />
      <Button icon="pi pi-search" @click="search" />
    </div>
    <Button
      icon="pi pi-bookmark-fill"
      rounded
      class="ml-3"
      @click="showOnlyBooked"
    />
  </article>
  <article
    ref="list"
    class="grid gap-3 mr-0 ml-0 mt-0 p-3 recipe-card-list-wrapper"
  >
    <RecipeCard
      v-for="(food, index) in foodList"
      class="recipe-card"
      :index="index"
      :food="food"
      @booked="updateBookedState"
    />
  </article>
  <Button
    icon="pi pi-chevron-up"
    rounded
    outlined
    class="scroll-top-button"
    @click="onTop"
  />
</template>
<script lang="ts" setup>
import { ref } from "vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import RecipeCard from "@/components/food-recipe/RecipeCard.vue";
import utils from "@/utils/utils";
import lodash from "lodash";

// variables
const searchKeyword = ref<string>("");
const list = ref<any | null>(null);

// #test
const foodList = ref<TFoodRecipe[]>([
  {
    name: "샐러드",
    description:
      "dfsfsffdsfsfsdfdfasfsfasfasfadsfasdfsafdasfda\nsfasdfadsdfdsfsfsdfsd fasfsdfadsfds",
    is_booked: true,
  },
  {
    name: "샐러드",
    description:
      "dfsfsffdsfsfsdfdfasfsfasfasfadsfasdfsafdasfda\nsfasdfadsdfdsfsfsdfsd fasfsdfadsfds",
    is_booked: false,
  },
  {
    name: "샐러드",
    description:
      "dfsfsffdsfsfsdfdfasfsfasfasfadsfasdfsafdasfda\nsfasdfadsdfdsfsfsdfsd fasfsdfadsfds",
    is_booked: false,
  },
  {
    name: "샐러드",
    description:
      "dfsfsffdsfsfsdfdfasfsfasfasfadsfasdfsafdasfda\nsfasdfadsdfdsfsfsdfsd fasfsdfadsfds",
    is_booked: false,
  },
  {
    name: "샐러드",
    description:
      "dfsfsffdsfsfsdfdfasfsfasfasfadsfasdfsafdasfda\nsfasdfadsdfdsfsfsdfsd fasfsdfadsfds",
    is_booked: false,
  },
  {
    name: "샐러드",
    description:
      "dfsfsffdsfsfsdfdfasfsfasfasfadsfasdfsafdasfda\nsfasdfadsdfdsfsfsdfsd fasfsdfadsfds",
    is_booked: false,
  },
  {
    name: "샐러드",
    description:
      "dfsfsffdsfsfsdfdfasfsfasfasfadsfasdfsafdasfda\nsfasdfadsdfdsfsfsdfsd fasfsdfadsfds",
    is_booked: false,
  },
  {
    name: "샐러드",
    description:
      "dfsfsffdsfsfsdfdfasfsfasfasfadsfasdfsafdasfda\nsfasdfadsdfdsfsfsdfsd fasfsdfadsfds",
    is_booked: false,
  },
]);

// methods
const search = () => {
  console.log(searchKeyword.value);
};

const updateBookedState = (index: number) => {
  foodList.value[index].is_booked = !foodList.value[index].is_booked;

  const copy = lodash.cloneDeep(foodList.value);
  utils.setItem("food-recipe", JSON.stringify(copy.filter(el => el.is_booked)));
};

const showOnlyBooked = () => {
  const bookmarkList = utils.getItem("food-recipe");

  if (bookmarkList !== null) {
    foodList.value = JSON.parse(bookmarkList);
  } else {
    alert("저장한 레시피가 없습니다.");
  }
};

const onTop = () => {
  list.value.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
</script>
<style lang="scss" scoped>
.p-inputgroup {
  :deep(.p-inputtext) {
    border-top-left-radius: rem(32px) !important;
    border-bottom-left-radius: rem(32px) !important;
    border-top-right-radius: rem(0px) !important;
    border-bottom-right-radius: rem(0px) !important;
  }

  :deep(.p-button) {
    border-top-right-radius: rem(32px) !important;
    border-bottom-right-radius: rem(32px) !important;
  }
}

.recipe-card-list-wrapper {
  position: relative;
  top: rem(0px);
  left: rem(0px);
  height: calc(100% - rem(77px));
  overflow-y: auto;
  .recipe-card {
    flex: 0 0 auto;
    padding: rem(6px);
    width: rem(234px);
    height: rem(346.5px);
  }
}

.scroll-top-button {
  position: absolute;
  bottom: rem(16px);
  right: rem(16px);
}
</style>
