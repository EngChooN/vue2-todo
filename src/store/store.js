import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const storage = {
    fetch() {
        const arr = [];
        if (localStorage.length > 0) {
            for (let i = 0; i < localStorage.length; i++) {
                const localStorageTodoItem = localStorage.getItem(
                    localStorage.key(i)
                );
                arr.push(JSON.parse(localStorageTodoItem));
            }
            console.log(this.todoItems);
        }
        return arr;
    },
};

export const store = new Vuex.Store({
    state: {
        todoItems: storage.fetch(),
    },
    getters: {
        fetchStoredTodoItems(state) {
            return state.todoItems;
        },
    },
    mutations: {
        addTodo(state, payload) {
            const obj = {
                completed: false,
                item: payload,
            };
            localStorage.setItem(payload, JSON.stringify(obj));
            state.todoItems.push(obj);
        },
        removeTodo(state, payload) {
            localStorage.removeItem(payload.todoItem.item);
            state.todoItems.splice(payload.index, 1);
        },
        toggleComplete(state, payload) {
            state.todoItems[payload.index].completed =
                !state.todoItems[payload.index].completed;
            // 로컬스토리지 데이터 갱신
            localStorage.removeItem(payload.todoItem.item);
            localStorage.setItem(
                payload.todoItem.item,
                JSON.stringify(payload.todoItem)
            );
        },
        clearTodo(state) {
            localStorage.clear();
            state.todoItems = [];
        },
    },
});
