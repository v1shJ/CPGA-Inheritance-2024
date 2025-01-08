export function CombineHeatMapData(codeChefData, codeForcesData, leetCodeData) {
    const combinedMap = {};

    [...codeChefData, ...codeForcesData, ...leetCodeData].forEach((entry) => {
        const date = entry.date;
        if (combinedMap[date]) {
            combinedMap[date] += entry.value;
        } else {
            combinedMap[date] = entry.value;
        }
    });

    return Object.entries(combinedMap).map(([date, value]) => ({ date, value }));
}


export function ConvertCFData(result) {
    if(!result || result.length === 0) return null;
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
    // console.log(count);
    // Convert the dataMap object into an array of objects
    return { "heatMapData": Object.entries(dataMap).map(([date, value]) => ({ date, value })),"solved":count};
}


export function ConvertLCData(submissionCalendar){
    if(!submissionCalendar) return null;
    const heatMap = Object.entries(submissionCalendar).map(([timestamp, value]) => {
        const date = new Date(parseInt(timestamp, 10) * 1000)
            .toISOString()
            .split("T")[0]; // Convert to YYYY-MM-DD format
        return { date, value };
    });

    return heatMap;
};

