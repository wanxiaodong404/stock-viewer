export const COLOR = {
	red: 'hsla(360deg, 100%, 100%, 1)',
	green: 'hsla(120deg, 100%, 100%, 1)',
	default: '#eee',
	setColor(percent = 0, max = 10) {
		percent = Number(percent);
		const rate = (Math.abs(percent) / max) * 0.8
		if (percent > 0) {
			return `hsla(360deg, 100%, ${100 * (1 - rate)}%, 1)`
		} else if (percent < 0) {
			return `hsla(120deg, 100%, ${100 * (1 - rate)}%, 1)`
		} 
		return '#eee'
	}
}