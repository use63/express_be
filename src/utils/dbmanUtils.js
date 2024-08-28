const add = async (model, data) => {
	try {
		const newData = await model.create(data);
		return `success add data to database`;
	} catch (error) {
		console.error(error);
	}
};

const update = async (model, data) => {
	try {
		const newData = await model.update(data);
		return `success updtae data to database`;
	} catch (error) {
		console.error(error);
	}
};

const destroy = async (model, data) => {
	try {
		const newData = await model.destroy(data);
		return `success destroy data to database`;
	} catch (error) {
		console.error(error);
	}
};

const read = async (model) => {
	try {
		const newData = await model.findAll();
		return newData;
	} catch (error) {
		console.error(error);
	}
};

export default {
    add,
    update,
	destroy,
	read
}