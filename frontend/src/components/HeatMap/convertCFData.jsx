export function convertCFData(result) {
    const dataMap = {};
    const solvedMap = {};
    let count = 0;
    result.forEach((submission) => {
            const date = new Date(submission.creationTimeSeconds * 1000)
                .toISOString()
                .split("T")[0]; // Extract the date in YYYY-MM-DD format

            if (dataMap[date]) {
                dataMap[date] += 1; // Increment the value for successful submissions
            } else {
                dataMap[date] = 1; // Initialize the value for the date
            }
            if (submission.verdict === "OK" && !solvedMap[submission.problem.name]) {
                    count++;
                    solvedMap[submission.problem.name] = true;
            }
    });
    console.log(count);
    // Convert the dataMap object into an array of objects
    return { "heatMapData": Object.entries(dataMap).map(([date, value]) => ({ date, value })),"solved":count};
}
