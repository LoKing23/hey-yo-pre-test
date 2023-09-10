const findNestedErrorMessage = (errors, searchString) => {
	try {
		const keys = searchString.split('.');
		const error = keys.reduce((acc, key) => acc[key], errors);
		const { message: errorMessage } = error;
		const isInvalid = errorMessage !== undefined;

		return { isInvalid, errorMessage };
	} catch (e) {
	  	return { isInvalid: false, errorMessage: '' };
	}
};

export default findNestedErrorMessage;
