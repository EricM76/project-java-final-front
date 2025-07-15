const toThousand = (n : number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");



export  {
    toThousand
}