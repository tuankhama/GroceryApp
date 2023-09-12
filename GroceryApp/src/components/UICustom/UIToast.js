

import Toast from 'react-native-toast-message';

export const showToast = (type, text1, text2) => {
    Toast.show({
        type: type,
        text1: text1,
        text2: text2,
        position: 'bottom',
        visibilityTime: 2000,
        autoHide: true,

    });
};
