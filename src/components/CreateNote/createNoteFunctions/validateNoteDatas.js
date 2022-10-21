export const validateNoteDatas = (datas) => {
    let aprove = '';
    if (datas.title && datas.description) {
        aprove = true;
    } else {
        aprove = false;
    }
    return aprove;
};
