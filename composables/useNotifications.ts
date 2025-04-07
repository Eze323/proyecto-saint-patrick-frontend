import { ref } from 'vue';
import type { Ref } from 'vue';

interface Notification {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
  timeout?: number;
}

// Estado compartido (singleton)
const notifications: Ref<Notification[]> = ref([]);

export const useNotifications = () => {
    const addNotification = (message: string, type: Notification['type'] = 'info', timeout = 5000) => {
        const id = Date.now();
        if (notifications.value.length >= 5) { // Límite de 5 toasts
          notifications.value.shift(); // Elimina el más antiguo
        }
        notifications.value.push({ id, message, type, timeout });
       
        if (timeout) {
          setTimeout(() => removeNotification(id), timeout);
        }
      };

  const removeNotification = (id: number) => {
    notifications.value = notifications.value.filter((n) => n.id !== id);
  };

  return { notifications, addNotification, removeNotification };
};