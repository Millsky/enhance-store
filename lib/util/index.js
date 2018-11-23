/**
 * Created by millsky on 11/23/18.
 */
const getterSetterFactory = () => {
    let data;
    const set = (newData) => {
        data = newData;
    };
    const get = () => data;
    return {
        set,
        get,
    }
};

export default {
    getterSetterFactory,
}

