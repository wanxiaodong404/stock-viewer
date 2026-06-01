export const COLOR = {
	red: 'hsla(360deg, 100%, 100%, 1)',
	green: 'hsla(120deg, 100%, 100%, 1)',
	get default() {
		return document.documentElement.classList.contains('dark') ? '#1e293b' : '#eee'
	},
	setColor(percent = 0, max = 10) {
		percent = Number(percent);
		const rate = Math.min(Math.abs(percent) / max, 1) * 0.65
		if (percent > 0) {
			return `hsl(0, 75%, ${85 - rate * 55}%)`
		} else if (percent < 0) {
			return `hsl(145, 65%, ${85 - rate * 50}%)`
		}
		return this.default
	}
}
