const everyXIn60 = (x:number):string => { // Per x (sec, min, hours ) in 60(sec, min, hour)
  const arr:number[] = [];
  for (let i = 0; i < 60; i += x) {
    arr.push(i);
  }
  return arr.join(','); // When x eqaul 10 then "0,10,20,30,40,50" will be return
};

export const every5Seconds = `${everyXIn60(5)} * * * * *`; // Means every five seconds
export const every5Minutes = `0 ${everyXIn60(5)} * * * *`; // Means every five seconds
export const everyDay = '0 0 0 * * *'; // Means 0 o'clock at every day
