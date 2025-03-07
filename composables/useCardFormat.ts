// composables/useCardFormat.ts
import { ref, type Ref } from 'vue';

export function useCardFormat(cardNumber: Ref<string>) {
  const formatCard = (event: Event) => {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, ''); // Quitar todo lo que no sea dígito
    if (value.length > 16) value = value.slice(0, 16); // Limitar a 16 dígitos

    const formattedValue = value
      .match(/.{1,4}/g)
      ?.join('-') || value;

    cardNumber.value = formattedValue; // Actualizar el valor reactivo
    input.value = formattedValue; // Actualizar el input visualmente
  };

  return { formatCard };
}