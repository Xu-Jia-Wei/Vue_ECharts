<template>
    <form class="edit-form" @submit.prevent="onSubmit">
      <label class="edit-label">Edit Name for "{{ label }}"</label>
      <input
        v-model="newLabel"
        :id="id"
        ref="labelInput"
        class="edit-input"
        placeholder="Enter new label"
        autocomplete="off"
        clearable
      />
      <div class="btn-group">
        <button @click="onCancel" class="btn cancel-btn">Cancel</button>
        <button @click="onSubmit" class="btn save-btn">Save</button>
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
      this.$refs.labelInput.focus();
    },
  };
  </script>
  
  <style scoped>
  .edit-label {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }
  
  .edit-input {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
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
  
  .cancel-btn {
    background-color: #dcdcdc;
    color: black;
  }
  
  .save-btn {
    background-color: #28a745;
    color: white;
  }
  
  .cancel-btn:hover {
    background-color: #b0b0b0;
  }
  
  .save-btn:hover {
    background-color: #218838;
  }
  </style>
  