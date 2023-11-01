<template>
    <section>
        <div>
            <!-- tag 속성은 해당 트랜지션 태그가 tag 속성에 명시한 태그가 된다. -->
            <transition-group name="list" tag="ul">
                <li
                    v-for="(todoItem, index) in todoItems"
                    :key="index"
                    class="shadow"
                >
                    <i
                        class="fa-solid fa-check checkBtn"
                        :class="{ checkBtnCompleted: todoItem.completed }"
                        @click="toggleComplete({ todoItem, index })"
                    ></i>
                    <span :class="{ textCompleted: todoItem.completed }">
                        {{ todoItem.item }}
                    </span>
                    <span
                        class="removeBtn"
                        @click="removeTodo({ todoItem, index })"
                    >
                        <i class="fa-solid fa-trash-can"></i>
                    </span>
                </li>
            </transition-group>
        </div>
    </section>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
    methods: {
        // removeTodo(todoItem, index) {
        //     this.$store.commit("removeTodo", {
        //         todoItem,
        //         index,
        //     });
        // },
        // toggleComplete(todoItem, index) {
        //     this.$store.commit("toggleComplete", {
        //         todoItem,
        //         index,
        //     });
        // },

        // ...mapMutations({
        //     removeTodo: "removeTodo",
        //     toggleComplete: "toggleComplete"
        // }),
        ...mapMutations(["removeTodo", "toggleComplete"]),
        // mutations의 인자는 템플릿 함수 부분에 인자를 {}로 묶어주면,
        // 자동으로 뮤테이션에 객체형태로 들어가져서 따로 안써도 됨
    },
    computed: {
        // mapState
        ...mapState(["todoItems"]),

        // mapGetters
        ...mapGetters(["fetchStoredTodoItems"]),
        // 또는 템플릿에서 사용하는 이름을 통일하지 않았다면
        ...mapGetters({
            todoItems: "fetchStoredTodoItems",
        }),
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
/* 리스트 아이템 트랜지션 효과 */
.list-enter-active,
.list-leave-active {
    transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(30px);
}
</style>
