import { parse } from "luaparse";

import { transpile } from "./glm.js";

export function wrap_parse(pRawCode, pCode, pOptions = {}) {
	try {
		return parse(pCode, pOptions);
	} catch (e) {
		const { index, line, character } = shift_index(pRawCode, e.index),
			message = e.message.replace(/^\[\d+:\d+]/gm, `[${line}:${character}]`);

		throw {
			message,
			index,
			line,
			character
		};
	}
}

function shift_index(pRawCode, pIndex) {
	const before = pRawCode.substring(0, pIndex + 1),
		fixed = transpile(before);

	const index = pIndex + (before.length - fixed.length);

	const lines = before.split("\n");
	lines.pop();

	const line = lines.length + 1,
		character = index - lines.join("\n").length;

	return {
		index,
		line,
		character
	};
}