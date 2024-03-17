import { notification } from 'antd';

export const showSuccess = (message = 'Операция выполнена успешно') => {
  notification.success({ message, duration: 2.5 });
};

export const showError = (error: unknown, message = 'Произошла ошибка при выполнении операции') => {
  console.log(error);
  notification.error({ message, duration: 2.5 });
};
