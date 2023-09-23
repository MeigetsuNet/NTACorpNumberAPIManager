export interface CorpInformation {
    corp_number: string;
    process: string;
    correct: string;
    update_date: string;
    change_date: string;
    name: string;
    name_image_id: string;
    name_ruby: string;
    kind: string;
    address: {
        text: {
            prefecture: string;
            city: string;
            street_number: string;
        };
        code: {
            prefecture: string;
            city: string;
        };
        post_code: string;
        image_id: string;
        outside: string;
        outside_image_id: string;
    };
    close: {
        date: string;
        cause: string;
    };
    successor_corporate_number: string;
    change_cause: string;
    assignment_date: string;
    latest: string;
    en: {
        name: string;
        prefecture: string;
        city: string;
        address_outside: string;
    };
    ignore: string;
}
