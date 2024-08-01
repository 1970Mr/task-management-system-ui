<template>
  <div class="flex flex-col min-h-screen">
    <AppHeader />
    <main class="flex-grow container mx-auto py-6">
      <TabGroup>
        <TabList class="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
          <Tab
            v-for="tab in tabs"
            :key="tab"
            class="w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg"
            :class="{ 'bg-white shadow': selectedTab === tab }"
            @click="selectedTab = tab"
          >
            {{ tab }}
          </Tab>
        </TabList>
        <TabPanels class="mt-2">
          <TabPanel>
            <TaskList :tasks="tasks" />
          </TabPanel>
          <TabPanel>
            <TaskReports />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </main>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from "@/components/Layouts/AppHeader.vue";
import AppFooter from "@/components/Layouts/AppFooter.vue";
import { mapState, mapActions } from "vuex";
import TaskList from "@/components/Tasks/TaskList.vue";
import TaskReports from "@/components/Tasks/TaskReports.vue";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";

export default {
  components: {
    AppFooter,
    AppHeader,
    TaskList,
    TaskReports,
    TabGroup,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
  },
  data() {
    return {
      tabs: ["Task List", "Reports"],
      selectedTab: "Task List",
    };
  },
  computed: {
    ...mapState("tasks", ["tasks"]),
  },
  methods: {
    ...mapActions("tasks", ["fetchAllTasks"]),
  },
  async created() {
    await this.fetchAllTasks();
  },
};
</script>
