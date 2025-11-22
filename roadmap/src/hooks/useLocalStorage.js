import { useState, useEffect } from 'react';

/**
 * Кастомный хук для работы с локальным хранилищем
 * @param {string} key - ключ в localStorage
 * @param {*} initialValue - начальное значение
 * @returns {[*, function]} - [значение, функция для обновления]
 */
function useLocalStorage(key, initialValue) {
  // Инициализируем состояние
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Пытаемся получить значение из localStorage
      const item = window.localStorage.getItem(key);
      
      if (item) {
        const parsed = JSON.parse(item);
        // Проверяем, что это не поддельные данные
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (error) {
      console.error(`Ошибка при загрузке ${key} из localStorage:`, error);
    }
    
    // Если нет данных, используем initialValue
    if (typeof initialValue === 'function') {
      return initialValue();
    }
    return initialValue;
  });

  // Функция для обновления значения
  const setValue = (value) => {
    try {
      // Позволяем value быть функцией (для рассчета нового значения)
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Сохраняем в состояние
      setStoredValue(valueToStore);
      
      // Сохраняем в localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Ошибка при сохранении ${key} в localStorage:`, error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;