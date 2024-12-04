<template>
  <div id="app">
    <h1 class="text-center text-primary">My To-Do List</h1>
    <to-do-form @todo-added="addToDo"></to-do-form>

    <!-- List Summary Section -->
    <h2 id="list-summary" ref="listSummary" tabindex="-1" class="list-summary">{{ listSummary }}</h2>

    <!-- ECharts Container -->
    <div class="chart-container">
      <v-chart :option="chartOption" style="height: 350px; width: 100%;"></v-chart>
    </div>

    <!-- Todo List -->
    <ul aria-labelledby="list-summary" class="stack-large todo-list">
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
import VChart from 'vue-echarts';
import { use } from 'echarts/core';
import { PieChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

// Register required components for ECharts
use([PieChart, TitleComponent, TooltipComponent, LegendComponent, CanvasRenderer]);

export default {
  name: "app",
  components: {
    ToDoItem,
    ToDoForm,
    VChart
  },
  data() {
    return {
      ToDoItems: [
        { id: uniqueId("todo-"), label: "Learn Vue", done: false },
        { id: uniqueId("todo-"), label: "Create a Vue project with the CLI", done: true },
        { id: uniqueId("todo-"), label: "Have fun", done: true },
        { id: uniqueId("todo-"), label: "Create a to-do list", done: false },
      ],
      chartOption: {
        title: {
          text: 'To-Do List Completion',
          left: 'center',
          textStyle: {
            fontSize: 20,
            color: '#333'
          }
        },
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(0,0,0,0.7)',
          textStyle: {
            color: '#fff'
          }
        },
        legend: {
          top: '5%',
          left: 'center',
          textStyle: {
            color: '#333'
          }
        },
        series: [
          {
            name: 'To-Do Status',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 0, name: 'Completed' },
              { value: 0, name: 'Pending' }
            ],
            label: {
              fontSize: 16,
              color: '#333'
            },
            labelLine: {
              lineStyle: {
                color: '#ccc'
              }
            }
          }
        ]
      }
    };
  },
  methods: {
    addToDo(toDoLabel) {
      this.ToDoItems.push({ id: uniqueId('todo-'), label: toDoLabel, done: false });
      this.updateChartData();
    },
    updateDoneStatus(toDoId) {
      const toDoToUpdate = this.ToDoItems.find((item) => item.id === toDoId);
      toDoToUpdate.done = !toDoToUpdate.done;
      this.updateChartData();
    },
    deleteToDo(toDoId) {
      const itemIndex = this.ToDoItems.findIndex((item) => item.id === toDoId);
      this.ToDoItems.splice(itemIndex, 1);
      this.$refs.listSummary.focus();
      this.updateChartData();
    },
    editToDo(toDoId, newLabel) {
      const toDoToEdit = this.ToDoItems.find((item) => item.id === toDoId);
      if (toDoToEdit) {
        toDoToEdit.label = newLabel;
      }
      this.updateChartData();
    },
    updateChartData() {
      const numberFinishedItems = this.ToDoItems.filter((item) => item.done).length;
      const numberPendingItems = this.ToDoItems.length - numberFinishedItems;

      // Update the chart data
      this.chartOption.series[0].data = [
        { value: numberFinishedItems, name: 'Completed' },
        { value: numberPendingItems, name: 'Pending' }
      ];
    }
  },
  computed: {
    listSummary() {
      const numberFinishedItems = this.ToDoItems.filter((item) => item.done).length;
      return `${numberFinishedItems} out of ${this.ToDoItems.length} items completed`;
    }
  },
  watch: {
    ToDoItems() {
      this.updateChartData();
    }
  }
};
</script>

<style scoped>
#app {
  background: #f5f5f5;
  margin: 2rem auto;
  padding: 2rem;
  max-width: 600px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

h1 {
  color: #1e2a3a;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.list-summary {
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  color: #555;
  text-align: center;
}

.chart-container {
  margin-bottom: 2rem;
}

.todo-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.todo-list li {
  background-color: #fff;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.2s ease;
}

.todo-list li:hover {
  transform: scale(1.02);
}

@media (max-width: 600px) {
  #app {
    padding: 1rem;
  }
}
</style>
