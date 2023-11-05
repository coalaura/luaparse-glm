export function remove_non_code(pCode) {
	const comments = [],
		strings = [];

	let result = pCode;

	result = result.replace(/--\[\[.+?]]|--.+?$/gms, pMatch => {
		const index = comments.length;

		comments.push(pMatch);

		return `--__COMMENT_${index}__`;
	});

	result = result.replace(/(?<!\\)(["'])([^\n]+?)(?<!\\)(\1)|(?<!\\)(\[\[)(.+?)(?<!\\)(]])/gs, (pMatch, pOpenQuote, pShortString, pCloseQuote, pOpenLongQuote, pLongString, pCloseLongQuote, pIndex) => {
			const index = strings.length;

			const open = pOpenQuote || pOpenLongQuote,
				string = pShortString || pLongString,
				close = pCloseQuote || pCloseLongQuote;

			strings.push(string);

			return `${open}__STRING_${index}__${close}`;
		});

	return {
		result,
		comments,
		strings
	};
}

// Replace scuffs out if i don't use () => comment or () => string
export function restore_non_code(pCode, pComments, pStrings) {
	for (const [index, comment] of pComments.entries()) {
		pCode = pCode.replace(`--__COMMENT_${index}__`, () => comment);
	}

	for (const [index, string] of pStrings.entries()) {
		pCode = pCode.replace(`__STRING_${index}__`, () => string);
	}

	return pCode;
}