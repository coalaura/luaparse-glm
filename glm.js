import { remove_strings, restore_strings } from "./strings.js";
import { replace_glm } from "./transpile.js";
import { wrap_parse } from "./parse.js";

export default class LuaGLMParse {
	static transpile(pCode) {
		const { result, strings } = remove_strings(pCode);

		pCode = replace_glm(result);

		return restore_strings(pCode, strings);
	}

	static parse(pCode, pOptions = {}) {
		const transpiled = transpile(pCode);

		pOptions.luaVersion = "5.3";

		return wrap_parse(pCode, transpiled, pOptions);
	}
}