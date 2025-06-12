const today: Date = new Date();
today.setHours(0, 0, 0, 0);


export const formatDate = (date: Date | string): string => {
    const taskDate: Date = new Date(date);
    taskDate.setHours(0, 0, 0, 0);

    const diffDays = Math.floor((taskDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Сегодня';
    if (diffDays === 1) return 'Завтра';
    if (diffDays > 1 && diffDays < 7) {
      const days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
      return days[taskDate.getDay()];
    }
    
    // Для дат дальше чем неделя
    const months = [
      'янв', 'фев', 'мар', 'апр', 'мая', 'июн',
      'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'
    ];
    return `${taskDate.getDate()} ${months[taskDate.getMonth()]}`;
  };


export const getDateColor = (date: Date | string): string => {
    const taskDate = new Date(date);
    taskDate.setHours(0, 0, 0, 0);
    
    return (taskDate.getTime() >= today.getTime()) ? 'text-blue-500' : 'text-red-500';
  };
