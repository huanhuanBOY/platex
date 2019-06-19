class Service {
  constructor () {
    this.baseurl = "http://127.0.0.1:5000/"
    this.currentPage = 1
    return this
  }
  getAllTags (callback, config) {
    let that = this
    let xhr = new XMLHttpRequest();
    xhr.open('GET', DataService.baseurl+"gettaglist");
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4){
            let x = xhr.responseText.replace(/\'/g,"\"")
            let data = JSON.parse(x);
            DataService.tagBase = data.data;
            if (callback) {
                that[callback]()
            }
        }
    }
    xhr.send();
  }
  getImages (callback, config){
    let that = this
    let xhr = new XMLHttpRequest();
    xhr.open('GET', DataService.baseurl + "getimgs?page="+config.page+"&tag="+config.tag);
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4){
            let x = xhr.responseText.replace(/\'/g,"\"")
            let data = JSON.parse(x);
            if (callback) {
                that[callback](data.data)
            }
        }
    }
    xhr.send();
  }
  getOneTexFile (callback, config) {
    let that = this
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'static/tex/' + config.name + ".tex");
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4){
          if (callback) {
            that[callback](xhr.responseText)
          }
        }
    }
    xhr.send();
}
}

const DataService = new Service()
export default DataService
