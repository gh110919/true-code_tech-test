/**
 * Функция проверяет, пуст ли объект.
 * @param obj - Объект для проверки.
 * @returns true, если объект не пустой, иначе false.
 */
export const notEmpty = (obj: object) => Object.keys(obj).length !== 0;
