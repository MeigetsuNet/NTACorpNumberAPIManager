const CloseCauses = {
    '01': '清算の結了等',
    '11': '合併による解散等',
    '21': '登記官による閉鎖',
    '31': 'その他の清算の結了等',
};

export const closeCause = (code: string): string | undefined => CloseCauses[code];
