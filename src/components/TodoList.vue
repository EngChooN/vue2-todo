<template>
    <section>
        <div>
            <ul>
                <li
                    v-for="(todoItem, index) in todoItems"
                    :key="index"
                    class="shadow"
                >
                    <i
                        class="fa-solid fa-check checkBtn"
                        :class="{ checkBtnCompleted: todoItem.completed }"
                        @click="toggleComplete(todoItem)"
                    ></i>
                    <span :class="{ textCompleted: todoItem.completed }">{{
                        todoItem.item
                    }}</span>
                    <span
                        class="removeBtn"
                        @click="removeTodo(todoItem, index)"
                    >
                        <i class="fa-solid fa-trash-can"></i>
                    </span>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
export default {
    data: function () {
        return {
            todoItems: [],
        };
    },
    methods: {
        removeTodo: function (todoItem, index) {
            localStorage.removeItem(todoItem.item);
            this.todoItems.splice(index, 1);
        },
        toggleComplete: function (todoItem) {
            todoItem.completed = !todoItem.completed;
            // 로컬스토리지 데이터 갱신
            localStorage.removeItem(todoItem.item);
            localStorage.setItem(todoItem.item, JSON.stringify(todoItem));
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

<style scoped>
ul {
    list-style-type: none;
    padding-left: 0px;
    margin-top: 0;
    text-align: left;
}
li {
    display: flex;
    min-height: 50px;
    height: 50px;
    line-height: 50px;
    margin: 0.5rem 0;
    padding: 0 0.9rem;
    background: white;
    border-radius: 5px;
}
.removeBtn {
    margin-left: auto;
    color: #de4343;
    cursor: pointer;
}
.checkBtn {
    line-height: 45px;
    color: #62acde;
    margin-right: 5px;
    cursor: pointer;
}
.checkBtnCompleted {
    color: #b3adad;
}
.textCompleted {
    text-decoration: line-through;
    color: #b3adad;
}
</style>
