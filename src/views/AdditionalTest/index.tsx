import { Button } from "@/components/Button";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router";

export default function ViewAdditionalTest() {
  return (
    <div className="w-full min-h-screen grid place-items-center px-16 py-8 gap-8">
      <div className="grid grid-cols-3 gap-8 w-full h-full">
        <div
          className="w-full h-full px-7 py-5 flex flex-col gap-4 bg-white border border-form-border rounded-lg text-form-foreground"
          style={{
            boxShadow: "0px 4px 20px #6A6A6A1A",
          }}
        >
          <ReactMarkdown className="prose">
            {`## Soal 1

Buatlah sebuah program yang menghasilkan deret angka sederhana yang merupakan penjumlahan dari angka sebelumnya (0,1,1,2,3,5,8,13,21)

### Code
\`\`\`ts
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
\`\`\`

### Output

\`\`\`ts
console.log(generateDeretAngka(10));
// [ 0, 1, 1, 2, 3, 5, 8, 13, 21, 34 ]
\`\`\``}
          </ReactMarkdown>
        </div>
        <div
          className="w-full h-full px-7 py-5 flex flex-col gap-9 bg-white border border-form-border rounded-lg text-form-foreground"
          style={{
            boxShadow: "0px 4px 20px #6A6A6A1A",
          }}
        >
          <ReactMarkdown className="prose">
            {`## Soal 2

Buatlah fungsi untuk mengambil nilai saham dari dengan keuntungan terbaik.
Contoh: [10,9,6,5,15] -> 5

1. [7,8,3,10,8]
2. [5,12,11,12,10]
3. [7,18,27,10,29]
4. [20,17,15,14,10]

### Code
\`\`\`ts
function getNilaiSaham(array: number[]): number {
  return array.sort((a, b) => a - b)[0];
}
\`\`\`

### Output

\`\`\`ts
console.log(getNilaiSaham([7,8,3,10,8])); // 3
console.log(getNilaiSaham([5,12,11,12,10])); // 5
console.log(getNilaiSaham([7,18,27,10,29])); // 7
console.log(getNilaiSaham([20,17,15,14,10])); // 10
\`\`\``}
          </ReactMarkdown>
        </div>
        <div
          className="w-full h-full px-7 py-5 flex flex-col gap-9 bg-white border border-form-border rounded-lg text-form-foreground"
          style={{
            boxShadow: "0px 4px 20px #6A6A6A1A",
          }}
        >
          <ReactMarkdown className="prose">
            {`## Soal 3

Buatkan fungsi untuk mengetahui ada berapa banyak angka yang terdapat pada list string array berikut.
Contoh: [2,h,6,u,y,t,7,j,y,h,8] -> 4

1. [b,7,h,6,h,k,i,5,g,7,8]
2. [7,b,8,5,6,9,n,f,y,6,9]
3. [u,h,b,n,7,6,5,1,g,7,9]

### Code
\`\`\`ts
function countBanyakAngka(array: string[]): number {
  return array.filter((item) => /\\d/.test(item)).length;
}
\`\`\`

### Output

\`\`\`ts
console.log(countBanyakAngka(["b", "7", "h", "6", "h", "k", "i", "5", "g", "7", "8"])); // 5
console.log(countBanyakAngka(["7", "b", "8", "5", "6", "9", "n", "f", "y", "6", "9"])); // 7
console.log(countBanyakAngka(["u", "h", "b", "n", "7", "6", "5", "1", "g", "7", "9"])); // 6
\`\`\``}
          </ReactMarkdown>
        </div>
      </div>

      <div className="flex items-center gap-8 w-full">
        <Link to="/additional.ts" target="_blank" rel="noreferrer noopener" className="w-full">
          <Button className="w-full">Download Code</Button>
        </Link>
        <Link
          to="https://github.com/mbaharip/pln-icon-plus-test-fe/blob/main/public/additional.ts"
          target="_blank"
          rel="noreferrer noopener"
          className="w-full"
        >
          <Button className="w-full">Raw Code on GitHub</Button>
        </Link>
      </div>
    </div>
  );
}
