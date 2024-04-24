export const  removePTags = (htmlString) => {
  return htmlString.replace(/<\/?p>/g, '');
};
