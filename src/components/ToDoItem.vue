<template>
    <div class="todo-list">
      <div v-if="!isEditing" class="todo-item">
        <label class="todo-label">
          <input type="checkbox" v-model="isDone" @change="$emit('checkbox-changed')" />
          {{ label }}
        </label>
        <div class="btn-group">
          <button @click="toggleToItemEditForm" class="btn edit-btn">Edit</button>
          <button @click="deleteToDo" class="btn delete-btn">Delete</button>
        </div>
      </div>
  
      <to-do-item-edit-form
        v-else
        :id="id"
        :label="label"
        @item-edited="itemEdited"
        @edit-cancelled="editCancelled"
      ></to-do-item-edit-form>
    </div>
  </template>
  
  <script>
  import ToDoItemEditForm from "./ToDoItemEditForm";

  
  export default {
    components: {
      ToDoItemEditForm,
    },
    props: {
      label: { required: true, type: String },
      done: { default: false, type: Boolean },
      id: { required: true, type: String },
    },
    data() {
      return {
        isEditing: false,
      };
    },
    computed: {
      isDone() {
        return this.done;
      },
    },
    methods: {
      deleteToDo() {
        this.$emit('item-deleted');
      },
      toggleToItemEditForm() {
        this.isEditing = true;
      },
      itemEdited(newLabel) {
        this.$emit("item-edited", this.id, newLabel);
        this.isEditing = false;
      },
      editCancelled() {
        this.isEditing = false;
      },
    },
  };
  </script>
  
  <style scoped>
  .todo-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 1rem 0;
  }
  
  .todo-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
  }
  
  .todo-label {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  input[type="checkbox"] {
    cursor: pointer;
  }
  
  .btn-group {
    display: flex;
    gap: 0.5rem;
  }
  
  .btn {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.875rem;
  }
  
  .edit-btn {
    background-color: #007bff;
    color: white;
  }
  
  .delete-btn {
    background-color: #ff4d4f;
    color: white;
  }
  
  .edit-btn:hover {
    background-color: #0056b3;
  }
  
  .delete-btn:hover {
    background-color: #c00000;
  }
  </style>
  