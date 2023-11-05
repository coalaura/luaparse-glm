import { remove_non_code, restore_non_code } from "./strings.js";
import { replace_glm } from "./transpile.js";
import { wrap_parse } from "./parse.js";

export function transpile(pCode) {
	const { result, comments, strings } = remove_non_code(pCode);

	pCode = replace_glm(result);

	return restore_non_code(pCode, comments, strings);
}

export function parse(pCode, pOptions = {}) {
	const transpiled = transpile(pCode);

	pOptions.luaVersion = "5.3";

	return wrap_parse(pCode, transpiled, pOptions);
}

export default {
	transpile,
	parse
};