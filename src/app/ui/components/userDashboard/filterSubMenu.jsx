import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function FilterSubMenu({
	optionsMenu,
	Visible,
	horizontalMove,
	button,
}) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const handleButtonClick = (value) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set(button, value);
		const newUrl = `${pathname}?${params.toString()}`;
		router.push(newUrl);
	};

	const menuOptions = optionsMenu.map((option, index) => (
		<button
			key={index}
			onClick={() => handleButtonClick(option)}
			className='bg-[#028747] hover:bg-[#025C31] border-2 border-[#025C31] sm:border-none text-white text-xs sm:text-lg font-semibold rounded-lg px-3 py-1 w-fit min-w-[120px] text-start'
		>
			{option}
		</button>
	));

	return (
		<>
			{Visible && (
				<div
					className={`absolute shadow-2xl shadow-black top-[4rem] ${horizontalMove} bg-[#028747] shadow-md rounded-lg p-2 flex flex-col gap-2 border-2 border-[#025C31] max-h-[300px] overflow-auto`}
				>
					{menuOptions}
				</div>
			)}
		</>
	);
}
