<script>
import Layout from "../../layouts/main";
import appConfig from "@/app.config";
import PageHeader from "@/components/page-header";

/**
 * Dashboard Component
 */
export default {
  page: {
    title: "HOME",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  components: {
    Layout,
    PageHeader,
  },
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row home-page">
      <div class="title">鉅生物流</div>
    </div>
    <!-- end row -->
  </Layout>
</template>

<style scoped>
.home-page .title {
  margin-top: 40px;
  font-size: 46px;
  text-align: center;
}
</style>
