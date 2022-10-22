import request from "../helpers/request";

export const increaseLvlDifficulty = async (user, id) => {
    const {data, status} = await request.put(
        `/words/${user}/${id}`
    );
    if(status === 200) {
        console.log('difficulty level increase');
    }
    if(data.message) {
        //setValidateMessage(data.message);
    }
}

export const decreaseLvlDifficulty = async (user, id) => {
    const {data, status} = await request.put(
        `/words/dec/${user}/${id}`
    );
    if(status === 200) {
        console.log('difficulty level decrease');
    }
    if(data.message) {
        //setValidateMessage(data.message);
    }
}