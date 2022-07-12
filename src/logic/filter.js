const filter = (oligos, selector, newSearch) => {
    
    selector.includes("gene")
        ? oligos = oligos.filter(oligo=>{
            let genes = oligo.genes
            let r = false
            for(let g of genes){
                if(g.name.toUpperCase().includes(newSearch[1])){
                    r = true
                }
            }
            return r
        })
        : oligos = oligos
    selector.includes("plasmid")
        ? oligos = oligos.filter(oligo=>{
            let plasmids = oligo.plasmids
            let r = false
            for(let p of plasmids){
                if(p.name.toUpperCase().includes(newSearch[2])){
                    r = true
                }
            }
            return r
        })
        : oligos = oligos
    selector.includes("sequence")
        ? oligos = oligos.filter(oligo=>oligo.sequence.includes(newSearch[0]))
        : oligos = oligos 
    
    console.log(oligos, selector, newSearch)
    
    return oligos

}

export default filter 