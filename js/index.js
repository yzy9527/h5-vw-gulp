fetchData()
function fetchData() {
    let path = location.origin
    let url = path + '/paper-web/aper-web/search/getPaperUserInfoList'
    axios.get(url, {
        params: {
            delFlag: 0,
            pageNum: 1,
            pageSize: -1,
            typeCode: 'student-tear-paper'
        }
    }).then(function (response) {
        let a = response.data.records
        console.log(a);
        fetchData(a)
    })
        .catch(function (error) {
            console.log(error);
        });

}