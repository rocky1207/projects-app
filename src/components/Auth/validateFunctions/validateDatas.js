export const validateDatas = (datas, actionType) => {
    let checkedUsername = '';
    let checkedEmail = '';
    let checkedPassword = '';

    switch (actionType) {
        case 'register':
            if (datas.username) {
                checkedUsername = datas.username;
            } else {
                checkedUsername = '';
            }
            if (datas.email) {
                checkedEmail = datas.email;
            } else {
                checkedUsername = '';
            }
            if (
                datas.password !== '' &&
                datas.passwordConfirm !== '' &&
                datas.password === datas.passwordConfirm
            ) {
                if (datas.password === datas.passwordConfirm) {
                    checkedPassword = datas.password;
                } else {
                    checkedPassword = '';
                }
            } else if (datas.password !== datas.passwordConfirm) {
                checkedPassword = '';
            } else {
                checkedPassword = '';
            }

            return { checkedUsername, checkedEmail, checkedPassword };
        case 'login':
            if (datas.email) {
                checkedEmail = datas.email;
            } else {
                checkedEmail = '';
            }
            if (datas.password) {
                checkedPassword = datas.password;
            } else {
                checkedPassword = '';
            }
            return { checkedEmail, checkedPassword };
        default:
            return { checkedUsername, checkedEmail, checkedPassword };
    }
};
