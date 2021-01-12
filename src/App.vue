<template>
  <div class="todo">
    <h4 class="text-center p-3">{{ name }}'s To Do List</h4>
    <div class="container text-center my-4">
      <div class="row" v-if="filteredTasks.length === 0">
        <div class="col text-center">
          <h3 class="text-success my-4">No Thing To Do 😂</h3>
        </div>
      </div>
      <template v-else>
        <div class="row">
          <div class="col font-weight-bold text-left">
            <div class="task-title">Tasks</div>
          </div>
          <div class="col font-weight-bold text-right task-title">
            <div class="task-title">Done</div>
          </div>
        </div>
        <div
          class="row mb-3"
          v-for="task in filteredTasks"
          v-bind:key="task.action"
        >
          <div class="col text-left">
            <div class="tasks-title">
              {{ task.action }}
            </div>
          </div>
          <div class="col text-right px-5">
            <div class="tasks-title">
              <input
                v-model="task.done"
                type="checkbox"
                class="form-check-input"
              />
            </div>
          </div>
        </div>
      </template>

      <div class="row my-4">
        <div class="col-7 col-lg-10">
          <div class="form-group">
            <input
              v-on:keyup.enter="addNewTodo()"
              v-model="newItemText"
              type="text"
              class="form-control"
              placeholder="add todo item"
            />
          </div>
        </div>
        <div class="col-5 col-lg-2 text-right">
          <button v-on:click="addNewTodo()" id="btn-add" class="btn">
            Add Todo
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-8 text-left">
          <button
            v-on:click="deleteCompletedTasks()"
            v-bind:disabled="this.CompletedTasks.length === 0"
            class="btn btn-danger btn-sm"
          >
            Delete Completed Tasks
          </button>
        </div>
      </div>
      <div class="row my-3">
        <div class="col-8 text-left">
          <div class="form-check">
            <label class="form-check-label">
              <input
                v-model="hideCompleted"
                type="checkbox"
                class="form-check-input"
              />
              Hide completed tasks
            </label>
          </div>
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
        this.tasks.push({
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

<style>
.todo {
  padding: 20px;
}
.todo h4 {
  font-weight: bold;
  max-width: 70rem;
  margin: 0 auto;
  border-radius: 10px;
  background-color: #844685 !important;
  color: #faf4ff !important;
  -webkit-box-shadow: 0 3px 12px 2px rgba(0, 0, 0, 0.5);
  box-shadow: 0 3px 12px 2px rgba(0, 0, 0, 0.5);
}
.task-title {
  color: #fdb827;
  font-size: 2.5rem;
}
.tasks-title {
  color: #10375c;
  font-size: 1.2rem;
  font-weight: 700;
}
#btn-add {
  background-color: #844685;
  color: white;
  border: 1px solid #844685;
}
</style>

