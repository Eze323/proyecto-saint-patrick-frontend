<template>
    <div class="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 class="text-2xl font-bold mb-6">Formulario de Transferencia</h2>
        <form @submit.prevent="submitForm">
            <div class="mb-4">
                <label for="cbuAlias" class="block text-sm font-medium text-gray-700">CBU o Alias</label>
                <input type="text" id="cbuAlias" v-model="form.cbuAlias" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
            </div>
            <div class="mb-4">
                <label for="monto" class="block text-sm font-medium text-gray-700">Monto</label>
                <input type="number" id="monto" v-model="form.monto" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
            </div>
            <div class="mb-4">
                <label for="fecha" class="block text-sm font-medium text-gray-700">Fecha</label>
                <input type="text" id="fecha" v-model="form.fecha" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" readonly>
            </div>
            <div class="mb-4">
                <label for="motivo" class="block text-sm font-medium text-gray-700">Motivo</label>
                <input type="text" id="motivo" v-model="form.motivo" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
            </div>
            <div class="mb-4">
                <label for="referencia" class="block text-sm font-medium text-gray-700">Referencia</label>
                <input type="text" id="referencia" v-model="form.referencia" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
            </div>
            <div class="mb-4">
                <label for="email" class="block text-sm font-medium text-gray-700">Email para Comprobante</label>
                <input type="email" id="email" v-model="form.email" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
            </div>
            <div>
                <button type="submit" class="w-full px-4 py-2 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Enviar</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                cbuAlias: '',
                monto: '',
                fecha: new Date().toLocaleDateString(),
                motivo: '',
                referencia: '',
                email: ''
            }
        };
    },
    methods: {
        submitForm() {
            // Handle form submission
            console.log(this.form);
        }
    }
};
</script>

<style scoped>
/* Add any additional styling here */
</style>

