export default function FilterSubMenu({
	optionsMenu,
	Visible,
	horizontalMove,
}) {
	const menuOptions = [];
	for (let i = 0; i < optionsMenu.length; i++) {
		menuOptions.push(
			<button
				key={i}
				className='bg-[#028747] hover:bg-[#025C31] border-2 border-[#025C31] sm:border-none text-white text-xs sm:text-lg font-semibold rounded-full px-3 py-1 w-fit min-w-[120px]'
			>
				{optionsMenu[i]}
			</button>
		);
	}

	return (
		<>
			{Visible && (
				<div
					className={`absolute shadow-2xl shadow-black top-[4rem] ${horizontalMove} bg-[#028747] shadow-md rounded-lg p-2 flex flex-col gap-2 border-2 border-[#025C31]`}
				>
					{menuOptions}
				</div>
			)}
		</>
	);
}
