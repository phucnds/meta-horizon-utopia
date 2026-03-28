export function testRandomChance(maxValue: number, threshold: number): boolean {
	const randomValue = Math.random() * maxValue;
	return randomValue <= threshold;
}
