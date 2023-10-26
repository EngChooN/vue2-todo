<template>
    <div class="inputBox shadow">
        <input type="text" v-model="newTodoItem" @keyup.enter="addTodo" />
        <span class="addContainer" @click="addTodo">
            <i class="fa-solid fa-plus addBtn"></i>
        </span>

        <ModalWindow v-if="showModal" @close="showModal = false">
            <!--
                you can use custom content here to overwrite
                default content
            -->
            <h3 slot="header">
                경고!
                <i
                    class="fa-regular fa-circle-xmark closeModalBtn"
                    @click="showModal = false"
                ></i>
            </h3>
            <h3 slot="body">입력하신 값이 없습니다.</h3>
        </ModalWindow>
    </div>
</template>

<script>
import ModalWindow from "./common/ModalWindow.vue";

export default {
    components: {
        ModalWindow,
    },
    data: function () {
        return {
            newTodoItem: "",
            showModal: false,
        };
    },
    methods: {
        addTodo: function () {
            if (this.newTodoItem !== "") {
                this.$emit("addTodo", this.newTodoItem);
                this.clearInput();
            } else {
                this.showModal = true;
            }
        },
        clearInput: function () {
            this.newTodoItem = "";
        },
    },
};
</script>

<style scoped>
input:focus {
    outline: none;
}
.inputBox {
    background: white;
    height: 50px;
    line-height: 50px;
    border-radius: 5px;
}
.inputBox input {
    border-style: none;
    font-size: 0.9rem;
}
.addContainer {
    float: right;
    background: linear-gradient(to right, #6478fb, #8763fb);
    display: block;
    width: 3rem;
    border-radius: 0 5px 5px 0;
    cursor: pointer;
}
.addBtn {
    color: white;
    vertical-align: middle;
}
.closeModalBtn {
    color: #42b983;
    cursor: pointer;
}
</style>
