<template>
    <div class="support-page">
        <h1>Support Page</h1>
        <p>If you have any issues, please contact our support team.</p>
    </div>
</template>

<script>
  definePageMeta({ layout: "authenticated" });
export default {
    name: 'SupportPage',
};
</script>

<style scoped>
.support-page {
    padding: 20px;
    text-align: center;
}

.support-page h1 {
    font-size: 2em;
    margin-bottom: 20px;
}

.support-page p {
    font-size: 1.2em;
}
</style>