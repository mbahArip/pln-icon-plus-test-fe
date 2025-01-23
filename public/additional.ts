function generateDeretAngka(length: number): number[] {
  const nums = [0, 1];
  const itteration = length - nums.length;

  function addNums() {
    const [a, b] = nums.slice(-2);
    nums.push(a + b);
  }

  for (let i = 0; i < itteration; i++) {
    addNums();
  }

  return nums;
}
console.log("Soal nomor 1: ", generateDeretAngka(10), "\n");

// ========================================================================================================

function getNilaiSaham(array: number[]): number {
  return array.sort((a, b) => a - b)[0];
}
console.log("Soal nomor 2");
console.log("Contoh kasus: ");
console.log("Input: [10,9,6,5,15]");
console.log("Output: ", getNilaiSaham([10, 9, 6, 5, 15]), "\n");
console.log("1. [7,8,3,10,8]", getNilaiSaham([7, 8, 3, 10, 8]));
console.log("2. [5,12,11,12,10]", getNilaiSaham([5, 12, 11, 12, 10]));
console.log("3. [7,18,27,10,29]", getNilaiSaham([7, 18, 27, 10, 29]));
console.log("4. [20,17,15,14,10]", getNilaiSaham([20, 17, 15, 14, 10]), "\n");

// ========================================================================================================

function countBanyakAngka(array: string[]): number {
  return array.filter((item) => /\d/.test(item)).length;
}
console.log("Soal nomor 3");
console.log("Contoh kasus: ");
console.log("Input: [2,h,6,u,y,t,7,j,y,h,8]");
console.log(`Output: `, countBanyakAngka(["2", "h", "6", "u", "y", "t", "7", "j", "y", "h", "8"]), "\n");
console.log("1. [b,7,h,6,h,k,i,5,g,7,8]: ", countBanyakAngka(["b", "7", "h", "6", "h", "k", "i", "5", "g", "7", "8"]));
console.log("2. [7,b,8,5,6,9,n,f,y,6,9]: ", countBanyakAngka(["7", "b", "8", "5", "6", "9", "n", "f", "y", "6", "9"]));
console.log("3. [u,h,b,n,7,6,5,1,g,7,9]: ", countBanyakAngka(["u", "h", "b", "n", "7", "6", "5", "1", "g", "7", "9"]));
