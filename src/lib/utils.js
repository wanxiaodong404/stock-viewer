
/**
 * jsonp 数据截取
 * @param {*} str 
 * @returns 
 */
export function jsonpReceive(str, type = 'fn') {
	if (type === 'fn') {
		// jsonp fn
		str = str.match(/(.+?\()(.+)\);?$/)
		if (str && str[2]) {
			return JSON.parse(str[2]);
		} else {
			return null
		}
	} else if (type === 'var') {
		// jsonp var
		str = str.match(/(.+?=)(.+)$/);

		if (str && str[2]) {
			str = str[2].replace(/(\w+):/g, function(_match, target) {
				return `"${target}":`
			}).replace(',]', ']')
			return JSON.parse(str);
		} else {
			return null
		}
	} else {
		return null
	}
}