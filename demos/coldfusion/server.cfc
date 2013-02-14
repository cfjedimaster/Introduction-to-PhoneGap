component {

	url.returnFormat="json";

	remote function getStats() {
		var totalSpace = getTotalSpace("/Users/");
		var freeSpace = getFreeSpace("/Users/");
		var totalMemory = getSystemTotalMemory();
		var freeMemory = getSystemFreeMemory();
		return {"totalSpace":totalSpace,
				  "freeSpace":freeSpace,
				  "totalMemory":totalMemory,
				  "freeMemory":freeMemory};
	}

}