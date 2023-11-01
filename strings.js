export function remove_strings(pCode) {
	let result = '',
		strings = [];

	// Extract all strings
	for (let index = 0; index < pCode.length; index++) {
		const character = pCode[index];

		if (['"', "'"].includes(character)) {
			result += character;

			let string = "";
			let escaped = false;

			while (index < pCode.length) {
				const char = pCode[++index];

				if (escaped) {
					string += char;
					escaped = false;

					continue;
				} else if (char === '\\') {
					escaped = true;

					continue;
				}

				if (char === character) {
					strings.push(string);

					result += `__STRING_${strings.length - 1}__${char}`

					break;
				} else {
					string += char;
				}
			}

			continue;
		}

		result += character;
	}

	return {
		result,
		strings
	};
}

export function restore_strings(pCode, pStrings) {
	for (const [index, string] of pStrings.entries()) {
		pCode = pCode.replace(`__STRING_${index}__`, string);
	}

	return pCode;
}