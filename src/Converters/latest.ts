const LatestInfos = {
    '0': '過去情報',
    '1': '最新情報',
};

export const latest = (code: string): string | undefined => LatestInfos[code];
