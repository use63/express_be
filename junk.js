const add_data = async (model, data) => {

    try {
        const newData = await model.create(data)
        return "success"
    }

    catch (error) {
        console.error(error)
    }
}

const update_data = async (model, data) => {

    try {
        const newData = await model.update(data)
        return "success";
    }

    catch (error) {
        console.error(error)
    }
}

const delete_data = async (model, data) => {

    try {
        const newData = await model.destroy(data)
        return "success";
    }

    catch (error) {
        console.error(error)
    }
}