// src/utils/timeAgo.js

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'; // Import the plugin

dayjs.extend(relativeTime); // Extend dayjs with the plugin

export const timeAgo = (dateString) => {
  return dayjs(dateString).fromNow();
};
