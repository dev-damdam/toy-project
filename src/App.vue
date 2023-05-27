<template>
  <div class="wrapper w-screen h-screen">
    <TabMenu :model="items" />
    <section class="view-wrapper">
      <router-view />
    </section>
  </div>
</template>
<script setup lang="ts">
import TabMenu from "primevue/tabmenu";
import routes from "./router/routes";
import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");

const items = routes.slice(1, routes.length).map((route) => {
  return {
    label: route.name,
    to: route.path,
  };
});
</script>
<style lang="scss">

.wrapper {
  min-width: rem(375px);
  max-width: rem(768px);
  margin: 0 auto;
  border: rem(1px) solid $gray500;

  .view-wrapper {
    height: calc(100% - rem(58px)); // 58px is tab menu height
  }
}

.p-tabmenuitem.p-highlight {
  .p-menuitem-link {
    color: $purple500 !important;
    border-color: $purple500 !important;
    font-weight: 700 !important;
  }
}

.p-button,
.p-checkbox-box.p-highlight {
  background: $purple500 !important;
  border-color: $purple500 !important;
}

.p-button.p-button-text {
  background-color: transparent !important;
  color: $purple500 !important;
  border-color: transparent !important;
}
</style>
