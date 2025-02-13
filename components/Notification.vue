<!-- Notification.vue-->
  
<template>
  <div v-if="message" class="notification" :class="type"> 
    {{ message }}
    </div>
    </template>
    
<script setup>
const notification = useState('notification',()=>({
    message: '',
    type: 'success' //susses /error /warning /etc
}))

const {message, type} = notification;
</script>
<style scoped>
.notifcation {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 10px;
  border-radius: 5px;
  color: white;
  z-index: 1000;
}
.success {
  background-color: #d4edda;
  color: #155724;
}
.error {
  background-color: red;
}
</style>
    
      