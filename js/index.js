fetchData()

function fetchData(){
    let p = 'http://47.103.124.166/paper-web/search/getPaperUserInfoById'
    $.ajax({
        type:'GET',
        url:p,
        data:{id:163},
        success:function (data){

        }
    })
}