export default function formatTime(dateTimeISO) {
	const date = new Date(dateTimeISO);
	const dateFormat = {
		month: 'short',
		day: 'numeric',
		hour: 'numeric',
		minute: '2-digit',
		hour12: true,
	};
	const formattedTime = date.toLocaleTimeString('en-US', dateFormat);
	return formattedTime;
}
