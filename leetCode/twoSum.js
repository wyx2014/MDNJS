/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
    if (!Array.isArray(nums)) return;
    var arr = [], i, j, len = nums.length;
    for(i=0;i<len;i++){
        arr[nums[i]]=i;
    }
    for(i=0;i<len;i++){
        j=arr[target-nums[i]];
        if(j!== undefined&&i!==j){
            return [i,j];
        }
    }

};
console.log(twoSum([1,4,57,45,3],58));
