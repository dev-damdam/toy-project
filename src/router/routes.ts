import TodoListView from "@/views/TodoListView.vue"
import FoodRecipeView from "@/views/FoodRecipeView.vue"
const routes = [
    {
        path: "/",
        redirect: "todo-list"
    },
    {
        path: "/todo-list",
        name: "todo-list",
        component: TodoListView,
    },
    {
        path: "/food-recipe",
        name: "food-recipe",
        component: FoodRecipeView,
    },
];

export default routes;