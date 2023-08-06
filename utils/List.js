const fs = require("fs");

class List {
	filePath;
	fileUrl;

	constructor(fileUrl, filePath) {
		this.fileUrl = fileUrl;
		this.filePath = filePath;
	}

	async downloadFile(retries = 0) {
		try {
			let response = await fetch(this.fileUrl).then((res) => res.json());
			fs.writeFileSync(this.filePath, JSON.stringify(response, null, "\t"));
			console.log(`File downloaded to ${this.filePath}`);
			return response;
		} catch (err) {
			console.log(err);
			if (retries < 3) {
				console.error(`Error when downloading file, retrying...`);
				return await this.downloadFile(retries + 1);
			}
		}
	}

	async readLocalFile() {
		try {
			let response = JSON.parse(fs.readFileSync(this.filePath));
			console.log(`File read from ${this.filePath}`);
			return response;
		} catch (err) {
			console.error(`Error when reading file`);
			return await this.downloadFile();
		}
	}
}
module.exports = List;
