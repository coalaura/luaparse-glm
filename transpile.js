// See: https://github.com/citizenfx/lua/blob/luaglm-dev/cfx/README.md
export function transpile(pCode) {
	pCode = pCode.replace(/(?<=^|;).*?(?=$|;)/gm, match => {
		// +=, -=, *=, /=, <<=, >>=, &=, |=, and ^=
		match = match.replace(/([\w.]+) ([+\-*/&|^]|<<|>>)=/gi, "$1 = $1 $2");

		// Safe Navigation: t?.x?.y == nil
		match = match.replace(/(?<=[\w\]])\?(?=\.\w|\[)/gi, "");

		// If the match is a for loop, don't unpack
		if (!match.match(/^\s*for/gm)) {
			// Unpacking named values from tables using in: local a,b,c in t

			match = match.replace(/(?<=\s*[\w.]+) in (.+)/g, (_match, unpack) => {
				return ` = table.unpack(${unpack})`;
			});
		}

		return match;
	});

	// C++ style comments /* */
	pCode = pCode.replace(/\/\*(.*?)\*\//g, (_match, comment) => {
		return `--[[${comment}]]`;
	});

	return pCode;
}