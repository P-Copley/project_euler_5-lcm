function smallestCommonMultipleBrute(nums) {
  let result = 1;
  for (let i = 0; i < nums.length; i++) {
    if (result % nums[i] !== 0) {
      result++;
      i = 0;
    }
  }
  return result;
}

module.exports = { smallestCommonMultipleBrute };
