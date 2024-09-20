const Processes = {
    '01': '新規',
    '11': '商号又は名称の変更',
    '12': '国内所在地の変更',
    '13': '国外所在地の変更',
    '21': '登記記載の閉鎖等',
    '22': '登記記載の復活等',
    '71': '吸収合併',
    '72': '吸収合併無効',
    '81': '商号の登記の抹消',
    '99': '削除',
};

export const process = (code: string): string | undefined => Processes[code];
