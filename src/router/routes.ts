import TodoListView from "@/views/TodoListView.vue"
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
];

export default routes;