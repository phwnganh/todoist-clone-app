export const extractLabelsFromList = (criteria: string[]) => {
    const labels: string[] = []
    criteria.forEach(c => {
        // at least 1 label
        if(c.startsWith("(") && c.endsWith(")")){
            c.slice(1, -1).split("|").map(l => l.trim()).forEach(l => {
                if(l.startsWith("@")){
                    labels.push(l)
                }
            })
        }
        // single label
        else if(c.startsWith("@")){
            labels.push(c)
        }
    })
    return labels;
}
