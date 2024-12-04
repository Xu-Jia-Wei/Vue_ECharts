<template>
    <div class="todo-container">
      <form @submit.prevent="onSubmit" class="todo-form">
        <h2 class="form-title">
          <label for="new-todo-input" class="label__lg">
            What needs to be done?
          </label>
        </h2>
        <input
          type="text"
          id="new-todo-input"
          name="new-todo"
          autocomplete="off"
          v-model.lazy.trim="label"
          class="input__lg" 
          placeholder="Enter your task here..."
        />
        <button type="submit" class="btn btn__primary btn__lg">Add</button>
      </form>
    </div>
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
.todo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  background-color: #f4f7fc;
}

.todo-form {
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 100%;
  max-width: 400px;
}

.form-title {
  text-align: center;
  margin-bottom: 20px;
}

.label__lg {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.input__lg {
  width: 100%;
  padding: 12px;
  margin-top: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  color: #333;
  outline: none;
  transition: border-color 0.3s ease;
}

.input__lg:focus {
  border-color: #6c5ce7;
  box-shadow: 0 0 0 3px rgba(108, 92, 231, 0.2);
}

.btn {
  width: 100%;
  padding: 14px;
  background-color: #6c5ce7;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn__primary {
  background-color: #6c5ce7;
}

.btn__primary:hover {
  background-color: #5a4cd1;
}

@media (max-width: 480px) {
  .todo-form {
    padding: 15px;
    width: 90%;
  }

  .label__lg {
    font-size: 16px;
  }

  .input__lg {
    font-size: 14px;
  }

  .btn__primary {
    font-size: 14px;
  }
}
</style>
