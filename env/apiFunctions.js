import conf from '../env/helper';

const manager = {


    //GET
    get: async (url) => {

        let data;
        
        await fetch(conf.apiUrl + url)
                .then((result) => result.json() )
                .then((DATA) => {
                    data = DATA;
                }).catch((err) => {
                    console.log(err.message)
                })
        return data

    } ,
    //POST

    post: async (url, data) => {

        let resultdata;
        let requestOptions = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }

        await fetch(conf.apiurl + url, requestOptions)
                .then((res) => res.json())
                .then((data) => {
                resultdata = data;
                })

        return resultdata;

    } ,

    //DELETE
  
   delete: async (url,id) => {

    let resultdata;

    let content = {
      id:id
    }

    // this is for delete Category
      let requestoptions = {
        method: 'DELETE',
        body: JSON.stringify(content)
    }

    await fetch(conf.apiurl + url, requestoptions)
            .then((res) => res.json())
            .then((data) => {
                resultdata = data;
            }).catch((err) => {
                console.log(err)
            })

    return resultdata



  } ,



}

export default manager;