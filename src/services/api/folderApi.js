export async function getUserFolders() {
	const res = await fetch("http://localhost:3001/folder-with-items", {
		credentials: "include",
	});

	if (!res.ok) throw new Error("Error at get paths");

	return res.json();
}
