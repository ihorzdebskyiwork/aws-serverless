/**
 * Generates a timestamp rounded to the nearest minute.
 * @param date - The input date object.
 * @returns The timestamp (in milliseconds) with seconds and milliseconds set to zero.
 */
const getMinutelyTimeStamp = (date: Date): number => {
  const resultDate = new Date(date);
  resultDate.setSeconds(0, 0); // Set both seconds and milliseconds to zero
  return resultDate.getTime();
};

/**
 * Utility functions for working with time.
 */
const timeUtil = { getMinutelyTimeStamp };

export default timeUtil;
