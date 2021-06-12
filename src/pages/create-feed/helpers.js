export function removeDuplicateSources(sources) {
    let uniqueSources = []
    sources.forEach((source) => {
        const hasSource = uniqueSources.find((sourceToCheck) => source.name === sourceToCheck.name);
        if (hasSource === undefined) {
            uniqueSources.push(source);
        }
    })
    return uniqueSources
}