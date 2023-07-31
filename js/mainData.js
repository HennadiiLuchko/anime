const mainData = () => {
    fetch('./db.json')
        .then((responce) => {
            return responce.json()
        })
        .then((data) => {
            console.log(data.anime)
        })

}

mainData()