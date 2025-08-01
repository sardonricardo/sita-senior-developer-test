const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function getLicensePlate(n: number): string {
	if (n < 1000000) {
		return n.toString().padStart(6, "0");
	}
	n -= 1000000;
	let blockIndex = Math.floor(n / 100000);
	const numericPart = n % 100000;
	let letterPart = "";

	while (blockIndex >= 0) {
		letterPart = LETTERS[blockIndex % 26] + letterPart;
		blockIndex = Math.floor(blockIndex / 26) - 1;
	}

	const numericString = numericPart.toString().padStart(5, "0");
	return numericString + letterPart;
}

/* function test() {
	console.log(getLicensePlate(0));
	console.log(getLicensePlate(999999));
	console.log(getLicensePlate(1000000));
	console.log(getLicensePlate(1000001));
	console.log(getLicensePlate(1000026));
	console.log(getLicensePlate(1000027));
	console.log(getLicensePlate(9999999));
	console.log(getLicensePlate(10000000));
}

test(); */
