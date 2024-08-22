export const loadAudio = async (path: string) => {
    const audio = new Audio(path);
    return audio;
};

export const loadImage = async (path: string) => {
    const image = new Image();
    image.src = path;
    return new Promise((res) => {
        image.onload = () => {
            res(image);
        };
    });
};

export const range = (min: number, max: number, pass = 1) => {
    const array = [];
    if (min > max && pass > 0) {
        pass *= -1;
    }
    for (let i = min; i < max; i += pass) {
        array.push(i);
    }
    return array;
};

export const randint = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

export const formatPoints = (points: number) => String(points).padStart(4, "0");

export function delay(ms: number) {
    return new Promise((res) => {
        setTimeout(() => {
            res(true);
        }, ms);
    });
}
