const Corrects = {
    '0': '訂正以外',
    '1': '訂正',
};

export const correct = (code: string): string | undefined => Corrects[code];
