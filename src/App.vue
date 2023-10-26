<template>
    <div id="app">
        <TodoHeader />
        <TodoInput @addTodo="addTodo" />
        <TodoList
            @removeTodo="removeTodo"
            @toggleComplete="toggleComplete"
            :todoItems="todoItems"
        />
        <TodoFooter @clearTodo="clearTodo" />
    </div>
</template>

<script>
import TodoHeader from "./components/TodoHeader.vue";
import TodoInput from "./components/TodoInput.vue";
import TodoList from "./components/TodoList.vue";
import TodoFooter from "./components/TodoFooter.vue";

export default {
    name: "App",
    components: {
        TodoHeader,
        TodoInput,
        TodoList,
        TodoFooter,
    },
    data: function () {
        return {
            todoItems: [],
        };
    },
    methods: {
        addTodo: function (newTodoItem) {
            const obj = {
                completed: false,
                item: newTodoItem,
            };
            localStorage.setItem(newTodoItem, JSON.stringify(obj));
            this.todoItems.push(obj);
        },
        removeTodo: function (todoItem, index) {
            localStorage.removeItem(todoItem.item);
            this.todoItems.splice(index, 1);
        },
        toggleComplete: function (todoItem, index) {
            this.todoItems[index].completed = !this.todoItems[index].completed;
            // 로컬스토리지 데이터 갱신
            localStorage.removeItem(todoItem.item);
            localStorage.setItem(todoItem.item, JSON.stringify(todoItem));
        },
        clearTodo: function () {
            localStorage.clear();
            this.todoItems = [];
        },
    },
    created: function () {
        if (localStorage.length > 0) {
            for (let i = 0; i < localStorage.length; i++) {
                const localStorageTodoItem = localStorage.getItem(
                    localStorage.key(i)
                );
                this.todoItems.push(JSON.parse(localStorageTodoItem));
            }
            console.log(this.todoItems);
        }
    },
};
</script>

<style>
body {
    text-align: center;
    background-color: #f6f6f6;
}
input {
    border-style: groove;
    width: 200px;
}
button {
    border-style: groove;
}
.shadow {
    box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
</style>
