<template>
    <div class="stack-small" v-if="!isEditing">
      <el-checkbox
        :id="id"
        :label="label"
        v-model="isDone"
        @change="$emit('checkbox-changed')">
        {{ label }}
      </el-checkbox>
  
      <div class="btn-group">
        <el-button
          type="primary"
          ref="editButton"
          @click="toggleToItemEditForm"
          size="small">
          Edit---
          <span class="visually-hidden">{{ label }}</span>
        </el-button>
  
        <el-button
          type="danger"
          @click="deleteToDo"
          size="small">
          Delete---
          <span class="visually-hidden">{{ label }}</span>
        </el-button>
      </div>
    </div>
  
    <to-do-item-edit-form
      v-else
      :id="id"
      :label="label"
      @item-edited="itemEdited"
      @edit-cancelled="editCancelled">
    </to-do-item-edit-form>
  </template>
  
  <script>
  import { ElCheckbox, ElButton } from 'element-plus';
  import ToDoItemEditForm from "./ToDoItemEditForm";
  
  export default {
    components: {
      ToDoItemEditForm,
      ElCheckbox,
      ElButton
    },
    props: {
      label: { required: true, type: String },
      done: { default: false, type: Boolean },
      id: { required: true, type: String },
    },
    data() {
      return {
        isEditing: false
      };
    },
    computed: {
      isDone() {
        return this.done;
      }
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
        this.focusOnEditButton();
      },
      editCancelled() {
        this.isEditing = false;
        this.focusOnEditButton();
      },
      focusOnEditButton() {
        this.$nextTick(() => {
          const editButtonRef = this.$refs.editButton;
          if (editButtonRef) {
            editButtonRef.$el.focus();
          }
        });
      }
    }
  };
  </script>
  
  <style scoped>
  .btn-group {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
  }
  
  .el-button {
    padding: 0.6rem 1.2rem;
    font-size: 1rem;
  }
  
  .el-checkbox {
    font-size: 1.2rem;
    margin-bottom: 0.8rem;
  }
  </style>
  