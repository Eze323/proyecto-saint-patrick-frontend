<template>
    <div class="register-form">
        <h1>Registro</h1>
        <form @submit.prevent="handleSubmit">
            <div>
                <label for="name">Nombre:</label>
                <input type="text" id="name" v-model="name" required />
            </div>
            <div>
                <label for="email">Correo Electrónico:</label>
                <input type="email" id="email" v-model="email" required />
            </div>
            <div>
                <label for="password">Contraseña:</label>
                <input type="password" id="password" v-model="password" required />
            </div>
            <button type="submit">Registrarse</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const password = ref('')

const handleSubmit = () => {
    // Aquí puedes manejar el envío del formulario, por ejemplo, enviando los datos a una API
    console.log('Nombre:', name.value)
    console.log('Correo Electrónico:', email.value)
    console.log('Contraseña:', password.value)
}
</script>

<style scoped>
.register-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.register-form h1 {
    text-align: center;
}

.register-form div {
    margin-bottom: 1rem;
}

.register-form label {
    display: block;
    margin-bottom: 0.5rem;
}

.register-form input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.register-form button {
    width: 100%;
    padding: 0.75rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.register-form button:hover {
    background-color: #0056b3;
}
</style>