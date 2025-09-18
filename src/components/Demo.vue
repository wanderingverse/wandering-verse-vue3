<script setup>
import {fetchCurrentSystemUser} from "@/api/System.js";
import {onMounted, ref} from "vue";
import {NAvatar, NSpace} from "naive-ui"

const user = ref();
const getCurrentSystemUser = async () => {
    const res = await fetchCurrentSystemUser();
    user.value = res.data;
}
onMounted(() => {
    getCurrentSystemUser();
})
</script>


<template>
    <n-space v-if="user">
        <n-avatar :src="user.avatarPreSignedUrl"
                  round
                  size="medium"/>
    </n-space>
</template>

<style scoped>
</style>