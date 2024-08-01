<template>
  <div class="space-x-2">
    <h2 class="text-2xl font-bold mb-4">Task Reports</h2>
    <button @click="exportToExcel" class="btn btn-primary mb-4">
      Export to Excel
    </button>
    <button @click="exportToPdf" class="btn btn-primary mb-4">
      Export to PDF
    </button>
    <Listbox v-model="selectedUsers" multiple>
      <div class="relative mb-4 flex justify-center">
        <ListboxButton
          class="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default max-w-[50rem] mx-auto"
        >
          <span class="block truncate">
            {{
              selectedUsers.length > 0
                ? selectedUsers.map((u) => u.name).join(", ")
                : "Select users"
            }}
          </span>
          <span
            class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
          >
            <iconify-icon
              icon="mdi:chevron-down"
              class="w-5 h-5 text-gray-400"
            />
          </span>
        </ListboxButton>
        <Transition
          as="div"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <ListboxOptions
            class="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              v-for="user in users"
              :key="user.id"
              :value="user"
              class="cursor-default select-none relative py-2 pl-10 pr-4"
              :class="{
                'text-blue-900 bg-blue-100': selectedUsers.includes(user),
              }"
            >
              <span
                :class="{
                  'font-medium': selectedUsers.includes(user),
                  'font-normal': !selectedUsers.includes(user),
                }"
              >
                {{ user.name }}
              </span>
              <span
                v-if="selectedUsers.includes(user)"
                class="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600"
              >
                <iconify-icon icon="mdi:check" class="w-5 h-5" />
              </span>
            </ListboxOption>
          </ListboxOptions>
        </Transition>
      </div>
    </Listbox>
    <button @click="sendReport" class="btn btn-primary mb-4">
      Send Report
    </button>
  </div>
</template>

<script>
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { mapState, mapActions } from "vuex";
import taskReportsService from "@/api/taskReports";
import Swal from "sweetalert2";

export default {
  components: {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
    "iconify-icon": window["IconifyIcon"],
  },
  data() {
    return {
      selectedUsers: [],
    };
  },
  computed: {
    ...mapState("auth", ["users"]),
  },
  methods: {
    ...mapActions("auth", ["fetchUsers"]),
    async exportToExcel() {
      try {
        const response = await taskReportsService.exportTasksToExcel();
        this.downloadFile(response.data, "tasks.xlsx");
      } catch (error) {
        console.error("Error exporting to Excel:", error);
      }
    },
    async exportToPdf() {
      try {
        const response = await taskReportsService.exportTasksToPdf();
        this.downloadFile(response.data, "tasks.pdf");
      } catch (error) {
        console.error("Error exporting to PDF:", error);
      }
    },
    async sendReport() {
      try {
        await taskReportsService.sendTaskReport(
          this.selectedUsers.map((u) => u.id)
        );
        this.selectedUsers = [];
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Reports sent successfully",
        });
      } catch (error) {
        console.error("Error sending report:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to send reports",
        });
      }
    },
    downloadFile(data, filename) {
      const blob = new Blob([data], { type: data.type });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    },
  },
  async created() {
    await this.fetchUsers();
  },
};
</script>

<style scoped>
.listbox-option.selected {
  @apply text-blue-900 bg-blue-100;
}
.listbox-option {
  @apply cursor-default select-none relative py-2 pl-10 pr-4;
}
</style>
