<template>
    <form class="stack-small" @submit.prevent="onSubmit">
      <div>
        <label class="edit-label">Edit Name for &quot;{{ label }}&quot;</label>
        <el-input
          v-model="newLabel"
          :id="id"
          ref="labelInput"
          autocomplete="off"
          clearable
          class="custom-input"
          size="medium"
          placeholder="Enter new label" />
      </div>
      <div class="btn-group">
        <el-button type="text" @click="onCancel" class="btn-cancel">
          Cancel---
          <span class="visually-hidden">editing {{ label }}</span>
        </el-button>
        <el-button type="primary" @click="onSubmit" class="btn-save">
          Save---
          <span class="visually-hidden">edit for {{ label }}</span>
        </el-button>
      </div>
    </form>
  </template>
  
  <script>
  export default {
    props: {
      label: {
        type: String,
        required: true,
      },
      id: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        newLabel: this.label,
      };
    },
    methods: {
      onSubmit() {
        if (this.newLabel && this.newLabel !== this.label) {
          this.$emit("item-edited", this.newLabel);
        }
      },
      onCancel() {
        this.$emit("edit-cancelled");
      },
    },
    mounted() {
      const labelInputRef = this.$refs.labelInput;
      labelInputRef.focus();
    }
  };
  </script>
  
  <style scoped>
  .edit-label {
    font-family: Arial, sans-serif;
    font-size: 16px;
    font-weight: bold;
    color: #333;
    display: block;
    margin-bottom: 8px;
  }
  
  .custom-input {
    width: 100%;
    margin-top: 0.4rem;
  }
  
  .btn-group {
    display: flex;
    gap: 10px;
    margin-top: 10px;
  }
  
  .btn-cancel,
  .btn-save {
    font-weight: bold;
  }
  
  .el-button {
    border-radius: 6px;
  }
  
  .el-input {
    border-radius: 4px;
    background-color: #f8f8f8;
  }
  </style>
  