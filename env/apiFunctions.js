import conf from '../env/helper';

const manager = {

    //GET using to get data from web
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
    //POST using when add data to web
    post: async (url, data) => {

        let resultdata;
        let requestOptions = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }

        await fetch(conf.apiUrl + url, requestOptions)
                .then((res) => res.json())
                .then((data) => {
                resultdata = data;
                })

        return resultdata;

    } ,
    // PUT using when update data 
    put: async (url, data) => {

        let resultdata;
        let requestOptions = {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        }

        await fetch(conf.apiUrl + url, requestOptions)
                .then((res) => res.json())
                .then((data) => {
                resultdata = data;
                }).catch((err) => {
                    console.log('====================================');
                    console.log(err);
                    console.log('====================================');
                })

        return resultdata;

    } ,

    //DELETE using when delete existing data
  
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
    await fetch(conf.apiUrl + url + id, requestoptions)
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