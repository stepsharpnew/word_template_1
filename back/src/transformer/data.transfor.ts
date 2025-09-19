export function formatDate(input) {
    const normalized = input.replace(/[^0-9.]/g, '.');
    const [day, month, year] = normalized.split('.');
    const months = [
      'января', 'февраля', 'марта', 'апреля',
      'мая', 'июня', 'июля', 'августа',
      'сентября', 'октября', 'ноября', 'декабря'
    ];
    return `«${day}» ${months[parseInt(month, 10) - 1]} ${year} г.`;
  }
