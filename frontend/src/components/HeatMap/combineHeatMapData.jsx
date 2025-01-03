export function combineHeatMapData(codeChefData, codeForcesData) {
    const combinedMap = {};

    [...codeChefData, ...codeForcesData].forEach((entry) => {
        const date = entry.date;
        if (combinedMap[date]) {
            combinedMap[date] += entry.value;
        } else {
            combinedMap[date] = entry.value;
        }
    });

    return Object.entries(combinedMap).map(([date, value]) => ({ date, value }));
}
  