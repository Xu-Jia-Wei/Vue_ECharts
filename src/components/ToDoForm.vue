<template>
    <form @submit.prevent="onSubmit">
      <h2 class="label-wrapper">
        <label for="new-todo-input" class="label__lg">
          What needs to be done?
        </label>
      </h2>
      <el-input
        type="text"
        id="new-todo-input"
        name="new-todo"
        v-model.lazy.trim="label"
        placeholder="Enter a new to-do"
        size="large"
        class="input__lg"/>
      <el-button type="primary" class="btn__primary btn__lg" size="large" @click="onSubmit">Add</el-button>
    </form>
  </template>
  
  <script>
  export default {
    methods: {
      onSubmit() {
        if (this.label === "") {
          return;
        }
        this.$emit('todo-added', this.label);
        this.label = "";
      }
    },
    data() {
      return {
        label: "",
      };
    },
  };
  </script>
  
  <style scoped>
  .label-wrapper {
    margin-bottom: 1rem;
  }
  
  .el-input {
    width: 100%;
    margin-bottom: 1rem;
  }
  
  .el-button {
    width: 100%;
    padding: 0.8rem;
  }
  </style>
  