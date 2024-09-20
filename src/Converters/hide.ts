const Hides = {
    '0': '検索対象',
    '1': '検索対象除外',
};

export const hide = (code: string): string | undefined => Hides[code];
