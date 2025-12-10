export default function PopupOpenFolder({ folderItems }) {
	return (
		<div className="relative flex flex-col items-center min-w-52 p-1 gap-1">
			{folderItems.map((item) => (
				<div key={item.folder_item_id} className="flex justify-start w-full">
					<a href={item.url} className="hover:bg-[#45475a] px-2 w-full">
						<i
							className="bi bi-circle-fill mr-2"
							style={{ color: item.color }}
						></i>
						{item.name}
					</a>
				</div>
			))}
		</div>
	);
}
