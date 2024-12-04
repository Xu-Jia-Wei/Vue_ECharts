<template>
  <div id="app">
    <h1 class="text-center text-primary">My To-Do List</h1>
    <to-do-form @todo-added="addToDo"></to-do-form>
    <h2 id="list-summary" ref="listSummary" tabindex="-1" class="list-summary">{{ listSummary }}</h2>
    <ul aria-labelledby="list-summary" class="stack-large">
      <li v-for="item in ToDoItems" :key="item.id">
        <to-do-item
          :label="item.label"
          :done="item.done"
          :id="item.id"
          @checkbox-changed="updateDoneStatus(item.id)"
          @item-deleted="deleteToDo(item.id)"
          @item-edited="editToDo(item.id, $event)">
        </to-do-item>
      </li>
    </ul>
  </div>
</template>

<script>
import ToDoItem from "./components/ToDoItem.vue";
import uniqueId from "lodash.uniqueid";
import ToDoForm from "./components/ToDoForm.vue";

export default {
  name: "app",
  components: {
    ToDoItem,
    ToDoForm,
  },
  data() {
    return {
      ToDoItems: [
        { id: uniqueId("todo-"), label: "Learn Vue", done: false },
        { id: uniqueId("todo-"), label: "Create a Vue project with the CLI", done: true },
        { id: uniqueId("todo-"), label: "Have fun", done: true },
        { id: uniqueId("todo-"), label: "Create a to-do list", done: false },
      ],
    };
  },
  methods: {
    addToDo(toDoLabel) {
      this.ToDoItems.push({ id: uniqueId('todo-'), label: toDoLabel, done: false });
    },
    updateDoneStatus(toDoId) {
      const toDoToUpdate = this.ToDoItems.find((item) => item.id === toDoId);
      toDoToUpdate.done = !toDoToUpdate.done;
    },
    deleteToDo(toDoId) {
      const itemIndex = this.ToDoItems.findIndex((item) => item.id === toDoId);
      this.ToDoItems.splice(itemIndex, 1);
      this.$refs.listSummary.focus();
    },
    editToDo(toDoId, newLabel) {
      const toDoToEdit = this.ToDoItems.find((item) => item.id === toDoId);
      if (toDoToEdit) {
        toDoToEdit.label = newLabel;
      }
    }
  },
  computed: {
    listSummary() {
      const numberFinishedItems = this.ToDoItems.filter((item) => item.done).length;
      return `${numberFinishedItems} out of ${this.ToDoItems.length} items completed`;
    }
  }
};
</script>

<style scoped>
#app {
  background-color: #f9f9f9;
  margin: 2rem;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

h1 {
  font-size: 2.5rem;
  color: #4C9BFD;
}

.list-summary {
  font-size: 1.2rem;
  color: #333;
  text-align: center;
  margin-bottom: 1.5rem;
}

.stack-large > * + * {
  margin-top: 1.5rem;
}

.btn__primary {
  background-color: #4C9BFD;
  color: #fff;
}

.btn__danger {
  background-color: #f56c6c;
  color: #fff;
}

#app h1, #app h2 {
  text-align: center;
  margin: 0;
}
</style>
