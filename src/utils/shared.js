/**
 * 获取十位随机数
 * @returns 十位随机数（Number类型）
 */
export const getRandomNum = () => {
  const date = Date.now().toString();
  const dateRandomStr = date.substring(date.length - 5);

  const number = Math.random().toString();
  const mathRandomStr = number.substring(number.length - 5);

  return Number(mathRandomStr + dateRandomStr);
};
