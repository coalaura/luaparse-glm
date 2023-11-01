import { parse } from "luaparse";

import { remove_strings, restore_strings } from "./strings.js";
import { transpile } from "./transpiler.js";

export function transpile(pCode) {
	const { result, strings } = remove_strings(pCode);

	pCode = transpile(result);

	return restore_strings(pCode, strings);
}

export function parse(pCode, pOptions = {}) {
	pCode = transpile(pCode);

	pOptions.luaVersion = "5.3";

	return parse(pCode, pOptions);
}