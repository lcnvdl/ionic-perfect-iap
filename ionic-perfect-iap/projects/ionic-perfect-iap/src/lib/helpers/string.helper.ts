export class StringHelper {
    static isLowerCase(a: string) {
        return a === a.toLowerCase();
    }

    static setCase(text: string, upperCase: boolean) {
        return upperCase ? text.toUpperCase() : text.toLowerCase();
    }

    static compare(a: string, b: string) {
        const textA = a.toUpperCase();
        const textB = b.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    }

    static replaceAll(text: string, find: string, replacement: string) {
        return text.split(find).join(replacement);
    }
}
