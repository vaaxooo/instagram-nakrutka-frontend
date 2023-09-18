import moment from 'moment';
import 'moment/locale/ru';

export default function formatDate(value) {
  const date = moment(value);
  const currentYear = moment().year();

  if (date.year() === currentYear) {
    // Если дата относится к текущему году, то не включаем год
    return date.format('D MMMM [в] HH:mm'); // Пример: "16 сентября в 22:58"
  } else {
    // Если дата относится к прошлому году, то включаем год
    return date.format('D MMMM YYYY [в] HH:mm'); // Пример: "16 сентября 2022 в 22:58"
  }
}
