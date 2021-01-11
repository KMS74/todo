<template>
  <div id="app">
    <h1 class="bg-primary text-white text-center p-3">{{ name }} To Do List</h1>
    <div class="contaier-fluid p-4">
      <div class="row" v-if="filteredTasks.length === 0">
        <div class="col text-center">
          <h3 class="text-success my-4">No Thing To Do!</h3>
        </div>
      </div>
      <template v-else>
        <div class="row">
          <div class="col font-weight-bold">Tasks</div>
          <div class="col-2 font-weight-bold">Done</div>
        </div>
        <div class="row" v-for="task in filteredTasks" v-bind:key="task.action">
          <div class="col">{{ task.action }}</div>
          <div class="col-2">
            <input
              type="checkbox"
              v-model="task.done"
              class="form-check-input ml-2"
            />
          </div>
        </div>
      </template>
      <div class="row py-2">
        <div class="col">
          <input
            v-on:keyup.enter="addNewTodo()"
            v-model="newItemText"
            class="form-control"
          />
        </div>
        <div class="col-2">
          <button class="btn btn-primary" v-on:click="addNewTodo()">Add</button>
        </div>
      </div>

      <div class="row py-2 mt-2">
        <div class="col-md-4">
          <button
            v-bind:disabled="this.CompletedTasks.length === 0"
            class="btn btn-danger"
            v-on:click="deleteCompletedTasks()"
          >
            Delete Completed Tasks
          </button>
        </div>
      </div>
      <div class="row py-2 mt-2 ml-2">
        <div class="col-md-4">
          <input
            type="checkbox"
            v-model="hideCompleted"
            class="form-check-input"
          />
          <label class="form-check-label font-weight-bold">
            Hide completed tasks
          </label>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "app",
  data() {
    return {
      name: "Vuejs",
      tasks: [],
      hideCompleted: true,
      newItemText: "",
    };
  },
  methods: {
    addNewTodo() {
      if (this.newItemText.length > 0) {
        this.tasks.unshift({
          action: this.newItemText,
          done: false,
        });
        this.storeData();
        this.newItemText = " ";
      }
    },
    storeData() {
      localStorage.setItem("todos", JSON.stringify(this.tasks));
    },
    deleteCompletedTasks() {
      if (this.CompletedTasks.length > 0) {
        if (confirm("Do You Want To Delete Your Completed Tasks?")) {
          this.tasks = this.tasks.filter((task) => task.done === false);
          this.storeData();
        }
      }
    },
  },

  created() {
    let data = localStorage.getItem("todos");
    if (data != null) {
      this.tasks = JSON.parse(data);
    }
  },
  computed: {
    filteredTasks() {
      return this.hideCompleted
        ? this.tasks.filter((task) => task.done === false)
        : this.tasks;
    },
    CompletedTasks() {
      return this.tasks.filter((task) => task.done === true);
    },
  },
};
</script>

<style scoped>
</style>

