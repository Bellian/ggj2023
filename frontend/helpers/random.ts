


export function randomElement<T>(input: T[]): T {
    const index = Math.random() * input.length | 0;
    return input[index];
}